# Aperto and Stacksheet Architecture Refactor Implementation

## Scope

Behavior-preserving architecture cleanup for the god-file findings from the Heathen audit. No visual appearance changes are intended.

## Stack

- Package manager: pnpm
- Frameworks: React, Next.js
- Tests: Vitest
- Build: Turbo plus package-level build/typecheck/lint scripts

## File Structure

| File | Action | Responsibility |
| --- | --- | --- |
| `packages/stacksheet/src/renderer-helpers.ts` | Create | Pure renderer style, transition, snap, ARIA, class name, and shadow helpers |
| `packages/stacksheet/src/renderer-helpers.test.ts` | Create | Characterization tests for extracted pure helpers |
| `packages/stacksheet/src/renderer-effects.ts` | Create | Renderer browser effects and viewport measurement hooks |
| `packages/stacksheet/src/sheet-panel.tsx` | Create | Internal per-panel rendering, panel context, handles, and focus trap wiring |
| `packages/stacksheet/src/renderer.tsx` | Modify | Keep only root sheet orchestration, backdrop, scroll lock, snap state, and close routing |
| `packages/aperto/src/media-rendering.tsx` | Create | Media labels, media keys, description props, and media renderer helpers |
| `packages/aperto/src/media-transition.tsx` | Create | Rect measurement, transition clone, and timing helpers |
| `packages/aperto/src/expanded-media-stage.tsx` | Create | Expanded media navigation animation stage |
| `packages/aperto/src/aperto-group-context.ts` | Create | Aperto group context and hook |
| `packages/aperto/src/aperto.tsx` | Modify | Keep public single/group/thumbnail orchestration only |
| `apps/web/components/option-bar.tsx` | Create | Shared catalog option control |
| `apps/web/components/aperto-demo.tsx` | Modify | Use shared option control |
| `apps/web/components/deck-demo.tsx` | Modify | Use shared option control |

## Tasks

<task id="1" depends="" type="auto">
  <name>Extract Stacksheet renderer pure helpers</name>
  <files>
    <create>packages/stacksheet/src/renderer-helpers.ts</create>
    <create>packages/stacksheet/src/renderer-helpers.test.ts</create>
    <modify>packages/stacksheet/src/renderer.tsx</modify>
  </files>
  <read_first>
    packages/stacksheet/src/renderer.tsx
    packages/stacksheet/src/stacking.ts
    packages/stacksheet/src/types.ts
  </read_first>
  <action>
    Move pure helper logic out of renderer.tsx without changing generated values:
    resolveClassNames, buildAriaProps, getDragTransform, VISUAL_TWEEN, buildPanelStyle,
    buildPanelTransition, computeSnapYOffset, getBottomSlideDistance, resolveSlideFrom,
    buildAnimateTarget, getInitialRadius, and getShadow.

    Export the helper types needed by renderer and sheet-panel. Add focused tests for class name fallback,
    ARIA prop selection, drag transform direction, panel style fallback, snap offset behavior,
    bottom slide fallback, initial radius, shadow selection, and animate target snap merging.
  </action>
  <test_code>
    Create characterization tests in packages/stacksheet/src/renderer-helpers.test.ts for exported pure helpers.
    The test should fail before implementation because renderer-helpers.ts does not exist.
  </test_code>
  <verify>
    pnpm --filter @howells/stacksheet test -- renderer-helpers.test.ts — all pass
    pnpm --filter @howells/stacksheet typecheck — no type errors
    pnpm --filter @howells/stacksheet lint:check — no lint errors
  </verify>
  <done>renderer.tsx imports pure helpers from renderer-helpers.ts and helper tests pass</done>
  <commit>refactor(stacksheet): extract renderer helpers</commit>
</task>

<task id="2" depends="1" type="auto">
  <name>Split Stacksheet panel and browser effects from renderer</name>
  <files>
    <create>packages/stacksheet/src/renderer-effects.ts</create>
    <create>packages/stacksheet/src/sheet-panel.tsx</create>
    <modify>packages/stacksheet/src/renderer.tsx</modify>
  </files>
  <read_first>
    packages/stacksheet/src/renderer.tsx
    packages/stacksheet/src/renderer-helpers.ts
    packages/stacksheet/src/panel-context.tsx
    packages/stacksheet/src/use-drag.ts
  </read_first>
  <action>
    Move usePanelHeight, useViewportHeight, and useBodyScale into renderer-effects.ts.
    Move DefaultHeader, ModalFocusTrap, PanelInnerContent, BottomHandle, SideHandle,
    resolvePanelLayout, SheetPanelProps, and SheetPanel into sheet-panel.tsx.

    Preserve all class names, data attributes, inline styles, Motion props, ARIA behavior,
    focus trap options, drag behavior, and open/close callback behavior exactly.
  </action>
  <test_code>
    Existing Stacksheet tests are the characterization suite for this extraction. Do not add visual changes.
  </test_code>
  <verify>
    pnpm --filter @howells/stacksheet test — all pass
    pnpm --filter @howells/stacksheet typecheck — no type errors
    pnpm --filter @howells/stacksheet lint:check — no lint errors
  </verify>
  <done>renderer.tsx delegates panel rendering and browser effects to internal modules</done>
  <commit>refactor(stacksheet): split panel renderer internals</commit>
</task>

<task id="3" depends="" type="auto">
  <name>Split Aperto media and group internals</name>
  <files>
    <create>packages/aperto/src/media-rendering.tsx</create>
    <create>packages/aperto/src/media-transition.tsx</create>
    <create>packages/aperto/src/expanded-media-stage.tsx</create>
    <create>packages/aperto/src/aperto-group-context.ts</create>
    <modify>packages/aperto/src/aperto.tsx</modify>
  </files>
  <read_first>
    packages/aperto/src/aperto.tsx
    packages/aperto/src/context.ts
    packages/aperto/src/types.ts
    packages/aperto/src/aperto.test.tsx
    packages/aperto/src/aperto-layout.test.tsx
  </read_first>
  <action>
    Move media render helpers, transition clone/rect helpers, expanded navigation stage,
    and group context into internal modules. Keep ApertoSingle, ApertoGroup, and ApertoThumbnail
    as the public orchestration components in aperto.tsx.

    Preserve exported public API, class names, data slots, transition presets, keyboard navigation,
    close behavior, and rendering output.
  </action>
  <test_code>
    Existing Aperto tests are the characterization suite. Add helper tests only if a pure helper boundary becomes ambiguous.
  </test_code>
  <verify>
    pnpm --filter @howells/aperto test — all pass
    pnpm --filter @howells/aperto typecheck — no type errors
    pnpm --filter @howells/aperto lint:check — no lint errors
  </verify>
  <done>aperto.tsx imports media, transition, stage, and context internals from focused modules</done>
  <commit>refactor(aperto): split media viewer internals</commit>
</task>

<task id="4" depends="3" type="auto">
  <name>Extract shared web demo option bar</name>
  <files>
    <create>apps/web/components/option-bar.tsx</create>
    <modify>apps/web/components/aperto-demo.tsx</modify>
    <modify>apps/web/components/deck-demo.tsx</modify>
  </files>
  <read_first>
    apps/web/components/aperto-demo.tsx
    apps/web/components/deck-demo.tsx
  </read_first>
  <action>
    Move the duplicated generic OptionBar component into apps/web/components/option-bar.tsx.
    Preserve rendered markup, CSS class names, button behavior, generic string/number value support,
    and import it in both demos.
  </action>
  <test_code>
    Existing web lint/build checks are the characterization suite for this markup-preserving extraction.
  </test_code>
  <verify>
    pnpm --filter @howells/patternmode-web lint:check — no lint errors
    pnpm --filter @howells/patternmode-web build — succeeds
  </verify>
  <done>Aperto and Deck demos import the same OptionBar component</done>
  <commit>refactor(web): share demo option bar</commit>
</task>

## Whole-Plan Verification

After all tasks:

- `pnpm --filter @howells/stacksheet test`
- `pnpm --filter @howells/stacksheet typecheck`
- `pnpm --filter @howells/stacksheet lint:check`
- `pnpm --filter @howells/aperto test`
- `pnpm --filter @howells/aperto typecheck`
- `pnpm --filter @howells/aperto lint:check`
- `pnpm --filter @howells/deck test`
- `pnpm --filter @howells/deck typecheck`
- `pnpm --filter @howells/patternmode-web lint:check`
- `pnpm --filter @howells/patternmode-web build`

