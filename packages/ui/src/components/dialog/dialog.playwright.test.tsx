import { expect, test } from "@playwright/experimental-ct-react";
import { TestDialog } from "./dialog.stories";

test.describe("Simple Dialog Test", () => {
  test("should render dialog", async ({ mount }) => {
    const component = await mount(<TestDialog />);
    await expect(component).toBeVisible();
  });
});
