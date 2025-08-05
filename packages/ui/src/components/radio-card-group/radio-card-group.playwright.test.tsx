import { expect, test } from "@playwright/experimental-ct-react";
import { TestRadioCardGroup } from "./radio-card-group.stories";

test.describe("Simple RadioCardGroup Test", () => {
  test("should render radio-card-group", async ({ mount }) => {
    const component = await mount(<TestRadioCardGroup />);
    await expect(component).toBeVisible();
  });
});
