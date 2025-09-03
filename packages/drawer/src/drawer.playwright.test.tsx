import { expect, test } from "@playwright/experimental-ct-react";
import { DefaultExample } from "./examples";

test.describe("Drawer", () => {
  test("renders", async ({ mount }) => {
    const component = await mount(<DefaultExample />);
    await expect(component).toBeVisible();
  });
});
