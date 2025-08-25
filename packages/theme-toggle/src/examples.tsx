"use client";

import { Stack } from "@patternmode/stack";
import React from "react";
import { ThemeToggle } from "./component";

export const DefaultExample = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");

	return (
		<ThemeToggle
			theme={theme}
			onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
		/>
	);
};

export const SizesExample = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");

	return (
		<Stack direction="horizontal" align="center" gap={4}>
			<ThemeToggle
				size="xs"
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
			<ThemeToggle
				size="sm"
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
			<ThemeToggle
				size="base"
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
			<ThemeToggle
				size="lg"
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
		</Stack>
	);
};

export const VariantsExample = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");

	return (
		<Stack direction="horizontal" align="center" gap={4}>
			<ThemeToggle
				variant="primary"
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
			<ThemeToggle
				variant="secondary"
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
			<ThemeToggle
				variant="outline"
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
			<ThemeToggle
				variant="ghost"
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
		</Stack>
	);
};

export const RoundedExample = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");

	return (
		<Stack direction="horizontal" align="center" gap={4}>
			<ThemeToggle
				rounded={false}
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
			<ThemeToggle
				rounded={true}
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
		</Stack>
	);
};

export const LoadingExample = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");
	const [isLoading, setIsLoading] = React.useState(false);

	const handleToggle = () => {
		setIsLoading(true);
		// Simulate async theme change
		setTimeout(() => {
			setTheme(theme === "light" ? "dark" : "light");
			setIsLoading(false);
		}, 1500);
	};

	return (
		<ThemeToggle theme={theme} onToggle={handleToggle} isLoading={isLoading} />
	);
};

export const DarkThemeExample = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("dark");

	return (
		<div className="p-4 bg-zinc-900 rounded-md">
			<ThemeToggle
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
			/>
		</div>
	);
};

export const DisabledExample = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");

	return (
		<Stack direction="horizontal" align="center" gap={4}>
			<ThemeToggle
				theme={theme}
				onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
				disabled
			/>
			<ThemeToggle theme="dark" onToggle={() => {}} disabled />
		</Stack>
	);
};
