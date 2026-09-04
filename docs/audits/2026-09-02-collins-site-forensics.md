# COLLINS site forensics — 2026-09-02

Mechanism-level research into the public COLLINS website, with Patternmode reuse decisions.
This is an observation of one deployed build, not a source-code licence or an attempt to reproduce
COLLINS' implementation. No proprietary source is copied here.

## Conclusion

The site is compelling because a small number of coherent behaviors recur everywhere: content arrives
as physical surfaces, scrolling has useful output beyond displacement, media is staged rather than
dumped into the page, and navigation has continuity. The most valuable reusable work is therefore not
the site's visual styling. It is four behavioral seams:

1. a reduced-motion-aware native View Transition wrapper with a page-fold preset;
2. scroll-progress-driven text paint;
3. a kinetic horizontal controller that exposes progress, snap intent, and resisted overscroll;
4. a scroll-controlled stacked-card/flipbook presentation.

The modal sheet, carousel, and expanded gallery are useful precedents but should inform existing
Patternmode packages instead of becoming new packages. `Stacksheet`, `ScrollFrame`, `Deck`, Aperto,
and `@howells/motion` already own most of those concepts.

## Scope and evidence

- Inspected the rendered homepage, menu, case-study Shelf/Spines switch, and representative listing,
  program, case-study, story, arts/culture, and team routes in Chromium.
- Downloaded the server-rendered HTML, Nuxt build metadata, route payloads, CSS, entry bundle, every JS
  chunk named in its Vite dependency map, and route-specific lazy chunks for build
  `02ee2afb-22ec-40da-a8cf-756916e06c2e`.
- Enumerated the public sitemap: 125 first-party URLs — 54 case-study routes, 12 program routes, 56
  story routes, plus home, team, and arts/culture. See the [first-party sitemap](https://wearecollins.com/sitemap.xml).
- Exercised behavior against the [homepage](https://wearecollins.com/),
  [case-studies index](https://wearecollins.com/case-studies/),
  [programs index](https://wearecollins.com/programs/),
  [Brand Refresh](https://wearecollins.com/programs/brand-refresh/),
  [Bose case study](https://wearecollins.com/case-studies/bose/),
  [Red Hot story](https://wearecollins.com/story/red-hot-x-collins/),
  [arts and culture](https://wearecollins.com/arts-culture/), and
  [team](https://wearecollins.com/team/).

The hash-named asset URLs below are primary evidence for this snapshot and will naturally change on a
later deployment.

## Runtime and asset architecture

| Layer             | Evidence                                                                                                                                                            | What shipped                                                                                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hosting/rendering | Response headers and rendered HTML                                                                                                                                  | Netlify edge delivery; fully server-rendered pages with hydration and prerendered route payloads. Security headers include CSP, HSTS, `nosniff`, and a restrictive Permissions Policy.                                                                                                                |
| Application       | [`BTOw2jBW.js`](https://wearecollins.com/_nuxt/BTOw2jBW.js), [build metadata](https://wearecollins.com/_nuxt/builds/meta/02ee2afb-22ec-40da-a8cf-756916e06c2e.json) | Nuxt/Vue 3, Vue Router, Vite chunks, route-level code splitting, Nuxt payload extraction, and selective lazy hydration. The metadata marks fixed and wildcard route families as prerendered.                                                                                                          |
| Content           | HTML payloads and [`NIYitLQv.js`](https://wearecollins.com/_nuxt/NIYitLQv.js)                                                                                       | Sanity-backed structured content and image assets. Images are requested with explicit width/height, crop/hotspot, and responsive sizing. Inline CMS SVG marks are sanitized before rendering.                                                                                                         |
| Video             | [`B1IhpR_H.js`](https://wearecollins.com/_nuxt/B1IhpR_H.js), [`B5XVSSfK.js`](https://wearecollins.com/_nuxt/B5XVSSfK.js)                                            | A small app wrapper lazy-loads the much larger Mux Player/media-chrome/HLS runtime. Posters come from `image.mux.com`; HLS, storyboard, and telemetry requests begin only after the player is readied.                                                                                                |
| Motion            | [`entry.CYVW1Mis.css`](https://wearecollins.com/_nuxt/entry.CYVW1Mis.css), entry JS                                                                                 | Motion's DOM animation/scroll utilities, native View Transitions, CSS transitions, `@starting-style`, `linear()` spring curves, IntersectionObserver, ResizeObserver, and requestAnimationFrame. No GSAP, Lenis, Locomotive Scroll, Three.js, or WebGL/canvas scene was found in the inspected build. |
| Rich animation    | [`CGLcCx4r.js`](https://wearecollins.com/_nuxt/CGLcCx4r.js)                                                                                                         | Lottie is isolated to the case-studies index chunk rather than imposed on every route.                                                                                                                                                                                                                |
| Analytics         | CSP and observed requests                                                                                                                                           | Microsoft Clarity, OpenPanel, and Mux/Litix video telemetry.                                                                                                                                                                                                                                          |
| Type/media        | [homepage HTML](https://wearecollins.com/)                                                                                                                          | Two self-hosted WOFF2 faces — Graphik 400 and Portrait Text 400 — plus Sanity responsive raster images and Mux video/poster media.                                                                                                                                                                    |

### Bundle shape

The homepage HTML referenced one executable entry module, 13 module preloads, and eight distinct CSS
files. Its Vite dependency map named 51 JavaScript and 19 CSS chunks across all route families. On the
observed cold homepage load, the main JS transferred about 144 KB and the lazily loaded Mux player
runtime about 267 KB (browser `transferSize`; compression and cache state matter). The corresponding
minified files were about 419 KB and 1.01 MB uncompressed. This is not a tiny site, but the expensive
media runtime is kept behind a wrapper and route chunks are narrow.

Do not turn those counts into a permanent budget: hash, compression, media, and preload policy are all
deployment-specific. The durable lesson is the split boundary.

## Distinctive mechanisms

### 1. Native page-fold route transition

The application enables Nuxt View Transitions when supported, disables them for Safari and story
routes, and skips them when `prefers-reduced-motion: reduce` is active. The CSS animates the old root
into a slightly scaled, clipped surface while the new root rises from the lower half of the viewport
with rounded corners, then resolves to a normal page. See the router policy in
[`BTOw2jBW.js`](https://wearecollins.com/_nuxt/BTOw2jBW.js) and root transition keyframes in
[`entry.CYVW1Mis.css`](https://wearecollins.com/_nuxt/entry.CYVW1Mis.css).

**Why it works:** it gives ordinary route navigation the same physical grammar as the site's sheets,
without maintaining a parallel client-side scene graph.

**Patternmode decision:** prototype this in `@howells/motion`, not as a visual component. The reusable
contract is a navigation behavior: support detection, reduced-motion policy, an exclusion predicate,
duration/easing variables, and named presets. The COLLINS page-fold is one preset, not the API.

### 2. Scroll Fill text

The story treatment paints a long editorial excerpt from muted to foreground as it crosses the
viewport. It does not split every character. One span uses a text-clipped gradient whose
`background-size` is scrubbed from zero to `200% 100%`; an optional drop cap gets its own very short
scroll interval. The component can turn the behavior off under its responsive predicate. See
[`CG01ZT3e.js`](https://wearecollins.com/_nuxt/CG01ZT3e.js) and
[`TextScrollFill.DrU2TZlb.css`](https://wearecollins.com/_nuxt/TextScrollFill.DrU2TZlb.css).

**Why it works:** it is typographically calm, cheap to render, and degrades to readable normal text.

**Patternmode decision:** a strong prototype candidate, but not yet a package. First search fleet apps
for duplicated text-paint or reading-progress treatments and record why those implementations rejected
plain opacity/reveal. A prospective API should accept progress behavior and render composition; it
must not bake in Portrait Text, grey values, a drop-cap opinion, or COLLINS' offsets.

### 3. Kinetic overflow rail with resisted overscroll

The site's carousel controller detects actual axis overflow, installs drag/wheel behavior only when
needed, maps wheel input to the owning axis, integrates velocity in requestAnimationFrame, predicts the
release destination, and resolves it to explicit snap points. At either edge it applies a resisted
translation and emits a bubbling `overscroll` event containing the left-edge displacement. Once a drag
has genuinely happened it suppresses the following click; it does not use speculative pointer capture.
See [`BznkS_IM.js`](https://wearecollins.com/_nuxt/BznkS_IM.js) and the snap layer in
[`AppCarousel.BTtQUsJd.css`](https://wearecollins.com/_nuxt/AppCarousel.BTtQUsJd.css).

**Why it works:** overscroll becomes composable output. The surrounding FlipBook uses that output to
move the card stack, instead of the controller knowing what a card should look like.

**Patternmode decision:** compare this contract directly with `ScrollFrame` before adding any public
surface. `ScrollFrame` already owns drag-scroll activation, axis state, edge state, controls, fades,
and the descendant-click safety that this mechanism also needs. The genuinely new seam is continuous
progress/snap/overscroll output. If consumers can build the effect from a hook without changing
ScrollFrame's core, prefer that; any new public API requires a release and changeset.

### 4. Scroll-controlled 3D FlipBook

Related case studies use a transparent scroll-snap rail as the interaction plane and render a separate,
non-interactive card stack in the same grid area. Scroll position drives each card's visibility,
rotation, translation, scale, z-order, and opacity; resisted edge overscroll bends the whole stack.
Hover/focus is mapped back to the visible card with relational `:has()` selectors. The case-study route
implementation is in [`DOPLJMcm.js`](https://wearecollins.com/_nuxt/DOPLJMcm.js); its styles are in
[`_slug_.D3ZX3C3o.css`](https://wearecollins.com/_nuxt/_slug_.D3ZX3C3o.css).

**Why it works:** the semantic links and browser scrolling remain ordinary while the visual projection
can be theatrical.

**Patternmode decision:** prototype as a `Deck` presentation experiment, not as `FlipBook` package yet.
`Deck` owns ordered cards and visual stack state, but today advances discretely by gesture/keyboard or
controlled state. A continuous externally controlled progress seam could support this without importing
the site's book-cover opinion. Do not change Deck's public API until a second consumer proves the seam.

### 5. Shelf/Spines catalogue view

The case-study index offers two real radios, Shelf and Spines. The selected view persists in
`?view=spines`, so it survives refresh/linking. Spines are generated from content-driven width, height,
color, contrast, and sanitized client marks; switching uses a contained view transition. The live page
exposed 54 project links in either representation. See the
[`case-studies` route](https://wearecollins.com/case-studies/) and
[`CGLcCx4r.js`](https://wearecollins.com/_nuxt/CGLcCx4r.js).

**Patternmode decision:** no generic package. The reusable lesson is to separate a query-persisted view
choice from projections of the same collection. Commodity segmented controls and list/grid primitives
already serve the mechanism; the shelf art direction is application opinion.

### 6. Modal sheet and gallery staging

Story and case-study expansions use a native dialog-like full-height sheet with top safe-area inset,
resisted drag dismissal, a touch handle that becomes grounded after content scrolls, scroll locking,
and scaling/rounding of the app behind it. Desktop gets an explicit close button; coarse pointers get
the handle. Gallery media is only readied after open and players are paused on close. See
[`B7g3G0PL.js`](https://wearecollins.com/_nuxt/B7g3G0PL.js) and
[`ModalSheet.BmTbMhBx.css`](https://wearecollins.com/_nuxt/ModalSheet.BmTbMhBx.css).

**Patternmode decision:** this is Stacksheet and Aperto territory, not a new component. Candidate harvests
are the scrolled-handle grounding state, safe-area top gap, coarse-pointer presentation, and media
open/close lifecycle. Validate each against current Stacksheet/Aperto behavior and browser tests before
adopting it.

### 7. Progressive Mux player

The server-rendered page begins with a correctly sized poster. The small wrapper observes visibility,
delays readiness when configured, lazy-imports Mux Player, and can start/pause playback on intersection.
The loaded custom element supplies the substantial playback, controls, cast, HLS, accessibility, and
telemetry machinery. See [`B1IhpR_H.js`](https://wearecollins.com/_nuxt/B1IhpR_H.js) and
[`B5XVSSfK.js`](https://wearecollins.com/_nuxt/B5XVSSfK.js).

**Patternmode decision:** keep provider integration outside core visual packages. Aperto's `renderVideo`
seam is the correct ownership boundary. A Mux adapter/demo may be useful, but a Mux dependency should
not enter Aperto or Thumbnail.

## Smaller ideas worth retaining

- **CSS `@starting-style` for first paint:** headings, laurels, reels, and native dialogs animate in
  without JavaScript's usual “mounted” class. Good progressive enhancement, but audit SSR and Safari
  behavior before standardizing.
- **CSS `linear()` spring tokens:** the entry stylesheet holds reusable generated spring curves as
  variables. Compare with `@howells/motion`'s existing presets; consolidate rather than add a second
  vocabulary.
- **Image pile as affordance:** stacked preview images fan outward on hover/focus to communicate
  “there is a gallery here.” This is a good Thumbnail composition example, not a primitive.
- **Section theme sentinels:** intersection callbacks update a shared light/alt/dark theme so fixed
  chrome remains legible over changing content. Useful app infrastructure; risky as a generic component
  unless ownership and nested-boundary priority are explicit.
- **Stories carousel:** active image, title, and progress are one state; progress is exposed as a CSS
  variable and images crossfade/scale. Effective, but common enough that it fails Patternmode's current
  promotion test without fleet divergence evidence.

## Suggested prototype order

1. Build one page-fold preset in the Patternmode demo using native View Transitions and verify forward,
   back, unsupported-browser, interrupted-navigation, and reduced-motion outcomes.
2. Build Scroll Fill as an app-local composition with normal selectable text and no per-character DOM.
3. Use existing `ScrollFrame` to recreate the FlipBook. Record the exact missing state; only then decide
   whether progress/overscroll belongs in ScrollFrame or an external controller hook.
4. Compare current Stacksheet/Aperto behavior with the sheet/media lifecycle above. Harvest only gaps;
   do not build a second sheet.

This order keeps the first visible effects cheap, isolates public-API risk, and turns the COLLINS site
into evidence for Patternmode's mechanisms rather than a visual template.
