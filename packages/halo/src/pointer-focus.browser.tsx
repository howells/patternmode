/*
 * Real-browser tests for the picker's pointer-to-keyboard handover.
 *
 * The jsdom suite asserts that pointerdown moves focus, which is the mechanism.
 * This asserts the thing a user actually does: click the control, then press an
 * arrow key, and watch the colour move. The two halves fail independently —
 * focus can land correctly while the key handler is wired to the wrong element —
 * and only a browser decides whether `preventDefault` on pointerdown suppresses
 * the focus that the keyboard then depends on.
 *
 * Run with `pnpm test:browser`. Not part of `pnpm check`, which stays free of
 * browser binaries — see AGENTS.md "Browser tests".
 */
import { useState } from "react";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { describe, expect, it } from "vitest";

import { HaloPicker } from "./index";
import type { HaloColor } from "./index";
import "../dist/styles.css";

const Harness = () => {
  const [color, setColor] = useState<HaloColor>({ h: 16, l: 69, s: 48 });
  return (
    <div>
      <output data-testid="readout">{`${Math.round(color.h)} ${Math.round(color.s)} ${Math.round(color.l)}`}</output>
      <HaloPicker aria-label="Accent color" onChange={setColor} value={color} />
    </div>
  );
};

const readout = () => page.getByTestId("readout").element().textContent ?? "";

describe("HaloPicker pointer-to-keyboard handover in a real browser", () => {
  it("keeps the pad's arrow keys working after a click", async () => {
    await render(<Harness />);

    await userEvent.click(page.getByTestId("halo-picker-pad"));
    const afterClick = readout();

    /*
     * Before the fix this key press changed nothing: `preventDefault` in the
     * pointerdown handler suppressed the compatibility mousedown, focus stayed
     * on `body`, and the pad's keydown handler never ran. Nothing was thrown.
     */
    await userEvent.keyboard("{ArrowRight}");

    expect(readout()).not.toBe(afterClick);
  });

  /*
   * The hue arc is deliberately NOT covered here, and the reason is worth
   * stating so nobody adds it back as a flaky test.
   *
   * Its keyboard surface is a visually hidden 1×1 range input, which Playwright
   * refuses to click ("element is outside of the viewport"), and the arc itself
   * is a stroked `path` whose bounding-box centre is empty space with the pad
   * sitting behind it — so a centre-click would land on the pad and pass for
   * the wrong reason. Hitting the stroke needs hard-coded coordinates, which
   * would break the first time the geometry is retuned.
   *
   * The arc's half of this contract is asserted in `halo-picker.test.tsx`
   * ("focuses the hue range input on arc pointerdown") and was confirmed by
   * hand in a browser on 2026-08-09: click the arc, press ArrowRight, hue moves
   * 183 → 184. A test that cannot be made reliable is worse than a documented
   * manual check.
   */
});
