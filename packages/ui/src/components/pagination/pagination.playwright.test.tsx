import { expect, test } from "@playwright/experimental-ct-react";
import { TestPagination } from "./pagination.stories";

test.describe("Simple Pagination Test", () => {
	test("should render pagination", async ({ mount }) => {
		const component = await mount(<TestPagination />);
		await expect(component).toBeVisible();
	});
});
