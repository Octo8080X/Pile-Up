import { defineRoute } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Viewer from "../../islands/Viewer.tsx";
import { getModelInfo } from "../../utils/kvstorage.ts";

export default defineRoute(async (_req, ctx) => {
  const result = await getModelInfo(ctx.params.id);

  return (
    <>
      <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@okutann88" />
          <meta name="twitter:title" content={"[Pile-Up] " + result.title} />
          <meta
            name="twitter:description"
            content={"Create `"+ result.title + "` at Pile-Up " }
          />
          <meta
            name="twitter:image"
            content={`https://pile-up.deno.dev/models/${ctx.params.id}/ogp`}
          />
      </Head>
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
    </>
  );
});
