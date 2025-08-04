import { expect, test } from "@playwright/experimental-ct-react";
import * as React from "react";
import { TagInput } from "../../src/components/tag-input/component";

test.describe("TagInput Component Tests", () => {
  test("should show create option when allowCreate is enabled and typing new text", async ({ mount }) => {
    const component = await mount(
      <TagInput
        allowCreate
        placeholder="Add tags..."
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
          { value: "angular", label: "Angular" },
        ]}
      />,
    );

    // Focus the input
    await component.getByRole("textbox").focus();

    // Type a new value that doesn't exist in options
    await component.getByRole("textbox").fill("nextjs");

    // Should show create option
    await expect(component.getByText("Create \"nextjs\"")).toBeVisible();
  });

  test("should add tag when create option is clicked", async ({ mount }) => {
    const component = await mount(
      <TagInput
        allowCreate
        placeholder="Add tags..."
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
        ]}
      />,
    );

    // Focus and type new value
    await component.getByRole("textbox").focus();
    await component.getByRole("textbox").fill("svelte");

    // Click create option
    await component.getByText("Create \"svelte\"").click();

    // Should show the new tag
    await expect(component.getByText("svelte")).toBeVisible();
  });

  test("should filter options based on input", async ({ mount }) => {
    const component = await mount(
      <TagInput
        placeholder="Add tags..."
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
          { value: "angular", label: "Angular" },
        ]}
      />,
    );

    // Focus and type to filter
    await component.getByRole("textbox").focus();
    await component.getByRole("textbox").fill("re");

    // Should show React option
    await expect(component.getByText("React")).toBeVisible();

    // Should not show Vue or Angular
    await expect(component.getByText("Vue")).not.toBeVisible();
    await expect(component.getByText("Angular")).not.toBeVisible();
  });
});
