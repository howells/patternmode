import { expect, test } from "@playwright/experimental-ct-react";
import { TestDescriptionList } from "./description-list.stories";

test.describe("Simple DescriptionList Test", () => {
  test("should render description-list", async ({ mount }) => {
    const component = await mount(<TestDescriptionList />);
    await expect(component).toBeVisible();
  });
});
