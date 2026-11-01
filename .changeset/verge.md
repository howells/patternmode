---
"@patternmode/verge": patch
---

`slots` now reserves the gaps between controls as well as the controls themselves, so rows still line up when one slot is full, including on touch screens where the gap is wider. Before, a full three-control slot overflowed its reservation by 4px with a mouse and 16px on touch. If you set `--patternmode-verge-slot-size` one control plus a gap wider to work around this, set it back to one control's width.
