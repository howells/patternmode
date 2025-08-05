import { expect, test } from "@playwright/experimental-ct-react";
import { TestTag } from "./tag.stories";

test.describe("Simple Tag Test", () => {
  test("should render tag", async ({ mount }) => {
    const component = await mount(<TestTag />);
    await expect(component).toBeVisible();
  });
});
