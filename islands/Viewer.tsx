import BabylonAppLoader from "./Viewer/BabylonApp.tsx";

export default function Viewer(props: { modelId: string }) {
  return <BabylonAppLoader modelId={props.modelId} />;
}
