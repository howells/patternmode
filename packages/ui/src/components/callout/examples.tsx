"use client";

import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import React from "react";

import { Callout } from "./component";

// Default callout
export const DefaultExample = () => (
  <Callout title="Information">
    This is important information you should know about.
  </Callout>
);

// Success callout
export const SuccessExample = () => (
  <Callout title="Success" variant="success" icon={CheckCircle}>
    Your operation completed successfully!
  </Callout>
);

// Error callout
export const ErrorExample = () => (
  <Callout title="Error" variant="error" icon={AlertCircle}>
    Something went wrong. Please try again.
  </Callout>
);

// Warning callout
export const WarningExample = () => (
  <Callout title="Warning" variant="warning" icon={AlertTriangle}>
    Please review this information carefully.
  </Callout>
);

// Neutral callout
export const NeutralExample = () => (
  <Callout title="Note" variant="neutral">
    This is a neutral callout for general information.
  </Callout>
);

// Without title
export const WithoutTitleExample = () => (
  <Callout variant="default" icon={Info}>
    A callout without a title, displaying only the content with an icon.
  </Callout>
);
