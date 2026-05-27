# Tag Selector architecture

Patternmode will treat **Tag Selector** as the canonical interaction pattern for selecting, creating, and removing identity-bearing **Tag Items**, not as a plain string-based input. The public API should use `TagSelector` with no `TagsInput` alias, model selected values and options as objects with stable string `id`s, keep the option catalog and item creation consumer-owned, and provide a Stacksheet-like split between a classic layout and composable `TagSelector.*` parts.

This deliberately trades the simplicity of string arrays for stable identity, custom representation, and a richer shadcn-compatible selector model. Classic `TagSelector` content should be Popover-backed, selected items should live in the Trigger, and the Trigger should use `@patternmode/scrollframe` for horizontal selected-tag scrolling rather than implementing separate overflow behavior.
