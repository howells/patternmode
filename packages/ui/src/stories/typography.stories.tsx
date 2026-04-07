import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { SimpleGrid } from "../components/simple-grid";
import { Stack } from "../components/stack";
import { Text } from "../components/text";

const meta = {
  title: "Design System/Typography",
  parameters: {
    builder: {
      category: "container",
      icon: "puzzle",
    },

    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

interface TypeRowProps {
  details: string;
  name: string;
  size: string;
  suggested?: string;
  textClass: string;
}

function TypeRow({ name, size, textClass, details, suggested }: TypeRowProps) {
  return (
    <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_140px_50px_180px] items-baseline gap-4 border-border border-b py-4">
      <Text className="font-mono text-muted-foreground" size="xs">
        {size}
      </Text>
      <Text className={`${textClass} font-bold`}>{name}</Text>
      <Text className={`${textClass} font-semibold`}>{name}</Text>
      <Text className={`${textClass} font-medium`}>{name}</Text>
      <Text className={`${textClass} font-normal`}>{name}</Text>
      <Text className="font-mono text-muted-foreground" size="xs">
        {textClass}
      </Text>
      <Text className="font-mono text-muted-foreground" size="xs">
        {suggested}
      </Text>
      <Text className="font-mono text-muted-foreground" size="xs">
        {details}
      </Text>
    </div>
  );
}

export const Scale: Story = {
  render: () => (
    <Stack gap="none">
      {/* Header */}
      <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_140px_50px_180px] items-baseline gap-4 border-border border-b py-3">
        <Text className="font-mono text-muted-foreground" size="xs">
          Size
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Bold
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Semibold
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Medium
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Regular
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Class
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Level
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Details
        </Text>
      </div>

      <TypeRow
        details="Line-height: 16"
        name="Caption"
        size="2xs"
        textClass="text-caption"
      />
      <TypeRow
        details="Line-height: 20"
        name="Paragraph Small"
        size="sm"
        textClass="text-paragraph-sm"
      />
      <TypeRow
        details="Line-height: 24"
        name="Paragraph Base"
        size="base"
        textClass="text-paragraph"
      />
      <TypeRow
        details="Line-height: 24"
        name="Paragraph Large"
        size="lg"
        textClass="text-paragraph-lg"
      />
      <TypeRow
        details="Line-height: 28 / -1%"
        name="Subheading"
        size="xl"
        suggested="h6"
        textClass="text-subheading"
      />
      <TypeRow
        details="Line-height: 32 / -1%"
        name="Subheading Large"
        size="2xl"
        suggested="h5"
        textClass="text-subheading-lg"
      />
      <TypeRow
        details="Line-height: 36 / -1%"
        name="Heading Small"
        size="3xl"
        suggested="h4"
        textClass="text-heading-sm"
      />
      <TypeRow
        details="Line-height: 44 / -1%"
        name="Heading"
        size="xl"
        suggested="h3"
        textClass="text-heading"
      />
      <TypeRow
        details="Line-height: 56 / -2%"
        name="Heading Large"
        size="2xl"
        suggested="h2"
        textClass="text-heading-lg"
      />
      <TypeRow
        details="Line-height: 72 / -2%"
        name="Title"
        size="3xl"
        suggested="h1"
        textClass="text-title"
      />
    </Stack>
  ),
};

export const Mono: Story = {
  render: () => (
    <Stack gap="none">
      {/* Header */}
      <div className="grid grid-cols-[50px_1fr_200px_180px] items-baseline gap-4 border-border border-b py-3">
        <Text className="font-mono text-muted-foreground" size="xs">
          Size
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Regular
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Class
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Details
        </Text>
      </div>

      <div className="grid grid-cols-[50px_1fr_200px_180px] items-baseline gap-4 border-border border-b py-4">
        <Text className="font-mono text-muted-foreground" size="xs">
          14
        </Text>
        <Text className="font-mono text-paragraph-sm">Mono Small</Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          font-mono text-paragraph-sm
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Line-height: 20
        </Text>
      </div>

      <div className="grid grid-cols-[50px_1fr_200px_180px] items-baseline gap-4 border-border border-b py-4">
        <Text className="font-mono text-muted-foreground" size="xs">
          12
        </Text>
        <Text className="font-mono text-caption">Mono Caption</Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          font-mono text-caption
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          Line-height: 16
        </Text>
      </div>
    </Stack>
  ),
};

export const Weights: Story = {
  render: () => (
    <SimpleGrid cols={4} gap="lg">
      <Stack gap="xs">
        <Text className="font-bold" size="lg">
          Bold (700)
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          font-bold
        </Text>
      </Stack>
      <Stack gap="xs">
        <Text className="font-semibold" size="lg">
          Semibold (600)
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          font-semibold
        </Text>
      </Stack>
      <Stack gap="xs">
        <Text className="font-medium" size="lg">
          Medium (500)
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          font-medium
        </Text>
      </Stack>
      <Stack gap="xs">
        <Text className="font-normal" size="lg">
          Regular (400)
        </Text>
        <Text className="font-mono text-muted-foreground" size="xs">
          font-normal
        </Text>
      </Stack>
    </SimpleGrid>
  ),
};
