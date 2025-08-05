import { expect, test } from "@playwright/experimental-ct-react";
import { TestSwitch } from "./switch.stories";

test.describe("Simple Switch Test", () => {
  test("should render switch", async ({ mount }) => {
    const component = await mount(<TestSwitch />);
    await expect(component).toBeVisible();
  });
});
