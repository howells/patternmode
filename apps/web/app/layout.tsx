import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "@howells/stacksheet/styles.css";
import "@howells/aperto/styles.css";
import "@howells/deck/styles.css";
import "@howells/button/styles.css";

export const metadata: Metadata = {
	description: "Minimal catalog for Howells UI tools.",
	icons: [{ rel: "icon", url: "/favicon.svg" }],
	title: "Patternmode",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
