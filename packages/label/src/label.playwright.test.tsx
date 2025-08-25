import { expect, test } from "@playwright/experimental-ct-react";
import { TestLabel } from "./label.stories";

test.describe("Label", () => {
	test("renders", async ({ mount }) => {
		const c = await mount(<TestLabel />);
		await expect(c).toBeVisible();
	});
});
