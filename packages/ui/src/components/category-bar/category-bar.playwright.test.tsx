import { expect, test } from "@playwright/experimental-ct-react";
import { TestCategoryBar } from "./category-bar.stories";

test.describe("Simple CategoryBar Test", () => {
	test("should render category-bar", async ({ mount }) => {
		const component = await mount(<TestCategoryBar />);
		await expect(component).toBeVisible();
	});
});
