import { expect, test } from "@playwright/experimental-ct-react";
import { TestGrid } from "./grid.stories";

test.describe("Simple Grid Test", () => {
	test("should render grid", async ({ mount }) => {
		const component = await mount(<TestGrid />);
		await expect(component).toBeVisible();
	});
});
