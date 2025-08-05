import { expect, test } from "@playwright/experimental-ct-react";
import { BasicTagInput, FilterableTagInput, CreateableTagInput } from "./tag-input.stories";

test.describe("TagInput Component Tests", () => {
  test("should show create option when allowCreate is enabled and typing new text", async ({ mount }) => {
    const component = await mount(<BasicTagInput />);

    // Focus the input
    await component.getByPlaceholder("Add tags...").focus();

    // Type a new value that doesn't exist in options
    await component.getByPlaceholder("Add tags...").fill("nextjs");

    // Should show create option (use contains for more flexible matching)
    await expect(component.getByText(/Create.*nextjs/)).toBeVisible();
  });

  test("should add tag when create option is clicked", async ({ mount }) => {
    const component = await mount(<CreateableTagInput />);

    // Focus and type new value
    await component.getByPlaceholder("Add tags...").focus();
    await component.getByPlaceholder("Add tags...").fill("svelte");

    // Click create option
    await component.getByText(/Create.*svelte/).click();

    // Should show the new tag
    await expect(component.getByText("svelte")).toBeVisible();
  });

  test("should filter options based on input", async ({ mount }) => {
    const component = await mount(<FilterableTagInput />);

    // Focus and type to filter
    await component.getByPlaceholder("Add tags...").focus();
    await component.getByPlaceholder("Add tags...").fill("re");

    // Should show React option
    await expect(component.getByText("React")).toBeVisible();

    // Should not show Vue or Angular
    await expect(component.getByText("Vue")).not.toBeVisible();
    await expect(component.getByText("Angular")).not.toBeVisible();
  });
});