# Stacksheet

Typed, animated sheet stacking for React.

Stacksheet gives you a provider and a hook for opening, pushing, replacing, and navigating Sheets from anywhere in your app. It handles the motion, layering, focus management, scroll locking, and mobile/desktop presentation details for you.

```bash
npm install @patternmode/stacksheet
```

Peer dependencies: `react >= 18`, `react-dom >= 18`.

## What it includes

- Direct-component API: `open(Component, props)`
- Optional type registry for large apps: `open("user-profile", "u1", data)`
- Stacked navigation: `open`, `push`, `replace`, `swap`, `navigate`, `pop`, `close`
- Desktop side Sheets and mobile bottom Sheets from one API
- Built-in focus trapping, Escape handling, scroll lock, and Android back gesture support
- Drag, Swipe, and Snap Point behavior for bottom Sheets
- Classic Layout with auto header, or Composable Layout with `Sheet.*` Sheet Parts

## Quick start

Create a sheet instance once and use it across your app:

```tsx
import { createStacksheet } from "@patternmode/stacksheet";
import "@patternmode/stacksheet/styles.css";

export const { StacksheetProvider, useSheet } = createStacksheet();
```

Wrap your app:

```tsx
import { StacksheetProvider } from "./sheets";

export function App() {
  return (
    <StacksheetProvider>
      <YourRoutes />
    </StacksheetProvider>
  );
}
```

Open a sheet from any component:

```tsx
import { useSheet } from "./sheets";

function UserProfile({ userId }: { userId: string }) {
  const { close } = useSheet();

  return (
    <div>
      <h2>User {userId}</h2>
      <button onClick={close}>Done</button>
    </div>
  );
}

function ViewProfileButton() {
  const { open } = useSheet();

  return <button onClick={() => open(UserProfile, { userId: "u_abc" })}>View profile</button>;
}
```

## Typed registry mode

If your app has a fixed set of known sheet types, you can pre-register them for string-keyed, compile-time checked actions:

```tsx
import { createStacksheet } from "@patternmode/stacksheet";

const { StacksheetProvider, useSheet } = createStacksheet<{
  "user-profile": { userId: string };
  settings: { tab?: string };
}>();

function UserProfile({ userId }: { userId: string }) {
  return <div>User {userId}</div>;
}

function Settings({ tab }: { tab?: string }) {
  return <div>Settings: {tab}</div>;
}

function App() {
  return (
    <StacksheetProvider
      sheets={{
        "user-profile": UserProfile,
        settings: Settings,
      }}
    >
      <YourRoutes />
    </StacksheetProvider>
  );
}

function OpenSettingsButton() {
  const { open } = useSheet();
  return (
    <button onClick={() => open("settings", "settings-root", { tab: "billing" })}>
      Open settings
    </button>
  );
}
```

## Composable layout

Classic mode is the default: Stacksheet owns the standard Panel chrome and header around your Sheet content.

If you want full control over Sheet structure, use `layout="composable"` and build the Sheet with exported Sheet Parts:

```tsx
import { Sheet } from "@patternmode/stacksheet";

function App() {
  return (
    <StacksheetProvider layout="composable">
      <YourRoutes />
    </StacksheetProvider>
  );
}

function SettingsSheet() {
  return (
    <>
      <Sheet.Handle />
      <Sheet.Header>
        <Sheet.Back />
        <Sheet.Title>Settings</Sheet.Title>
        <Sheet.Close />
      </Sheet.Header>
      <Sheet.Body>
        <div className="p-4">Sheet content</div>
      </Sheet.Body>
    </>
  );
}
```

`Sheet.Header` is a navigation bar, as an iOS sheet has: one row with `Sheet.Back` at the leading edge, `Sheet.Title` centred and cut to one line, and `Sheet.Close` at the trailing edge. The edge columns are equal, so the title stays centred whether or not Back shows. Each part is placed by its data attribute, so their order in the markup doesn't matter. Keep the header to these three. Put a `Sheet.Description` at the top of `Sheet.Body`; if one is put in the header, it gets its own centred row under the bar rather than squeezing beside the buttons.

For custom controls and Sheet metadata inside a Sheet, use `useSheetPanel()`.

## Fitted height

Bottom Sheets are 85dvh tall by default. A Sheet with little in it, such as a set of filters, can size to its content instead, still capped at 85dvh:

```tsx
open(Filters, {}, { height: "fit" });
```

Set a default for every Sheet with `createStacksheet({ height: "fit" })` and override it per Sheet with `{ height: "full" }`. The type is `SheetHeight` (`"full" | "fit"`). A fitted Sheet drags, stacks and animates like any other, and when its content grows or shrinks while it is open, the change in height animates. `height` applies to bottom Sheets without Snap Points; side Panels and snapping Sheets ignore it.

## Drag and motion

Bottom Sheets are dragged down to dismiss and side Panels outward. Motion runs on Motion values, so a drag never re-renders React.

- **Where a drag starts.** Anywhere on the Panel, including links and buttons. A press that moves less than 10px is still a tap; once a press becomes a drag, the click that would follow it is swallowed. Text fields, selects, textareas, editable content and `draggable="true"` elements never start a drag. Mark anything else that needs its own gestures (a slider, a map, a canvas) with `data-stacksheet-no-drag`.
- **Scrolling content.** Pulling down on scrolled content scrolls it. Once it is at the top, the pull moves the Sheet. Pulling up scrolls the content, unless the Sheet rests at a lower Snap Point, in which case it expands first.
- **Release.** The release velocity carries into the spring, whether the Sheet dismisses, snaps or returns. A drag past the most open position stretches with a short rubber band.
- **Closing from code.** `close()` and `pop()` send a Sheet out the way it came in, and interrupting one (pushing during a close, closing during an entrance) carries on from where the Sheet is.
- **The stack.** Sheets beneath the top one recede and come forward continuously as it enters, is dragged and leaves. The backdrop follows the same progress.
- **Reduced motion.** With `prefers-reduced-motion: reduce`, Sheets crossfade in place (200ms in, 150ms out) instead of sliding, and the Sheets beneath change position without travelling. Dragging still works.

Panels pad their edges with `env(safe-area-inset-*)`, so add `viewport-fit=cover` to your viewport meta tag for content to clear the home indicator and notch. A bottom Sheet runs to the screen edge and leaves the home indicator to its scrolling content, which passes under it and ends clear of it. `Sheet.Body` does this for you; if you bring your own scroller, pad its content with `var(--stacksheet-safe-bottom)`.

## Styling and Tailwind

Import `styles.css` once. Each styled element carries one class, named after its part (`.patternmode-stacksheet__back`, `.patternmode-stacksheet__header`, `.patternmode-stacksheet__footer`, …), alongside the `data-stacksheet-*` attributes; those classes and attributes are the styling contract. The rules ship inside `@layer components`, so in a Tailwind v4 app your own utilities, including anything you pass as `className` or `classNames`, always win over the package's. Values read your theme's variables (`--spacing`, `--radius-md`, `--text-sm`) and fall back to Tailwind's defaults, so the sheet works whether or not your app uses Tailwind.

A part rendered through `render` drops its default class; Sheet.Header, Sheet.Body and Sheet.Footer keep a minimal structural class (`.patternmode-stacksheet__custom-header`, `__custom-body`, `__custom-footer`) so they still sit in the panel's flex column.

## Accessibility

The default Panel is rendered as a dialog with focus management, keyboard navigation, and focus restoration built in.

You can set a global label:

```tsx
createStacksheet({ ariaLabel: "Settings Sheet" });
```

Or override it per sheet:

```tsx
const { open } = useSheet();

open(UserProfile, { userId: "u_abc" }, { ariaLabel: "User profile for Jane" });
```

In composable mode, use `Sheet.Title` and `Sheet.Description` so the Panel gets `aria-labelledby` and `aria-describedby` automatically.

## Documentation

Full docs, interactive playground, and API reference:

**[stacksheet.danielhowells.com](https://stacksheet.danielhowells.com)**

- [Getting Started](https://stacksheet.danielhowells.com/docs)
- [Hooks](https://stacksheet.danielhowells.com/docs/hooks)
- [Configuration](https://stacksheet.danielhowells.com/docs/config)
- [Composable Parts](https://stacksheet.danielhowells.com/docs/composable-parts)
- [Accessibility](https://stacksheet.danielhowells.com/docs/accessibility)
- [Drag and Dismissal](https://stacksheet.danielhowells.com/docs/drag-to-dismiss)
- [Styling](https://stacksheet.danielhowells.com/docs/styling)
- [Type Registry](https://stacksheet.danielhowells.com/docs/type-registry)

## License

MIT
