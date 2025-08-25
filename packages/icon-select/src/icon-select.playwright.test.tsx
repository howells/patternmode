import { expect, test } from "@playwright/experimental-ct-react";
import { TestIconSelect } from "./icon-select.stories";

test.describe("Simple IconSelect Test", () => {
	test("should render icon-select", async ({ mount }) => {
		const component = await mount(<TestIconSelect />);
		await expect(component).toBeVisible();
	});
});

