import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import { Stack } from "../../components/stack";
import { Text } from "../../components/text";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp-root";

interface InputOTPStoryArgs {
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  maxLength: number;
}

const meta: Meta<InputOTPStoryArgs> = {
  title: "InputOtp",
  argTypes: {
    // Behavior
    maxLength: {
      control: "number",
      description: "Maximum number of characters (slots)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the OTP input",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    containerClassName: { table: { disable: true } },
  },
  args: {
    maxLength: 6,
    disabled: false,
  },
  parameters: {
    builder: {
      category: "form",
      icon: "key-round",
    },
    docs: {
      description: {
        component:
          "One-time password input component for verification codes. Supports grouped slots with optional separators.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<InputOTPStoryArgs>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args: InputOTPStoryArgs) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args: InputOTPStoryArgs) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/**
 * Four digit PIN code.
 */
export const FourDigit: Story = {
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Simple 4-digit PIN code without separators.",
      },
    },
  },
  render: () => (
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/**
 * Six digit code with separator.
 */
export const SixDigit: Story = {
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Standard 6-digit verification code with separator.",
      },
    },
  },
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/**
 * Controlled example with value display.
 */
export const Controlled: Story = {
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Controlled OTP input showing the current value.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Stack gap="base">
        <InputOTP maxLength={6} onChange={setValue} value={value}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Text color="muted" size="sm">
          Current value: {value || "(empty)"}
        </Text>
      </Stack>
    );
  },
};

/**
 * Layout variations.
 */
export const Layouts: Story = {
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Different layout options: no separator, single separator, multiple groups.",
      },
    },
  },
  render: () => (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text color="muted" size="xs">
          No separator
        </Text>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Stack>
      <Stack gap="xs">
        <Text color="muted" size="xs">
          With separator (3-3)
        </Text>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Stack>
      <Stack gap="xs">
        <Text color="muted" size="xs">
          Multiple separators (2-2-2)
        </Text>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Stack>
    </Stack>
  ),
};
