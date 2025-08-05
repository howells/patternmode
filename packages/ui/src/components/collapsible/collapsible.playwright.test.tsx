import { expect, test } from "@playwright/experimental-ct-react";
import { TestCollapsible } from "./collapsible.stories";

test.describe("Simple Collapsible Test", () => {
  test("should render collapsible", async ({ mount }) => {
    const component = await mount(<TestCollapsible />);
    await expect(component).toBeVisible();
  });
});
