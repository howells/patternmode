import { expect, test } from "@playwright/experimental-ct-react";
import { TestPreviewCard } from "./preview-card.stories";

test.describe("Simple PreviewCard Test", () => {
  test("should render preview-card", async ({ mount }) => {
    const component = await mount(<TestPreviewCard />);
    await expect(component).toBeVisible();
  });
});
