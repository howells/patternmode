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
- Each selected tag in the trigger now has a remove mark. A click or tap removes that tag without opening the menu. Because the trigger is itself a button, the mark is not a second button: keyboard and screen reader users remove tags by toggling the option in the list, or with Backspace in an empty search, as before. On touch screens the mark is the full height of the tag.
- The trigger now shows a dropdown arrow, which turns over while the menu is open.
- A `selected` tag now shows the ring colour on its own 1px border. Before, a second, near-black ring was drawn inside the border, so a selected tag looked heavier than every other tag. Filled tags (`default`, `destructive`) show an outer ring instead, separated by a gap.
