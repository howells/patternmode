import { expect, test } from "@playwright/experimental-ct-react";
import { TestNumberField } from "./number-field.stories";

test.describe("Simple NumberField Test", () => {
	test("should render number-field", async ({ mount }) => {
		const component = await mount(<TestNumberField />);
		await expect(component).toBeVisible();
	});
});

