import { expect, test } from "@playwright/experimental-ct-react";
import { TestContextMenu } from "./context-menu.stories";

test.describe("Simple ContextMenu Test", () => {
	test("should render context-menu", async ({ mount }) => {
		const component = await mount(<TestContextMenu />);
		await expect(component).toBeVisible();
	});
});
