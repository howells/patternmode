import { expect, test } from "@playwright/experimental-ct-react";
import { TestCarousel } from "./carousel.stories";

test.describe("Simple Carousel Test", () => {
  test("should render carousel", async ({ mount }) => {
    const component = await mount(<TestCarousel />);
    await expect(component).toBeVisible();
  });
});
