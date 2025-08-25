import { expect, test } from "@playwright/experimental-ct-react";
import { TestSeparator } from "./separator.stories";

test.describe("Separator", () => {
	test("renders", async ({ mount }) => {
		const c = await mount(<TestSeparator />);
		await expect(c).toBeVisible();
	});
});
