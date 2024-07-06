import { Models } from "../components/Models.tsx";
import { useEffect, useState } from "preact/hooks";
import { hc } from "hono/client";
import { AppRoutesType } from "../api/app.ts";
import type { JSXInternal } from "preact/src/jsx.d.ts";
const client = hc<AppRoutesType>("/");

export default function Search({ keyword }: { keyword: string }) {
  const [modelInfos, setModelInfos] = useState<
    { title: string; url: string; image: string }[]
  >([]);
  const [q, setQ] = useState(keyword || "");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      search();
    }, 100);
  }, []);

  const search = async () => {
    setIsLoading(true);
    const result = await client.api.models.search.$get({ query: { q } });
    const json = await result.json();
    setModelInfos(json.modelInfos);
    setIsLoading(false);
  };

  return (
    <>
      <div class="container w-full">
        <form
          class=""
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        >
          <div class="flex">
            <div class="w-full">
              <label class="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  class="grow"
                  placeholder="Search"
                  value={q}
                  onChange={(
                    e: JSXInternal.TargetedEvent<
                      HTMLInputElement,
                      Event
                    >,
                  ) => setQ(e?.target?.value)}
                />
              </label>
            </div>
            <button class="btn btn-primary btn-outline mx-2" onClick={search}>
              Search
            </button>
          </div>
        </form>
      </div>
      <div class="container mx-auto mt-2 px-2">
        <p class="text-xl">Total: {isLoading ? "?" : modelInfos.length}</p>
      </div>
      <div class="container mx-auto mt-2">
        <Models modelInfos={modelInfos} />
      </div>
    </>
  );
}
