import { defineLayout, RouteContext } from "$fresh/server.ts";
import { AppFooter } from "../components/AppFooter.tsx";
import { AppHeader, AppHeaderProps } from "../components/AppHeader.tsx";

export default defineLayout(
  (_req: Request, ctx: RouteContext<void, AppHeaderProps>) => {
    return (
      <>
        <div class="container mx-0">
          <AppHeader showBuildingShortCut={ctx.state.showBuildingShortCut} />
        </div>
        <div class="container mb-auto">
          <ctx.Component />
        </div>
        <div class="container">
          <AppFooter />
        </div>
      </>
    );
  },
);
