import { Handlers } from "$fresh/server.ts";
import { getModelOgpImage } from "../../../utils/kvstorage.ts";
export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const img = await getModelOgpImage(ctx.params.id);
      return new Response(img);
    } catch (e) {
      return new Response("Not Found", { status: 404 });
    }
  },
};
