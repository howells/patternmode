import { expect, test } from "@playwright/experimental-ct-react";
import { TestSlider } from "./slider.stories";

test.describe("Simple Slider Test", () => {
	test("should render slider", async ({ mount }) => {
		const component = await mount(<TestSlider />);
		await expect(component).toBeVisible();
	});
});
