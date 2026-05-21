# Tarball Consumer Smoke Test

Run `pnpm smoke:tarballs` from the repository root after package builds. The
script packs `@howells/stacksheet` and `@howells/aperto`, installs both tarballs
into a temporary Next App Router app, imports both `styles.css` subpaths, and
builds the fixture outside the workspace graph.
