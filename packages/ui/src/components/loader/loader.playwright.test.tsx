import { expect, test } from "@playwright/experimental-ct-react";
import { TestLoader } from "./loader.stories";

test.describe("Simple Loader Test", () => {
	test("should render loader", async ({ mount }) => {
		const component = await mount(<TestLoader />);
		await expect(component).toBeVisible();
	});
});
