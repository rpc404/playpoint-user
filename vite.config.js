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
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "svg";
          }
          return `assets/${extType}/[name].[ext]`;
        },
      },
    },
  },
});
