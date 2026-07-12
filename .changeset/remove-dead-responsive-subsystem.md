---
"@patternmode/system": minor
---

Remove the never-consumed responsive-class API. `BREAKPOINT_VALUES`, `BREAKPOINTS`,
`Breakpoint`, `ResponsiveMode`, `ResponsiveValue`, `SCREEN_PREFIX`, `CONTAINER_PREFIX`,
`isResponsiveValue`, `getBreakpointPrefix`, `getResponsiveClasses`, and
`pushResponsiveClasses` had zero importers across every package and app — a Tailwind
responsive-class helper that shipped but was never wired into any primitive. Deleting it
trims the public surface of this 0.x package to what is actually used
(`joinClassNames`, `toCssSize`, the size tokens, object sizing, and the weighted
distribution module remain unchanged).
