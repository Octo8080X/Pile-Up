export type MeshType = "box" | "sphere" | "cylinder" | "Torus" | "capsule";
export type CSGType = "subtract" | "inverse" | "union" | "intersect";

export type CSGModelingObject = {
  id: string;
  meshType: MeshType;
  csgType: CSGType | null;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotationQ: {
    x: number;
    y: number;
    z: number;
    w: number;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
};

export type CSGModelingUpdateProperty = Omit<
  CSGModelingObject,
  MeshType | CSGType
>;
