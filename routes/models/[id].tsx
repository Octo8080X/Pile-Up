import { defineRoute } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Viewer from "../../islands/Viewer.tsx";
import { getModel, getModelInfo } from "../../utils/kvstorage.ts";
import { createSourceCode } from "../../utils/create_source_code.ts";
import SourceCode from "../../islands/SourceCode.tsx";

function TwitterShareLink({ linkUrl }: { linkUrl: string }) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      <div class="w-24">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 512 160.35"
        >
          <path d="M494.55 0H17.45C7.86 0 0 7.86 0 17.46V142.9c0 9.59 7.86 17.45 17.45 17.45h477.1c9.59 0 17.45-7.86 17.45-17.45V17.46C512 7.86 504.14 0 494.55 0z" />
          <path
            fill="#fff"
            fill-rule="nonzero"
            d="M216.63 88.91l13.05-.95c.28 2.45.86 4.33 1.73 5.6 1.41 2.08 3.43 3.13 6.06 3.13 1.96 0 3.47-.53 4.53-1.6s1.59-2.31 1.59-3.71c0-1.34-.5-2.54-1.5-3.6-1.01-1.05-3.34-2.04-7.02-2.99-6.02-1.56-10.31-3.65-12.88-6.26-2.59-2.6-3.88-5.91-3.88-9.95 0-2.64.66-5.14 1.99-7.5 1.32-2.37 3.31-4.22 5.97-5.56 2.66-1.35 6.31-2.02 10.93-2.02 5.69 0 10.01 1.22 12.99 3.69 2.99 2.45 4.76 6.35 5.33 11.71l-12.92.89c-.34-2.34-1.07-4.05-2.17-5.1-1.1-1.07-2.63-1.6-4.56-1.6-1.6 0-2.81.39-3.62 1.18-.8.78-1.21 1.74-1.21 2.87 0 .81.34 1.55.99 2.21.63.68 2.16 1.31 4.58 1.9 6.01 1.5 10.3 3.03 12.89 4.56 2.6 1.54 4.49 3.44 5.67 5.72 1.18 2.27 1.77 4.82 1.77 7.65 0 3.3-.78 6.35-2.36 9.15-1.58 2.79-3.77 4.92-6.61 6.36-2.83 1.44-6.39 2.16-10.69 2.16-7.56 0-12.8-1.69-15.71-5.07-2.91-3.37-4.55-7.66-4.94-12.87zm46.42-34.55h13.73v18.03h15.03V54.36h13.79v51.63h-13.79V85.08h-15.03v20.91h-13.73V54.36zm79.05 43.12h-15.57l-2.23 8.51h-14.03l16.74-51.63h15.04l16.67 51.63h-14.39l-2.23-8.51zm-2.91-11.18l-4.85-18.55-4.88 18.55h9.73zm24.07 19.69V54.36h22.9c4.24 0 7.49.43 9.73 1.28 2.24.84 4.06 2.41 5.43 4.7 1.38 2.29 2.06 5.09 2.06 8.38 0 2.86-.54 5.34-1.58 7.42-1.05 2.08-2.5 3.77-4.35 5.07-1.17.82-2.78 1.5-4.82 2.04 1.63.64 2.82 1.27 3.57 1.9.49.42 1.24 1.33 2.19 2.72.96 1.37 1.58 2.46 1.92 3.21l6.67 14.91h-15.52l-7.34-15.74c-.95-2.04-1.76-3.38-2.49-3.98-.98-.8-2.12-1.19-3.37-1.19h-1.21v20.91h-13.79zm13.79-30.64h5.8c.62 0 1.84-.27 3.65-.71.9-.23 1.65-.75 2.22-1.63.58-.87.87-1.87.87-3 0-1.67-.46-2.96-1.36-3.85-.92-.89-2.63-1.34-5.14-1.34h-6.04v10.53zm34.35-20.99h36.77V65.4h-22.98v8.21h21.3v10.53h-21.3v10.17h23.66v11.68H411.4V54.36z"
          />
          <path
            fill="#1A1A1A"
            fill-rule="nonzero"
            d="M169.41 0v160.35h-9.93V0z"
          />
          <path
            fill="#fff"
            fill-rule="nonzero"
            d="M101.2 44.63h11.61L87.44 73.62l29.84 39.45H93.92l-18.3-23.93-20.94 23.93H43.06l27.13-31.01-28.62-37.43h23.95L82.06 66.5l19.14-21.87zm-4.08 61.49h6.43l-41.52-54.9h-6.9l41.99 54.9z"
          />
        </svg>
      </div>
    </a>
  );
}

export default defineRoute(async (_req, ctx) => {
  const resultInfo = await getModelInfo(ctx.params.id);
  const url = `https://pile-up.deno.dev/models/${ctx.params.id}`;
  const ogpURL = `${url}/ogp`;
  const linkUrl =
    `https://twitter.com/share?text=Create%20%60${resultInfo.title}%60%20at%20Pile-Up.%0A&hashtags=pileup,babylonjs&url=${url}`;

  const resultData = await getModel(ctx.params.id);
  const sourceCode = createSourceCode(resultData);

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@okutann88" />
        <meta name="twitter:title" content={"[Pile-Up] " + resultInfo.title} />
        <meta
          name="twitter:description"
          content={"Create `" + resultInfo.title + "` at Pile-Up "}
        />
        <meta
          name="twitter:image"
          content={ogpURL}
        />
        <title>{`Pile-Up '${resultInfo.title}'`}</title>
      </Head>
      <div class="px-4 mb-4">
        <div class="flex justify-center">
          <div class="flex flex-col">
            <div class="text-2xl font-bold text-center mb-4">
              <p>Work Name: 【{resultInfo.title}】</p>
            </div>
            <div class="mb-4">
              <Viewer modelId={ctx.params.id} />
            </div>
            <div class="flex flex-row-reverse">
              <TwitterShareLink linkUrl={linkUrl} />
            </div>
          </div>
        </div>
      </div>
      <div class="px-4">
        <details>
          <summary class="justify-center">Source Code</summary>
          <SourceCode code={sourceCode} />
        </details>
      </div>
    </>
  );
});
