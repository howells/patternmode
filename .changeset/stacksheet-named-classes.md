---
"@patternmode/stacksheet": major
---

Stacksheet's elements carry named classes instead of Tailwind utilities, and its registry item ships its stylesheet.

- **Breaking:** the Panel's elements no longer carry Tailwind utility classes (`min-h-11`, `fixed inset-0`, `grid`, …). Each styled element carries one class named after its part, such as `.patternmode-stacksheet__back`, `.patternmode-stacksheet__close`, `.patternmode-stacksheet__header`, `.patternmode-stacksheet__body` and `.patternmode-stacksheet__footer`, styled by `styles.css`. CSS or tests that selected the old utility classes must select the new class or the `data-stacksheet-*` attribute instead. The rendered styles are unchanged.
- **Breaking:** the bottom handle's position is a `data-stacksheet-handle-position="inside" | "outside"` attribute rather than its `top-0` or `bottom-full` class.
- **Breaking:** pointing your own Tailwind at the package (`@source ".../@patternmode/stacksheet/dist"`) no longer generates its styles, because there are no utilities in the markup to find. Import `@patternmode/stacksheet/styles.css`.
- **Breaking:** the shadcn registry item now ships `styles.css` beside the component and imports it. It used to ship no CSS and relied on your Tailwind scanning the vendored source; a vendored copy now brings its own stylesheet.
- The stylesheet still ships entirely inside `@layer components`, so your own utilities, and what you pass as `className` or `classNames`, still outrank it. It no longer ships the stray generic `.shadow` utility.
