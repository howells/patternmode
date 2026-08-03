---
"@patternmode/verge": patch
---

The theming knobs actually work now.

`--patternmode-verge-slot-size`, `-duration` and `-easing` were declared on
`.patternmode-verge` and then read on the same element. A declaration on an
element always beats a value inherited from an ancestor, so all three were
inert: a consumer setting them on `:root`, or on the list that owns the rows,
was silently overridden. The README promised retuning without forking and the
CSS refused it. `verge.tsx` already read the slot size with a `var()` fallback
and never saw it fire.

The defaults now live as `var()` fallbacks at the point of use and nothing is
declared on the slot, so the knobs inherit from anywhere above it. Written as
plain declarations rather than `@apply`, because Tailwind's `duration-(--var)`
shorthand takes no fallback and Tailwind drops utilities it cannot resolve
without failing the build. Verified in the emitted stylesheet, not by exit code.

No visual change at defaults: the rendered duration still resolves to 120ms and
the slot to 1.75rem.
