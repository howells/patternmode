---
"@patternmode/parquet": minor
---

- **Breaking:** removed `ParquetTile.id`. Tiles are keyed by position.
- **Breaking:** an `aspectRatio` that is not a finite number above 0 now throws a `RangeError` instead of producing an empty or broken mosaic.
- A strip that collapses through floating-point drift still produces a rect for every tile.
