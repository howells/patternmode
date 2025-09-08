"use client";

import { ProgressSteps } from "./component";

export function VerticalExample() {
  return (
    <div className="max-w-md">
      <ProgressSteps
        current={1}
        orientation="vertical"
        steps={[
          { title: "Account", description: "Create your account" },
          { title: "Profile", description: "Add personal details" },
          { title: "Billing", description: "Set up payment" },
          { title: "Confirm" },
        ]}
      />
    </div>
  );
}

export function HorizontalExample() {
  return (
    <div className="w-full">
      <ProgressSteps
        current={2}
        orientation="horizontal"
        steps={[
          { title: "Account" },
          { title: "Profile" },
          { title: "Billing" },
          { title: "Confirm" },
        ]}
      />
    </div>
  );
}

export function ExplicitStateExample() {
  return (
    <ProgressSteps
      steps={[
        { title: "Start", state: "complete" },
        { title: "Process", state: "error", description: "Fix required" },
        { title: "Finish", state: "inactive" },
      ]}
    />
  );
}
