# 0001. Tag Selector architecture

`TagSelector` is the canonical pattern for selecting, creating and removing identity-bearing Tag Items. It is not a string-based input, and there is no `TagsInput` alias. Selected values and options are objects with stable string `id`s, the option catalog and item creation are consumer-owned, and the API offers a classic layout plus composable `TagSelector.*` parts, as Stacksheet does.

This trades the simplicity of string arrays for stable identity, custom representation and a richer shadcn-compatible model. The classic layout's content is Popover-backed, selected items live in the Trigger, and the Trigger uses `@patternmode/scrollframe` for horizontal scrolling of selected tags instead of implementing its own overflow behaviour.
