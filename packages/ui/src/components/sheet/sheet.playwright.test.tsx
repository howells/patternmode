import { expect, test } from "@playwright/experimental-ct-react";
import { TestSheet } from "./sheet.stories";

test.describe("Simple Sheet Test", () => {
  test("should render sheet", async ({ mount }) => {
    const component = await mount(<TestSheet />);
    await expect(component).toBeVisible();
  });
});
