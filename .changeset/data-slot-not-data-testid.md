---
"@patternmode/briolette": patch
"@patternmode/halo": patch
"@patternmode/scrollframe": patch
"@patternmode/status": patch
"@patternmode/tags": patch
---

`data-testid` no longer ships in the rendered DOM; `data-slot` is the hook.

Five packages emitted test hooks into every consumer's production markup. In halo, scrollframe and tags the attribute sat directly beside a `data-slot` carrying the same value, so it was pure duplication. In briolette and status there was no slot at all, so those elements now gain the `data-slot` they should always have had: `briolette-sphere`, `status-mark-fill`, `status-mark-border`, `status-mark-fill-sweep`, `status-mark-null`.

ScrollFrame's fade parts lose `data-testid="scrollframe-fade-<axis>-<edge>"`, which only ever restated the `data-axis` and `data-edge` attributes they already carry — query those instead.

**If you select any of these in your own tests, switch to `data-slot`.** It is the documented convention across this catalog and the one to rely on. `@patternmode/tags` is the single case with no direct replacement: the selected-tag scroll region passed its hook through to `ScrollFrame`, which sets its own `data-slot` after spreading consumer props, so the value never survived to the DOM. Target `.patternmode-tag-selector__scroll`, which is part of the published styling contract.
