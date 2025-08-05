import { expect, test } from "@playwright/experimental-ct-react";
import { TestTracker } from "./tracker.stories";

test.describe("Simple Tracker Test", () => {
  test("should render tracker", async ({ mount }) => {
    const component = await mount(<TestTracker />);
    await expect(component).toBeVisible();
  });
});
