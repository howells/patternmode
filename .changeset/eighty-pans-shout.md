---
"@patternmode/scrollframe": patch
---

Stop drag-scroll from killing clicks inside the frame.

`ScrollFrame` took pointer capture on every `pointerdown` where a drag was
possible — before knowing whether the user would drag at all. Capture retargets
the whole gesture at the capturing element, including the compatibility
`mouseup` and `click`. A click delivered to the scroll container never
activates the element under the cursor, so **every link and button inside a
drag-scrollable frame silently stopped working**: press, release, nothing
happens, with nothing thrown and nothing prevented.

Capture existed to keep a drag alive when the cursor leaves the frame. That is
now done with window-level `pointermove`/`pointerup` listeners, which preserve
event targeting and additionally fix a case capture never handled: a drag begun
within the activation distance of an edge and pulled straight out, where the
deciding move lands outside the element and the drag never starts.

Also fixes a stale suppression flag. `suppressClick` was cleared only by a click
arriving, so a drag that ended without producing one left it set and swallowed
the next unrelated click in the frame. It now clears on a macrotask after the
gesture ends — late enough for the trailing click, early enough that nothing
else is affected.

The existing tests missed all of this because they dispatch `click` directly at
the target, which is precisely what a browser stops doing under capture. The new
tests assert the contract instead: capture is never taken, a drag commits from
moves that land outside the frame, and suppression does not outlive its gesture.
