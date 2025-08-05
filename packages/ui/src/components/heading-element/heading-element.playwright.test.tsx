import { expect, test } from "@playwright/experimental-ct-react";
import { TestHeadingElement } from "./heading-element.stories";

test.describe("Simple HeadingElement Test", () => {
  test("should render heading-element", async ({ mount }) => {
    const component = await mount(<TestHeadingElement />);
    await expect(component).toBeVisible();
  });
});
