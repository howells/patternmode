---
"@patternmode/briolette": patch
---

Stop ringing the whole sphere with a focus outline every time it is clicked or dragged. The stage still takes focus on pointerdown, so arrow keys keep working after a click, but the ring now shows only for keyboard focus, as it does for a native control. The stylesheet also declares the full cascade-layer order before opening `components`, so a host's base reset can't outrank it.
