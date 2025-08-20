import { expect, test } from "@playwright/experimental-ct-react";
import { TestToggle } from "./toggle.stories";

test.describe("Simple Toggle Test", () => {
	test("should render toggle", async ({ mount }) => {
		const component = await mount(<TestToggle />);
		await expect(component).toBeVisible();
	});
});
