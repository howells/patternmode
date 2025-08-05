import { expect, test } from "@playwright/experimental-ct-react";
import { TestField } from "./field.stories";

test.describe("Simple Field Test", () => {
  test("should render field", async ({ mount }) => {
    const component = await mount(<TestField />);
    await expect(component).toBeVisible();
  });
});
