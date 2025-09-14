"use client";

import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import type { sizes } from "@patternmode/constants/sizes";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { ContainerProps } from "../types";
import { containerVariants } from "../variants";

/**
 * Responsive content container with sensible defaults.
 *
 * - Centers content with `mx-auto`
 * - Provides safe horizontal padding (`px-4 sm:px-6 lg:px-8`)
 * - Constrains width using shared `sizes` keys (2xs → lg)
 * - Supports render prop for polymorphic rendering
 */
export const Container = ({
  ref: forwardedRef,
  render = <div />,
  size = "base",
  center = true,
  fluid,
  className,
  ...restProps
}: ContainerProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  // Strip unsupported Radix-style slot prop that may be injected upstream.
  const { asChild: _ignoreAsChild, ...props } = restProps as {
    asChild?: unknown;
  } & typeof restProps;

  const defaultProps: useRender.ElementProps<"div"> & {
    "data-size": keyof typeof sizes;
  } = {
    className: cx(containerVariants({ size, center, fluid }), className),
    "data-testid": "container",
    "data-size": size,
  } as React.HTMLAttributes<HTMLDivElement> & {
    "data-size": keyof typeof sizes;
  };

  const element = useRender({
    render,
    ref: forwardedRef,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
};

Container.displayName = "Container";
