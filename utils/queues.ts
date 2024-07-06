import { createOgp } from "./create_ogp.tsx";

interface OgpMessage {
  type: "createOgp";
  id: string;
}
function createOgpMessage(id: string): OgpMessage {
  return {
    type: "createOgp",
    id,
  };
}

export async function callCreateOgp(id: string) {
  const kv = await Deno.openKv();
  await kv.enqueue(createOgpMessage(id), { delay: 3000 });
}

export async function listenQueue() {
  console.log("[START listenQueue]");
  const kv = await Deno.openKv();
  kv.listenQueue((msg: OgpMessage) => {
    if (msg.type === "createOgp") {
      createOgp(msg.id);
    }
  });
}
