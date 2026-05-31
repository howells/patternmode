import { defineConfig } from "tsdown";

const isWatch = process.argv.includes("--watch");

export default defineConfig({
  clean: !isWatch,
  dts: false,
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: true,
});
