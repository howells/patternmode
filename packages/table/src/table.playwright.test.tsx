import { expect, test } from "@playwright/experimental-ct-react";
import { BasicTableExample } from "./examples";

test.describe("Table", () => {
	test("renders", async ({ mount }) => {
		const component = await mount(<BasicTableExample />);
		await expect(component).toBeVisible();
	});
});
