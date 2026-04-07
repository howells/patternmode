import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { toast } from "sonner";
import { Button } from "../button";
import { Flex } from "../flex";
import { Toaster } from "./sonner-root";

interface SonnerStoryArgs {
  bottomRightButtonText?: string;
  bottomRightMessage?: string;
  buttonText?: string;
  defaultMessage?: string;
  errorActionLabel?: string;
  errorButtonText?: string;
  errorDescription?: string;
  errorMessage?: string;
  errorTitle?: string;
  infoMessage?: string;
  loadingMessage?: string;
  normalButtonText?: string;
  normalMessage?: string;
  persistentButtonText?: string;
  persistentMessage?: string;
  quickButtonText?: string;
  quickMessage?: string;
  successActionLabel?: string;
  successButtonText?: string;
  successDescription?: string;
  successMessage?: string;
  successTitle?: string;
  toastMessage?: string;
  topLeftButtonText?: string;
  topLeftMessage?: string;
  warningMessage?: string;
}

const meta: Meta<SonnerStoryArgs> = {
  title: "Sonner",
  parameters: {
    builder: {
      category: "feedback",
      icon: "bell",
    },

    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sonner provides toast notifications for user feedback. It supports multiple variants, actions, and can be positioned anywhere on screen. Toaster must be included in your app layout.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative flex min-h-[400px] items-start p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    buttonText: "Show Toast",
    toastMessage: "This is a default toast",
  },
  argTypes: {
    buttonText: { control: "text" },
    toastMessage: { control: "text" },
  },
  render: (args) => (
    <>
      <Button onClick={() => toast(args.toastMessage)}>
        {args.buttonText}
      </Button>
      <Toaster />
    </>
  ),
};

export const Variants: Story = {
  args: {
    defaultMessage: "Default toast message",
    successMessage: "Changes saved successfully",
    errorMessage: "Failed to save changes",
    warningMessage: "This action cannot be undone",
    infoMessage: "New update available",
  },
  argTypes: {
    defaultMessage: { control: "text" },
    successMessage: { control: "text" },
    errorMessage: { control: "text" },
    warningMessage: { control: "text" },
    infoMessage: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story: "Toast supports different variants for different message types.",
      },
    },
  },
  render: (args) => (
    <>
      <Flex gap="2xl" wrap="wrap">
        <Button onClick={() => toast(args.defaultMessage)}>Default</Button>
        <Button onClick={() => toast.success(args.successMessage)}>
          Success
        </Button>
        <Button onClick={() => toast.error(args.errorMessage)}>Error</Button>
        <Button onClick={() => toast.warning(args.warningMessage)}>
          Warning
        </Button>
        <Button onClick={() => toast.info(args.infoMessage)}>Info</Button>
      </Flex>
      <Toaster />
    </>
  ),
};

export const WithDescription: Story = {
  args: {
    successTitle: "Changes saved",
    successDescription: "Your profile has been updated successfully.",
    successButtonText: "With Description",
    errorTitle: "Upload failed",
    errorDescription: "File size exceeds the 10MB limit.",
    errorButtonText: "Error with Details",
  },
  argTypes: {
    successTitle: { control: "text" },
    successDescription: { control: "text" },
    successButtonText: { control: "text" },
    errorTitle: { control: "text" },
    errorDescription: { control: "text" },
    errorButtonText: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Toasts can include additional description text for more context.",
      },
    },
  },
  render: (args) => (
    <>
      <Flex gap="2xl" wrap="wrap">
        <Button
          onClick={() =>
            toast.success(args.successTitle, {
              description: args.successDescription,
            })
          }
        >
          {args.successButtonText}
        </Button>
        <Button
          onClick={() =>
            toast.error(args.errorTitle, {
              description: args.errorDescription,
            })
          }
        >
          {args.errorButtonText}
        </Button>
      </Flex>
      <Toaster />
    </>
  ),
};

export const WithAction: Story = {
  args: {
    successMessage: "Event created",
    successActionLabel: "View",
    successButtonText: "With Action",
    errorMessage: "Failed to delete",
    errorActionLabel: "Retry",
    errorButtonText: "Error with Retry",
  },
  argTypes: {
    successMessage: { control: "text" },
    successActionLabel: { control: "text" },
    successButtonText: { control: "text" },
    errorMessage: { control: "text" },
    errorActionLabel: { control: "text" },
    errorButtonText: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story: "Toasts can include action buttons for user interaction.",
      },
    },
  },
  render: (args) => (
    <>
      <Flex gap="2xl" wrap="wrap">
        <Button
          onClick={() =>
            toast(args.successMessage, {
              action: {
                label: args.successActionLabel,
                onClick: () => console.log("View clicked"),
              },
            })
          }
        >
          {args.successButtonText}
        </Button>
        <Button
          onClick={() =>
            toast.error(args.errorMessage, {
              action: {
                label: args.errorActionLabel,
                onClick: () => console.log("Retry clicked"),
              },
            })
          }
        >
          {args.errorButtonText}
        </Button>
      </Flex>
      <Toaster />
    </>
  ),
};

export const Loading: Story = {
  args: {
    buttonText: "Upload with Promise",
    loadingMessage: "Uploading file…",
    successMessage: "File uploaded successfully",
    errorMessage: "Upload failed",
  },
  argTypes: {
    buttonText: { control: "text" },
    loadingMessage: { control: "text" },
    successMessage: { control: "text" },
    errorMessage: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Show loading state with promise-based toasts that update automatically.",
      },
    },
  },
  render: (args) => (
    <>
      <Button
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: args.loadingMessage,
            success: args.successMessage,
            error: args.errorMessage,
          })
        }
      >
        {args.buttonText}
      </Button>
      <Toaster />
    </>
  ),
};

export const Positions: Story = {
  args: {
    topLeftMessage: "Top left toast",
    topLeftButtonText: "Top Left (see code)",
    bottomRightMessage: "Bottom right toast",
    bottomRightButtonText: "Bottom Right (see code)",
  },
  argTypes: {
    topLeftMessage: { control: "text" },
    topLeftButtonText: { control: "text" },
    bottomRightMessage: { control: "text" },
    bottomRightButtonText: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story: "Control toast position using the position prop on Toaster.",
      },
    },
  },
  render: (args) => (
    <>
      <Flex gap="2xl" wrap="wrap">
        <Button onClick={() => toast(args.topLeftMessage)}>
          {args.topLeftButtonText}
        </Button>
        <Button onClick={() => toast(args.bottomRightMessage)}>
          {args.bottomRightButtonText}
        </Button>
      </Flex>
      <Toaster position="bottom-right" />
    </>
  ),
};

export const Duration: Story = {
  args: {
    quickMessage: "Quick toast",
    quickButtonText: "1 second",
    normalMessage: "Normal toast",
    normalButtonText: "3 seconds",
    persistentMessage: "Persistent toast",
    persistentButtonText: "Infinite (must dismiss)",
  },
  argTypes: {
    quickMessage: { control: "text" },
    quickButtonText: { control: "text" },
    normalMessage: { control: "text" },
    normalButtonText: { control: "text" },
    persistentMessage: { control: "text" },
    persistentButtonText: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Control how long toasts remain visible with the duration option.",
      },
    },
  },
  render: (args) => (
    <>
      <Flex gap="2xl" wrap="wrap">
        <Button onClick={() => toast(args.quickMessage, { duration: 1000 })}>
          {args.quickButtonText}
        </Button>
        <Button onClick={() => toast(args.normalMessage, { duration: 3000 })}>
          {args.normalButtonText}
        </Button>
        <Button
          onClick={() =>
            toast(args.persistentMessage, {
              duration: Number.POSITIVE_INFINITY,
            })
          }
        >
          {args.persistentButtonText}
        </Button>
      </Flex>
      <Toaster />
    </>
  ),
};
