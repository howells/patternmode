"use client";

import type { PropMetadata } from "@patternmode/ui/lib/component-config-types";

import React from "react";

import { ControlFactory } from "./controls/control-factory";
import { PropField } from "./controls/prop-field";
import { usePreview } from "./preview-context";

type PreviewConfig = {
  componentName: string;
  props: Record<string, PropMetadata>;
};

type PreviewControlsProps = {
  config?: PreviewConfig;
};

export function PreviewControls({ config }: PreviewControlsProps) {
  const { props, updateProp, resetProps } = usePreview();

  if (!config) {
    return null;
  }

  const propEntries = Object.entries(config.props);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Props</h3>
        <button
          onClick={resetProps}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset
        </button>
      </div>

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
    </div>
  );
}
