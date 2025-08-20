import { expect, test } from "@playwright/experimental-ct-react";
import { TestFieldArray } from "./field-array.stories";

test.describe("Simple FieldArray Test", () => {
	test("should render field-array", async ({ mount }) => {
		const component = await mount(<TestFieldArray />);
		await expect(component).toBeVisible();
	});
});
