import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { describe, expect, it, vi } from "vitest";
import { ChannelSlider } from "./index";
import { ControlledChannelSlider } from "./controlled-channel-slider.browser-fixture";
import "../dist/styles.css";

const background = "linear-gradient(to right, white, black)";

describe("ChannelSlider in the browser", () => {
  it("hands focus from a real track click to keyboard input and commits changes", async () => {
    const commit = vi.fn<(value: number) => void>();
    await render(<ControlledChannelSlider background={background} onCommit={commit} />);
    // This checks browser event delivery; dispatching fireEvent.click would bypass it.
    await userEvent.click(page.getByTestId("channel-control"));
    const input = page.getByRole("slider", { name: "Lightness" }).element();
    expect(document.activeElement).toBe(input);
    const afterClick = Number(input.getAttribute("aria-valuenow"));
    await userEvent.keyboard("{ArrowRight}");
    expect(
      page.getByRole("slider", { name: "Lightness" }).element().getAttribute("aria-valuenow"),
    ).toBe(String(afterClick + 1));
    expect(commit).toHaveBeenCalled();
  });

  it("keeps independently named range handles ordered", async () => {
    await render(
      <div style={{ width: 400 }}>
        <ChannelSlider
          label="Range"
          background={background}
          defaultValue={[20, 70] as const}
          size="xl"
        />
      </div>,
    );
    await userEvent.click(page.getByTestId("channel-thumb").nth(0));
    await userEvent.keyboard("{End}");
    expect(
      page.getByRole("slider", { name: "Range, start" }).element().getAttribute("aria-valuenow"),
    ).toBe("70");
    expect(
      page.getByRole("slider", { name: "Range, end" }).element().getAttribute("aria-valuenow"),
    ).toBe("70");
  });

  it("preserves disabled values and form integration", async () => {
    await render(
      <form aria-label="Colour form">
        <ChannelSlider
          label="Disabled"
          name="lightness"
          background={background}
          defaultValue={35}
          disabled
        />
        <ChannelSlider label="Enabled" name="warmth" background={background} defaultValue={65} />
      </form>,
    );
    expect(page.getByRole("slider", { name: "Disabled" }).element().hasAttribute("disabled")).toBe(
      true,
    );
    const form = page.getByRole("form", { name: "Colour form" }).element();
    expect(form).toBeInstanceOf(HTMLFormElement);
    if (!(form instanceof HTMLFormElement)) {
      throw new Error("Expected form");
    }
    expect(new FormData(form).get("warmth")).toBe("65");
    expect(new FormData(form).has("lightness")).toBe(false);
  });

  it("keeps xl thumbs four pixels inside the track at both endpoints", async () => {
    await render(
      <div style={{ width: 400 }}>
        <ChannelSlider label="Minimum" background={background} size="xl" defaultValue={0} />
        <ChannelSlider label="Maximum" background={background} size="xl" defaultValue={100} />
      </div>,
    );
    const tracks = page.getByTestId("channel-track");
    const thumbs = page.getByTestId("channel-thumb");
    await expect
      .poll(
        () =>
          thumbs.nth(0).element().getBoundingClientRect().left -
          tracks.nth(0).element().getBoundingClientRect().left,
      )
      .toBeCloseTo(4);
    expect(thumbs.nth(0).element().getBoundingClientRect().width).toBe(40);
    expect(
      tracks.nth(1).element().getBoundingClientRect().right -
        thumbs.nth(1).element().getBoundingClientRect().right,
    ).toBeCloseTo(4);
    expect(tracks.nth(0).element().getBoundingClientRect().height).toBe(48);
  });
});
