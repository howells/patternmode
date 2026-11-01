---
"@patternmode/aperto": patch
---

Opening the lightbox now puts focus on the close button instead of "Previous media". Before, the first Enter after opening moved to another image. Close is the one control every lightbox has, and the arrow keys still change images from there. Focus stays trapped inside the lightbox and returns to the thumbnail that opened it. Custom compositions get the same behaviour from `Aperto.Close`, and `initialFocus` on the content still overrides it.
