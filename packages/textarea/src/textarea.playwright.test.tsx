import { expect, test } from "@playwright/experimental-ct-react";
import { TestTextarea } from "./textarea.stories";

test.describe("Simple Textarea Test", () => {
	test("should render textarea", async ({ mount }) => {
		const component = await mount(<TestTextarea />);
		await expect(component).toBeVisible();
	});
});

