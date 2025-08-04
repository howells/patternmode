import { expect, test } from "@playwright/experimental-ct-react";
import * as React from "react";
import { Button } from "../../src/components/button/component";

const TestButton = () => (
  <Button variant="default">Test Button</Button>
);

test.describe("Simple Button Test", () => {
  test("should render button", async ({ mount }) => {
    const component = await mount(<TestButton />);
    await expect(component).toBeVisible();
  });

  test("should have correct text", async ({ mount }) => {
    const component = await mount(<TestButton />);
    await expect(component).toContainText("Test Button");
  });

  test("should be clickable", async ({ mount }) => {
    const ClickableButton = () => (
      <Button variant="default" onClick={() => { /* handle click */ }}>
        Click Me
      </Button>
    );

    const component = await mount(<ClickableButton />);
    await component.click();
    // Note: In a real test, you'd need a way to verify the click handler was called
    await expect(component).toBeVisible();
  });
});
