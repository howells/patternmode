import { expect, test } from "@playwright/experimental-ct-react";
import { TestSearchField } from "./search-field.stories";

test.describe("Simple SearchField Test", () => {
	test("should render search-field", async ({ mount }) => {
		const component = await mount(<TestSearchField />);
		await expect(component).toBeVisible();
	});
});
