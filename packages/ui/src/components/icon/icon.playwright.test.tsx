import { expect, test } from "@playwright/experimental-ct-react";
import { TestIcon } from "./icon.stories";

test.describe("Simple Icon Test", () => {
  test("should render icon", async ({ mount }) => {
    const component = await mount(<TestIcon />);
    await expect(component).toBeVisible();
  });
});
