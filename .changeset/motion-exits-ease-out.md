---
"@howells/motion": major
---

Exits ease out. `presets.dialogClose`, `presets.fadeOut` and `presets.slideOut` used the ease-in `customIn` curve, which spends its first frames barely moving; they now use `customOut`.

- **Breaking:** removed `easings.customIn` and `easingsCSS.customIn`.
