import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { getCsrfPlugin } from "./plugins/scrf.ts";

export default defineConfig({
  plugins: [
    getCsrfPlugin(),
    tailwind(),
  ],
});
