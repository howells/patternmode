import { ToastProvider } from "@patternmode/toast";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { NuqsProviderWrapper } from "../components/nuqs-provider";
import { Suspense } from "react";
import { SidebarLayout } from "../components/sidebar-layout";
import { ThemeProvider } from "../components/theme-provider";
import { ReactQueryProvider } from "../providers/query-provider";
import "./globals.css";

const serif = localFont({
	src: [
		{
			path: "../fonts/FreightTextProLight-Regular.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../fonts/FreightTextProLight-Italic.woff2",
			weight: "300",
			style: "italic",
		},
		{
			path: "../fonts/FreightTextProBook-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/FreightTextProBook-Italic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "../fonts/FreightTextProMedium-Regular.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../fonts/FreightTextProMedium-Italic.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "../fonts/FreightTextProSemibold-Regular.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../fonts/FreightTextProSemibold-Italic.woff2",
			weight: "600",
			style: "italic",
		},
		{
			path: "../fonts/FreightTextProBold-Regular.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../fonts/FreightTextProBold-Italic.woff2",
			weight: "700",
			style: "italic",
		},
		{
			path: "../fonts/FreightTextProBlack-Regular.woff2",
			weight: "800",
			style: "normal",
		},
		{
			path: "../fonts/FreightTextProBlack-Italic.woff2",
			weight: "800",
			style: "italic",
		},
	],
	variable: "--font-serif",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Patternmode",
	description: "Patternmode",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${serif.variable} antialiased bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950`}
			suppressHydrationWarning
		>
			<head>
				<link rel="preconnect" href="https://rsms.me/" />
				<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
			</head>
			<body>
				<ReactQueryProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<ToastProvider>
							<NuqsProviderWrapper>
								<div className="isolate">
									<Suspense fallback={null}>
										<SidebarLayout>{children}</SidebarLayout>
									</Suspense>
								</div>
							</NuqsProviderWrapper>
						</ToastProvider>
					</ThemeProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
