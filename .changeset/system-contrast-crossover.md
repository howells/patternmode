---
"@patternmode/system": patch
---

`isLightColor` now flips at the point where black and white text have equal contrast, OKLCH lightness 0.564, instead of 0.62. Mid tones between the two, such as `#808080`, used to be called dark, so they got white text at lower contrast than black would have had: 3.9:1 instead of 5.3:1. Every colour now gets whichever text colour actually reads better, and that choice never drops below 4.58:1. A unit test pins the boundary at `#757575` and `#767676` and checks every sRGB grey.
