import { expect, test } from "@playwright/experimental-ct-react";
import { TestNavbar } from "./navbar.stories";

test.describe("Simple Navbar Test", () => {
  test("should render navbar", async ({ mount }) => {
    const component = await mount(<TestNavbar />);
    await expect(component).toBeVisible();
  });
});
