"use client";

import React from "react";
import { ThemeToggle } from "./component";
import type { ThemeToggleProps } from "./types";

export function ThemeTogglePreview(props: ThemeToggleProps) {
	const [theme, setTheme] = React.useState<"light" | "dark">(
		props.theme || "light",
	);

	// Remove ref from props to avoid type conflicts
	const { ref: _ref, ...restProps } = props;

	return (
		<ThemeToggle
			theme={theme}
			onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			{...restProps}
		/>
	);
}
