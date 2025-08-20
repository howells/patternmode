import { expect, test } from "@playwright/experimental-ct-react";
import { TestScrollArea } from "./scroll-area.stories";

test.describe("Simple ScrollArea Test", () => {
	test("should render scroll-area", async ({ mount }) => {
		const component = await mount(<TestScrollArea />);
		await expect(component).toBeVisible();
	});
});
