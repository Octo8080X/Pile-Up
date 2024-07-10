import * as BABYLON from "babylon/core/index.js";
import { CSGModelingObject } from "../../types/types.ts";

export function startBabylonResultApp(
  element: HTMLCanvasElement,
  getModelingData: () => CSGModelingObject[],
  setScreenShot: (src: string) => void,
) {
  element.id = `renderCanvas${(new Date()).getTime()}`;
  element.style.width = "500px";
  element.style.height = "500px";
  element.addEventListener("wheel", function (event) {
    event.preventDefault();
  }, { passive: false });

  const engine = new BABYLON.Engine(element, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    (Math.PI * 60) / 180,
    (Math.PI * 60) / 180,
    30,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(element, true);
  camera.wheelPrecision = 10;
  camera.lowerRadiusLimit = 5.0;
  camera.upperRadiusLimit = 120.0;

  new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 100, 0),
    scene,
  );

  const baseMaterial = new BABYLON.StandardMaterial("baseMaterial");
  baseMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);

  let csgMesh: BABYLON.Mesh | null = null;

  let beforeObjectPropertiesString: string = "";

  let islenderingModel = false;
  setInterval(() => {
    if (islenderingModel) {
      return;
    }
    islenderingModel = true;

    const data = getModelingData();

    if (JSON.stringify(data) == beforeObjectPropertiesString) {
      islenderingModel = false;
      return;
    }

    beforeObjectPropertiesString = JSON.stringify(data);

    if (csgMesh !== null) {
      csgMesh.dispose();
    }

    if (data.length > 0) {
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

      try {
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

        csgMesh = subCSG.toMesh("csg", undefined, scene, true);
        meshs.forEach((mesh) => {
          mesh.dispose();
        });
      } catch (e) {
        console.error(e);
      } finally {
        meshs.forEach((mesh) => {
          mesh.dispose();
        });
      }
    }
    islenderingModel = false;
  }, 500);

  async function screenShot() {
    const screenShot = element.toDataURL("image/png");
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      return;
    }
    const img = new Image();
    img.src = screenShot;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    ctx.drawImage(img, 0, 0, 200, 200);

    setScreenShot(canvas.toDataURL("image/png"));
  }

  let time = new Date().getTime();
  engine.runRenderLoop(function () {
    scene.render();
    if (new Date().getTime() - time > 500) {
      screenShot();
      time = new Date().getTime();
    }
  });
}
