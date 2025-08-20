import { expect, test } from "@playwright/experimental-ct-react";
import { TestProgress } from "./progress.stories";

test.describe("Simple Progress Test", () => {
	test("should render progress", async ({ mount }) => {
		const component = await mount(<TestProgress />);
		await expect(component).toBeVisible();
	});
});
