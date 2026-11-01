---
"@patternmode/tags": patch
---

Make the Tag Selector easier to find and use:

- Keyboard focus on the trigger is now a full-strength ring-coloured border with a soft halo. Before, it was a faint border shift that measured 2.3:1 against the resting border, and a halo of 1.2:1.
- The halo now follows the theme's `--ring` instead of a fixed pine.
- On touch screens the search field uses 16px text, so iOS no longer zooms the page when the selector opens.
- A `link` tag now shows its underline. The label clipped it before.
- Without a theme, the placeholder fallback colour is now the same readable grey the other muted text uses.
- The stylesheet declares the full cascade-layer order before opening `components`, so a host's base reset can't outrank it.
