import { expect, test } from "@playwright/experimental-ct-react";
import { TestBadge } from "./badge.stories";

test.describe("Badge", () => {
	test("renders", async ({ mount }) => {
		const c = await mount(<TestBadge />);
		await expect(c).toBeVisible();
	});
});
