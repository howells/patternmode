import { expect, test } from "@playwright/experimental-ct-react";
import { TestMeter } from "./meter.stories";

test.describe("Simple Meter Test", () => {
	test("should render meter", async ({ mount }) => {
		const component = await mount(<TestMeter />);
		await expect(component).toBeVisible();
	});
});
