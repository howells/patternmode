import { expect, test } from "@playwright/experimental-ct-react";
import { TestHeading } from "./heading.stories";

test.describe("Simple Heading Test", () => {
	test("should render heading", async ({ mount }) => {
		const component = await mount(<TestHeading />);
		await expect(component).toBeVisible();
	});
});
