import { expect, test } from "@playwright/experimental-ct-react";
import { TestCalendar } from "./calendar.stories";

test.describe("Simple Calendar Test", () => {
  test("should render calendar", async ({ mount }) => {
    const component = await mount(<TestCalendar />);
    await expect(component).toBeVisible();
  });
});
