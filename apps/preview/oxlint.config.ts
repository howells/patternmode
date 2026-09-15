import { compatibleNext } from "../../oxlint.compat.ts";

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
  overrides: [
    {
      // The vendored design-system components forward unrecognised props to
      // the shadcn component they wrap: `const { className, ...rest } = props`
      // and then `<Badge {...rest} />`. `require-static-classes` reports the
      // rest element because it cannot see that `className` was destructured
      // out of it, so no call site can carry an unchecked class through. The
      // rule is unsatisfiable for a forwarding wrapper, which is what every
      // component in this tree is.
      //
      // The scope is deliberately this tree only. Call sites outside it keep
      // the rule, which is where a className the linter cannot read is a real
      // problem rather than an artefact of the wrapper shape.
      files: ["components/patternmode/**"],
      rules: { "shadcn/require-static-classes": "off" },
    },
  ],
  // `joinClassNames` is this repo's class-merging helper. The shadcn rules
  // recognise `cn`, `clsx`, `classNames`, `twMerge` and `cva` out of the box,
  // so without this every call reads as a className the linter cannot check
  // and `shadcn/require-static-classes` reports it. Oxlint takes `settings`
  // from the root config only and does not merge it through `extends`, so it
  // has to be declared here rather than in the shared preset.
  settings: { shadcn: { mergeFunctions: ["joinClassNames"] } },
};
