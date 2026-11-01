---
"@patternmode/halo": patch
---

Paint the hue arc with the hue it actually picks. On the default bottom arc, and on the left one, the gradient ran the opposite way to the handle, so the colour under the handle was not the colour chosen: hue 240 (blue) sat on amber. The arc now runs from its start to its end in every placement, with true HSL stops matching the pad. Clicking or dragging the pad or arc no longer draws a focus ring, which now shows only for keyboard focus, as it does for a native slider; the controls still take focus so arrow keys work after a click. The hue slider's keyboard focus ring is now drawn around the arc handle, instead of a box around the whole picker that did not show which control had focus. The stylesheet also declares the full cascade-layer order before opening `components`, so a host's base reset can't outrank it.
