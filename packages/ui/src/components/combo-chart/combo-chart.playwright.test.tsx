import { expect, test } from "@playwright/experimental-ct-react";
import { TestComboChart } from "./combo-chart.stories";

test.describe("Simple ComboChart Test", () => {
	test("should render combo-chart", async ({ mount }) => {
		const component = await mount(<TestComboChart />);
		await expect(component).toBeVisible();
	});
});
