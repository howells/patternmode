import { expect, test } from "@playwright/experimental-ct-react";
import { TestCard } from "./card.stories";

test.describe("Simple Card Test", () => {
	test("should render card", async ({ mount }) => {
		const component = await mount(<TestCard />);
		await expect(component).toBeVisible();
	});
});
