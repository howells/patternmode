"use client";

import { AlertCircle, ArrowRight, Check, Clock, Star, Trash2 } from "lucide-react";
import React from "react";
import { Stack } from "../stack";
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
  <Stack direction="horizontal" wrap gap={2}>
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
  </Stack>
);

// Different variants
export const VariantsExample = () => (
  <Stack direction="horizontal" wrap gap={2}>
    <Badge variant="default">Default</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="blue">Blue</Badge>
    <Badge variant="purple">Purple</Badge>
  </Stack>
);

// Different sizes
export const SizesExample = () => (
  <Stack direction="horizontal" align="center" gap={2}>
    <Badge size="sm">Small</Badge>
    <Badge size="base">Base</Badge>
    <Badge size="lg">Large</Badge>
  </Stack>
);

// Rounded badges
export const RoundedExample = () => (
  <Stack direction="horizontal" wrap gap={2}>
    <Badge rounded>Pill Badge</Badge>
    <Badge rounded variant="success" leftIcon={Check}>
      Approved
    </Badge>
    <Badge rounded variant="warning" leftIcon={Clock}>
      Pending
    </Badge>
  </Stack>
);

// Bordered badges
export const BorderedExample = () => (
  <Stack direction="horizontal" wrap gap={2}>
    <Badge bordered>Bordered</Badge>
    <Badge bordered variant="info" leftIcon={AlertCircle}>
      Information
    </Badge>
    <Badge bordered rounded variant="success">
      Featured
    </Badge>
  </Stack>
);

// Status dot badges
export const StatusDotExample = () => (
  <Stack direction="horizontal" wrap gap={2}>
    <Badge statusDot variant="success">Online</Badge>
    <Badge statusDot variant="warning">Away</Badge>
    <Badge statusDot variant="error">Offline</Badge>
    <Badge statusDot statusAnimated variant="info">Live</Badge>
  </Stack>
);

// Complex example with all features
export const ComplexExample = () => (
  <Stack direction="horizontal" wrap gap={2}>
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
  </Stack>
);
