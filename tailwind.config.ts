import { type Config } from "tailwindcss";
import daisyui from "daisy-ui";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [
    {
      handler: daisyui.handler,
      config: daisyui.config,
    },
  ],
  daisyui: {
    themes: ["dim"],
  },
} satisfies Config;
