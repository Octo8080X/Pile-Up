import satori from "npm:satori";
import * as svg2png from "npm:svg2png-wasm";
import { optimise } from "@jsquash/oxipng";
import { getModelInfo, setModelOgpImage } from "./kvstorage.ts";

await svg2png.initialize(
  await fetch("https://unpkg.com/svg2png-wasm/svg2png_wasm_bg.wasm"),
);

const fontBufferArray = new Uint8Array(
  await (
    await fetch(
      new URL(
        "https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Thin.otf",
        import.meta.url,
      ).toString(),
    )
  ).arrayBuffer(),
);

export async function createOgp(id: string) {
  const info = await getModelInfo(id);

  const singleByteChars = info.title.match(/[ -~]/g) || [];
  console.info(`[INFO] singleByteChars: ${singleByteChars.length}`);

  const titleLength = info.title.length * 2 - singleByteChars.length;

  const title = titleLength > 10 ? info.title.slice(0, 8) + "..." : info.title;

  console.info(`[INFO] title: ${title}`);

  const svg = await satori(
    <div
      style={{
        backgroundColor: "FFF",
        width: 600,
        height: 315,
        display: "flex",
      }}
    >
      <div
        style={{
          color: "gray",
          width: 1000,
          height: 200,
          display: "flex",
          position: "absolute",
          marginLeft: "25px",
          marginTop: "5px",
        }}
      >
        <p
          style={{
            fontSize: "30px",
            fontFamily: "Bold Noto Sans JP",
            fontWeight: 200,
            fontStyle: "bold",
            color: "#EEEEEE",
          }}
        >
          Pile-Up
        </p>
      </div>

      <div
        style={{
          display: "flex",
          position: "absolute",
          marginTop: "-140px",
          opacity: 0.7,
        }}
      >
        <img
          src={info.image}
          width={600}
          height={600}
        />
      </div>

      <div
        style={{
          color: "gray",
          width: 600,
          height: 200,
          display: "flex",
          position: "absolute",
          marginTop: "70px",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "100px",
            fontFamily: "Bold Noto Sans JP",
            fontWeight: 300,
            fontStyle: "bold",
            color: "#FFF",
            zIndex: 100,
            letterSpacing: "-2px",
          }}
        >
          {title}
        </p>
      </div>
    </div>,
    {
      width: 600,
      height: 315,
      fonts: [
        {
          name: "Noto",
          data: fontBufferArray,
          weight: 100,
          style: "normal",
        },
      ],
    },
  );

  const convert_options: svg2png.ConverterOptions = {
    fonts: [fontBufferArray],
    defaultFontFamily: {
      sansSerifFamily: "Noto Sans JP",
    },
  };

  const png = await svg2png.svg2png(svg, convert_options);
  const oxipng = await optimise(png, { level: 3 });

  setModelOgpImage(id, new Uint8Array(oxipng));
}
