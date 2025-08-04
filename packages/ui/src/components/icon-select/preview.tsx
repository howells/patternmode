"use client";

import React from "react";
import { getDynamicIconByName, IconSelect, iconStats, useIconSelect } from "./component";

export type IconSelectPreviewProps = {
  /**
   * Preview layout style.
   * Controls how the icon select examples are displayed.
   */
  layout?: "simple" | "detailed" | "compact";
  /**
   * Whether to show the form integration example.
   * Demonstrates multiple icon selects working together.
   */
  showFormExample?: boolean;
  /**
   * Whether to show icon library statistics.
   * Displays information about the available icons.
   */
  showStatistics?: boolean;
  /**
   * Default selected icon for the main example.
   * Pre-selects an icon when the component loads.
   */
  defaultIcon?: string;
  /**
   * Number of form fields to show in form example.
   * Controls complexity of the form integration demo.
   */
  formFieldCount?: 2 | 3 | 4;
  /**
   * Whether to show icon previews.
   * Displays the selected icons with visual preview.
   */
  showPreviews?: boolean;
};

export function IconSelectExample({
  layout = "detailed",
  showFormExample = true,
  showStatistics = true,
  defaultIcon = "Camera",
  formFieldCount = 3,
  showPreviews = true,
}: IconSelectPreviewProps = {}) {
  const { value, setValue, DynamicIconComponent } = useIconSelect(defaultIcon);
  const [formData, setFormData] = React.useState({
    buttonIcon: "Plus",
    statusIcon: "CheckCircle",
    navigationIcon: "Menu",
    alertIcon: "AlertTriangle",
  });

  const formFields = [
    { key: "buttonIcon", label: "Button Icon", placeholder: "Button icon..." },
    { key: "statusIcon", label: "Status Icon", placeholder: "Status icon..." },
    { key: "navigationIcon", label: "Navigation Icon", placeholder: "Navigation icon..." },
    { key: "alertIcon", label: "Alert Icon", placeholder: "Alert icon..." },
  ].slice(0, formFieldCount);

  if (layout === "compact") {
    return (
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Select Icon
          </label>
          <IconSelect
            value={value}
            onValueChange={setValue}
            placeholder="Choose an icon..."
          />
          {showPreviews && DynamicIconComponent && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <DynamicIconComponent className="w-4 h-4 text-blue-600" />
              <span>Selected: {value}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (layout === "simple") {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Choose Icon
          </label>
          <IconSelect
            value={value}
            onValueChange={setValue}
            placeholder="Select an icon..."
          />
          {showPreviews && DynamicIconComponent && (
            <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-900 rounded">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Preview:</span>
              <DynamicIconComponent className="w-5 h-5 text-blue-600" />
              <code className="text-xs bg-white dark:bg-zinc-800 px-2 py-1 rounded border">
                {value}
              </code>
            </div>
          )}
        </div>

        {showFormExample && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map(field => (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {field.label}
                </label>
                <IconSelect
                  value={formData[field.key as keyof typeof formData]}
                  onValueChange={icon =>
                    setFormData({ ...formData, [field.key]: icon })}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Basic Usage */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Basic Icon Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Choose Icon
            </label>
            <IconSelect
              value={value}
              onValueChange={setValue}
              placeholder="Select an icon..."
            />
            {showPreviews && DynamicIconComponent && (
              <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-900 rounded">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Preview:</span>
                <DynamicIconComponent className="w-5 h-5 text-blue-600" />
                <code className="text-xs bg-white dark:bg-zinc-800 px-2 py-1 rounded border">
                  {value}
                </code>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Form Integration */}
      {showFormExample && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Form Integration</h3>
          <div className={`grid gap-4 ${formFieldCount === 2 ? "grid-cols-1 md:grid-cols-2" : formFieldCount === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}>
            {formFields.map(field => (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {field.label}
                </label>
                <IconSelect
                  value={formData[field.key as keyof typeof formData]}
                  onValueChange={icon =>
                    setFormData({ ...formData, [field.key]: icon })}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          {/* Form Preview */}
          {showPreviews && (
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Form Preview</h4>
              <div className="flex items-center gap-4 flex-wrap">
                {formFields.map((field) => {
                  const iconName = formData[field.key as keyof typeof formData];
                  if (!iconName) { return null; }

                  const IconComponent = getDynamicIconByName(iconName);
                  const colors = {
                    buttonIcon: "bg-blue-600 text-white",
                    statusIcon: "text-green-600",
                    navigationIcon: "text-zinc-600 dark:text-zinc-400",
                    alertIcon: "text-orange-600",
                  };

                  return (
                    <div key={field.key} className={`flex items-center gap-2 ${field.key === "buttonIcon" ? "px-3 py-2 rounded" : ""} ${colors[field.key as keyof typeof colors]}`}>
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{field.label.replace(" Icon", "")}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Icon Statistics */}
      {showStatistics && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Icon Library Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {iconStats.totalIcons}
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-300">Total Icons Available</div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-sm font-medium text-green-800 dark:text-green-300">
                {iconStats.performance}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">Performance</div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="text-sm font-medium text-purple-800 dark:text-purple-300">
                {iconStats.loadingStrategy}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Loading Strategy</div>
            </div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
            <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Features</h4>
            <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              {iconStats.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

// Preview props for prop explorer
export const IconSelectPreviewProps = [
  {
    name: "layout",
    type: "select",
    description: "Preview layout style - controls how the icon select examples are displayed.",
    options: ["simple", "detailed", "compact"],
    defaultValue: "detailed",
  },
  {
    name: "showFormExample",
    type: "boolean",
    description: "Whether to show the form integration example - demonstrates multiple icon selects working together.",
    defaultValue: true,
  },
  {
    name: "showStatistics",
    type: "boolean",
    description: "Whether to show icon library statistics - displays information about the available icons.",
    defaultValue: true,
  },
  {
    name: "defaultIcon",
    type: "string",
    description: "Default selected icon for the main example - pre-selects an icon when the component loads.",
    defaultValue: "Camera",
  },
  {
    name: "formFieldCount",
    type: "select",
    description: "Number of form fields to show in form example - controls complexity of the form integration demo.",
    options: [2, 3, 4],
    defaultValue: 3,
  },
  {
    name: "showPreviews",
    type: "boolean",
    description: "Whether to show icon previews - displays the selected icons with visual preview.",
    defaultValue: true,
  },
];
