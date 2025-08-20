import { expect, test } from "@playwright/experimental-ct-react";
import { TestToast } from "./toast.stories";

test.describe("Simple Toast Test", () => {
	test("should render toast", async ({ mount }) => {
		const component = await mount(<TestToast />);
		await expect(component).toBeVisible();
	});
});
