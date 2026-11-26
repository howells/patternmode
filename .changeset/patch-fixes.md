---
"@patternmode/aperto": patch
"@patternmode/briolette": patch
"@patternmode/deck": patch
"@patternmode/halo": patch
"@patternmode/scrollframe": patch
"@patternmode/thumbnail": patch
---

Fixes from a codebase review.

- **aperto:** a fading backdrop no longer blocks clicks on the page behind it. The shared-element flight starts from the media inside the trigger and reuses the decoded thumbnail frame instead of mounting a second `<video>`. Ref and context identities are stable across renders.
- **briolette:** animation frames run only while something is moving, with none at all under reduced motion. A drag that ends on a facet no longer selects it.
- **deck:** a controlled deck that wraps or jumps its `index` gets correct card keys. Negative indices are clamped. An exiting card no longer clears the reference to the live one.
- **halo:** pointer positions account for a pad or ring that is scaled by CSS.
- **scrollframe:** horizontal position reads correctly in right-to-left layouts. The frame re-measures when its content resizes. Text selection keeps extending while you drag.
- **thumbnail:** `size` and `fit` are written inline only when passed, so a consumer's stylesheet can set them.
