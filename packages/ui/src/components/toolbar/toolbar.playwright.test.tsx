import { expect, test } from "@playwright/experimental-ct-react";
import { TestToolbar } from "./toolbar.stories";

test.describe("Simple Toolbar Test", () => {
	test("should render toolbar", async ({ mount }) => {
		const component = await mount(<TestToolbar />);
		await expect(component).toBeVisible();
	});
});
