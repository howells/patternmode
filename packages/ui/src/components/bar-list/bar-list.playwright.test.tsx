import { expect, test } from "@playwright/experimental-ct-react";
import { TestBarList } from "./bar-list.stories";

test.describe("Simple BarList Test", () => {
	test("should render bar-list", async ({ mount }) => {
		const component = await mount(<TestBarList />);
		await expect(component).toBeVisible();
	});
});
