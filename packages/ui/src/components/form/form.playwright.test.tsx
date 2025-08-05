import { expect, test } from "@playwright/experimental-ct-react";
import { TestForm } from "./form.stories";

test.describe("Simple Form Test", () => {
  test("should render form", async ({ mount }) => {
    const component = await mount(<TestForm />);
    await expect(component).toBeVisible();
  });
});
