import { expect, test } from "@playwright/experimental-ct-react";
import { TestTabNavigation } from "./tab-navigation.stories";

test.describe("Simple TabNavigation Test", () => {
	test("should render tab-navigation", async ({ mount }) => {
		const component = await mount(<TestTabNavigation />);
		await expect(component).toBeVisible();
	});
});
