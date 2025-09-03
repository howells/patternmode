"use client";

import { Stack } from "@patternmode/stack";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Clock,
  Star,
  Trash2,
} from "lucide-react";
import { Badge } from "./component";

export const DefaultExample = () => <Badge>Badge</Badge>;

export const WithIconsExample = () => (
  <Badge leftIcon={Check} rightIcon={ArrowRight} variant="success">
    Success
  </Badge>
);

export const DismissExample = () => (
  <Stack direction="horizontal" gap={2} wrap>
    <Badge
      onDismiss={() => {
        /* noop */
      }}
    >
      Removable
    </Badge>
    <Badge
      leftIcon={Check}
      onDismiss={() => {
        /* noop */
      }}
      variant="success"
    >
      Completed
    </Badge>
    <Badge
      dismissIcon={Trash2}
      onDismiss={() => {
        /* noop */
      }}
      variant="error"
    >
      Delete me
    </Badge>
  </Stack>
);

export const VariantsExample = () => (
  <Stack direction="horizontal" gap={2} wrap>
    <Badge variant="default">Default</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="blue">Blue</Badge>
    <Badge variant="purple">Purple</Badge>
  </Stack>
);

export const SizesExample = () => (
  <Stack align="center" direction="horizontal" gap={2}>
    <Badge size="sm">Small</Badge>
    <Badge size="base">Base</Badge>
    <Badge size="lg">Large</Badge>
  </Stack>
);

export const RoundedExample = () => (
  <Stack direction="horizontal" gap={2} wrap>
    <Badge rounded>Pill Badge</Badge>
    <Badge leftIcon={Check} rounded variant="success">
      Approved
    </Badge>
    <Badge leftIcon={Clock} rounded variant="warning">
      Pending
    </Badge>
  </Stack>
);

export const BorderedExample = () => (
  <Stack direction="horizontal" gap={2} wrap>
    <Badge border>Bordered</Badge>
    <Badge border leftIcon={AlertCircle} variant="info">
      Information
    </Badge>
    <Badge border rounded variant="success">
      Featured
    </Badge>
  </Stack>
);

export const StatusDotExample = () => (
  <Stack direction="horizontal" gap={2} wrap>
    <Badge statusDot variant="success">
      Online
    </Badge>
    <Badge statusDot variant="warning">
      Away
    </Badge>
    <Badge statusDot variant="error">
      Offline
    </Badge>
    <Badge statusAnimated statusDot variant="info">
      Live
    </Badge>
  </Stack>
);

export const ComplexExample = () => (
  <Stack direction="horizontal" gap={2} wrap>
    <Badge border leftIcon={Star} rounded variant="purple">
      Premium
    </Badge>
    <Badge
      onDismiss={() => {
        /* noop */
      }}
      statusAnimated
      statusDot
      variant="success"
    >
      Active Session
    </Badge>
    <Badge leftIcon={AlertCircle} rounded size="lg" variant="warning">
      Requires Attention
    </Badge>
  </Stack>
);
