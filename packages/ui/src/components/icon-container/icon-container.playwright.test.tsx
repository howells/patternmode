import { expect, test } from "@playwright/experimental-ct-react";
import { TestIconContainer } from "./icon-container.stories";

test.describe("Simple IconContainer Test", () => {
  test("should render icon-container", async ({ mount }) => {
    const component = await mount(<TestIconContainer />);
    await expect(component).toBeVisible();
  });
});
