import {
  type Plugin,
} from "$fresh/server.ts";

import { FreshContext } from "$fresh/server.ts";
import { CONSTS } from "../utils/consts.ts";

const unCheckedMethods = /^(GET|HEAD|OPTIONS)/;
const isAllowedContentType =
  /^\b(application\/json|application\/x-www-form-urlencoded|multipart\/form-data|text\/plain)\b/;

const allowedOrigins = (): string[] => {
  if (
    CONSTS.APP_ENV === undefined ||
    CONSTS.APP_ENV === "development"
  ) {
    return ["http://localhost:8000"];
  }
  const allowedOrigin = CONSTS.ALLOWED_ORIGIN;
  return allowedOrigin.split(",").map((v) => v.trim());
};

const isAllowedOrigin = (req: Request): boolean => {
  const origin = req.headers.get("origin");
  if (origin === null) {
    return false;
  }

  const allowOrigins = allowedOrigins();
  return allowOrigins.includes(origin);
};

export async function csrfHandler(
  req: Request,
  ctx: FreshContext,
) {
  if (
    !unCheckedMethods.test(req.method) &&
    isAllowedContentType.test(req.headers.get("content-type") || "") &&
    !isAllowedOrigin(req)
  ) {
    return new Response("Forbidden", { status: 403 });
  }

  return await ctx.next();
}


export function getCsrfPlugin():Plugin {
  return {
    name: "csrf",
    middlewares: [
        {
          middleware: {
            handler: csrfHandler
          },
          path: "/" 
        }
    ]
  };
}