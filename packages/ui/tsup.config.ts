import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  target: "es2020",
  dts: false, // Disable for now due to complex component structure
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@base-ui-components/react",
    "framer-motion",
    "lucide-react",
    "recharts",
    "zod"
  ],
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
});