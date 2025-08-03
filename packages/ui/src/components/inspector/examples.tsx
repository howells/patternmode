"use client";

import { File, Paintbrush, Settings, X } from "lucide-react";
import React from "react";
import {
  Inspector,
  InspectorBody,
  InspectorGroup,
  InspectorHeader,
  InspectorSection,
  InspectorToggle,
} from "./component";

export const BasicExample = () => {
  return (
    <div className="h-96 w-80">
      <Inspector>
        <InspectorHeader>
          <h2 className="text-lg font-medium">Properties</h2>
        </InspectorHeader>
        <InspectorBody>
          <InspectorSection>
            <InspectorGroup>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Width
              </label>
              <input
                type="number"
                defaultValue={320}
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-sm"
              />
            </InspectorGroup>
            <InspectorGroup>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Height
              </label>
              <input
                type="number"
                defaultValue={240}
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-sm"
              />
            </InspectorGroup>
          </InspectorSection>
        </InspectorBody>
      </Inspector>
    </div>
  );
};

export const DesignToolExample = () => {
  const [display, setDisplay] = React.useState("block");
  const [fontSize, setFontSize] = React.useState(16);

  return (
    <div className="h-96 w-80">
      <Inspector>
        <InspectorHeader>
          <div className="flex items-center gap-2">
            <Paintbrush className="w-4 h-4" />
            <span className="text-lg font-medium">Element Inspector</span>
          </div>
        </InspectorHeader>
        <InspectorBody>
          <InspectorSection>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Layout
            </h3>
            <InspectorGroup>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Display
              </label>
              <select
                value={display}
                onChange={e => setDisplay(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-sm"
              >
                <option value="block">Block</option>
                <option value="flex">Flex</option>
                <option value="grid">Grid</option>
              </select>
            </InspectorGroup>
          </InspectorSection>

          <InspectorSection>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Typography
            </h3>
            <InspectorGroup>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="48"
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </InspectorGroup>
          </InspectorSection>
        </InspectorBody>
      </Inspector>
    </div>
  );
};

export const FilePropertiesExample = () => {
  return (
    <div className="h-96 w-80">
      <Inspector>
        <InspectorHeader>
          <div className="flex items-center gap-2">
            <File className="w-4 h-4" />
            <h2 className="text-lg font-medium">File Details</h2>
          </div>
        </InspectorHeader>
        <InspectorBody>
          <InspectorSection>
            <InspectorGroup>
              <dt className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Name
              </dt>
              <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                document.pdf
              </dd>
            </InspectorGroup>
            <InspectorGroup>
              <dt className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Size
              </dt>
              <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                2.4 MB
              </dd>
            </InspectorGroup>
            <InspectorGroup>
              <dt className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Modified
              </dt>
              <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                Oct 15, 2023
              </dd>
            </InspectorGroup>
            <InspectorGroup>
              <dt className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Type
              </dt>
              <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                PDF Document
              </dd>
            </InspectorGroup>
          </InspectorSection>
        </InspectorBody>
      </Inspector>
    </div>
  );
};

export const ToggleableExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative h-96 w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden">
      {/* Main content area */}
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Main Content</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          This is the main content area. Click the inspector toggle to open the side panel.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          <Settings className="w-4 h-4" />
          Open Inspector
        </button>
      </div>

      {/* Toggleable inspector */}
      <Inspector
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        asOverlay
      >
        <InspectorHeader>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-medium">Inspector Panel</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </InspectorHeader>
        <InspectorBody>
          <InspectorSection>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Element Properties
            </h3>
            <InspectorGroup>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Background Color
              </label>
              <input
                type="color"
                defaultValue="#ffffff"
                className="w-full h-10 border border-zinc-200 dark:border-zinc-700 rounded-md"
              />
            </InspectorGroup>
            <InspectorGroup>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Opacity
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                className="w-full"
              />
            </InspectorGroup>
          </InspectorSection>
        </InspectorBody>
      </Inspector>

      {/* Toggle button */}
      <InspectorToggle
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};
