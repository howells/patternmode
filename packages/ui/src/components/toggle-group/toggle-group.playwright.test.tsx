import { expect, test } from "@playwright/experimental-ct-react";
import { TestToggleGroup } from "./toggle-group.stories";

test.describe("Simple ToggleGroup Test", () => {
	test("should render toggle-group", async ({ mount }) => {
		const component = await mount(<TestToggleGroup />);
		await expect(component).toBeVisible();
	});
});
