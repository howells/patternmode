"use client";

import React, { useState } from "react";
import { Button } from "../button";
import { Switch } from "./component";

export const DefaultExample = () => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">Airplane Mode</label>
    </div>
  );
};

export const CheckedExample = () => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" defaultChecked />
      <label htmlFor="notifications">Enable notifications</label>
    </div>
  );
};

export const DisabledExample = () => {
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
};

export const SizesExample = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="small" size="small" />
        <label htmlFor="small">Small switch</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="medium" size="default" />
        <label htmlFor="medium">Default switch</label>
      </div>
    </div>
  );
};

export const FormExample = () => {
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
};

export const ControlledExample = () => {
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
};
