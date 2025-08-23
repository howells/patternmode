import { expect, test } from "@playwright/experimental-ct-react";
import { TestSubheading } from "./subheading.stories";

test.describe("Subheading", () => {
  test("renders", async ({ mount }) => {
    const c = await mount(<TestSubheading />);
    await expect(c).toBeVisible();
  });
});

