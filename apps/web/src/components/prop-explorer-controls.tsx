"use client";

import {
  Button, DatePicker, Field, FieldControl, FieldDescription, FieldLabel, IconSelect, Input, NumberField, Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, Subheading, Switch, Text, Textarea, Tooltip
} from "@patternmode/ui";
import { HelpCircle } from "lucide-react";
import React from "react";
import { ComponentConfig } from "../../../../packages/ui/src/lib/component-config-types";
import { PropMetadata } from "../lib/prop-explorer";
import { cx } from "../lib/utils";
import { usePropExplorer } from "./prop-explorer-context";

interface PropExplorerContentProps {
  config?: ComponentConfig;
}

// Reusable wrapper component to reduce duplication
interface PropFieldProps {
  prop: PropMetadata;
  children: React.ReactNode;
  className?: string;
}

function PropField({ prop, children, className }: PropFieldProps) {
  return (
    <div className="space-y-2">
      <Field className={cx("gap-y-2 flex flex-col", className)}>
        <div className="flex items-center gap-1">
          <FieldLabel>{prop.name}</FieldLabel>
          {prop.description && (
            <Tooltip content={prop.description}>
              <HelpCircle className="size-3 text-zinc-500 dark:text-zinc-400" />
            </Tooltip>
          )}
        </div>
        {children}
      </Field>
    </div>
  );
}

// Helper function to get string options from a prop
function getStringOptions(prop: PropMetadata): string[] {
  if (!prop.options) return [];
  if (typeof prop.options[0] === "string") {
    return prop.options as string[];
  }
  // If it's VariantOption[], extract the value property
  return (prop.options as { value: string }[]).map((opt) => opt.value);
}

// Helper component to prevent render function recreation
function IconSelectControl({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return <IconSelect value={value} onValueChange={onValueChange} />;
}

export function PropExplorerContent({ config }: PropExplorerContentProps) {
  const { props, updateProp, resetProps } = usePropExplorer();

  if (!config || !config.props) {
    return (
      <div className="space-y-6">
        <Text>No configurable properties available for this component.</Text>
      </div>
    );
  }

  // Check if component supports icons
  const supportsIcons = config.props.some(
    (prop: PropMetadata) => prop.name === "icon" || prop.name.endsWith("Icon")
  );

  // Check if component supports children
  const supportsChildren = config.props.some(
    (prop: PropMetadata) => prop.name === "children"
  );

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Subheading level={3}>Props</Subheading>
        <Button onClick={resetProps} variant="ghost">
          Reset
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-col space-y-4">
        {/* Props */}
        {config.props.map((prop: PropMetadata) => {
          const currentValue = props[prop.name];

          // Handle different prop types
          if (prop.type === "boolean") {
            return (
              <PropField key={prop.name} prop={prop}>
                <FieldControl
                  render={() => (
                    <Switch
                      checked={currentValue === true}
                      onCheckedChange={(checked) =>
                        updateProp(prop.name, checked)
                      }
                    />
                  )}
                />
              </PropField>
            );
          }

          if (prop.type === "select" && prop.options) {
            const options = getStringOptions(prop);
            return (
              <PropField key={prop.name} prop={prop}>
                <FieldControl
                  render={() => (
                    <Select
                      value={(currentValue as string) ?? ""}
                      onValueChange={(value) => updateProp(prop.name, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option: string) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </PropField>
            );
          }

          if (prop.type === "icon") {
            return (
              <PropField key={prop.name} prop={prop}>
                <FieldControl
                  render={() => (
                    <IconSelectControl
                      value={currentValue as string}
                      onValueChange={(value) => updateProp(prop.name, value)}
                    />
                  )}
                />
              </PropField>
            );
          }

          if (prop.type === "number") {
            return (
              <PropField key={prop.name} prop={prop}>
                <FieldControl
                  render={() => (
                    <NumberField
                      value={currentValue as number}
                      onValueChange={(value) => updateProp(prop.name, value)}
                      placeholder={String(prop.defaultValue || "")}
                      min={prop.min}
                      max={prop.max}
                      fullWidth
                    />
                  )}
                />
              </PropField>
            );
          }

          if (prop.type === "date") {
            return (
              <PropField key={prop.name} prop={prop}>
                <FieldControl
                  render={() => (
                    <DatePicker
                      value={currentValue as Date | undefined}
                      onChange={(date) => updateProp(prop.name, date)}
                      placeholder="Select date"
                    />
                  )}
                />
              </PropField>
            );
          }

          if (prop.type === "textarea") {
            return (
              <PropField key={prop.name} prop={prop}>
                <FieldControl
                  render={(controlProps) => {
                    const { children, ...inputProps } = controlProps;
                    return (
                      <Textarea
                        {...inputProps}
                        value={(currentValue as string) || ""}
                        onChange={(e) => updateProp(prop.name, e.target.value)}
                        placeholder={prop.defaultValue as string}
                      />
                    );
                  }}
                />
              </PropField>
            );
          }

          // Default to string input
          return (
            <PropField key={prop.name} prop={prop}>
              <FieldControl
                render={(controlProps) => {
                  const { children, ...inputProps } = controlProps;
                  return (
                    <Input
                      {...inputProps}
                      value={(currentValue as string) || ""}
                      onChange={(e) => updateProp(prop.name, e.target.value)}
                      placeholder={prop.defaultValue as string}
                    />
                  );
                }}
              />
            </PropField>
          );
        })}
      </div>
    </div>
  );
}
