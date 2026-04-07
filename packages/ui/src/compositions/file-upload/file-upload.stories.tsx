import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/card";
import { VStack } from "../../components/stack";
import { FileUploadDropzone } from "./file-upload-dropzone";
import { FileUploadItem } from "./file-upload-item";
import { FileUploadList } from "./file-upload-list";
import { FileUploadTrigger } from "./file-upload-trigger";
import { useFileUpload } from "./use-file-upload";

const meta: Meta = {
  title: "FileUpload",
  parameters: {
    builder: {
      category: "form",
      icon: "upload",
    },
    layout: "centered",
    docs: {
      description: {
        component:
          "Flexible file upload component system with dropzone, file list, and trigger button variants.",
      },
    },
  },
};

export default meta;

/**
 * Base dropzone with animated file list.
 * Supports drag-and-drop, click to upload, and file preview.
 */
export const Base: StoryObj = {
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [
      { files, isDragging },
      {
        removeFile,
        openFileDialog,
        getInputProps,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
      },
    ] = useFileUpload({
      accept: "image/*",
      multiple: true,
      maxFiles: 5,
      maxSize: 10 * 1024 * 1024,
    });

    return (
      <VStack gap="base">
        <FileUploadDropzone
          description="PNG, JPG, GIF up to 10MB"
          isDragging={isDragging}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          title="Drop files here or click to upload"
        />
        <input {...getInputProps()} className="sr-only" />
        <FileUploadList files={files} onRemove={removeFile} />
      </VStack>
    );
  },
};

/**
 * Simple button trigger for file uploads.
 */
export const ButtonTrigger: StoryObj = {
  render: () => {
    const [{ files }, { removeFile, openFileDialog, getInputProps }] =
      useFileUpload({
        accept: "image/*,.pdf,.doc,.docx",
        multiple: true,
      });

    return (
      <VStack className="w-96" gap="base">
        <FileUploadTrigger onClick={openFileDialog}>
          Upload files
        </FileUploadTrigger>
        <input {...getInputProps()} className="sr-only" />
        <FileUploadList files={files} onRemove={removeFile} />
      </VStack>
    );
  },
};

/**
 * Individual file item with progress simulation.
 */
export const WithProgress: StoryObj = {
  render: () => {
    const [progress, setProgress] = useState<Record<string, number>>({});
    const [completed, setCompleted] = useState<Record<string, boolean>>({});

    const [
      { files, isDragging },
      {
        removeFile,
        openFileDialog,
        getInputProps,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
      },
    ] = useFileUpload({
      accept: "image/*",
      multiple: true,
      onFilesAdded: (newFiles) => {
        // Simulate upload progress
        for (const file of newFiles) {
          let currentProgress = 0;
          const interval = setInterval(() => {
            currentProgress += Math.random() * 15;
            if (currentProgress >= 100) {
              currentProgress = 100;
              clearInterval(interval);
              setCompleted((prev) => ({ ...prev, [file.id]: true }));
            }
            setProgress((prev) => ({ ...prev, [file.id]: currentProgress }));
          }, 200);
        }
      },
    });

    return (
      <VStack className="w-96" gap="base">
        <FileUploadDropzone
          description="PNG, JPG, GIF up to 10MB"
          isDragging={isDragging}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <input {...getInputProps()} className="sr-only" />
        <FileUploadList
          completed={completed}
          files={files}
          onRemove={removeFile}
          progress={progress}
        />
      </VStack>
    );
  },
};

/**
 * File item with error state.
 */
export const WithErrors: StoryObj = {
  render: () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [
      { files, isDragging },
      {
        removeFile,
        openFileDialog,
        getInputProps,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
      },
    ] = useFileUpload({
      accept: "image/*",
      multiple: true,
      onFilesAdded: (newFiles) => {
        // Simulate random errors
        for (const file of newFiles) {
          if (Math.random() > 0.5) {
            setTimeout(() => {
              setErrors((prev) => ({
                ...prev,
                [file.id]: "Upload failed. Please try again.",
              }));
            }, 1000);
          }
        }
      },
    });

    return (
      <VStack className="w-96" gap="base">
        <FileUploadDropzone
          isDragging={isDragging}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <input {...getInputProps()} className="sr-only" />
        <FileUploadList errors={errors} files={files} onRemove={removeFile} />
      </VStack>
    );
  },
};

/**
 * Horizontal layout for file items.
 */
export const HorizontalLayout: StoryObj = {
  render: () => {
    const [
      { files, isDragging },
      {
        removeFile,
        openFileDialog,
        getInputProps,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
      },
    ] = useFileUpload({
      accept: "image/*",
      multiple: true,
    });

    return (
      <VStack className="w-[600px]" gap="base">
        <FileUploadDropzone
          className="min-h-[120px]"
          isDragging={isDragging}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <input {...getInputProps()} className="sr-only" />
        <FileUploadList
          files={files}
          onRemove={removeFile}
          orientation="horizontal"
        />
      </VStack>
    );
  },
};

/**
 * Individual FileUploadItem component showcase.
 */
export const FileItemStates: StoryObj = {
  render: () => (
    <VStack className="w-96" gap="base">
      <FileUploadItem
        name="document.pdf"
        onRemove={() => {
          // no-op
        }}
        size={1024 * 512}
        type="application/pdf"
      />
      <FileUploadItem
        name="photo.jpg"
        onRemove={() => {
          // no-op
        }}
        previewUrl="https://picsum.photos/200"
        size={1024 * 1024 * 2.5}
        type="image/jpeg"
      />
      <FileUploadItem
        name="uploading.png"
        onRemove={() => {
          // no-op
        }}
        progress={45}
        size={1024 * 800}
        type="image/png"
      />
      <FileUploadItem
        isComplete
        name="completed.jpg"
        onRemove={() => {
          // no-op
        }}
        size={1024 * 1024}
        type="image/jpeg"
      />
      <FileUploadItem
        error="Upload failed. File too large."
        name="failed.zip"
        onRemove={() => {
          // no-op
        }}
        size={1024 * 1024 * 50}
        type="application/zip"
      />
    </VStack>
  ),
};

/**
 * Disabled dropzone state.
 */
export const Disabled: StoryObj = {
  render: () => (
    <FileUploadDropzone
      className="w-96"
      description="Upload is currently disabled"
      disabled
      title="File upload unavailable"
    />
  ),
};

/**
 * Inside a card container.
 */
export const InCard: StoryObj = {
  render: () => {
    const [
      { files, isDragging },
      {
        removeFile,
        openFileDialog,
        getInputProps,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
      },
    ] = useFileUpload({
      accept: "image/*",
      multiple: true,
      maxFiles: 3,
    });

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
        </CardHeader>
        <CardContent>
          <VStack gap="base">
            <FileUploadDropzone
              className="min-h-[140px]"
              description="Up to 3 images, max 5MB each"
              isDragging={isDragging}
              onClick={openFileDialog}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
            <input {...getInputProps()} className="sr-only" />
            <FileUploadList files={files} onRemove={removeFile} />
          </VStack>
        </CardContent>
      </Card>
    );
  },
};
