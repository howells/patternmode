import { expect, test } from "@playwright/experimental-ct-react";
import { TestBreadcrumbs } from "./breadcrumbs.stories";

test.describe("Simple Breadcrumbs Test", () => {
	test("should render breadcrumbs", async ({ mount }) => {
		const component = await mount(<TestBreadcrumbs />);
		await expect(component).toBeVisible();
	});
});
