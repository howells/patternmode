"use client";

import React from "react";
import { getDynamicIconByName, IconSelect, iconStats, useIconSelect } from "./component";

export function IconSelectExample() {
  const { value, setValue, DynamicIconComponent } = useIconSelect("Camera");
  const [formData, setFormData] = React.useState({
    buttonIcon: "Plus",
    statusIcon: "CheckCircle",
    navigationIcon: "Menu",
  });

  return (
    <div className="space-y-8 p-6">
      {/* Basic Usage */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Icon Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-700">
              Choose Icon
            </label>
            <IconSelect
              value={value}
              onValueChange={setValue}
              placeholder="Select an icon..."
            />
            {DynamicIconComponent && (
              <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded">
                <span className="text-sm text-zinc-600">Preview:</span>
                <DynamicIconComponent className="w-5 h-5 text-blue-600" />
                <code className="text-xs bg-white px-2 py-1 rounded border">
                  {value}
                </code>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Form Integration */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Form Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Button Icon
            </label>
            <IconSelect
              value={formData.buttonIcon}
              onValueChange={icon =>
                setFormData({ ...formData, buttonIcon: icon })}
              placeholder="Button icon..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Status Icon
            </label>
            <IconSelect
              value={formData.statusIcon}
              onValueChange={icon =>
                setFormData({ ...formData, statusIcon: icon })}
              placeholder="Status icon..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Navigation Icon
            </label>
            <IconSelect
              value={formData.navigationIcon}
              onValueChange={icon =>
                setFormData({ ...formData, navigationIcon: icon })}
              placeholder="Navigation icon..."
            />
          </div>
        </div>

        {/* Form Preview */}
        <div className="p-4 bg-zinc-50 rounded-lg">
          <h4 className="text-sm font-medium text-zinc-700 mb-3">Form Preview</h4>
          <div className="flex items-center gap-4">
            {formData.buttonIcon && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded">
                {(() => {
                  const ButtonIcon = getDynamicIconByName(formData.buttonIcon);
                  return <ButtonIcon className="w-4 h-4" />;
                })()}
                <span className="text-sm">Action</span>
              </div>
            )}

            {formData.statusIcon && (
              <div className="flex items-center gap-2 text-green-600">
                {(() => {
                  const StatusIcon = getDynamicIconByName(formData.statusIcon);
                  return <StatusIcon className="w-4 h-4" />;
                })()}
                <span className="text-sm">Success</span>
              </div>
            )}

            {formData.navigationIcon && (
              <div className="flex items-center gap-2 text-zinc-600">
                {(() => {
                  const NavIcon = getDynamicIconByName(formData.navigationIcon);
                  return <NavIcon className="w-4 h-4" />;
                })()}
                <span className="text-sm">Menu</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Icon Statistics */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Icon Library Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {iconStats.totalIcons}
            </div>
            <div className="text-sm text-blue-800">Total Icons Available</div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm font-medium text-green-800">
              {iconStats.performance}
            </div>
            <div className="text-xs text-green-600 mt-1">Performance</div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm font-medium text-purple-800">
              {iconStats.loadingStrategy}
            </div>
            <div className="text-xs text-purple-600 mt-1">Loading Strategy</div>
          </div>
        </div>

        <div className="p-4 bg-zinc-50 rounded-lg">
          <h4 className="text-sm font-medium text-zinc-700 mb-2">Features</h4>
          <ul className="text-sm text-zinc-600 space-y-1">
            {iconStats.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
