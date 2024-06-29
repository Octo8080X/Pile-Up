import { Handler } from "$fresh/server.ts";
import { appRoutes } from "../../api/app.ts";

export const handler: Handler = appRoutes.fetch;
