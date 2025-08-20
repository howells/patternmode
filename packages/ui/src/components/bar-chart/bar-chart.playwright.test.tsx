import { expect, test } from "@playwright/experimental-ct-react";
import { TestBarChart } from "./bar-chart.stories";

test.describe("Simple BarChart Test", () => {
	test("should render bar-chart", async ({ mount }) => {
		const component = await mount(<TestBarChart />);
		await expect(component).toBeVisible();
	});
});
