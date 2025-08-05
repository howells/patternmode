import { expect, test } from "@playwright/experimental-ct-react";
import { TestBadge } from "./badge.stories";

test.describe("Simple Badge Test", () => {
  test("should render badge", async ({ mount }) => {
    const component = await mount(<TestBadge />);
    await expect(component).toBeVisible();
  });
});
