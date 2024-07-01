import BabylonAppLoader from "./Viewer/BabylonApp.tsx";

export default function Viewer(props: { modelId: string; image: string }) {
  return <BabylonAppLoader modelId={props.modelId} image={props.image} />;
}
