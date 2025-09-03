"use client";

import React from "react";
import { getDynamicIconByName, IconSelect, useIconSelect } from "./component";

export const DefaultExample = () => {
  const [selectedIcon, setSelectedIcon] = React.useState<string>("");
  return (
    <div className="w-full max-w-96 space-y-4">
      <IconSelect
        onValueChange={setSelectedIcon}
        placeholder="Choose an icon..."
        value={selectedIcon}
      />
      {selectedIcon && (
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span>Selected:</span>
          <code className="rounded bg-zinc-100 px-2 py-1 text-xs">
            {selectedIcon}
          </code>
        </div>
      )}
    </div>
  );
};

export const WithValueExample = () => {
  const [selectedIcon, setSelectedIcon] = React.useState<string>("Camera");
  return (
    <div className="w-full max-w-96 space-y-4">
      <IconSelect
        onValueChange={setSelectedIcon}
        placeholder="Choose an icon..."
        value={selectedIcon}
      />
      <div className="flex items-center gap-2 text-sm text-zinc-600">
        <span>Selected:</span>
        <code className="rounded bg-zinc-100 px-2 py-1 text-xs">
          {selectedIcon}
        </code>
      </div>
    </div>
  );
};

export const CustomPlaceholderExample = () => {
  const [selectedIcon, setSelectedIcon] = React.useState<string>("");
  return (
    <div className="w-full max-w-96 space-y-4">
      <IconSelect
        onValueChange={setSelectedIcon}
        placeholder="Select a button icon..."
        value={selectedIcon}
      />
      {selectedIcon && (
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span>Selected:</span>
          <code className="rounded bg-zinc-100 px-2 py-1 text-xs">
            {selectedIcon}
          </code>
        </div>
      )}
    </div>
  );
};

export const DisabledExample = () => (
  <div className="w-full max-w-96">
    <IconSelect
      disabled={true}
      placeholder="This is disabled..."
      value="Settings"
    />
  </div>
);

export const HookExample = () => {
  const { value, setValue, DynamicIconComponent } = useIconSelect("Heart");
  return (
    <div className="w-full max-w-96 space-y-4">
      <IconSelect
        onValueChange={setValue}
        placeholder="Choose an icon..."
        value={value}
      />
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span>Selected:</span>
          <code className="rounded bg-zinc-100 px-2 py-1 text-xs">
            {value || "None"}
          </code>
        </div>
        {DynamicIconComponent && (
          <div className="flex items-center gap-2 rounded-lg bg-zinc-50 p-3">
            <span className="text-sm text-zinc-600">Rendered icon:</span>
            <DynamicIconComponent className="h-6 w-6 text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export const SizesExample = () => {
  const [xsValue, setXsValue] = React.useState<string>("");
  const [smValue, setSmValue] = React.useState<string>("");
  const [baseValue, setBaseValue] = React.useState<string>("");
  const [lgValue, setLgValue] = React.useState<string>("");
  return (
    <div className="w-full max-w-96 space-y-4">
      <div className="w-44">
        <label className="mb-1 block font-medium text-xs">Extra Small</label>
        <IconSelect
          onValueChange={setXsValue}
          placeholder="Extra small icon select"
          size="xs"
          value={xsValue}
        />
      </div>
      <div className="w-48">
        <label className="mb-1 block font-medium text-xs">Small</label>
        <IconSelect
          onValueChange={setSmValue}
          placeholder="Small icon select"
          size="sm"
          value={smValue}
        />
      </div>
      <div className="w-56">
        <label className="mb-1 block font-medium text-sm">Base (Default)</label>
        <IconSelect
          onValueChange={setBaseValue}
          placeholder="Base icon select"
          size="base"
          value={baseValue}
        />
      </div>
      <div className="w-64">
        <label className="mb-1 block font-medium text-base">Large</label>
        <IconSelect
          onValueChange={setLgValue}
          placeholder="Large icon select"
          size="lg"
          value={lgValue}
        />
      </div>
    </div>
  );
};

export const DynamicIconExample = () => {
  const [iconName, setIconName] = React.useState<string>("Star");
  const StarIcon = getDynamicIconByName("Star");
  const HeartIcon = getDynamicIconByName("Heart");
  const BellIcon = getDynamicIconByName("Bell");
  return (
    <div className="w-full max-w-96 space-y-4">
      <IconSelect
        onValueChange={setIconName}
        placeholder="Choose an icon to render..."
        value={iconName}
      />
      <div className="space-y-3">
        <div className="text-sm text-zinc-600">Dynamic icon rendering:</div>
        <div className="flex items-center gap-4 rounded-lg bg-zinc-50 p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">Current:</span>
            {(() => {
              const CurrentIcon = getDynamicIconByName(iconName);
              return <CurrentIcon className="h-6 w-6 text-blue-500" />;
            })()}
          </div>
          <div className="h-6 w-px bg-zinc-300" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">Static examples:</span>
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <HeartIcon className="h-5 w-5 text-red-500" />
            <BellIcon className="h-5 w-5 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
