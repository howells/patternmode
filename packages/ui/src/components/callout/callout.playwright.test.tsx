import { expect, test } from "@playwright/experimental-ct-react";
import { TestCallout } from "./callout.stories";

test.describe("Simple Callout Test", () => {
	test("should render callout", async ({ mount }) => {
		const component = await mount(<TestCallout />);
		await expect(component).toBeVisible();
	});
});
