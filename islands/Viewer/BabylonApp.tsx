import { useEffect, useRef, useState } from "preact/hooks";
import { startBabylonViewerApp } from "./BabylonViewerApp.ts";
import { CSGModelingObject } from "../types.ts";

import { hc } from "hono/client";
import { AppRoutesType } from "../../api/app.ts";

const client = hc<AppRoutesType>("/");

export default function BabylonAppLoader(
  props: { modelId: string; image: string },
) {
  const canvasViewerRef = useRef(null);
  const objects = useRef<CSGModelingObject[]>([]);
  const [isRender, setIsRender] = useState(false);

  const getModelingData = () => {
    return objects.current;
  };

  function callRender() {
    setIsRender(true);
  }

  useEffect(() => {
    const call = async () => {
      const result = await client.api.models[":id"].data.$get({
        param: {
          id: props.modelId,
        },
      });

      const json = await result.json();
      objects.current = json;
    };

    call();
  }, []);

  useEffect(() => {
    const canvasViewerElement = canvasViewerRef.current;

    if (canvasViewerElement === null) {
      return;
    }

    startBabylonViewerApp(canvasViewerElement, getModelingData, callRender);
  }, []);

  return (
    <>
      <div class={"absolute " + (isRender ? "hidden" : "")}>
        <span
          class={"absolute loading loading-spinner loading-lg text-warning top-[280px] left-[280px]"}
        >
        </span>
        <img src={props.image} width="600px" height="600px">
        </img>
      </div>

      <canvas ref={canvasViewerRef} width="600px" height="600px" />
    </>
  );
}
