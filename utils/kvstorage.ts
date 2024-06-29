/// <reference lib="deno.unstable" />
import { CSGModelingObject } from "../islands/types.ts";
import { ulid } from "$std/ulid/mod.ts";
const MODEL_DATA_KEY = "Modeling_data" as const;
const MODEL_INFO_KEY = "Modeling_info" as const;
const MODEL_OGP_IMAGE_KEY = "Modeling_ogp_image" as const;

export async function saveModel(
  title: string,
  models: [],
  image: string,
): Promise<{ id: string }> {
  const date = new Date();
  const id = ulid(date.getTime());
  const createdAt = date;

  const kv = await Deno.openKv();

  const infoData = await kv.get([MODEL_INFO_KEY, id]);
  if (infoData.value) {
    throw new Error("Model already exists");
  }

  const atomic = kv.atomic()
    .check(infoData);

  atomic.set([MODEL_DATA_KEY, id], models);
  atomic.set([MODEL_INFO_KEY, id], {
    title,
    id,
    image,
    createdAt,
  });

  const result = await atomic.commit();

  if (!result.ok) {
    throw new Error("Failed to save Modeling data");
  }

  return { id };
}

export async function getModel(id: string): Promise<CSGModelingObject[]> {
  const kv = await Deno.openKv();
  const result = await kv.get<CSGModelingObject[]>([MODEL_DATA_KEY, id]);

  return result.value!;
}

export async function getModelInfo(
  id: string,
): Promise<{ title: string; id: string; image: string }> {
  const kv = await Deno.openKv();
  const result = await kv.get<{ title: string; id: string; image: string }>([
    MODEL_INFO_KEY,
    id,
  ]);

  return result.value!;
}

export async function searchModels(q: string): Promise<
  { url: string; title: string; image: string }[]
> {
  const kv = await Deno.openKv();

  if (q === "") {
    return getRecentModelInfos(24);
  }

  const entries = kv.list<
    { title: string; id: string; createdAt: string; image: string }
  >({
    prefix: [MODEL_INFO_KEY],
  }, {
    reverse: true,
  });
  const result = [];
  for await (const entry of entries) {
    const v = entry.value;
    if (v.title.includes(q)) {
      result.push({
        url: `/models/${v.id}`,
        title: v.title,
        image: v.image,
      });
    }
  }
  return result;
}

export async function getRecentModelInfos(
  max: number,
): Promise<{ url: string; title: string; image: string }[]> {
  const kv = await Deno.openKv();
  const entries = kv.list<
    { title: string; id: string; createdAt: string; image: string }
  >({
    prefix: [MODEL_INFO_KEY],
  }, {
    reverse: true,
  });
  const result = [];
  for await (const entry of entries) {
    const v = entry.value;
    result.push({
      url: `/models/${v.id}`,
      title: v.title,
      image: v.image,
    });
    if (result.length >= max) {
      break;
    }
  }
  return result;
}

export async function setModelOgpImage(
  id: string,
  img: Uint8Array,
): Promise<boolean> {
  const kv = await Deno.openKv();
  const result = await kv.set([MODEL_OGP_IMAGE_KEY, id], img);

  return result.ok;
}

export async function getModelOgpImage(
  id: string,
): Promise<ArrayBuffer> {
  const kv = await Deno.openKv();
  const result = await kv.get<ArrayBuffer>([MODEL_OGP_IMAGE_KEY, id]);

  if (!result || !result.value) {
    throw new Error("image not found");
  }

  return result.value;
}
