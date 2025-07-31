import { Callout } from "@patternmode/ui";
import { AlertTriangle } from "lucide-react";
import React from "react";

// Default callout
export const /**
              *
              */
  DefaultExample = () => (
    <Callout title="Information">
      This is important information you should know about.
    </Callout>
  );

// Success callout
export const /**
              *
              */
  SuccessExample = () => (
    <Callout title="Success" variant="success">
      Your operation completed successfully!
    </Callout>
  );

// Error callout
export const /**
              *
              */
  ErrorExample = () => (
    <Callout title="Error" variant="error">
      Something went wrong. Please try again.
    </Callout>
  );

// Warning callout
export const /**
              *
              */
  WarningExample = () => (
    <Callout title="Warning" variant="warning">
      Please review this information carefully.
    </Callout>
  );

// Neutral callout
export const /**
              *
              */
  NeutralExample = () => (
    <Callout title="Note" variant="neutral">
      This is a neutral callout for general information.
    </Callout>
  );

// With icon
export const /**
              *
              */
  WithIconExample = () => (
    <Callout title="Alert" variant="warning" icon={AlertTriangle}>
      This callout includes an icon for better visual communication.
    </Callout>
  ); export const /**
                   *
                   */
  CalloutExample = DefaultExample;
