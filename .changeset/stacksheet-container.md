---
"@patternmode/stacksheet": minor
---

`StacksheetProvider` takes a `container` element, so sheets can render inside a region of the page instead of the viewport. See "Rendering inside an element" in the README.

- On a sheet that cannot be dismissed, `Sheet.Handle` still shows its pill but no longer responds to drags or clicks.
- One stack resetting the page scale no longer strips the styles another stack applied.
- The focus trap resumes after a nested popup closes, and snap state is tracked in one place.
