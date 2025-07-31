import {
  AlertCircle,
  ArrowRight,
  Check,
  Clock,
  Info,
  Star,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import React from "react";
import { Badge } from "@patternmode/ui";

// Default badge
export const DefaultExample = () => <Badge>Badge</Badge>;

// Badge with icons
export const WithIconsExample = () => (
  <Badge leftIcon={Check} rightIcon={ArrowRight} variant="success">
    Success
  </Badge>
);

// Badge with dismiss button
export const DismissExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge onDismiss={() => console.log("Default dismissed")}>Removable</Badge>
    <Badge
      variant="success"
      leftIcon={Check}
      onDismiss={() => console.log("Success dismissed")}
    >
      Completed
    </Badge>
    <Badge
      variant="error"
      onDismiss={() => console.log("Error dismissed")}
      dismissIcon={Trash2}
    >
      Delete me
    </Badge>
  </div>
);

// Rounded (pill-shaped) badges
export const RoundedExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge rounded>Pill</Badge>
    <Badge rounded variant="success" leftIcon={Check}>
      Verified
    </Badge>
    <Badge rounded variant="error" size="sm">
      Error
    </Badge>
    <Badge rounded variant="warning" size="lg" rightIcon={TrendingUp}>
      Trending
    </Badge>
    <Badge rounded bordered variant="neutral">
      Bordered Pill
    </Badge>
  </div>
);

// Status dot badges
export const DotExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge statusDot variant="success">
      Ready
    </Badge>
    <Badge statusDot variant="info" statusAnimated>
      Processing
    </Badge>
    <Badge statusDot variant="warning">
      Queued
    </Badge>
    <Badge statusDot variant="error">
      Error
    </Badge>
    <Badge statusDot variant="default" statusAnimated size="sm">
      Pending
    </Badge>
    <Badge statusDot variant="neutral">
      Canceled
    </Badge>
    <Badge statusDot variant="warning" rounded>
      Warning
    </Badge>
  </div>
);

// Color variants
export const CustomColorExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge variant="purple">Purple</Badge>
    <Badge variant="emerald">Emerald</Badge>
    <Badge variant="pink" rounded>
      Pink Pill
    </Badge>
    <Badge variant="indigo" size="sm">
      Small Indigo
    </Badge>
    <Badge variant="orange" bordered>
      Bordered Orange
    </Badge>
    <Badge variant="teal" size="lg">
      Large Teal
    </Badge>
    <Badge variant="violet" onDismiss={() => console.log("Dismissed")}>
      Dismissible
    </Badge>
  </div>
);

// Basic variants
export const VariantsExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge variant="default">Default</Badge>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="critical">Critical</Badge>
    <Badge variant="positive">Positive</Badge>
    <Badge variant="negative">Negative</Badge>
  </div>
);

// Different sizes
export const SizesExample = () => (
  <div className="flex items-center gap-2">
    <Badge size="sm">Small</Badge>
    <Badge size="base">Base</Badge>
    <Badge size="lg">Large</Badge>
  </div>
);

// Bordered vs borderless
export const BorderedExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge bordered={true}>With Border</Badge>
    <Badge bordered={false}>Without Border</Badge>
    <Badge bordered={true} variant="success">
      Bordered Success
    </Badge>
    <Badge bordered={false} variant="success">
      Borderless Success
    </Badge>
  </div>
);

// Badge with left icon only
export const LeftIconExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge leftIcon={Check} variant="success">
      Approved
    </Badge>
    <Badge leftIcon={X} variant="error">
      Rejected
    </Badge>
    <Badge leftIcon={AlertCircle} variant="warning">
      Pending
    </Badge>
    <Badge leftIcon={Info} variant="neutral">
      Info
    </Badge>
  </div>
);

// Badge with right icon only
export const RightIconExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge rightIcon={ArrowRight}>Continue</Badge>
    <Badge rightIcon={TrendingUp} variant="success">
      Growing
    </Badge>
    <Badge rightIcon={Clock} variant="warning">
      In Progress
    </Badge>
  </div>
);

// Status badges
export const StatusExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge variant="success" leftIcon={Check}>
      Active
    </Badge>
    <Badge variant="warning" leftIcon={Clock}>
      Pending
    </Badge>
    <Badge variant="error" leftIcon={X}>
      Inactive
    </Badge>
    <Badge variant="neutral" leftIcon={Info}>
      Draft
    </Badge>
  </div>
);

// Category badges
export const CategoryExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge variant="default">Feature</Badge>
    <Badge variant="success">New</Badge>
    <Badge variant="warning">Beta</Badge>
    <Badge variant="error">Deprecated</Badge>
  </div>
);

// Custom styled badge
export const CustomStyleExample = () => (
  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
    Custom Style
  </Badge>
);

// Badge group
export const GroupExample = () => (
  <div className="flex items-center gap-2">
    <Badge size="sm" leftIcon={Star}>
      Featured
    </Badge>
    <Badge size="sm" variant="success">
      Popular
    </Badge>
    <Badge size="sm" variant="warning">
      Limited
    </Badge>
  </div>
);

// Borderless variations
export const BorderlessVariantsExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge bordered={false} variant="default">
      Default
    </Badge>
    <Badge bordered={false} variant="success">
      Success
    </Badge>
    <Badge bordered={false} variant="error">
      Error
    </Badge>
    <Badge bordered={false} variant="warning">
      Warning
    </Badge>
    <Badge bordered={false} variant="neutral">
      Neutral
    </Badge>
  </div>
);

// Default export for prop explorer
export const BadgeExample = DefaultExample;
