import { expect, test } from "@playwright/experimental-ct-react";
import { TestSparkChart } from "./spark-chart.stories";

test.describe("Simple SparkChart Test", () => {
	test("should render spark-chart", async ({ mount }) => {
		const component = await mount(<TestSparkChart />);
		await expect(component).toBeVisible();
	});
});
