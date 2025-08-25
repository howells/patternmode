import type React from "react";

export type CodeBlockProps = {
	/**
	 * Programming language for syntax highlighting.
	 * Specifies the language for proper syntax highlighting. Defaults to "tsx".
	 * Supports 297+ languages via Prism.js.
	 */
	language?: string;
	/**
	 * Color theme for syntax highlighting.
	 * Controls the visual theme of the code block. "auto" detects system preference.
	 */
	theme?: "light" | "dark" | "auto";
} & React.ComponentPropsWithoutRef<"div">;
