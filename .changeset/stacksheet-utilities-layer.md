---
"@patternmode/stacksheet": patch
---

Emit this package's Tailwind utilities inside `@layer utilities` instead of layerless.

`src/styles.css` imported `tailwindcss/utilities` on its own. Tailwind's layer declaration lives in its main entry, so importing the utilities file directly emitted every rule **layerless** — and a layerless declaration outranks every rule in a named layer regardless of specificity.

The practical effect: this stylesheet's `.opacity-0 { opacity: 0 }` beat a consuming application's `group-hover:opacity-100`, which sits in `@layer utilities`. **Any app loading this sheet had its hover- and focus-revealed controls silently stuck invisible** — the reveal simply never won the cascade. It did not reproduce in the package's own Storybook, because the sheet is not loaded there, and no static check could see it; it was found by measuring the live DOM in a consuming app, where it had disabled 51 controls at once.

Reported by the rulework project, whose row controls it broke.

If you added a workaround for this — raising specificity, `!important`, or revealing through a custom property instead of `opacity-0` — it is no longer required, though a custom-property reveal remains a robust pattern and needs no change.
