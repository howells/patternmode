import { expect, test } from "@playwright/experimental-ct-react";
import { TestRadioGroup } from "./radio-group.stories";

test.describe("Simple RadioGroup Test", () => {
  test("should render radio-group", async ({ mount }) => {
    const component = await mount(<TestRadioGroup />);
    await expect(component).toBeVisible();
  });
});
