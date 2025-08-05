import { expect, test } from "@playwright/experimental-ct-react";
import { TestDonutChart } from "./donut-chart.stories";

test.describe("Simple DonutChart Test", () => {
  test("should render donut-chart", async ({ mount }) => {
    const component = await mount(<TestDonutChart />);
    await expect(component).toBeVisible();
  });
});
