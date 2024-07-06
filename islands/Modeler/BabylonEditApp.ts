import * as BABYLON from "babylon/core/index.js";
import {
  CSGModelingObject,
  CSGModelingUpdateProperty,
} from "../../types/types.ts";

export function startBabylonEditApp(
  element: HTMLCanvasElement,
  updateModelingData: (result: CSGModelingUpdateProperty[]) => void,
  getModelingData: () => CSGModelingObject[],
  getAttachGizmoId: () => string,
  updateAttachGizmoId: (id: string) => void,
) {
  element.id = `renderCanvas${(new Date()).getTime()}`;
  element.style.width = "500px";
  element.style.height = "500px";

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
  camera.wheelPrecision = 10;

  new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 100, 0),
    scene,
  );

  new BABYLON.AxesViewer(scene, 20);

  const gizmoManager = new BABYLON.GizmoManager(scene);

  gizmoManager.positionGizmoEnabled = true;
  gizmoManager.rotationGizmoEnabled = true;
  gizmoManager.scaleGizmoEnabled = true;
  gizmoManager.boundingBoxGizmoEnabled = true;

  gizmoManager.gizmos.rotationGizmo!.updateGizmoRotationToMatchAttachedMesh =
    false;

  let currentAttachGizmoId = "";

  gizmoManager.onAttachedToMeshObservable.add((eventData) => {
    if (
      eventData !== null && eventData.id !== undefined &&
      currentAttachGizmoId !== eventData.id
    ) {
      updateAttachGizmoId(eventData.id);
    }
  });

  let BeforeObjectProperties: CSGModelingUpdateProperty[] = [];
  const meshArr: BABYLON.Mesh[] = [];

  setInterval(() => {
    const data = getModelingData();

    const currentMeshIds = meshArr.map((mesh) => mesh.id);

    const newMeshIds = data.map(({ id }) => id);

    const diffMeshIds = currentMeshIds.filter((id) => !newMeshIds.includes(id));
    diffMeshIds.forEach((id) => {
      const deleteIndex = meshArr.findIndex((mesh) => mesh.id === id);
      meshArr[deleteIndex].dispose();
      meshArr.splice(deleteIndex, 1);
    });

    if (data.length > 0) {
      data.forEach((obj) => {
        if (currentMeshIds.includes(obj.id)) {
          return;
        }
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
          meshArr.push(mesh);
        }
      });
    }
  }, 500);

  let lastUpdate = new Date().getTime();

  setInterval(() => {
    const nowObjectProperties: CSGModelingUpdateProperty[] = meshArr.map(
      (mesh) => {
        return {
          id: mesh.id,
          position: {
            x: mesh.position.x,
            y: mesh.position.y,
            z: mesh.position.z,
          },
          rotationQ: {
            x: mesh.rotationQuaternion?.x,
            y: mesh.rotationQuaternion?.y,
            z: mesh.rotationQuaternion?.z,
            w: mesh.rotationQuaternion?.w,
          },
          scale: { x: mesh.scaling.x, y: mesh.scaling.y, z: mesh.scaling.z },
        } as CSGModelingUpdateProperty;
      },
    );

    if (
      JSON.stringify(nowObjectProperties) !==
        JSON.stringify(BeforeObjectProperties) &&
      lastUpdate + 1000 < new Date().getTime()
    ) {
      updateModelingData(nowObjectProperties);
      BeforeObjectProperties = nowObjectProperties;
      lastUpdate = new Date().getTime();
    }

    const newAttachGizmoId = getAttachGizmoId();
    if (newAttachGizmoId !== currentAttachGizmoId) {
      if (newAttachGizmoId === "") {
        gizmoManager.attachToMesh(null);
        currentAttachGizmoId = "";
      } else {
        const mesh = (meshArr as BABYLON.Mesh[])!.find((mesh) =>
          mesh.id === getAttachGizmoId()
        );
        if (mesh !== undefined) {
          console.log("attachToMesh", mesh);
          gizmoManager.attachToMesh(mesh);
          currentAttachGizmoId = newAttachGizmoId;
        }
      }
    }
  }, 100);

  engine.runRenderLoop(function () {
    scene.render();
  });
}
