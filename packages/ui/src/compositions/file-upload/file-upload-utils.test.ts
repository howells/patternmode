import { describe, expect, it, vi } from "vitest";
import {
  formatBytes,
  prepareFileAdditions,
  validateFile,
} from "./file-upload-utils";
import type { FileMetadata } from "./use-file-upload";

function createMetadata(overrides: Partial<FileMetadata> = {}): FileMetadata {
  return {
    id: "file-1",
    name: "sample.png",
    size: 1024,
    type: "image/png",
    url: "https://assets.example/sample.png",
    ...overrides,
  };
}

describe("file-upload-utils", () => {
  it("formats bytes into human-readable units", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
    expect(formatBytes(1024)).toBe("1KB");
    expect(formatBytes(1_048_576)).toBe("1MB");
  });

  it("validates size and accepted file types", () => {
    expect(
      validateFile(createMetadata(), {
        accept: "image/*",
        maxSize: 2048,
        multiple: false,
      }),
    ).toBeNull();

    expect(
      validateFile(createMetadata({ size: 4096 }), {
        accept: "image/*",
        maxSize: 2048,
        multiple: false,
      }),
    ).toBe('File "sample.png" exceeds the maximum size of 2KB.');

    expect(
      validateFile(
        createMetadata({ name: "sample.pdf", type: "application/pdf" }),
        {
          accept: ".png,.jpg",
          maxSize: 2048,
          multiple: false,
        },
      ),
    ).toBe('File "sample.pdf" is not an accepted file type.');
  });

  it("returns a max-files error before creating previews", () => {
    const createPreview = vi.fn();

    const result = prepareFileAdditions({
      accept: "image/*",
      createPreview,
      existingFiles: [
        { file: createMetadata(), id: "existing", preview: "preview" },
      ],
      generateUniqueId: () => "generated-id",
      maxFiles: 1,
      maxSize: 5000,
      multiple: true,
      newFiles: [createMetadata({ id: "file-2", name: "second.png" })],
    });

    expect(result).toEqual({
      errors: ["You can only upload a maximum of 1 files."],
      validFiles: [],
    });
    expect(createPreview).not.toHaveBeenCalled();
  });

  it("skips duplicates and only prepares valid new files", () => {
    const createPreview = vi.fn(
      (file: File | FileMetadata) => `preview:${file.name}`,
    );
    const generateUniqueId = vi.fn(
      (file: File | FileMetadata) => `id:${file.name}`,
    );

    const result = prepareFileAdditions({
      accept: "image/*",
      createPreview,
      existingFiles: [
        { file: createMetadata(), id: "existing", preview: "preview" },
      ],
      generateUniqueId,
      maxFiles: 5,
      maxSize: 5000,
      multiple: true,
      newFiles: [
        createMetadata(),
        createMetadata({
          id: "file-2",
          name: "fresh.png",
          url: "https://assets.example/fresh.png",
        }),
      ],
    });

    expect(result.errors).toEqual([]);
    expect(result.validFiles).toEqual([
      {
        file: createMetadata({
          id: "file-2",
          name: "fresh.png",
          url: "https://assets.example/fresh.png",
        }),
        id: "id:fresh.png",
        preview: "preview:fresh.png",
      },
    ]);
    expect(createPreview).toHaveBeenCalledTimes(1);
    expect(generateUniqueId).toHaveBeenCalledTimes(1);
  });
});
