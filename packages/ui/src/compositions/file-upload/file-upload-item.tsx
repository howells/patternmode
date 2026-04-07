"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { File, FileImage, FileText, FileVideo, Trash2, X } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { Button } from "../../components/button";
import { Progress } from "../../components/progress";
import { HStack, VStack } from "../../components/stack";
import { Text } from "../../components/text";
import { formatBytes } from "./use-file-upload";

interface FileUploadItemProps {
  /** Additional class names */
  className?: string;
  /** Error message if upload failed */
  error?: string;
  /** Whether upload is complete */
  isComplete?: boolean;
  /** File name */
  name: string;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
  /** Preview URL for images */
  previewUrl?: string;
  /** Upload progress (0-100), undefined means not uploading */
  progress?: number;
  /** File size in bytes */
  size: number;
  /** File MIME type */
  type: string;
}

/** Get icon based on file type */
function getFileIcon(type: string): ReactNode {
  if (type.startsWith("image/")) {
    return <FileImage className="size-5" />;
  }
  if (type.startsWith("video/")) {
    return <FileVideo className="size-5" />;
  }
  if (type.startsWith("text/") || type.includes("pdf")) {
    return <FileText className="size-5" />;
  }
  return <File className="size-5" />;
}

/**
 * FileUploadItem - Displays a single file with preview, progress, and actions.
 *
 * @example
 * ```tsx
 * <FileUploadItem
 *   name="photo.jpg"
 *   size={1024000}
 *   type="image/jpeg"
 *   previewUrl="/preview.jpg"
 *   progress={75}
 *   onRemove={() => removeFile(id)}
 * />
 * ```
 */
export function FileUploadItem({
  name,
  size,
  type,
  previewUrl,
  progress,
  error,
  isComplete,
  onRemove,
  className,
}: FileUploadItemProps) {
  const isUploading = progress !== undefined && progress < 100 && !error;
  const isImage = type.startsWith("image/");

  const formattedSize = useMemo(() => formatBytes(size), [size]);

  return (
    <HStack
      align="center"
      className={cn(
        "group relative rounded-lg border bg-background p-3 transition-colors",
        error && "border-destructive/50 bg-destructive/5",
        isComplete && !error && "border-green-500/50 bg-green-50/50",
        !(error || isComplete) && "border-border hover:bg-accent/50",
        className,
      )}
      gap="sm"
    >
      {/* Preview / Icon */}
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md",
          isImage ? "bg-gray-100" : "bg-gray-100 text-gray-400",
        )}
      >
        {previewUrl && isImage ? (
          <img
            alt={`Preview of ${name}`}
            className="size-full object-cover"
            height={48}
            src={previewUrl}
            width={48}
          />
        ) : (
          getFileIcon(type)
        )}
      </div>

      {/* File info */}
      <VStack className="min-w-0 flex-1" gap="none">
        <Text className="truncate font-medium text-sm">{name}</Text>
        <HStack align="center" gap="xs">
          <Text className="text-muted-foreground text-xs">{formattedSize}</Text>
          {error && <Text className="text-destructive text-xs">{error}</Text>}
          {isComplete && !error && (
            <Text className="text-green-600 text-xs">Uploaded</Text>
          )}
        </HStack>

        {/* Progress bar */}
        {isUploading && (
          <div className="mt-2">
            <Progress className="h-1.5" value={progress} />
          </div>
        )}
      </VStack>

      {/* Remove button */}
      {onRemove && (
        <Button
          appearance="ghost"
          aria-label={`Remove ${name}`}
          className={cn(
            "size-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
            error && "opacity-100",
          )}
          icon={error ? Trash2 : X}
          onClick={onRemove}
          radius="full"
          size="icon-sm"
          variant={error ? "destructive" : "default"}
        />
      )}
    </HStack>
  );
}
