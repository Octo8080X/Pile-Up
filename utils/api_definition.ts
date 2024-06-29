import { createRoute, z } from "@hono/zod-openapi";

export const postModelsRoute = createRoute({
  method: "post",
  path: "/api/models",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              title: z.string().openapi({
                example: "model 1",
              }),
              image: z.string(),
              models: z.array(
                z.object({
                  id: z.string().openapi({
                    example: "xxxxxxxxxxxxxxx",
                  }),
                  meshType: z.string().openapi({
                    example: "box",
                  }),
                  scgType: z.string().optional().openapi({
                    example: "union",
                  }),
                  position: z.object({
                    x: z.number().openapi({
                      example: 0,
                    }),
                    y: z.number().openapi({
                      example: 0,
                    }),
                    z: z.number().openapi({
                      example: 0,
                    }),
                  }),
                  rotationQ: z.object({
                    x: z.number().openapi({
                      example: 0,
                    }),
                    y: z.number().openapi({
                      example: 0,
                    }),
                    z: z.number().openapi({
                      example: 0,
                    }),
                    w: z.number().openapi({
                      example: 0,
                    }),
                  }),
                  scale: z.object({
                    x: z.number().openapi({
                      example: 5,
                    }),
                    y: z.number().openapi({
                      example: 5,
                    }),
                    z: z.number().openapi({
                      example: 5,
                    }),
                  }),
                }),
              ),
            })
            .openapi({
              required: ["title", "models"],
            }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "OK",
            }),
            url: z.string().openapi({
              example: "/models/hogehoge",
            }),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
    },
  },
});
export type PostModelsType = typeof postModelsRoute;

export const getModelsDataRoute = createRoute({
  method: "get",
  path: "/api/models/:id/data",
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: "id",
          in: "path",
        },
        type: "string",
        example: "hogehogehogehoge",
      }),
    }),
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z
            .object({
              title: z.string().openapi({
                example: "model 1",
              }),
              models: z.array(
                z.object({
                  id: z.string().openapi({
                    example: "xxxxxxxxxxxxxxx",
                  }),
                  meshType: z.string().openapi({
                    example: "box",
                  }),
                  scgType: z.string().optional().openapi({
                    example: "union",
                  }),
                  position: z.object({
                    x: z.number().openapi({
                      example: 0,
                    }),
                    y: z.number().openapi({
                      example: 0,
                    }),
                    z: z.number().openapi({
                      example: 0,
                    }),
                  }),
                  rotationQ: z.object({
                    x: z.number().openapi({
                      example: 0,
                    }),
                    y: z.number().openapi({
                      example: 0,
                    }),
                    z: z.number().openapi({
                      example: 0,
                    }),
                    w: z.number().openapi({
                      example: 0,
                    }),
                  }),
                  scale: z.object({
                    x: z.number().openapi({
                      example: 5,
                    }),
                    y: z.number().openapi({
                      example: 5,
                    }),
                    z: z.number().openapi({
                      example: 5,
                    }),
                  }),
                }),
              ),
            })
            .openapi({
              required: ["title", "models"],
            }),
        },
      },
    },
    400: {
      description: "Bad request",
    },
  },
});
export type GetModelsDataType = typeof getModelsDataRoute;

export const getModelsInfoRoute = createRoute({
  method: "get",
  path: "/api/models/:id/info",
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: "id",
          in: "path",
        },
        type: "string",
        example: "hogehogehogehoge",
      }),
    }),
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            url: z.string().openapi({
              example: "/models/hogehoge",
            }),
            title: z.string().openapi({
              example: "hogehoge",
            }),
            colorCode: z.string().openapi({
              example: "#FF0000",
            }),
          }).openapi({
            example: {
              url: "/models/hogehoge",
              title: "hogehoge",
              colorCode: "#FF0000",
            },
          }),
        },
      },
    },
    400: {
      description: "Bad request",
    },
  },
});
export type GetModelsInfoRoute = typeof getModelsInfoRoute;

export const getModelsSearchRoute = createRoute({
  method: "get",
  path: "/api/models/search",
  request: {
    query: z.object({
      q: z.string().openapi({
        param: {
          name: "q",
          in: "query",
        },
        type: "string",
        example: "hogehoge",
      }),
    }),
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            modelInfos: z.array(
              z.object({
                url: z.string().openapi({
                  example: "/models/hogehoge",
                }),
                title: z.string().openapi({
                  example: "hogehoge",
                }),
                colorCode: z.string().openapi({
                  example: "#FF0000",
                }),
              }),
            ).openapi({
              example: [{
                url: "/models/hogehoge",
                title: "hogehoge",
                colorCode: "#FF0000",
              }],
            }),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
    },
  },
});
export type GetModelsSearchType = typeof getModelsSearchRoute;
