import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Button } from "../../components/button";
import { radii } from "../../lib/radii";
import { shadows } from "../../lib/shadows";
import {
  MorphDialog,
  MorphDialogContent,
  MorphDialogDescription,
  MorphDialogTitle,
  MorphDialogTrigger,
} from "./morph-dialog";

const meta: Meta<typeof MorphDialog> = {
  title: "MorphDialog",
  component: MorphDialog,
  parameters: {
    builder: {
      category: "feedback",
      icon: "square",
    },
    docs: {
      description: {
        component:
          "Animated dialog that morphs from trigger element using shared layout animations.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base morph dialog example.
 */
export const Base: Story = {
  render: () => (
    <MorphDialog>
      <MorphDialogTrigger
        className="cursor-pointer"
        style={{ borderRadius: radii["2xl"], boxShadow: shadows.md }}
      >
        <div className="w-64 rounded-2xl border border-border bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
          <h3 className="font-semibold">Click to expand</h3>
          <p className="text-muted-foreground text-sm">
            This card morphs into a dialog
          </p>
        </div>
      </MorphDialogTrigger>

      <MorphDialogContent>
        <MorphDialogTitle visuallyHidden>Example Dialog</MorphDialogTitle>
        <MorphDialogDescription visuallyHidden>
          A dialog that morphed from the trigger card.
        </MorphDialogDescription>
        <div className="p-6">
          <h2 className="mb-4 font-semibold text-xl">Dialog Content</h2>
          <p className="text-muted-foreground">
            This dialog morphed from the trigger card using shared layout
            animations. Click outside or the X to close.
          </p>
        </div>
      </MorphDialogContent>
    </MorphDialog>
  ),
};

/**
 * Bottom-positioned dialog (mobile-friendly).
 */
export const BottomPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use position='bottom' for mobile-friendly thumb reach.",
      },
    },
  },
  render: () => (
    <MorphDialog>
      <MorphDialogTrigger
        className="cursor-pointer"
        style={{ borderRadius: radii.xl, boxShadow: shadows.sm }}
      >
        <Button>Open Bottom Dialog</Button>
      </MorphDialogTrigger>

      <MorphDialogContent position="bottom">
        <MorphDialogTitle visuallyHidden>Bottom Dialog</MorphDialogTitle>
        <MorphDialogDescription visuallyHidden>
          A dialog anchored near the bottom of the screen.
        </MorphDialogDescription>
        <div className="p-6">
          <h2 className="mb-4 font-semibold text-lg">Bottom Position</h2>
          <p className="text-muted-foreground">
            This dialog appears near the bottom of the screen.
          </p>
        </div>
      </MorphDialogContent>
    </MorphDialog>
  ),
};
