import { expect, test } from "@playwright/experimental-ct-react";
import { TestTagGroup } from "./tag-group.stories";

test.describe("Simple TagGroup Test", () => {
  test("should render tag-group", async ({ mount }) => {
    const component = await mount(<TestTagGroup />);
    await expect(component).toBeVisible();
  });
});
