"use client";

import type { PreviewProps } from "@/types/preview-props";

import { VStack } from "@patternmode/stack";
import { Subheading } from "@patternmode/subheading";
import React from "react";

import { ControlFactory } from "./controls/control-factory";
import { PropField } from "./controls/prop-field";
import { usePreview } from "./preview-context";

type PreviewConfig = {
  componentName: string;
  props: Record<string, PreviewProps>;
};

type PreviewControlsProps = {
  config?: PreviewConfig;
};

export function PreviewControls({ config }: PreviewControlsProps) {
  const { props, updateProp, resetProps: _resetProps } = usePreview();

  if (!config) {
    return null;
  }

  const propEntries = Object.entries(config.props);

  return (
    <VStack>
      <Subheading>Props</Subheading>

      <div className="space-y-3">
        {propEntries.map(([propKey, metadata]) => (
          <PropField
            key={propKey}
            prop={metadata}
          >
            <ControlFactory
              prop={metadata}
              currentValue={props[propKey]}
              onValueChange={value => updateProp(propKey, value)}
              componentName={config.componentName}
            />
          </PropField>
        ))}
      </div>
    </VStack>
  );
}
