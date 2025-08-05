import { expect, test } from "@playwright/experimental-ct-react";
import { TestAreaChart } from "./area-chart.stories";

test.describe("Simple AreaChart Test", () => {
  test("should render area-chart", async ({ mount }) => {
    const component = await mount(<TestAreaChart />);
    await expect(component).toBeVisible();
  });
});
