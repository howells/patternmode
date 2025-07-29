"use client";

import React, { useState } from "react";
import { Switch } from "@patternmode/ui";
import { Button } from "../button";

// Config example ID: "default" -> export name: DefaultExample
export function DefaultExample() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">Airplane Mode</label>
    </div>
  );
}

// Config example ID: "checked" -> export name: CheckedExample
export function CheckedExample() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" defaultChecked />
      <label htmlFor="notifications">Enable notifications</label>
    </div>
  );
}

// Config example ID: "disabled" -> export name: DisabledExample
export function DisabledExample() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <label htmlFor="disabled-off" className="text-zinc-500">
          Disabled (off)
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" defaultChecked disabled />
        <label htmlFor="disabled-on" className="text-zinc-500">
          Disabled (on)
        </label>
      </div>
    </div>
  );
}

// Config example ID: "sizes" -> export name: SizesExample
export function SizesExample() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="small" size="sm" />
        <label htmlFor="small">Small switch</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="medium" size="md" />
        <label htmlFor="medium">Medium switch</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="large" size="lg" />
        <label htmlFor="large">Large switch</label>
      </div>
    </div>
  );
}

// Config example ID: "form" -> export name: FormExample
export function FormExample() {
  return (
    <form className="space-y-4">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Email Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="marketing" className="text-sm font-medium">
              Marketing emails
            </label>
            <Switch id="marketing" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="security" className="text-sm font-medium">
              Security alerts
            </label>
            <Switch id="security" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="updates" className="text-sm font-medium">
              Product updates
            </label>
            <Switch id="updates" />
          </div>
        </div>
      </div>
    </form>
  );
}

// Additional examples (not referenced in config but good to have)
export function SwitchExample() {
  const [checked, setChecked] = useState(false);

  return <Switch checked={checked} onCheckedChange={setChecked} />;
}

export function WithLabel() {
  const [notifications, setNotifications] = useState(true);

  return (
    <Switch
      checked={notifications}
      onCheckedChange={setNotifications}
      label="Enable notifications"
    />
  );
}

export function Sizes() {
  const [defaultChecked, setDefaultChecked] = useState(true);
  const [smallChecked, setSmallChecked] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={defaultChecked}
          onCheckedChange={setDefaultChecked}
        />
        <span className="text-sm">Default size</span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          size="small"
          checked={smallChecked}
          onCheckedChange={setSmallChecked}
        />
        <span className="text-sm">Small size</span>
      </div>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch disabled checked={false} />
        <span className="text-sm text-zinc-600">Disabled (off)</span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch disabled checked={true} />
        <span className="text-sm text-zinc-600">Disabled (on)</span>
      </div>
    </div>
  );
}

export function Controlled() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
        />
        <span className="text-sm">
          Status: {isEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsEnabled(true)}
        >
          Turn On
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsEnabled(false)}
        >
          Turn Off
        </Button>
      </div>
    </div>
  );
}

// Removed duplicate FormExample - using the simpler version above