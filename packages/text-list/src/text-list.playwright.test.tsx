import { expect, test } from "@playwright/experimental-ct-react";
import { TestTextList } from "./text-list.stories";

test.describe("TextList", () => {
  test("renders", async ({ mount }) => {
    const c = await mount(<TestTextList />);
    await expect(c).toBeVisible();
  });
});

