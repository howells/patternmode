"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

export function DefaultSelect({
  size,
  ...props
}: { size?: "default" | "sm" } & React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger size={size}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="date">Date</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function SelectWithGroups({
  size,
  ...props
}: { size?: "default" | "sm" } & React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger size={size}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>Primary Colors</SelectGroupLabel>
          <SelectItem value="red">Red</SelectItem>
          <SelectItem value="blue">Blue</SelectItem>
          <SelectItem value="yellow">Yellow</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Secondary Colors</SelectGroupLabel>
          <SelectItem value="green">Green</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="purple">Purple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function DisabledSelect({
  size,
  ...props
}: { size?: "default" | "sm" } & React.ComponentProps<typeof Select>) {
  return (
    <Select disabled {...props}>
      <SelectTrigger size={size}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function SelectErrorState({
  size,
  ...props
}: { size?: "default" | "sm" } & React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger hasError size={size}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function SelectWithDefaultValue({
  size,
  ...props
}: { size?: "default" | "sm" } & React.ComponentProps<typeof Select>) {
  return (
    <Select defaultValue="medium" {...props}>
      <SelectTrigger size={size}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="small">Small</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="large">Large</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function SmallSizeExample({
  size = "sm",
  ...props
}: { size?: "default" | "sm" } & React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger size={size}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}

// Config example ID: "default" -> export name: DefaultExample
export function DefaultExample() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  );
}

// Config example ID: "with-groups" -> export name: WithGroupsExample
export function WithGroupsExample() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>North America</SelectGroupLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Europe & Africa</SelectGroupLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Config example ID: "small-size" -> export name: SmallSizeExample
export function SmallSizeExample() {
  return (
    <Select>
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue placeholder="Small select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}

// Config example ID: "form-select" -> export name: FormSelectExample
export function FormSelectExample() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-md border border-zinc-300 px-3 py-2"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Country</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}

// Main component for the component explorer
export const SelectExample = DefaultSelect;
