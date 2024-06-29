// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $api_path_ from "./routes/api/[...path].ts";
import * as $conditions from "./routes/conditions.tsx";
import * as $index from "./routes/index.tsx";
import * as $models_id_ from "./routes/models/[id].tsx";
import * as $models_id_ogp from "./routes/models/[id]/ogp.tsx";
import * as $new from "./routes/new.tsx";
import * as $search from "./routes/search.tsx";
import * as $Modeler from "./islands/Modeler.tsx";
import * as $Modeler_BabylonApp from "./islands/Modeler/BabylonApp.tsx";
import * as $Modeler_BabylonEditApp from "./islands/Modeler/BabylonEditApp.ts";
import * as $Modeler_BabylonResultApp from "./islands/Modeler/BabylonResultApp.ts";
import * as $Search from "./islands/Search.tsx";
import * as $SourceCode from "./islands/SourceCode.tsx";
import * as $Viewer from "./islands/Viewer.tsx";
import * as $Viewer_BabylonApp from "./islands/Viewer/BabylonApp.tsx";
import * as $Viewer_BabylonViewerApp from "./islands/Viewer/BabylonViewerApp.ts";
import * as $types from "./islands/types.ts";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/api/[...path].ts": $api_path_,
    "./routes/conditions.tsx": $conditions,
    "./routes/index.tsx": $index,
    "./routes/models/[id].tsx": $models_id_,
    "./routes/models/[id]/ogp.tsx": $models_id_ogp,
    "./routes/new.tsx": $new,
    "./routes/search.tsx": $search,
  },
  islands: {
    "./islands/Modeler.tsx": $Modeler,
    "./islands/Modeler/BabylonApp.tsx": $Modeler_BabylonApp,
    "./islands/Modeler/BabylonEditApp.ts": $Modeler_BabylonEditApp,
    "./islands/Modeler/BabylonResultApp.ts": $Modeler_BabylonResultApp,
    "./islands/Search.tsx": $Search,
    "./islands/SourceCode.tsx": $SourceCode,
    "./islands/Viewer.tsx": $Viewer,
    "./islands/Viewer/BabylonApp.tsx": $Viewer_BabylonApp,
    "./islands/Viewer/BabylonViewerApp.ts": $Viewer_BabylonViewerApp,
    "./islands/types.ts": $types,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
