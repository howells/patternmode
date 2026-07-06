---
"@patternmode/aperto": patch
---

Shared-element integrity: honour the declared aspect ratio, and make the flight seamless.

- The expanded media box no longer flex-shrinks inside a height-capped panel (which silently distorted the declared `width`/`height` ratio — a 1:1 item rendered visibly non-square). Its size budget now derives from the panel's own cap minus a caption allowance, on desktop and mobile, and the mobile branch uses the item's real ratio instead of a hardcoded 3:2. New tuning vars: `--aperto-panel-max-h`, `--aperto-caption-allowance`.
- The transition clone flies from/to the media inside the trigger (an explicit `[data-aperto-media-source]`, else the first `img`/`video`), not the whole thumbnail card — captions and badges inside `Aperto.Thumbnail` no longer distort the morph's shape.
- The clone renders `thumbnailSrc` with `variant: "thumbnail"`, so consumer `renderImage` implementations reproduce the exact cache-hot URL already on screen; the morph never pops to a blank frame while the full-size asset loads.
- Origin media now hides during flight at any nesting depth inside the trigger (descendant selectors, was direct-child only).
