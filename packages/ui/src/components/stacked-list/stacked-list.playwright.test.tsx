import { expect, test } from "@playwright/experimental-ct-react";
import { TestStackedList } from "./stacked-list.stories";

test.describe("Simple StackedList Test", () => {
	test("should render stacked-list", async ({ mount }) => {
		const component = await mount(<TestStackedList />);
		await expect(component).toBeVisible();
	});
});
