"use client";

import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import {
  type Duration,
  durationMs,
  durations,
} from "@patternmode/motion/durations";
import { type Easing, easings } from "@patternmode/motion/easings";
import { type Preset, presets } from "@patternmode/motion/presets";
import { type SpringType, springs } from "@patternmode/motion/springs";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "../../components/button";
import { Stack } from "../../components/stack";
import { Text } from "../../components/text";
import { VariantGrid } from "../utils/variant-grid";

const meta = {
  title: "Motion/Tokens",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Animated box cell for motion previews */
function AnimatedBox({
  isAnimating,
  transition,
}: {
  isAnimating: boolean;
  transition: object;
}) {
  return (
    <div className="flex h-12 w-32 items-center overflow-hidden rounded bg-secondary px-2">
      <motion.div
        animate={isAnimating ? { x: 80 } : { x: 0 }}
        className="size-8 rounded bg-primary"
        transition={transition}
      />
    </div>
  );
}

function DurationsDemo() {
  const durationKeys = Object.keys(durations) as Duration[];
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text className="font-medium" size="lg">
          Duration Tokens
        </Text>
        <Text className="text-muted-foreground" size="sm">
          Controls how long an animation takes. Values in seconds for Framer
          Motion.
        </Text>
        <Button
          className="w-fit"
          onClick={() => setIsAnimating(!isAnimating)}
          size="sm"
        >
          {isAnimating ? "Reset" : "Animate"}
        </Button>
      </Stack>

      <VariantGrid
        columns={[
          { key: "seconds", label: "Seconds" },
          { key: "ms", label: "Milliseconds" },
          { key: "preview", label: "Preview" },
          { key: "usage", label: "Usage" },
        ]}
        renderCell={(rowKey, colKey) => {
          const key = rowKey as Duration;
          if (colKey === "seconds") {
            return (
              <Text className="font-mono" size="sm">
                {durations[key]}s
              </Text>
            );
          }
          if (colKey === "ms") {
            return (
              <Text className="font-mono text-muted-foreground" size="sm">
                {durationMs[key]}ms
              </Text>
            );
          }
          if (colKey === "preview") {
            return (
              <AnimatedBox
                isAnimating={isAnimating}
                transition={{
                  duration: durations[key],
                  ease: easings.smooth,
                }}
              />
            );
          }
          // Usage hints
          const usageHints: Record<Duration, string> = {
            instant: "Immediate state changes",
            quick: "Micro-interactions, hovers",
            normal: "Dialogs, sheets, reveals",
            moderate: "Page transitions",
            slow: "Emphasis, storytelling",
          };
          return (
            <Text className="text-muted-foreground" size="xs">
              {usageHints[key]}
            </Text>
          );
        }}
        rowLabels="Duration"
        rows={durationKeys.map((key) => ({
          key,
          label: (
            <Text className="font-medium capitalize" size="sm">
              {key}
            </Text>
          ),
        }))}
      />
    </Stack>
  );
}

/** Duration tokens */
export const Durations: Story = {
  render: () => <DurationsDemo />,
};

function EasingsDemo() {
  const easingKeys = Object.keys(easings) as Easing[];
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text className="font-medium" size="lg">
          Easing Curves
        </Text>
        <Text className="text-muted-foreground" size="sm">
          Controls acceleration and deceleration of animations. Cubic bezier
          values.
        </Text>
        <Button
          className="w-fit"
          onClick={() => setIsAnimating(!isAnimating)}
          size="sm"
        >
          {isAnimating ? "Reset" : "Animate"}
        </Button>
      </Stack>

      <VariantGrid
        columns={[
          { key: "bezier", label: "Bezier" },
          { key: "preview", label: "Preview" },
          { key: "usage", label: "Usage" },
        ]}
        renderCell={(rowKey, colKey) => {
          const key = rowKey as Easing;
          if (colKey === "bezier") {
            return (
              <Text className="font-mono text-muted-foreground" size="xs">
                {easings[key].join(", ")}
              </Text>
            );
          }
          if (colKey === "preview") {
            return (
              <AnimatedBox
                isAnimating={isAnimating}
                transition={{ duration: 0.6, ease: easings[key] }}
              />
            );
          }
          const usageHints: Record<Easing, string> = {
            smooth: "General purpose",
            customIn: "Entering elements",
            customOut: "Exiting elements",
            customExpand: "Complex transitions",
            customGentle: "Subtle animations",
          };
          return (
            <Text className="text-muted-foreground" size="xs">
              {usageHints[key]}
            </Text>
          );
        }}
        rowLabels="Easing"
        rows={easingKeys.map((key) => ({
          key,
          label: (
            <Text className="font-medium capitalize" size="sm">
              {key}
            </Text>
          ),
        }))}
      />
    </Stack>
  );
}

/** Easing curve tokens */
export const Easings: Story = {
  render: () => <EasingsDemo />,
};

function SpringsDemo() {
  const springKeys = Object.keys(springs) as SpringType[];
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text className="font-medium" size="lg">
          Spring Configurations
        </Text>
        <Text className="text-muted-foreground" size="sm">
          Physics-based animations with velocity-aware motion and bounce.
        </Text>
        <Button
          className="w-fit"
          onClick={() => setIsAnimating(!isAnimating)}
          size="sm"
        >
          {isAnimating ? "Reset" : "Animate"}
        </Button>
      </Stack>

      <VariantGrid
        columns={[
          { key: "stiffness", label: "Stiffness" },
          { key: "damping", label: "Damping" },
          { key: "mass", label: "Mass" },
          { key: "preview", label: "Preview" },
          { key: "usage", label: "Usage" },
        ]}
        renderCell={(rowKey, colKey) => {
          const key = rowKey as SpringType;
          const spring = springs[key];
          if (colKey === "stiffness") {
            return (
              <Text className="font-mono" size="sm">
                {spring.stiffness}
              </Text>
            );
          }
          if (colKey === "damping") {
            return (
              <Text className="font-mono" size="sm">
                {spring.damping}
              </Text>
            );
          }
          if (colKey === "mass") {
            return (
              <Text className="font-mono" size="sm">
                {spring.mass}
              </Text>
            );
          }
          if (colKey === "preview") {
            return (
              <AnimatedBox isAnimating={isAnimating} transition={spring} />
            );
          }
          const usageHints: Record<SpringType, string> = {
            soft: "Gentle reveals, loaders",
            subtle: "Professional, polished",
            natural: "Default choice",
            playful: "Fun, delightful",
            bouncy: "Visible bounce",
            snappy: "Quick feedback",
            stiff: "Quick, controlled",
            swift: "Instant, zero overshoot",
          };
          return (
            <Text className="text-muted-foreground" size="xs">
              {usageHints[key]}
            </Text>
          );
        }}
        rowLabels="Spring"
        rows={springKeys.map((key) => ({
          key,
          label: (
            <Text className="font-medium capitalize" size="sm">
              {key}
            </Text>
          ),
        }))}
      />
    </Stack>
  );
}

/** Spring configuration tokens */
export const Springs: Story = {
  render: () => <SpringsDemo />,
};

function PresetsDemo() {
  const presetKeys = Object.keys(presets) as Preset[];
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text className="font-medium" size="lg">
          Motion Presets
        </Text>
        <Text className="text-muted-foreground" size="sm">
          Semantic combinations of durations, easings, and springs for common
          patterns.
        </Text>
        <Button
          className="w-fit"
          onClick={() => setIsAnimating(!isAnimating)}
          size="sm"
        >
          {isAnimating ? "Reset" : "Animate"}
        </Button>
      </Stack>

      <VariantGrid
        columns={[
          { key: "config", label: "Configuration" },
          { key: "preview", label: "Preview" },
          { key: "usage", label: "Usage" },
        ]}
        renderCell={(rowKey, colKey) => {
          const key = rowKey as Preset;
          const preset = presets[key];
          if (colKey === "config") {
            return (
              <Text className="font-mono text-muted-foreground" size="xs">
                {JSON.stringify(preset)}
              </Text>
            );
          }
          if (colKey === "preview") {
            return (
              <AnimatedBox isAnimating={isAnimating} transition={preset} />
            );
          }
          const usageHints: Record<Preset, string> = {
            dialogOpen: "Opening dialogs/modals",
            dialogClose: "Closing dialogs/modals",
            hoverLift: "Primary hover effects",
            hoverSettle: "Secondary hover effects",
            slideIn: "Elements entering",
            slideOut: "Elements leaving",
            fadeIn: "Appearing elements",
            fadeOut: "Disappearing elements",
            shake: "Error/validation feedback",
          };
          return (
            <Text className="text-muted-foreground" size="xs">
              {usageHints[key]}
            </Text>
          );
        }}
        rowLabels="Preset"
        rows={presetKeys.map((key) => ({
          key,
          label: (
            <Text className="font-medium" size="sm">
              {key}
            </Text>
          ),
        }))}
      />
    </Stack>
  );
}

/** Motion presets (semantic combinations) */
export const Presets: Story = {
  render: () => <PresetsDemo />,
};
