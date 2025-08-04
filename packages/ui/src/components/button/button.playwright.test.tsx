import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";

// Simple test component without complex dependencies
const TestButton = () => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    Test Button
  </button>
);

test.describe("Simple Button Test", () => {
  test("should render button", async ({ mount }) => {
    const component = await mount(<TestButton />);
    await expect(component.getByRole("button")).toBeVisible();
    await expect(component.getByText("Test Button")).toBeVisible();
  });
});