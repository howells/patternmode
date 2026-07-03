---
"@patternmode/aperto": patch
---

Focus, layering, timing, and packaging fixes for Aperto from the component
review:

- Focus Return now targets the Thumbnail that opened the Media Transition: the
  opener index is stored when a thumbnail opens the group, and close restores
  focus to that thumbnail (falling back to the active thumbnail if the opener
  unmounted) instead of whichever item was navigated to last.
- The shared-element transition clone now layers above the shipped overlay
  (`z-[1000]`) and content (`z-[1001]`) via
  `var(--patternmode-aperto-clone-z, 1002)` instead of a hardcoded
  `z-index: 30`, so the open/close animation no longer plays dimmed beneath the
  backdrop. Hosts can override the layer with the custom property.
- `defaultOpen` on the primitive root now actually opens the dialog: the
  uncontrolled internal state initializes from `defaultOpen` instead of always
  starting closed.
- The transition-completion timer holds the latest `onComplete` in a ref, so
  parent re-renders during a transition no longer restart the countdown (which
  could wedge the dialog blank). The 450ms duration fallback is unchanged.
- Content children hidden with `opacity: 0` during `[data-aperto-transition]`
  now also get `pointer-events: none`, so invisible controls are not clickable
  mid-transition.
- Packaging: the `"use client"` directive now survives into the built entry
  module (it previously lived on inner modules only, which the bundler drops),
  so the package imports cleanly from React Server Components.
