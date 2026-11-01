---
"@patternmode/stacksheet": minor
---

Sheets move like a native iOS sheet stack.

- Drags run on Motion values instead of React state, so a drag never re-renders.
- The release velocity carries into the spring, whether a Sheet dismisses, snaps to a Snap Point or returns to rest. `close()` and `pop()` send a Sheet out the way it came in, and interrupting one (pushing during a close, closing during an entrance) carries on from where the Sheet is.
- The backdrop and the Sheets beneath follow the top Sheet's progress continuously: as it enters, as it is dragged and as it leaves.
- A drag can start anywhere on a Panel, including links, buttons, `Sheet.Body` and Classic Layout content. A press that moves under 10px is still a tap, and the click after a drag is swallowed. Text fields, selects, textareas, editable content, `draggable="true"` elements and anything marked `data-stacksheet-no-drag` never start a drag. On touch, the Sheet claims the gesture before the browser starts scrolling. Pulling down on scrolled content scrolls it; once the content is at the top, the pull moves the Sheet.
- Dragging past the most open position stretches with a short scroll-view rubber band instead of stopping dead.
- Reduced motion is now a crossfade in place (200ms in, 150ms out). The Sheets beneath change position without travelling, and drag still works. It also follows a change to the setting while the page is open.
- Panels are no longer translucent while moving.
- Panels pad their edges with `env(safe-area-inset-*)`: the bottom of bottom Sheets, and the top, bottom and outer edge of side Panels.
- `Sheet.Header` is a navigation bar by default: Back at the leading edge, the Title centred on one line, Close at the trailing edge, each placed by a data attribute (`data-stacksheet-back`, `-title`, `-close`, `-description`) whatever their order. A Description in the header gets a centred row of its own under the bar. A `Sheet.Close` inside the header joins the row instead of floating in the corner.
- Focus returns to where it was in a Sheet when the Sheet above it is popped.
- New `height` option (`SheetHeight`: `"full" | "fit"`). Set it per Sheet (`open(Filters, {}, { height: "fit" })`) or as a default in `createStacksheet({ height: "fit" })`. A fitted bottom Sheet sizes to its content, up to 85dvh, and animates when its content changes height. `SheetHeight` and `SheetPresentationOptions` are now exported.
- Fix: importing `styles.css` into a Tailwind v4 app no longer overrides the app's responsive utilities, such as `hidden sm:table-cell`. The package's utilities now ship inside `@layer components`, and classes that only appeared in tests or in prose (`hidden`, `transform`, `transition` and others) are no longer generated. Tailwind v4 apps can instead skip `styles.css` and add `@source` for the package's `dist`.
- The default layout's Back and Close sit in a navigation bar above the content, using `Sheet.Header`, instead of floating over the content's top corners, where they covered its first line.
- Built-in controls behave like native ones on touch: no grey tap flash on the overlay or inside a Sheet, no long-press text selection or callout on Back, Close and the handles, no double-tap delay, and Back and Close brighten while pressed.

Behaviour changes to check when upgrading: links and buttons inside a Sheet can now start a drag, and `Sheet.Body` no longer opts out of dragging. Add `data-stacksheet-no-drag` to any element that needs its own gestures. Panels now clear the safe areas, so remove any padding you added for them yourself. A bottom Sheet runs to the screen edge, and its scrolling content passes under the home indicator and ends clear of it: `Sheet.Body` and the default layout handle this, and a composable Sheet with its own scroller adds `padding-bottom: var(--stacksheet-safe-bottom)` to that scroller's content. The Panel sets `-webkit-tap-highlight-color: transparent`, which its contents inherit, so give your own buttons and links inside a Sheet an `:active` state.
