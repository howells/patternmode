# Patternmode

A catalogue of focused React interface components, each named for the interaction pattern
it implements rather than for its implementation. Every package in `packages/` is published
and versioned independently: `aperto`, `briolette`, `deck`, `halo`, `parquet`,
`scrollframe`, `stacksheet`, `status`, `swatch`, `system`, `tags`, `theme`, `thumbnail`,
`verge`, plus `@howells/motion` and `@howells/site-ui`.

This is a shared library, so a breaking change here lands in someone else's app.
`@patternmode/swatch` and `@patternmode/scrollframe` alone are consumed by routerbase,
materialgraph, materia, colorscope, litmus, candor, architizer, rulework, materialsinuse,
fieldportrait, foolscap, motif and colophon. Treat a public API change as a release
decision: explain it and its migration impact first, then add a changeset.

## Language

Use the product terms in `CONTEXT.md` - Aperto, Deck, Stacksheet, Media Transition, Sheet
Stack - and search it before renaming anything. Aperto isn't just a lightbox, Deck is
canonical over CardStack, Stacksheet owns the sheet-navigation vocabulary. App and demo
code lives in `apps/web` and `apps/preview`; packages own their public APIs and tests.

## Commands

- `pnpm dev` - web demo. `pnpm check` - typecheck, lint, test, build, boundaries, layers,
  tokens.
- `pnpm test:browser` - a separate gate, needs a Chromium binary.
- Deploy the site from the root:
  `vercel pull --yes --environment=production && vercel build --prod && vercel deploy --prebuilt --prod`.

## More

- [docs/style.md](docs/style.md) - canonical composition guide;
  `packages/theme/registry` owns the portable tokens and body base. Apply typography
  recipes in app code, not shared component internals.
- [docs/library-contract.md](docs/library-contract.md) - registry and token rules,
  dependency conventions, and the test for what belongs here.
- [docs/cascade-layers.md](docs/cascade-layers.md) - the layer rules every CSS package
  must follow.
- [docs/pointer-interaction.md](docs/pointer-interaction.md) - pointer capture, focus, and
  the browser test gate.
- [docs/releasing.md](docs/releasing.md) - release sequence, trusted publishers, build
  ordering, verification.
- Linear: team PAT (howells).
