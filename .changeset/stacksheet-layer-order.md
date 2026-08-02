---
"@patternmode/stacksheet": patch
---

Declare Tailwind's canonical layer order so this stylesheet cannot invert a consuming app's cascade.

A CSS layer is registered the first time it is seen, and a later `@layer …;` statement cannot move one that already exists. Stacksheet is the only Patternmode package that opens `@layer utilities`, so loading its stylesheet before the app's Tailwind entry registered `utilities` early and left the app's `components` appended *after* it — inverting the cascade, with component styles beating utilities.

The sheet now declares `@layer theme, base, components, utilities;` before its imports, which fixes the order wherever it lands. It is a no-op when the app declares the order itself, since the first declaration wins.

This is distinct from the layerless-utilities fix in 2.0.3, which put this package's own rules into `@layer utilities`. That change was necessary but not sufficient: it could not affect where `utilities` sat relative to the app's other layers. Reported by the rulework project, who ranked this above the original fix.

Packages that only open `@layer components` are unaffected and unchanged — registering `components` early still leaves `utilities` last.
