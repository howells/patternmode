import { expect, test } from "@playwright/experimental-ct-react";
import { TestInput } from "./input.stories";

test.describe("Simple Input Test", () => {
	test("should render input", async ({ mount }) => {
		const component = await mount(<TestInput />);
		await expect(component).toBeVisible();
	});
});

