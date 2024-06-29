import { useEffect, useRef } from "preact/hooks";
import { startBabylonViewerApp } from "./BabylonViewerApp.ts";
import { CSGModelingObject } from "../types.ts";

import { hc } from "hono/client";
import { AppRoutesType } from "../../api/app.ts";

const client = hc<AppRoutesType>("/");

export default function BabylonAppLoader(props: { modelId: string }) {
  const canvasViewerRef = useRef(null);
  const objects = useRef<CSGModelingObject[]>([]);

  const getModelingData = () => {
    return objects.current;
  };

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

    startBabylonViewerApp(canvasViewerElement, getModelingData);
  }, []);

  return (
    <>
      <canvas ref={canvasViewerRef} />
    </>
  );
}
