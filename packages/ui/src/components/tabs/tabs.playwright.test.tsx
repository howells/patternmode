import { expect, test } from "@playwright/experimental-ct-react";
import { TestTabs } from "./tabs.stories";

test.describe("Simple Tabs Test", () => {
	test("should render tabs", async ({ mount }) => {
		const component = await mount(<TestTabs />);
		await expect(component).toBeVisible();
	});
});
