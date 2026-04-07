"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Upload } from "lucide-react";
import type { ReactNode, Ref } from "react";
import { useCallback } from "react";
import { Button, type ButtonProps } from "../../components/button";

interface FileUploadTriggerProps extends Omit<ButtonProps, "onClick"> {
  /** Custom children (overrides default button content) */
  children?: ReactNode;
  /** Whether files are currently being uploaded */
  isUploading?: boolean;
  /** Click handler to open file dialog */
  onClick?: () => void;
  /** Ref for the button element */
  ref?: Ref<HTMLButtonElement>;
  /** Custom label when uploading */
  uploadingLabel?: string;
}

/**
 * FileUploadTrigger - A button that opens the file dialog.
 * Use with the useFileUpload hook for full functionality.
 *
 * @example
 * ```tsx
 * const [state, actions] = useFileUpload({ accept: "image/*" });
 *
 * <FileUploadTrigger onClick={actions.openFileDialog}>
 *   Upload image
 * </FileUploadTrigger>
 * <input {...actions.getInputProps()} className="sr-only" />
 * ```
 */
export function FileUploadTrigger({
  ref,
  onClick,
  isUploading = false,
  uploadingLabel = "Uploading…",
  children,
  disabled,
  className,
  ...buttonProps
}: FileUploadTriggerProps) {
  const handleClick = useCallback(() => {
    if (!(disabled || isUploading) && onClick) {
      onClick();
    }
  }, [disabled, isUploading, onClick]);

  return (
    <Button
      className={cn(className)}
      disabled={disabled || isUploading}
      icon={Upload}
      loading={isUploading}
      loadingLabel={uploadingLabel}
      onClick={handleClick}
      ref={ref}
      type="button"
      {...buttonProps}
    >
      {children ?? "Upload file"}
    </Button>
  );
}
