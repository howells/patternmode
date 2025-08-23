import { expect, test } from "@playwright/experimental-ct-react";
import { TestTooltip } from "./tooltip.stories";

test.describe("Simple Tooltip Test", () => {
  test("should render tooltip", async ({ mount }) => {
    const component = await mount(<TestTooltip />);
    await expect(component).toBeVisible();
  });
});

