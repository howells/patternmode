import { expect, test } from "@playwright/experimental-ct-react";
import { TestAccordion } from "./accordion.stories";

test.describe("Simple Accordion Test", () => {
  test("should render accordion", async ({ mount }) => {
    const component = await mount(<TestAccordion />);
    await expect(component).toBeVisible();
  });
});
