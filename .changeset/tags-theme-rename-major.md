---
"@patternmode/tags": major
---

Re-release the theme variable rename as a major.

The move to shadcn's theme variable vocabulary was previously staged as a minor. It is a breaking change: its own notes tell consumers who set the old custom properties that they must migrate, and a consumer who themed Tags through the old names gets the package's built-in fallbacks instead once it lands.

Shipping that on a minor meant any consumer on a `^1.0.0` caret absorbed it silently on their next install, for reasons unrelated to this package. That is the failure it is most important to avoid, so it ships as a major and consumers upgrade deliberately.

Two of the renames are worth reading carefully, because the old name survives with a different meaning rather than failing loudly:

- **`--muted`** previously meant muted *foreground* (text). It now means a muted *surface*.
- **`--accent`** previously meant the accent colour. Tags no longer reads it at all — set `--ring` instead.

Old values are preserved as `var()` fallbacks, so nothing renders differently out of the box. Consumers already using shadcn's variables pick Tags up with no configuration.
