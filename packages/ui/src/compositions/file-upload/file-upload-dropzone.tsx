"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { CloudUpload, type LucideIcon } from "lucide-react";
import type { DragEvent, ReactNode, Ref } from "react";
import { useCallback } from "react";
import { VStack } from "../../components/stack";
import { Text } from "../../components/text";

interface FileUploadDropzoneProps {
  /** Children to render inside (overrides default content) */
  children?: ReactNode;
  /** Additional class names */
  className?: string;
  /** Secondary description text */
  description?: string;
  /** Whether the dropzone is disabled */
  disabled?: boolean;
  /** Icon to display (default: CloudUpload) */
  icon?: LucideIcon;
  /** Whether files are currently being dragged over */
  isDragging?: boolean;
  /** Click handler to open file dialog */
  onClick?: () => void;
  /** Drag event handlers from useFileUpload */
  onDragEnter?: (e: DragEvent<HTMLElement>) => void;
  onDragLeave?: (e: DragEvent<HTMLElement>) => void;
  onDragOver?: (e: DragEvent<HTMLElement>) => void;
  onDrop?: (e: DragEvent<HTMLElement>) => void;
  /** Ref for the dropzone element */
  ref?: Ref<HTMLButtonElement>;
  /** Primary text */
  title?: string;
}

/**
 * FileUploadDropzone - A drag-and-drop zone for file uploads.
 * Use with the useFileUpload hook for full functionality.
 *
 * @example
 * ```tsx
 * const [{ isDragging }, actions] = useFileUpload();
 *
 * <FileUploadDropzone
 *   isDragging={isDragging}
 *   onDragEnter={actions.handleDragEnter}
 *   onDragLeave={actions.handleDragLeave}
 *   onDragOver={actions.handleDragOver}
 *   onDrop={actions.handleDrop}
 *   onClick={actions.openFileDialog}
 * />
 * ```
 */
export function FileUploadDropzone({
  ref,
  isDragging = false,
  disabled = false,
  icon,
  title = "Drop files here or click to upload",
  description = "PNG, JPG, GIF up to 10MB",
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onClick,
  className,
  children,
}: FileUploadDropzoneProps) {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <button
      aria-disabled={disabled || undefined}
      className={cn(
        // Base styles
        "group relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 transition-all duration-200",
        // Default state
        "border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-100/50",
        // Dragging state
        isDragging && "border-primary bg-primary/5 ring-4 ring-primary/10",
        // Disabled state
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
      disabled={disabled}
      onClick={handleClick}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      ref={ref}
      tabIndex={disabled ? -1 : 0}
      type="button"
    >
      {children ?? (
        <>
          {/* Icon */}
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-full transition-colors",
              isDragging
                ? "bg-primary/10 text-primary"
                : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-500",
            )}
          >
            {(() => {
              const IconComponent = icon ?? CloudUpload;
              return <IconComponent className="size-6" />;
            })()}
          </div>

          {/* Text */}
          <VStack align="center" className="text-center" gap="2xs">
            <Text
              className={cn(
                "font-medium transition-colors",
                isDragging ? "text-primary" : "text-foreground",
              )}
            >
              {isDragging ? "Drop to upload" : title}
            </Text>
            {description && (
              <Text className="text-muted-foreground text-sm">
                {description}
              </Text>
            )}
          </VStack>
        </>
      )}
    </button>
  );
}
