import { expect, test } from "@playwright/experimental-ct-react";
import { TestProgressCircle } from "./progress-circle.stories";

test.describe("Simple ProgressCircle Test", () => {
	test("should render progress-circle", async ({ mount }) => {
		const component = await mount(<TestProgressCircle />);
		await expect(component).toBeVisible();
	});
});
