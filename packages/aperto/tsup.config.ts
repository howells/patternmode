import { defineConfig } from "tsup";

const isWatch = process.argv.includes("--watch");

export default defineConfig({
  clean: !isWatch,
  dts: true,
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: true,
});
