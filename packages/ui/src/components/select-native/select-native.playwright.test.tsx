import { expect, test } from "@playwright/experimental-ct-react";
import { TestSelectNative } from "./select-native.stories";

test.describe("Simple SelectNative Test", () => {
	test("should render select-native", async ({ mount }) => {
		const component = await mount(<TestSelectNative />);
		await expect(component).toBeVisible();
	});
});
