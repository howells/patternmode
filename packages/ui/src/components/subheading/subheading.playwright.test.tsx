import { expect, test } from "@playwright/experimental-ct-react";
import { TestSubheading } from "./subheading.stories";

test.describe("Simple Subheading Test", () => {
  test("should render subheading", async ({ mount }) => {
    const component = await mount(<TestSubheading />);
    await expect(component).toBeVisible();
  });
});
