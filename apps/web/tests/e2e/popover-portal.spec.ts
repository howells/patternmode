import { test, expect } from "@playwright/test";

test("no Popover.Portal error and popovers open", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  await page.goto("/");

  // Open the "Components" popover in the Layout Builder page
  await page.getByRole("button", { name: /components \(\d+\)/i }).click();
  await expect(page.getByText(/Select Components/i)).toBeVisible();

  // Open the Date Picker preview popover to ensure it also works
  await page.goto("/ui/components/date-picker");
  await page.getByRole("button", { name: /select a date/i }).click();
  await expect(page.getByRole("dialog").or(page.locator("[data-testid=popover]"))).toBeVisible();

  // Assert no Base UI portal errors surfaced in console
  const joined = consoleErrors.join("\n");
  expect(joined).not.toMatch(/<Popover\.Portal> is missing/i);
});

