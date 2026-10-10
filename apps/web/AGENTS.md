# patternmode

Documentation, specifications, decisions and outstanding work live in Linear (howells, PAT).

- [patternmode — project documentation](https://linear.app/howells/document/patternmode-project-documentation-decfff4bc8c9)

```sh
npm run dev
npm run typecheck
npm run lint
npm run build
```

Read the linked operating rules and domain definitions before editing. Keep one writer per checkout; preserve existing work. Put plans, handoffs and evidence on the owning Linear issue. Do not add local documentation or task reports. Instruments and Ground are the documentation exceptions.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
