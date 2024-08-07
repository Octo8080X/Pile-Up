import { useEffect, useRef, useState } from "preact/hooks";
import { startBabylonEditApp } from "./BabylonEditApp.ts";
import { startBabylonResultApp } from "./BabylonResultApp.ts";
import type { JSXInternal } from "preact/src/jsx.d.ts";
import { ulid } from "@std/ulid";
import {
  CSGModelingObject,
  CSGModelingUpdateProperty,
  CSGType,
  MeshType,
} from "../../types/types.ts";

import { hc } from "hono/client";
import { AppRoutesType } from "../../api/app.ts";

const client = hc<AppRoutesType>("/");

export default function BabylonAppLoader() {
  const canvasRef = useRef(null);
  const canvasCSGRef = useRef(null);
  const modalImageDataRef = useRef("");

  const objects = useRef<CSGModelingObject[]>([]);
  const [uiObjects, setUiObjects] = useState<CSGModelingObject[]>([]);

  const [selectMeshType, setSelectMeshType] = useState<MeshType>("box");
  const [selectCSGType, setSelectCSGType] = useState<CSGType>("subtract");

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [link, setLink] = useState("");
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const atatchGizmoId = useRef("");
  const [uiAtatchGizmoId, setUiAtatchGizmoId] = useState("");

  const addObject = () => {
    const newObject = {
      id: ulid(),
      meshType: selectMeshType,
      csgType: objects.current.length === 0 ? null : selectCSGType,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      rotationQ: {
        x: 0,
        y: 0,
        z: 0,
        w: 0,
      },
      scale: {
        x: 5,
        y: 5,
        z: 5,
      },
    };
    objects.current = [...objects.current, newObject];
    setUiObjects([...objects.current]);
  };

  const openDialog = () => {
    setIsDialogOpen(true);

    dialogRef.current?.showModal();
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogRef.current?.close();
  };

  const getAttachGizmoId = () => {
    return atatchGizmoId.current;
  };
  const updateAttachGizmoId = (id: string) => {
    atatchGizmoId.current = id;
    setUiAtatchGizmoId(id);
  };

  const updateModelingData = (newProperties: CSGModelingUpdateProperty[]) => {
    newProperties.forEach((newProperty) => {
      const index = objects.current.findIndex(
        (obj) => obj.id === newProperty.id,
      );
      if (index === -1) {
        return;
      }
      objects.current[index] = {
        ...objects.current[index],
        ...newProperty,
      };
    });
  };

  const getModelingData = () => {
    return objects.current;
  };

  const updateCSGType = (id: string, csgType: CSGType) => {
    const index = objects.current.findIndex((obj) => obj.id === id);
    if (index === -1) {
      return;
    }
    objects.current[index] = {
      ...objects.current[index],
      csgType,
    };
    setUiObjects([...objects.current]);
  };

  const deleteObject = (id: string) => {
    const index = objects.current.findIndex((obj) => obj.id === id);
    if (index === -1) {
      return;
    }
    objects.current = objects.current.filter((obj) => obj.id !== id);
    setUiObjects([...objects.current]);

    if (atatchGizmoId.current === id) {
      updateAttachGizmoId("");
    }
  };

  function setScreenShot(src: string) {
    modalImageDataRef.current = src;
  }

  useEffect(() => {
    const canvasElement = canvasRef.current;

    const canvasCSGElement = canvasCSGRef.current;

    if (canvasElement === null || canvasCSGElement === null) {
      return;
    }

    startBabylonEditApp(
      canvasElement,
      updateModelingData,
      getModelingData,
      getAttachGizmoId,
      updateAttachGizmoId,
    );
    startBabylonResultApp(canvasCSGElement, getModelingData, setScreenShot);
  }, []);

  const save = async () => {
    let titleError = false;

    if (title == "") {
      titleError = true;
    }
    if (title.length < 2 || 30 < title.length) {
      titleError = true;
    }
    if (titleError) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }

    const modelingData = getModelingData();

    const result = await client.api.models.$post({
      json: {
        title: title,
        models: modelingData,
        image: modalImageDataRef.current,
      },
    });

    const json = await result.json();
    setLink(json.url);
    setTitle(() => "");
  };

  return (
    <>
      <div class="grid grid-cols-2 gap-1 mb-2">
        <div class="mx-2">
          <canvas ref={canvasRef} width="500px" height="500px" />

          <canvas ref={canvasCSGRef} width="500px" height="500px" />
        </div>

        <div class="mx-2 bg-neutral p-4 w-full">
          <div>
            <select
              class="select select-bordered mr-2"
              onChange={(
                e: JSXInternal.TargetedEvent<HTMLSelectElement, Event>,
              ) =>
                setSelectMeshType(
                  (e.currentTarget as HTMLSelectElement).value as MeshType,
                )}
            >
              <option value="box">Box</option>
              <option value="sphere">Sphere</option>
              <option value="cylinder">Cylinder</option>
              <option value="Torus">Torus</option>
            </select>

            <select
              class="select select-bordered mr-2"
              onChange={(
                e: JSXInternal.TargetedEvent<HTMLSelectElement, Event>,
              ) =>
                setSelectCSGType(
                  (e.currentTarget as HTMLSelectElement).value as CSGType,
                )}
              disabled={uiObjects.length === 0}
            >
              <option value="subtract">Subtract</option>
              <option value="union">Union</option>
              <option value="intersect">Intersect</option>
            </select>

            <button
              class="btn btn-outline btn-primary mr-2"
              onClick={addObject}
            >
              Add Object
            </button>
            <button
              class="btn btn-outline btn-info"
              onClick={openDialog}
              disabled={uiObjects.length === 0}
            >
              Save Model
            </button>
          </div>
          <div class="divider"></div>

          <div>
            <h3>Log</h3>

            <table class="table table-zebra table-xs">
              <thead>
                <tr>
                  <th class="w-[210px]">ID</th>
                  <th class="w-[50px]">MeshType</th>
                  <th class="w-[70px]">CSGType</th>
                  <th class="min-w-[70px]"></th>
                </tr>
              </thead>
              <tbody>
                {uiObjects.map((obj, i) => (
                  <tr key={`obj-${i}`}>
                    <th>
                      <button
                        onClick={() =>
                          updateAttachGizmoId(
                            obj.id == uiAtatchGizmoId ? "" : obj.id,
                          )}
                        class={"btn btn-xs mx-0 " + (obj.id == uiAtatchGizmoId
                          ? "btn-secondary btn-outline"
                          : "")}
                      >
                        {obj.id}
                      </button>
                    </th>
                    <td>{obj.meshType}</td>
                    <td class="w-[116px]">
                      {i != 0
                        ? (
                          <select
                            class="select select-bordered select-xs"
                            onChange={(
                              e: JSXInternal.TargetedEvent<
                                HTMLSelectElement,
                                Event
                              >,
                            ) =>
                              updateCSGType(
                                obj.id,
                                (e.currentTarget as HTMLSelectElement)
                                  .value as CSGType,
                              )}
                            disabled={i === 0}
                            value={obj.csgType!}
                          >
                            <option value="subtract">Subtract</option>
                            <option value="inverse">Inverse</option>
                            <option value="union">Union</option>
                            <option value="intersect">Intersect</option>
                          </select>
                        )
                        : "-"}
                    </td>
                    <td class="px-0">
                      <button
                        class="btn btn-outline btn-warning btn-xs mx-0 w-[60px] h-[30px]"
                        onClick={() => deleteObject(obj.id)}
                      >
                        Delete Object
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <dialog class="modal" ref={dialogRef}>
        {isDialogOpen && (
          <div class="modal-box">
            <h3 class="font-bold text-lg mx-auto">
              Please decide on a title.
            </h3>
            <div class="modal-action">
              <div class="grid grid-flow-row auto-rows-max mx-auto">
                {modalImageDataRef.current && (
                  <img src={modalImageDataRef.current} />
                )}
              </div>
              <div class="grid grid-flow-row auto-rows-max mx-auto">
                <div>
                  <input
                    type="text"
                    id="title"
                    class={`input input-bordered w-full max-w-xs ${
                      isError && "input-error"
                    }`}
                    placeholder="Please decide on a title. "
                    onChange={(
                      e: JSXInternal.TargetedEvent<
                        HTMLInputElement,
                        Event
                      >,
                    ) => setTitle(e?.target?.value)}
                  />
                  <div class="label">
                    <span class={`label-text-alt ${isError && "text-error"}`}>
                      min 2 characters max 30 characters
                    </span>
                  </div>
                </div>
                <div class="grid grid-flow-col auto-col-max  grid-cols-1 gap-3 mx-auto mb-2">
                  <button
                    class="btn btn-primary"
                    onClick={save}
                    disabled={link != ""}
                  >
                    SAVE
                  </button>
                  <button
                    class="btn btn-warning btn-outline"
                    onClick={closeDialog}
                  >
                    CLOSE
                  </button>
                </div>
                <div class="grid grid-flow-col auto-col-max mx-auto grid-cols-1 gap-3">
                  {link && (
                    <a href={link} class="font-bold btn btn-info btn-outline">
                      <p>Success, Go Viewer!</p>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
