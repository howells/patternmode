"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { Stack } from "../../components/stack";
import { springs } from "../../lib/motion";
import { FileUploadItem } from "./file-upload-item";
import type { FileWithPreview } from "./use-file-upload";

interface FileUploadListProps {
  /** Whether the list should animate */
  animated?: boolean;
  /** Additional class names */
  className?: string;
  /** Completed files (keyed by file id) */
  completed?: Record<string, boolean>;
  /** Errors for each file (keyed by file id) */
  errors?: Record<string, string>;
  /** Array of files to display */
  files: FileWithPreview[];
  /** Callback when a file's remove button is clicked */
  onRemove?: (id: string) => void;
  /** Orientation of the list */
  orientation?: "horizontal" | "vertical";
  /** Upload progress for each file (keyed by file id) */
  progress?: Record<string, number>;
  /** Render custom item content */
  renderItem?: (file: FileWithPreview) => ReactNode;
}

/**
 * FileUploadList - Displays a list of uploaded files with animations.
 *
 * @example
 * ```tsx
 * const [{ files }, { removeFile }] = useFileUpload({ multiple: true });
 *
 * <FileUploadList
 *   files={files}
 *   onRemove={removeFile}
 *   progress={{ "file-1": 75 }}
 * />
 * ```
 */
export function FileUploadList({
  files,
  onRemove,
  progress = {},
  errors = {},
  completed = {},
  animated = true,
  orientation = "vertical",
  className,
  renderItem,
}: FileUploadListProps) {
  if (files.length === 0) {
    return null;
  }

  const content = files.map((file) => {
    const fileProgress = progress[file.id];
    const fileError = errors[file.id];
    const fileCompleted = completed[file.id];

    const item = renderItem ? (
      renderItem(file)
    ) : (
      <FileUploadItem
        error={fileError}
        isComplete={fileCompleted}
        key={file.id}
        name={file.file.name}
        onRemove={onRemove ? () => onRemove(file.id) : undefined}
        previewUrl={file.preview}
        progress={fileProgress}
        size={file.file.size}
        type={file.file instanceof File ? file.file.type : file.file.type}
      />
    );

    if (!animated) {
      return <div key={file.id}>{item}</div>;
    }

    return (
      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        key={file.id}
        layout
        transition={springs.snappy}
      >
        {item}
      </motion.div>
    );
  });

  return (
    <Stack
      className={cn(orientation === "horizontal" && "flex-wrap", className)}
      direction={orientation === "horizontal" ? "row" : "column"}
      gap="xs"
    >
      {animated ? (
        <AnimatePresence mode="popLayout">{content}</AnimatePresence>
      ) : (
        content
      )}
    </Stack>
  );
}
