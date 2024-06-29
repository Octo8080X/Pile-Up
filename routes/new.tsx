import { FreshContext } from "$fresh/server.ts";
import { AppHeaderProps } from "../components/AppHeader.tsx";
import Modeler from "../islands/Modeler.tsx";

export const handler = {
  GET: async (_req: Request, ctx: FreshContext<AppHeaderProps>) => {
    ctx.state.showBuildingShortCut = false;
    return await ctx.render();
  },
};
export default function New() {
  return (
    <div class="px-4">
      <div class="flex justify-center">
        <div class="flex flex-col">
          <div class="text-2xl font-bold text-center mb-4">
            <p>New Model</p>
          </div>
          <div class="">
            <Modeler />
          </div>
        </div>
      </div>
    </div>
  );
}
