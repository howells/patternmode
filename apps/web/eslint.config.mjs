import { nextjs } from "@patternmode/eslint-config";

export default nextjs().append({
  name: "disable-server-action-rules",
  rules: {
    "@next/next/no-assign-module-variable": "off",
    "@next/next/no-server-import-in-page": "off",
    "@next/next/no-server-only-imports": "off",
    "@next/next/no-server-action-in-client-component": "off",
    // Disable TypeScript Next.js plugin warnings
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
  },
});
