import { defineRoute } from "$fresh/server.ts";
import Viewer from "../../islands/Viewer.tsx";
import { getModelInfo } from "../../utils/kvstorage.ts";

export default defineRoute(async (_req, ctx) => {
  const result = await getModelInfo(ctx.params.id);

  return (
    <div class="px-4">
      <div class="flex justify-center">
        <div class="flex flex-col">
          <div class="text-2xl font-bold text-center mb-4">
            <p>Work Name: 【{result.title}】</p>
          </div>
          <div class="">
            <Viewer modelId={ctx.params.id} />
          </div>
        </div>
      </div>
    </div>
  );
});
