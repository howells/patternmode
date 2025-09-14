"use client";

import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Callout } from ".";

export const DefaultExample = () => (
  <Callout title="Information">
    This is important information you should know about.
  </Callout>
);

export const SuccessExample = () => (
  <Callout icon={CheckCircle} title="Success" variant="success">
    Your operation completed successfully!
  </Callout>
);

export const ErrorExample = () => (
  <Callout icon={AlertCircle} title="Error" variant="error">
    Something went wrong. Please try again.
  </Callout>
);

export const WarningExample = () => (
  <Callout icon={AlertTriangle} title="Warning" variant="warning">
    Please review this information carefully.
  </Callout>
);

export const NeutralExample = () => (
  <Callout title="Note" variant="neutral">
    This is a neutral callout for general information.
  </Callout>
);

export const WithoutTitleExample = () => (
  <Callout icon={Info} variant="default">
    A callout without a title, displaying only the content with an icon.
  </Callout>
);
