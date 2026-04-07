"use client";

import {
  CheckIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { IconBox } from "../../compositions/icon-box";
import { Icon } from "../icon";

/**
 * Dark pill-shaped toaster with icon rondels.
 * Always renders as a dark toast regardless of theme, centered at the bottom.
 *
 * @example
 * ```tsx
 * import { Toaster } from "@patternmode/ui/components/sonner";
 *
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       {children}
 *       <Toaster />
 *     </>
 *   );
 * }
 * ```
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      data-component="toaster"
      icons={{
        success: (
          <IconBox
            className="bg-white text-gray-900"
            icon={CheckIcon}
            radius="full"
            size="2xs"
          />
        ),
        info: (
          <IconBox
            className="bg-white text-gray-900"
            icon={InfoIcon}
            radius="full"
            size="2xs"
          />
        ),
        warning: (
          <IconBox
            className="bg-white text-gray-900"
            icon={TriangleAlertIcon}
            radius="full"
            size="2xs"
          />
        ),
        error: (
          <IconBox
            className="bg-white text-gray-900"
            icon={XIcon}
            radius="full"
            size="2xs"
          />
        ),
        loading: (
          <Icon
            className="animate-spin text-gray-400"
            icon={Loader2Icon}
            size="xs"
          />
        ),
      }}
      position="bottom-center"
      style={
        {
          // Dark pill toast — uses gray-900/50 directly to stay dark in all themes
          "--normal-bg": "var(--color-gray-900)",
          "--normal-text": "var(--color-gray-50)",
          "--normal-border": "transparent",
          "--border-radius": "9999px",
          "--toast-shadow": "var(--shadow-xl)",
          // All variants share the same dark background
          "--success-bg": "var(--color-gray-900)",
          "--success-text": "var(--color-gray-50)",
          "--success-border": "transparent",
          "--error-bg": "var(--color-gray-900)",
          "--error-text": "var(--color-gray-50)",
          "--error-border": "transparent",
          "--warning-bg": "var(--color-gray-900)",
          "--warning-text": "var(--color-gray-50)",
          "--warning-border": "transparent",
          "--info-bg": "var(--color-gray-900)",
          "--info-text": "var(--color-gray-50)",
          "--info-border": "transparent",
        } as React.CSSProperties
      }
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          toast: "!text-sm !w-fit !mx-auto !left-0 !right-0",
          icon: "!size-auto",
          actionButton: "!rounded-lg",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
