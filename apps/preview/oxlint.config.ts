import { compatibleNext } from "../../oxlint.compat.ts";
import { componentSourceOverride } from "@howells/lint/oxlint/shadcn";

/**
 * Mirrors the repo-root oxlint config (the Howells Next.js preset) and adds one
 * exclusion: `components/ui` holds unmodified stock shadcn components generated
 * by `shadcn add`. They follow shadcn's own house style (function declarations,
 * no semicolons) rather than this repo's, and are regenerated on demand, so
 * linting them to the Howells ruleset would be noise. The vendored
 * `components/patternmode` and `lib/patternmode` trees are deliberately NOT
 * excluded — they are authored to this repo's style, so linting them keeps
 * generator regressions visible.
 */
export default {
  extends: [compatibleNext],
  ignorePatterns: ["components/ui/**"],
  // `components/patternmode` is the vendored design-system tree: every file
  // is a forwarding wrapper around a shadcn component. The shared override
  // stops the shadcn call-site rules there, including
  // `require-static-classes`, which cannot read a wrapper that destructures
  // `className` out and spreads the rest. Call sites outside it keep the rules.
  overrides: [componentSourceOverride(["components/patternmode/**"])],
  // `joinClassNames` is this repo's class-merging helper. The shadcn rules
  // recognise `cn`, `clsx`, `classNames`, `twMerge` and `cva` out of the box,
  // so without this every call reads as a className the linter cannot check
  // and `shadcn/require-static-classes` reports it. Oxlint takes `settings`
  // from the root config only and does not merge it through `extends`, so it
  // has to be declared here rather than in the shared preset.
  settings: { shadcn: { mergeFunctions: ["joinClassNames"] } },
};
