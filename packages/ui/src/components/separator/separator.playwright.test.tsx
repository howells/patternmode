import { expect, test } from "@playwright/experimental-ct-react";
import { TestSeparator } from "./separator.stories";

test.describe("Simple Separator Test", () => {
	test("should render separator", async ({ mount }) => {
		const component = await mount(<TestSeparator />);
		await expect(component).toBeVisible();
	});
});
