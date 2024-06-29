import { CSGModelingObject } from "../islands/types.ts";

function createDefineObject(object: CSGModelingObject) {
  let createCode = "";
  switch (object.meshType) {
    case "box":
      createCode = `BABYLON.MeshBuilder.CreateBox('${object.id}', {}, scene);`;
      break;
    case "sphere":
      createCode =
        `BABYLON.MeshBuilder.CreateSphere('${object.id}', { segments: 3 }, scene);`;
      break;
    case "cylinder":
      createCode =
        `BABYLON.MeshBuilder.CreateCylinder('${object.id}', {}, scene);`;
      break;
    case "Torus":
      createCode =
        `BABYLON.MeshBuilder.CreateTorus('${object.id}', {}, scene);`;
      break;
    case "capsule":
      createCode =
        `BABYLON.MeshBuilder.CreateCapsule('${object.id}', {}, scene);`;
      break;
  }

  return `
const mesh${object.id} = ${createCode}
mesh${object.id}.position = new BABYLON.Vector3(
  ${object.position.x},
  ${object.position.y},
  ${object.position.z},
);
mesh${object.id}.rotationQuaternion = new BABYLON.Quaternion(
  ${object.rotationQ.x},
  ${object.rotationQ.y},
  ${object.rotationQ.z},
  ${object.rotationQ.w},
);
mesh${object.id}.scaling = new BABYLON.Vector3(
  ${object.scale.x},
  ${object.scale.y},
  ${object.scale.z},
);`;
}

export function createSourceCode(
  objects: CSGModelingObject[],
): string {
  const [firstObject, ...otherObjects] = objects;

  return `
${objects.map((object) => createDefineObject(object)).join("\n")}

const subCSG = BABYLON.CSG.FromMesh(mesh${firstObject.id});
${
    otherObjects.map((object) => {
      return `subCSG['${object.csgType}InPlace'](BABYLON.CSG.FromMesh(mesh${object.id}));`;
    }).join("\n")
  }
subCSG.toMesh("csg", undefined, scene, true);

${objects.map((object) => "mesh" + object.id + ".dispose();").join("\n")}
`;
}
