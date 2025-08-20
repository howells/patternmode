import { expect, test } from "@playwright/experimental-ct-react";
import { TestDismissButton } from "./dismiss-button.stories";

test.describe("Simple DismissButton Test", () => {
	test("should render dismiss-button", async ({ mount }) => {
		const component = await mount(<TestDismissButton />);
		await expect(component).toBeVisible();
	});
});
