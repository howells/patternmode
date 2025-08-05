import { expect, test } from "@playwright/experimental-ct-react";
import { TestMenuBar } from "./menu-bar.stories";

test.describe("Simple MenuBar Test", () => {
  test("should render menu-bar", async ({ mount }) => {
    const component = await mount(<TestMenuBar />);
    await expect(component).toBeVisible();
  });
});
