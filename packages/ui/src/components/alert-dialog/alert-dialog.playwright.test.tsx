import { expect, test } from "@playwright/experimental-ct-react";
import { TestAlertDialog } from "./alert-dialog.stories";

test.describe("Simple AlertDialog Test", () => {
  test("should render alert-dialog", async ({ mount }) => {
    const component = await mount(<TestAlertDialog />);
    await expect(component).toBeVisible();
  });
});
