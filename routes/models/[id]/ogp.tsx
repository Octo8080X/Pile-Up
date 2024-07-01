import { Handlers } from "$fresh/server.ts";
import { getModelOgpImage } from "../../../utils/kvstorage.ts";
import { callCreateOgp } from "../../../utils/queues.ts";
export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      console.log("GET /models/:id/ogp");
      const img = await getModelOgpImage(ctx.params.id);
      return new Response(img);
    } catch (e) {
      console.error(e);
      callCreateOgp(ctx.params.id);
      return new Response("Not Found", { status: 404 });
    }
  },
};
