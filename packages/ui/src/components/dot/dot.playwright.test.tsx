import { expect, test } from "@playwright/experimental-ct-react";
import { TestDot } from "./dot.stories";

test.describe("Simple Dot Test", () => {
  test("should render dot", async ({ mount }) => {
    const component = await mount(<TestDot />);
    await expect(component).toBeVisible();
  });
});
