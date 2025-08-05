import { expect, test } from "@playwright/experimental-ct-react";
import { TestDatePicker } from "./date-picker.stories";

test.describe("Simple DatePicker Test", () => {
  test("should render date-picker", async ({ mount }) => {
    const component = await mount(<TestDatePicker />);
    await expect(component).toBeVisible();
  });
});
