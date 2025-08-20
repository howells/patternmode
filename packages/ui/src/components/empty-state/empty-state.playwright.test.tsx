import { expect, test } from "@playwright/experimental-ct-react";
import { TestEmptyState } from "./empty-state.stories";

test.describe("Simple EmptyState Test", () => {
	test("should render empty-state", async ({ mount }) => {
		const component = await mount(<TestEmptyState />);
		await expect(component).toBeVisible();
	});
});
