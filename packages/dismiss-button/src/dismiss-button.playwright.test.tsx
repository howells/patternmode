import { expect, test } from "@playwright/experimental-ct-react";
import { TestDismissButton } from "./dismiss-button.stories";

test.describe("DismissButton", () => {
	test("renders", async ({ mount }) => {
		const c = await mount(<TestDismissButton />);
		await expect(c).toBeVisible();
	});
});
