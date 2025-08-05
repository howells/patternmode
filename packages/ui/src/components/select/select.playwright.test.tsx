import { expect, test } from "@playwright/experimental-ct-react";
import { TestSelect } from "./select.stories";

test.describe("Simple Select Test", () => {
  test("should render select", async ({ mount }) => {
    const component = await mount(<TestSelect />);
    await expect(component).toBeVisible();
  });
});
