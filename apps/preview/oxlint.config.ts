import next from "@howells/lint/oxlint/next";

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
  extends: [next],
  ignorePatterns: ["components/ui/**"],
};
