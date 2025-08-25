import { expect, test } from "@playwright/experimental-ct-react";
import { TestCombobox } from "./combobox.stories";

test.describe("Simple Combobox Test", () => {
	test("should render combobox", async ({ mount }) => {
		const component = await mount(<TestCombobox />);
		await expect(component).toBeVisible();
	});
});

