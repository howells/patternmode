/** Raised when `onCreateItem` throws or rejects for a draft label; the original error is its `cause`. */
export class TagCreationError extends Error {
  /** The normalized draft label that could not be created. */
  readonly label: string;

  constructor(label: string, options: ErrorOptions) {
    super(`TagSelector could not create "${label}".`, options);
    this.name = "TagCreationError";
    this.label = label;
  }
}
