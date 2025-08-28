import { expect, test } from "@playwright/experimental-ct-react";
import { TestDot } from "./dot.stories";

test.describe("Dot", () => {
	test("renders", async ({ mount }) => {
		const c = await mount(<TestDot />);
		await expect(c).toBeVisible();
	});
});
