import type { FileMetadata, FileWithPreview } from "./use-file-upload";

export interface ValidateFileOptions {
  accept: string;
  maxSize: number;
  multiple: boolean;
}

export interface PrepareFileAdditionsOptions extends ValidateFileOptions {
  createPreview: (file: File | FileMetadata) => string | undefined;
  existingFiles: FileWithPreview[];
  generateUniqueId: (file: File | FileMetadata) => string;
  maxFiles: number;
  newFiles: Array<File | FileMetadata>;
}

export interface PreparedFileAdditions {
  errors: string[];
  validFiles: FileWithPreview[];
}

function getFileType(file: File | FileMetadata): string {
  return file instanceof File ? file.type || "" : file.type;
}

function getFileExtension(file: File | FileMetadata): string {
  return `.${file.name.split(".").pop() ?? ""}`;
}

function buildFileSizeError(
  file: File | FileMetadata,
  maxSize: number,
  multiple: boolean,
): string {
  return multiple
    ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.`
    : `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
}

function isAcceptedType(file: File | FileMetadata, accept: string): boolean {
  if (accept === "*") {
    return true;
  }

  const fileType = getFileType(file);
  const fileExtension = getFileExtension(file);

  return accept
    .split(",")
    .map((type) => type.trim())
    .some((acceptedType) => {
      if (acceptedType.startsWith(".")) {
        return fileExtension.toLowerCase() === acceptedType.toLowerCase();
      }
      if (acceptedType.endsWith("/*")) {
        const baseType = acceptedType.split("/")[0];
        return fileType.startsWith(`${baseType}/`);
      }

      return fileType === acceptedType;
    });
}

function isDuplicateFile(
  file: File | FileMetadata,
  existingFiles: FileWithPreview[],
): boolean {
  return existingFiles.some((existingFile) => {
    return (
      existingFile.file.name === file.name &&
      existingFile.file.size === file.size
    );
  });
}

export function validateFile(
  file: File | FileMetadata,
  options: ValidateFileOptions,
): string | null {
  if (file.size > options.maxSize) {
    return buildFileSizeError(file, options.maxSize, options.multiple);
  }

  if (!isAcceptedType(file, options.accept)) {
    return `File "${file.name}" is not an accepted file type.`;
  }

  return null;
}

export function prepareFileAdditions(
  options: PrepareFileAdditionsOptions,
): PreparedFileAdditions {
  const { existingFiles, maxFiles, multiple, newFiles } = options;
  const errors: string[] = [];

  if (
    multiple &&
    maxFiles !== Number.POSITIVE_INFINITY &&
    existingFiles.length + newFiles.length > maxFiles
  ) {
    return {
      errors: [`You can only upload a maximum of ${maxFiles} files.`],
      validFiles: [],
    };
  }

  const validFiles: FileWithPreview[] = [];

  for (const file of newFiles) {
    if (multiple && isDuplicateFile(file, existingFiles)) {
      continue;
    }

    const error = validateFile(file, options);
    if (error) {
      errors.push(error);
      continue;
    }

    validFiles.push({
      file,
      id: options.generateUniqueId(file),
      preview: options.createPreview(file),
    });
  }

  return { errors, validFiles };
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))}${sizes[i]}`;
}
