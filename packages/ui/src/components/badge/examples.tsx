"use client";

import { AlertCircle, ArrowRight, Check, Clock, Star, Trash2 } from "lucide-react";
import React from "react";
import { Badge } from "./component";

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
    <Badge onDismiss={() => {}}>Removable</Badge>
    <Badge
      variant="success"
      leftIcon={Check}
      onDismiss={() => {}}
    >
      Completed
    </Badge>
    <Badge
      variant="error"
      onDismiss={() => {}}
      dismissIcon={Trash2}
    >
      Delete me
    </Badge>
  </div>
);

// Different variants
export const VariantsExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge variant="default">Default</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="blue">Blue</Badge>
    <Badge variant="purple">Purple</Badge>
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

// Rounded badges
export const RoundedExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge rounded>Pill Badge</Badge>
    <Badge rounded variant="success" leftIcon={Check}>
      Approved
    </Badge>
    <Badge rounded variant="warning" leftIcon={Clock}>
      Pending
    </Badge>
  </div>
);

// Bordered badges
export const BorderedExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge bordered>Bordered</Badge>
    <Badge bordered variant="info" leftIcon={AlertCircle}>
      Information
    </Badge>
    <Badge bordered rounded variant="success">
      Featured
    </Badge>
  </div>
);

// Status dot badges
export const StatusDotExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge statusDot variant="success">Online</Badge>
    <Badge statusDot variant="warning">Away</Badge>
    <Badge statusDot variant="error">Offline</Badge>
    <Badge statusDot statusAnimated variant="info">Live</Badge>
  </div>
);

// Complex example with all features
export const ComplexExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge
      variant="purple"
      leftIcon={Star}
      rounded
      bordered
    >
      Premium
    </Badge>
    <Badge
      variant="success"
      statusDot
      statusAnimated
      onDismiss={() => {}}
    >
      Active Session
    </Badge>
    <Badge
      size="lg"
      variant="warning"
      leftIcon={AlertCircle}
      rounded
    >
      Requires Attention
    </Badge>
  </div>
);
