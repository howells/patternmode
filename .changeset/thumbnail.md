---
"@patternmode/thumbnail": patch
---

A `<picture>` passed as the child now fills the frame. Before, its `<img>` drew at full size and the frame showed one corner of the photo.

`raised` now shows. The lift was a single `0 1px 2px -1px` shadow that spread inwards as far as it blurred, so it darkened the edge below the picture by about 1% and looked the same as no lift at all. It is now a contact shadow plus a short, soft drop in a warm ink, which darkens the edge by about 9% and fades out within 8px. It is still not a card shadow. The new default for `--patternmode-thumbnail-lift` is `0 1px 2px rgb(29 27 22 / 0.1), 0 4px 10px -3px rgb(29 27 22 / 0.16)`, and the README no longer calls the lift a "whisper".
