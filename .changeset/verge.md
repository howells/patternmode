---
"@patternmode/verge": patch
---

`slots` now reserves the gaps between controls as well as the controls themselves, so rows still line up when one slot is full, including on touch screens where the gap is wider. Before, a full three-control slot overflowed its reservation by 4px with a mouse and 16px on touch. If you set `--patternmode-verge-slot-size` one control plus a gap wider to work around this, set it back to one control's width.

On touch screens each control now gets the 48px target the README asks for. The gap between controls widens so that one control and one gap make 48px (20px between 28px controls, and never less than 8px), and each direct child button, link or `role="button"` element gets a transparent 48px hit area centred on it. Controls keep their size and rows keep their height. Before, the README left this to every consumer, and 28px controls 8px apart could not be told apart by a thumb.
