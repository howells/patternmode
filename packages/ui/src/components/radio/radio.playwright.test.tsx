import { expect, test } from "@playwright/experimental-ct-react";
import { TestRadio } from "./radio.stories";

test.describe("Simple Radio Test", () => {
	test("should render radio", async ({ mount }) => {
		const component = await mount(<TestRadio />);
		await expect(component).toBeVisible();
	});
});
