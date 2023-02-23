import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import { NgmiPolyfill } from "vite-plugin-ngmi-polyfill";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer({}), cssnanoPlugin()],
    },
  },

  build: {
    sourcemap: "hidden",
    target: "esnext",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "js/[name].js",
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
