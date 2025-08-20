import { expect, test } from "@playwright/experimental-ct-react";
import { TestDropdownItem } from "./dropdown-item.stories";

test.describe("Simple DropdownItem Test", () => {
	test("should render dropdown-item", async ({ mount }) => {
		const component = await mount(<TestDropdownItem />);
		await expect(component).toBeVisible();
	});
});
