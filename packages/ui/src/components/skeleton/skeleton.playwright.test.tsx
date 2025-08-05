import { expect, test } from "@playwright/experimental-ct-react";
import { TestSkeleton } from "./skeleton.stories";

test.describe("Simple Skeleton Test", () => {
  test("should render skeleton", async ({ mount }) => {
    const component = await mount(<TestSkeleton />);
    await expect(component).toBeVisible();
  });
});
