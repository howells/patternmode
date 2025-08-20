import { expect, test } from "@playwright/experimental-ct-react";
import { TestLabel } from "./label.stories";

test.describe("Simple Label Test", () => {
	test("should render label", async ({ mount }) => {
		const component = await mount(<TestLabel />);
		await expect(component).toBeVisible();
	});
});
