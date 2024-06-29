import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getModel,
  getModelInfos,
  saveModel,
  searchModels,
} from "../utils/kvstorage.ts";
import {
  getModelsDataRoute,
  getModelsInfoRoute,
  getModelsSearchRoute,
  postModelsRoute,
} from "../utils/api_definition.ts";
import { CONSTS } from "../utils/consts.ts";

const app = new OpenAPIHono();

export const appRoutes = app
  // POST /api/models
  .openapi(postModelsRoute, async (c) => {
    const json = await c.req.json();
    const result = await saveModel(json.title, json.models, json.image);

    return c.json({ message: "OK", url: `/models/${result.id}` });
  })
  // GET /api/models/:id/data
  .openapi(getModelsDataRoute, async (c) => {
    const id = c.req.param("id");
    const arr = await getModel(id);

    return c.json(arr);
  })
  // GET /api/models/:id/info
  .openapi(getModelsInfoRoute, async (c) => {
    const id = c.req.param("id");
    const result = await getModelInfos(id);

    return c.json(result);
  })
  // GET /api/models/search
  .openapi(getModelsSearchRoute, async (c) => {
    const modelInfos = await searchModels(c.req.query("q") || "");

    return c.json({ modelInfos });
  });

export type AppRoutesType = typeof appRoutes;
