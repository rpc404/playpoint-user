import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer({}), cssnanoPlugin()],
    },
  },
  build: {
    sourcemap: true,
    target: "esnext",
  },
});
