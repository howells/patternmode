import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../input";
import { Textarea } from "../textarea";
import { FieldContent } from "./field-content";
import { FieldDescription } from "./field-description";
import { FieldError } from "./field-error";
import { FieldGroup } from "./field-group";
import { FieldLabel } from "./field-label";
import { Field } from "./field-root";

const meta = {
  title: "Forms/Field",
  component: Field,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="w-[34rem]">
      <FieldGroup>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldContent>
            <Input placeholder="you@example.com" />
            <FieldDescription>
              Shared field wrappers should handle copy and status consistently.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Review notes</FieldLabel>
          <FieldContent>
            <Textarea placeholder="Why should this move upstream?" />
            <FieldError>Write a clearer promotion rationale.</FieldError>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-[42rem]">
      <Field orientation="horizontal">
        <FieldLabel>Primitive name</FieldLabel>
        <FieldContent>
          <Input placeholder="Command palette" />
          <FieldDescription>
            Horizontal layout works for denser admin and review surfaces.
          </FieldDescription>
        </FieldContent>
      </Field>
    </div>
  ),
};
