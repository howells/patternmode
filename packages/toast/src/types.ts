export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

// Toast types
export type ToastType = "default" | "success" | "error" | "warning" | "info";

export type ToastData = {
  [key: string]: unknown;
};

export type BaseToastOptions = {
  /**
   * The main title/message of the toast notification.
   */
  title?: string;
  /**
   * Optional description text displayed below the title.
   */
  description?: string;
  /**
   * Visual variant of the toast affecting color scheme.
   * @default "default"
   */
  type?: ToastType;
  /**
   * How long the toast should remain visible in milliseconds.
   * @default 5000
   */
  duration?: number;
  /**
   * Whether the user can manually dismiss the toast.
   * @default true
   */
  dismissible?: boolean;
  /**
   * Optional action button configuration.
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Additional data to associate with the toast.
   */
  data?: ToastData;
};

export type ToastPromiseOptions<T = unknown> = {
  /**
   * Message or options to show while the promise is pending.
   */
  loading: string | BaseToastOptions;
  /**
   * Message or options to show when the promise resolves successfully.
   */
  success: string | ((data: T) => string) | ((data: T) => BaseToastOptions);
  /**
   * Message or options to show when the promise rejects.
   */
  error:
    | string
    | ((error: Error) => string)
    | ((error: Error) => BaseToastOptions);
};
