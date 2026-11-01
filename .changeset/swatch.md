---
"@patternmode/swatch": patch
---

DistributionBar handles now behave like standard sliders and stay easy to see.

- Up and Down arrows step like Left and Right, Page Up and Page Down take ten steps, and Home and End move the boundary as far as `minValue` allows. Before, Home, End and the Page keys scrolled the page instead.
- The focus ring wraps the handle's pin between two light bands, so it shows on every segment colour. It used to be the same pine as the Evergreen segment, so on that side it disappeared.
- A handle now moves with its boundary when segment widths ease after a key press or a new `segments` value, instead of jumping ahead and leaving the edge to catch up. Dragging still tracks the pointer directly, and reduced motion turns the easing off.
