import { expect, test } from "@playwright/experimental-ct-react";
import { TestLineChart } from "./line-chart.stories";

test.describe("Simple LineChart Test", () => {
  test("should render line-chart", async ({ mount }) => {
    const component = await mount(<TestLineChart />);
    await expect(component).toBeVisible();
  });
});
