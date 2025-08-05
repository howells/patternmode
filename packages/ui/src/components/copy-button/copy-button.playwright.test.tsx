import { expect, test } from "@playwright/experimental-ct-react";
import { TestCopyButton } from "./copy-button.stories";

test.describe("Simple CopyButton Test", () => {
  test("should render copy-button", async ({ mount }) => {
    const component = await mount(<TestCopyButton />);
    await expect(component).toBeVisible();
  });
});
