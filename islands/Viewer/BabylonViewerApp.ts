import * as BABYLON from "babylon/core/index.js";
import { CSGModelingObject } from "../types.ts";

export function startBabylonViewerApp(
  element: HTMLCanvasElement,
  getModelingData: () => CSGModelingObject[],
  setIsRender: () => void,
) {
  element.id = `renderCanvas${(new Date()).getTime()}`;
  element.style.width = "600px";
  element.style.height = "600px";

  const engine = new BABYLON.Engine(element, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    (Math.PI * 60) / 180,
    (Math.PI * 120) / 180,
    -30,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(element, true);

  new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 100, 0),
    scene,
  );

  const baseMaterial = new BABYLON.StandardMaterial("baseMaterial");
  baseMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);

  let isRenderObject = false;

  function renderObject() {
    const data = getModelingData();

    if (data.length === 0) {
      return;
    }

    const meshs = data.map((obj) => {
      let mesh: BABYLON.Mesh | null = null;
      switch (obj.meshType) {
        case "box":
          mesh = BABYLON.MeshBuilder.CreateBox(obj.id, {}, scene);
          break;
        case "sphere":
          mesh = BABYLON.MeshBuilder.CreateSphere(
            obj.id,
            { segments: 3 },
            scene,
          );
          break;
        case "cylinder":
          mesh = BABYLON.MeshBuilder.CreateCylinder(obj.id, {
            tessellation: 6,
          }, scene);
          break;
        case "Torus":
          mesh = BABYLON.MeshBuilder.CreateTorus(obj.id, {
            tessellation: 6,
          }, scene);
          break;
      }

      if (mesh !== null) {
        mesh.position = new BABYLON.Vector3(
          obj.position.x,
          obj.position.y,
          obj.position.z,
        );
        mesh.rotationQuaternion = new BABYLON.Quaternion(
          obj.rotationQ.x,
          obj.rotationQ.y,
          obj.rotationQ.z,
          obj.rotationQ.w,
        );
        mesh.scaling = new BABYLON.Vector3(
          obj.scale.x,
          obj.scale.y,
          obj.scale.z,
        );
      }

      return mesh;
    });

    const subCSG = BABYLON.CSG.FromMesh(meshs[0]);

    meshs.forEach((mesh, i) => {
      if (i === 0) {
        return;
      }
      if (mesh === null) {
        return;
      }
      if (data[i] === null || data[i].csgType === null) {
        return;
      }

      subCSG[`${data[i].csgType!}InPlace`](
        BABYLON.CSG.FromMesh(mesh),
      );
    });

    subCSG.toMesh("csg", undefined, scene, true);

    meshs.forEach((mesh) => {
      mesh.dispose();
    });
    isRenderObject = true;
    setIsRender();
  }

  engine.runRenderLoop(function () {
    if (!isRenderObject) {
      renderObject();
    }

    scene.render();
  });
}
