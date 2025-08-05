import { expect, test } from "@playwright/experimental-ct-react";
import { TestCodeBlock } from "./code-block.stories";

test.describe("Simple CodeBlock Test", () => {
  test("should render code-block", async ({ mount }) => {
    const component = await mount(<TestCodeBlock />);
    await expect(component).toBeVisible();
  });
});
