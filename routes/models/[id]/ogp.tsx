import { Handlers } from "$fresh/server.ts";
import { getModelOgpImage } from "../../../utils/kvstorage.ts";
import { callCreateOgp } from "../../../utils/queues.ts";
export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const img = await getModelOgpImage(ctx.params.id);
      if(img === null) {
        throw new Error("Not Found");
      }
      return new Response(img);
    } catch (e) {
      await callCreateOgp(ctx.params.id);
      return new Response("Not Found", { status: 404 });
    }
  },
};
