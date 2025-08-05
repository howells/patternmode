import { expect, test } from "@playwright/experimental-ct-react";
import { TestTable } from "./table.stories";

test.describe("Simple Table Test", () => {
  test("should render table", async ({ mount }) => {
    const component = await mount(<TestTable />);
    await expect(component).toBeVisible();
  });
});
