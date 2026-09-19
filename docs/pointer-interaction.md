# Pointer interaction and browser tests

## Pointer capture

- Capture on pointerdown only if the element already owns the gesture.
  `setPointerCapture` retargets the rest of the gesture, including the compatibility
  mouseup and the click, at the capturing element, so every clickable descendant stops
  being activatable. Capturing speculatively, before a drag threshold, kills them all
  with nothing thrown, nothing prevented and nothing in the console. `stacksheet`'s
  `use-drag` and `briolette` capture after the drag commits.
- Where capture on pointerdown is correct, the captured element may never contain an
  interactive descendant. `halo`'s pad and arc commit a colour on pointerdown, so
  capturing there is honest, but a button placed inside the pad receives `pointerdown`
  and then loses both `pointerup` and `click` to the pad. Their children are decorative
  on purpose.
- A control whose gesture starts with `preventDefault()` must focus itself. Preventing
  the default on pointerdown suppresses the compatibility mousedown, and with it the
  action that moves focus, so a `role="slider"` with arrow keys becomes unreachable to
  anyone who arrived by pointer.

## Browser tests

- `pnpm e2e` is a separate lane and is not part of `pnpm test`. It runs Vitest
  browser mode on Playwright Chromium, so it needs a browser binary
  (`pnpm --filter @patternmode/scrollframe exec playwright install chromium`).
  `pnpm test` stays browser-free so a missing binary can't block the ordinary run.
  Run the browser gate before releasing any package whose behaviour depends on where
  the browser delivers an event - today `scrollframe` and `halo`.
- Browser tests are named `src/**/*.browser.tsx`, never `*.test.tsx`. The name keeps
  them out of vitest's default include, each package's `tsconfig.json` excludes them so
  they can't reach `dist`, and `scripts/build-registry.mjs` skips them so they can't be
  vendored into `apps/preview`.
- They assert the outcome; the jsdom tests assert the mechanism. Keep both. A unit test
  can't decide which element a real click activates, so assert the input to the
  browser's decision (was capture taken, did focus move) and confirm the outcome in a
  browser. Say in the test which one it is.
- A browser test that needs hard-coded coordinates shouldn't be written. Halo's hue arc
  is deliberately uncovered: its keyboard surface is a 1x1 visually hidden input
  Playwright refuses to click, and the arc is a stroked path whose bounding-box centre
  is empty space with the pad behind it, so a centre-click would pass for the wrong
  reason. It's asserted in jsdom, verified by hand, and the reason is in the test file.
- jsdom implements neither `getAnimations` nor `ResizeObserver`, and base-ui couples
  them: its scroll-area viewport effect needs a `ResizeObserver` before it schedules the
  timeout that calls `viewport.getAnimations({ subtree: true })`. Without the observer a
  test never reaches it and looks fine; with the observer it throws, surfacing as an
  unhandled error attributed to the file while every test in it still reports as passed.
  Stub both together, as `scrollframe`, `tags`, `aperto` and `stacksheet` do.
