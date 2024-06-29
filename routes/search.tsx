import { defineRoute } from "$fresh/server.ts";
import Search from "../islands/Search.tsx";

export default defineRoute((req: Request) => {
  const url = new URL(req.url);
  const keyword = url.searchParams.get("keyword") || "";

  return (
    <div class="px-4 pt-4">
      <Search keyword={keyword} />
    </div>
  );
});
