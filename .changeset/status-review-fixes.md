---
"@patternmode/status": patch
---

Treat `NaN` `value` input as unknown progress (`status="null"`) instead of
snapping it to the known-zero Empty step.
