"use client";

import { PageHeader } from "@/components/page-header";
import { Stack, HStack } from "@patternmode/ui/components/stack";
import { ToggleGroup, ToggleGroupItem } from "@patternmode/ui/components/toggle-group";
import { Rows3, MoreHorizontal, Copy } from "lucide-react";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import type { Size } from "@patternmode/ui/lib/component-config-types";
import { sizes } from "@patternmode/ui/lib/component-config-types";

// Import component previews
import { ButtonPreview } from "@patternmode/ui/components/button/preview";
import { InputPreview } from "@patternmode/ui/components/input/preview";
import { ComboboxPreview } from "@patternmode/ui/components/combobox/preview";
import { CheckboxPreview } from "@patternmode/ui/components/checkbox/preview";
import { RadioPreview } from "@patternmode/ui/components/radio/preview";
import { AvatarPreview } from "@patternmode/ui/components/avatar/preview";
import { CopyButtonPreview } from "@patternmode/ui/components/copy-button/preview";
import { DatePickerPreview } from "@patternmode/ui/components/date-picker/preview";
import { IconContainerPreview } from "@patternmode/ui/components/icon-container/preview";
import { SelectPreview } from "@patternmode/ui/components/select/preview";
import { SelectNativePreview } from "@patternmode/ui/components/select-native/preview";
import { SplitButtonPreview } from "@patternmode/ui/components/split-button/preview";


export default function LayoutPage() {
  const [direction, setDirection] = useQueryState(
    "direction",
    parseAsStringLiteral(["vertical", "horizontal"] as const).withDefault("horizontal")
  );
  const [size, setSize] = useQueryState(
    "size",
    parseAsStringLiteral(sizes).withDefault("base")
  );

  const components = [
    { name: "Button", component: <ButtonPreview size={size} /> },
    { name: "Input", component: <InputPreview size={size} /> },
    { name: "Select", component: <SelectPreview size={size} /> },
    { name: "Select Native", component: <SelectNativePreview size={size} /> },
    { name: "Combobox", component: <ComboboxPreview size={size} /> },
    { name: "Checkbox", component: <CheckboxPreview /> },
    { name: "Radio", component: <RadioPreview value="option1" label="Radio Option" size={size} /> },
    { name: "Avatar", component: <AvatarPreview size={size} /> },
    { name: "Copy Button", component: <CopyButtonPreview text="Copy me" /> },
    { name: "Date Picker", component: <DatePickerPreview size={size} /> },
    { name: "Icon Container", component: <IconContainerPreview icon={Copy} size={size === "xs" ? "sm" : size} /> },
    { name: "Split Button", component: <SplitButtonPreview size={size} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Sizing Comparison"
        description="Compare component sizes side-by-side to ensure visual consistency across the design system."
      />
      <div className="p-8">
        <HStack>
          <ToggleGroup
            value={[direction]}
            onValueChange={(value) => {
              if (value.length > 0) {
                setDirection(value[0] as "vertical" | "horizontal");
              }
            }}
            size="sm"
          >
            <ToggleGroupItem value="horizontal" leftIcon={MoreHorizontal}>
              Horizontal
            </ToggleGroupItem>
            <ToggleGroupItem value="vertical" leftIcon={Rows3}>
              Vertical
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup
            value={[size]}
            onValueChange={(value) => {
              if (value.length > 0) {
                setSize(value[0] as Size);
              }
            }}
            size="sm"
          >
            <ToggleGroupItem value="xs">X Small</ToggleGroupItem>
            <ToggleGroupItem value="sm">Small</ToggleGroupItem>
            <ToggleGroupItem value="base">Base</ToggleGroupItem>
            <ToggleGroupItem value="lg">Large</ToggleGroupItem>
          </ToggleGroup>
        </HStack>

        <Stack
          direction={direction}
          gap={2}
          align={direction === "horizontal" ? "center" : "start"}
          className="flex-wrap"
        >
          {components.map(({ name, component }) => (
            <div key={name}>
              {component}
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
}