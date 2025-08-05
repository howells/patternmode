import { expect, test } from "@playwright/experimental-ct-react";
import { TestTextList } from "./text-list.stories";

test.describe("Simple TextList Test", () => {
  test("should render text-list", async ({ mount }) => {
    const component = await mount(<TestTextList />);
    await expect(component).toBeVisible();
  });
});
