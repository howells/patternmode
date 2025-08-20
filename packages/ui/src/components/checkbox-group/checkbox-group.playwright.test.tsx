import { expect, test } from "@playwright/experimental-ct-react";
import { TestCheckboxGroup } from "./checkbox-group.stories";

test.describe("Simple CheckboxGroup Test", () => {
	test("should render checkbox-group", async ({ mount }) => {
		const component = await mount(<TestCheckboxGroup />);
		await expect(component).toBeVisible();
	});
});
