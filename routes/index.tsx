import HeroHome from "../components/HeroHome.tsx";
import { Models } from "../components/Models.tsx";
import { getRecentModelInfos } from "../utils/kvstorage.ts";

export default async function Home() {
  const modelInfos = await getRecentModelInfos(24);

  return (
    <div class="px-4 py-4">
      <div class="pt-2 pb-4">
        <HeroHome />
      </div>
      <div class="container w-full mb-4">
        <form
          class=""
          noValidate
          autoComplete="off"
          action="/search"
        >
          <div class="flex">
            <div class="w-full">
              <label class="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  class="grow"
                  placeholder="Search"
                  name="keyword"
                />
              </label>
            </div>
            <button type="submit" class="btn btn-primary btn-outline mx-2">
              Search
            </button>
          </div>
        </form>
      </div>
      <div class="container mx-auto mt-2 px-2">
        <p class="text-xl">Recent Register</p>
      </div>
      <div class="container mx-auto mt-2">
        <Models modelInfos={modelInfos} />
      </div>
    </div>
  );
}
