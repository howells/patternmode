import { expect, test } from "@playwright/experimental-ct-react";
import { TestDivider } from "./divider.stories";

test.describe("Simple Divider Test", () => {
	test("should render divider", async ({ mount }) => {
		const component = await mount(<TestDivider />);
		await expect(component).toBeVisible();
	});
});
