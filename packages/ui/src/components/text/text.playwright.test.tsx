import { expect, test } from "@playwright/experimental-ct-react";
import { TestText } from "./text.stories";

test.describe("Simple Text Test", () => {
  test("should render text", async ({ mount }) => {
    const component = await mount(<TestText />);
    await expect(component).toBeVisible();
  });
});
