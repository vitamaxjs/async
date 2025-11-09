import path from "node:path";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/index.ts"),
      name: "vitamax.async",
    },
  },
  plugins: [
    dts({
      tsconfigPath: path.resolve(import.meta.dirname, "tsconfig.lib.json"),
      bundleTypes: true,
    }),
  ],
});
