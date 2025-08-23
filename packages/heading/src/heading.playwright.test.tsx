import { expect, test } from "@playwright/experimental-ct-react";
import { TestHeading } from "./heading.stories";

test.describe("Heading", () => {
  test("renders", async ({ mount }) => {
    const c = await mount(<TestHeading />);
    await expect(c).toBeVisible();
  });
});

