import { expect, test } from "@playwright/experimental-ct-react";
import { TagInputExample } from "./preview";

test.describe("TagInput Component Tests", () => {
  test("should show create option when allowCreate is enabled and typing new text", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} />,
    );

    // Type a custom city name that doesn't exist in the European cities list
    const input = component.getByPlaceholder("Add more tags...");
    await input.fill("stockholm");

    // Should show a "Create" option in the dropdown
    await expect(component.getByText("Create \"Stockholm\"")).toBeVisible();
  });

  test("should create new tag when clicking create option", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} />,
    );

    // Type a custom city
    const input = component.getByPlaceholder("Add more tags...");
    await input.fill("stockholm");

    // Wait for create option to appear
    await expect(component.getByText("Create \"Stockholm\"")).toBeVisible();

    // Click the create option
    await component.getByText("Create \"Stockholm\"").click();

    // Should see the new tag in the selected tags
    await expect(component.getByText("stockholm")).toBeVisible();

    // Input should be cleared
    await expect(input).toHaveValue("");
  });

  test("should create new tag when pressing Enter", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} />,
    );

    // Type a custom city
    const input = component.getByPlaceholder("Add more tags...");
    await input.fill("oslo");

    // Wait for create option to appear
    await expect(component.getByText("Create \"Oslo\"")).toBeVisible();

    // Press Enter to create the tag
    await input.press("Enter");

    // Should see the new tag
    await expect(component.getByText("oslo")).toBeVisible();

    // Input should be cleared
    await expect(input).toHaveValue("");
  });

  test("should not show create option for existing cities", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} />,
    );

    // Type an existing city name
    const input = component.getByPlaceholder("Add more tags...");
    await input.fill("paris");

    // Should show the existing option, not a create option
    await expect(component.getByText("Paris")).toBeVisible();
    await expect(component.getByText("Create \"Paris\"")).not.toBeVisible();
  });

  test("should not show create option when allowCreate is disabled", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={false} />,
    );

    // Type a custom city
    const input = component.getByPlaceholder("Add more tags...");
    await input.fill("stockholm");

    // Should not show create option
    await expect(component.getByText("Create \"Stockholm\"")).not.toBeVisible();

    // Should show "No options found" message
    await expect(component.getByText("No options found.")).toBeVisible();
  });

  test("should validate input before showing create option", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} />,
    );

    // Type empty input (should be invalid by default validation)
    const input = component.getByPlaceholder("Add more tags...");
    await input.fill("   "); // Just spaces should be invalid

    // Should not show create option for invalid input (spaces only)
    await expect(component.getByText("Create")).not.toBeVisible();
  });

  test("should create multiple custom tags", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} />,
    );

    const input = component.getByPlaceholder("Add more tags...");

    // Create first custom tag
    await input.fill("stockholm");
    await expect(component.getByText("Create \"Stockholm\"")).toBeVisible();
    await component.getByText("Create \"Stockholm\"").click();
    await expect(component.getByText("stockholm")).toBeVisible();

    // Create second custom tag
    await input.fill("oslo");
    await expect(component.getByText("Create \"Oslo\"")).toBeVisible();
    await component.getByText("Create \"Oslo\"").click();
    await expect(component.getByText("oslo")).toBeVisible();

    // Should have both custom tags visible
    await expect(component.getByText("stockholm")).toBeVisible();
    await expect(component.getByText("oslo")).toBeVisible();
  });

  test("should respect maxTags limit with custom tags", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} maxTags={3} />,
    );

    const input = component.getByPlaceholder("Add more tags...");

    // Should start with Paris and London (2 tags)
    await expect(component.getByText("Paris")).toBeVisible();
    await expect(component.getByText("London")).toBeVisible();

    // Add one more custom tag (should reach limit)
    await input.fill("stockholm");
    await component.getByText("Create \"Stockholm\"").click();

    // Should show max tags message
    await expect(component.getByText("Max 3 tags")).toBeVisible();

    // Input should be hidden
    await expect(input).not.toBeVisible();
  });

  test("should remove custom tags with dismiss button", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} />,
    );

    // Create a custom tag
    const input = component.getByPlaceholder("Add more tags...");
    await input.fill("stockholm");
    await component.getByText("Create \"Stockholm\"").click();

    // Should see the tag
    await expect(component.getByText("stockholm")).toBeVisible();

    // Find and click the dismiss button for stockholm - using the shared DismissButton
    const stockholmTag = component.locator("[data-testid=\"tag\"]").filter({ hasText: "stockholm" });
    const dismissButton = stockholmTag.getByTestId("dismiss-button");
    await dismissButton.click();

    // Tag should be removed
    await expect(component.getByText("stockholm")).not.toBeVisible();
  });

  test("should handle mixed existing and custom tags", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} />,
    );

    const input = component.getByPlaceholder("Add more tags...");

    // Add an existing city
    await input.fill("rome");
    await component.getByText("Rome").click();
    await expect(component.getByText("Rome")).toBeVisible();

    // Add a custom city
    await input.fill("stockholm");
    await component.getByText("Create \"Stockholm\"").click();
    await expect(component.getByText("stockholm")).toBeVisible();

    // Should have both existing and custom tags
    await expect(component.getByText("Paris")).toBeVisible(); // default
    await expect(component.getByText("London")).toBeVisible(); // default
    await expect(component.getByText("Rome")).toBeVisible(); // added existing
    await expect(component.getByText("stockholm")).toBeVisible(); // added custom
  });

  test("should clear input after failed creation attempt", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={true} />,
    );

    const input = component.getByPlaceholder("Add more tags...");

    // Type and try to create
    await input.fill("test city");
    await expect(component.getByText("Create \"Test city\"")).toBeVisible();

    // Press Enter to attempt creation
    await input.press("Enter");

    // Input should be cleared regardless of success/failure
    await expect(input).toHaveValue("");
  });

  test("should test dismiss button integration", async ({ mount }) => {
    const component = await mount(
      <TagInputExample allowCreate={false} />,
    );

    // Should start with default tags (Paris and London)
    await expect(component.getByText("Paris")).toBeVisible();
    await expect(component.getByText("London")).toBeVisible();

    // Find dismiss button for Paris tag
    const parisTag = component.locator("[data-testid=\"tag\"]").filter({ hasText: "Paris" });
    const dismissButton = parisTag.getByTestId("dismiss-button");

    // Verify dismiss button is visible and has correct size
    await expect(dismissButton).toBeVisible();
    await expect(dismissButton).toHaveClass(/size-4/); // xs size = 16px

    // Click dismiss button
    await dismissButton.click();

    // Paris tag should be removed
    await expect(component.getByText("Paris")).not.toBeVisible();
    // London should still be there
    await expect(component.getByText("London")).toBeVisible();
  });
});
