---
"@patternmode/briolette": minor
"@patternmode/halo": minor
"@patternmode/scrollframe": minor
"@patternmode/status": minor
"@patternmode/swatch": minor
"@patternmode/tags": minor
---

Component CSS now reads the standard shadcn theme variable vocabulary instead of this project's earlier ad hoc token names. The previous hex defaults are preserved as fallback values on every `var(...)` reference, so nothing renders differently out of the box — only the custom property names that drive the look changed.

| Old name | New name |
| --- | --- |
| `--ink` | `--foreground` |
| `--muted` | `--muted-foreground` |
| `--accent` | `--ring` |
| `--accent-soft` | `--accent` |
| `--surface` | `--card` |
| `--surface-soft` | `--muted` |
| `--border-soft` | `--border-subtle` |
| `--quiet` | `--muted-foreground` |

Consumers who set any of the old custom properties (`--ink`, `--muted`, `--accent`, `--surface`, `--surface-soft`, `--border-soft`, `--quiet`) to theme these components must migrate to the new names above. Consumers already using shadcn's own theme variables (`--foreground`, `--muted-foreground`, `--ring`, `--accent`, `--card`, `--muted`, `--border-subtle`) will now pick these components up automatically with no changes required.
