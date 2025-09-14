"use client";

import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

const Tabs = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Root>) => (
  <BaseTabs.Root className={cx("w-full", className)} {...props} />
);

// Subcomponents moved to their own files.

export { Tabs };
