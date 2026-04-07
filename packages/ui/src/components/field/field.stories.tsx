import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Checkbox } from "../checkbox";
import { Heading } from "../heading";
import { Input } from "../input";
import { Switch } from "../switch";
import { fieldAnatomy } from "./field-anatomy";
import { FieldContent } from "./field-content";
import { FieldDescription } from "./field-description";
import { FieldError } from "./field-error";
import { FieldGroup } from "./field-group";
import { FieldLabel } from "./field-label";
import { Field } from "./field-root";

type FieldStoryArgs = React.ComponentProps<typeof Field> & {
  heading?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  nameDescription?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  usernameLabel?: string;
  usernamePlaceholder?: string;
  usernameError?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  passwordError?: string;
  apiKeyLabel?: string;
  apiKeyPlaceholder?: string;
  apiKeyDescription?: string;
  webhookLabel?: string;
  webhookPlaceholder?: string;
  webhookDescription?: string;
};

const meta: Meta<FieldStoryArgs> = {
  title: "Field",
  component: Field,
  parameters: {
    builder: {
      category: "form",
      icon: "input",
    },
    anatomy: fieldAnatomy,
    docs: {
      description: {
        component:
          "Form field components that provide consistent structure for labels, inputs, descriptions, and error messages. Supports both vertical and horizontal orientations.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// Individual Component Examples
// =============================================================================

/** Basic Field with vertical orientation (default) */
export const FieldBasic: Story = {
  name: "Field",
  parameters: {
    docs: {
      description: {
        story:
          "The Field component is a flexible container that arranges label and content. Supports vertical, horizontal, and responsive orientations.",
      },
    },
  },
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-basic">Label</FieldLabel>
      <Input id="field-basic" placeholder="Enter text..." />
    </Field>
  ),
};

/** FieldGroup groups multiple fields with consistent spacing */
export const FieldGroupBasic: Story = {
  name: "FieldGroup",
  parameters: {
    docs: {
      description: {
        story:
          "Container for grouping multiple fields together with consistent spacing between them.",
      },
    },
  },
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="group-first">First Name</FieldLabel>
        <Input id="group-first" placeholder="Jane" />
      </Field>
      <Field>
        <FieldLabel htmlFor="group-last">Last Name</FieldLabel>
        <Input id="group-last" placeholder="Doe" />
      </Field>
    </FieldGroup>
  ),
};

/** FieldContent wraps the input and associated messages */
export const FieldContentBasic: Story = {
  name: "FieldContent",
  parameters: {
    docs: {
      description: {
        story:
          "Container for field input/control and associated description/error messages. Provides proper spacing.",
      },
    },
  },
  render: () => (
    <Field>
      <FieldLabel htmlFor="content-example">Email</FieldLabel>
      <FieldContent>
        <Input
          id="content-example"
          placeholder="you@example.com"
          type="email"
        />
        <FieldDescription>We'll never share your email.</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

/** FieldLabel is an accessible label that can wrap interactive elements */
export const FieldLabelBasic: Story = {
  name: "FieldLabel",
  parameters: {
    docs: {
      description: {
        story:
          "Label for a field. Can wrap interactive elements like checkboxes/radios for larger click targets.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="label-basic">Standard Label</FieldLabel>
        <Input id="label-basic" />
      </Field>
      <Field orientation="horizontal">
        <FieldLabel className="cursor-pointer">
          <Checkbox id="label-checkbox" />
          <span>Wrapped checkbox with clickable label</span>
        </FieldLabel>
      </Field>
    </div>
  ),
};

/** FieldDescription provides helper text */
export const FieldDescriptionBasic: Story = {
  name: "FieldDescription",
  parameters: {
    docs: {
      description: {
        story:
          "Helper text or description displayed below a field. Supports links with automatic styling.",
      },
    },
  },
  render: () => (
    <Field>
      <FieldLabel htmlFor="desc-example">Password</FieldLabel>
      <FieldContent>
        <Input id="desc-example" type="password" />
        <FieldDescription>
          Must be at least 8 characters. See our{" "}
          <a href="#password-requirements">password requirements</a>.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

/** FieldError displays validation errors */
export const FieldErrorBasic: Story = {
  name: "FieldError",
  parameters: {
    docs: {
      description: {
        story:
          "Error message display for field validation. Shows single or multiple error messages with proper ARIA role.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="error-single">Single Error</FieldLabel>
        <FieldContent>
          <Input aria-invalid id="error-single" />
          <FieldError errors={[{ message: "This field is required" }]} />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="error-multiple">Multiple Errors</FieldLabel>
        <FieldContent>
          <Input aria-invalid id="error-multiple" />
          <FieldError
            errors={[
              { message: "Must be at least 8 characters" },
              { message: "Must contain a number" },
              { message: "Must contain a special character" },
            ]}
          />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="error-custom">Custom Error Content</FieldLabel>
        <FieldContent>
          <Input aria-invalid id="error-custom" />
          <FieldError>
            <strong>Error:</strong> Custom error with JSX content
          </FieldError>
        </FieldContent>
      </Field>
    </div>
  ),
};

// =============================================================================
// Composite Examples
// =============================================================================

/** Interactive story - vertical layout */
export const Base: Story = {
  args: {
    heading: "Profile",
    nameLabel: "Name",
    namePlaceholder: "Jane Doe",
    nameDescription: "Shown to other users.",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
  },
  argTypes: {
    heading: { control: "text" },
    nameLabel: { control: "text" },
    namePlaceholder: { control: "text" },
    nameDescription: { control: "text" },
    emailLabel: { control: "text" },
    emailPlaceholder: { control: "text" },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Heading size="sm">{args.heading}</Heading>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">{args.nameLabel}</FieldLabel>
          <FieldContent>
            <Input id="name" placeholder={args.namePlaceholder} />
            <FieldDescription>{args.nameDescription}</FieldDescription>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">{args.emailLabel}</FieldLabel>
          <FieldContent>
            <Input id="email" placeholder={args.emailPlaceholder} />
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  ),
};

/** Vertical layout stacks labels above inputs */
export const VerticalLayout: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Vertical layout stacks labels above inputs. Best for forms with longer labels or when maximizing vertical space.",
      },
    },
  },
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="vertical-name">Name</FieldLabel>
        <FieldContent>
          <Input id="vertical-name" placeholder="Jane Doe" />
          <FieldDescription>Shown to other users.</FieldDescription>
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="vertical-email">Email</FieldLabel>
        <FieldContent>
          <Input id="vertical-email" placeholder="you@example.com" />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

/** Horizontal layout places labels beside inputs */
export const HorizontalLayout: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Horizontal layout places labels beside inputs. Good for compact forms and settings pages.",
      },
    },
  },
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="notifications">Notifications</FieldLabel>
        <Switch id="notifications" />
      </Field>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="auto-save">Auto-save</FieldLabel>
        <Switch defaultChecked id="auto-save" />
      </Field>
    </FieldGroup>
  ),
};

/** Fields can display validation errors linked to inputs via aria-describedby */
export const WithErrors: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Fields auto-generate IDs for FieldError and FieldDescription. Pass the same `id` to Field and Input, then add `aria-describedby` referencing `{id}-error` to link the error to the input for screen readers.",
      },
    },
  },
  render: () => (
    <FieldGroup>
      <Field id="username">
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <FieldContent>
          <Input
            aria-describedby="username-error"
            aria-invalid
            id="username"
            placeholder="johndoe"
          />
          <FieldError errors={[{ message: "Username is already taken" }]} />
        </FieldContent>
      </Field>
      <Field id="password">
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <FieldContent>
          <Input
            aria-describedby="password-error"
            aria-invalid
            id="password"
            placeholder="********"
            type="password"
          />
          <FieldError
            errors={[{ message: "Password must be at least 8 characters" }]}
          />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

/** Field descriptions provide helpful context, linked via aria-describedby */
export const WithDescriptions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Field descriptions auto-receive `id={fieldId}-description`. Link to the input with `aria-describedby` for screen reader access.",
      },
    },
  },
  render: () => (
    <FieldGroup>
      <Field id="api-key">
        <FieldLabel htmlFor="api-key">API Key</FieldLabel>
        <FieldContent>
          <Input
            aria-describedby="api-key-description"
            id="api-key"
            placeholder="sk_live_..."
            type="password"
          />
          <FieldDescription>
            Your secret API key. Keep this secure and never share it publicly.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field id="webhook-url">
        <FieldLabel htmlFor="webhook-url">Webhook URL</FieldLabel>
        <FieldContent>
          <Input
            aria-describedby="webhook-url-description"
            id="webhook-url"
            placeholder="https://example.com/webhook"
          />
          <FieldDescription>
            Events will be sent to this endpoint.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};
