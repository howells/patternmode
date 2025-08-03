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
} from "./component";

export const DefaultExample = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const WithGroupsExample = () => {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>North America</SelectGroupLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Europe & Africa</SelectGroupLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const SmallSizeExample = () => {
  return (
    <Select>
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="xs">Extra Small</SelectItem>
        <SelectItem value="sm">Small</SelectItem>
        <SelectItem value="md">Medium</SelectItem>
        <SelectItem value="lg">Large</SelectItem>
        <SelectItem value="xl">Extra Large</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const ErrorStateExample = () => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        Required Field *
      </label>
      <Select>
        <SelectTrigger hasError className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-red-600">This field is required.</p>
    </div>
  );
};

export const DisabledExample = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Disabled Select
        </label>
        <Select disabled>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Disabled with Value
        </label>
        <Select disabled defaultValue="option1">
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Selected Option</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const FormSelectExample = () => {
  return (
    <form className="space-y-6 p-4 border rounded-lg">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Country
        </label>
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="fr">France</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Plan Type
        </label>
        <Select defaultValue="pro">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free Plan</SelectItem>
            <SelectItem value="pro">Pro Plan</SelectItem>
            <SelectItem value="enterprise">Enterprise Plan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Submit
      </button>
    </form>
  );
};
