import { expect, test } from "@playwright/experimental-ct-react";
import { TestIconContainer } from "./icon-container.stories";

test.describe("IconContainer", () => {
  test("renders", async ({ mount }) => {
    const c = await mount(<TestIconContainer />);
    await expect(c).toBeVisible();
  });
});

