import { expect, test } from "@playwright/experimental-ct-react";
import { TestSidebar } from "./sidebar.stories";

test.describe("Simple Sidebar Test", () => {
	test("should render sidebar", async ({ mount }) => {
		const component = await mount(<TestSidebar />);
		await expect(component).toBeVisible();
	});
});
