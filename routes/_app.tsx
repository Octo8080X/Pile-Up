import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html data-theme="dim">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@okutann88" />
        <meta name="twitter:title" content="Pile-Up" />
        <meta
          name="twitter:description"
          content="`Pile-Up` is simple Mesh Editor on Babylon.js."
        />
        <meta
          name="twitter:image"
          content="https://pile-up.deno.dev/images/og_image.png"
        />
        <title>Pile-Up</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="px-4 mx-auto min-h-screen bg-base-300">
          <div class="container min-h-screen mx-auto bg-base-100 flex flex-col justify-between">
            <Component />
          </div>
        </div>
      </body>
    </html>
  );
}
