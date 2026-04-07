import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const ivarDisplay = localFont({
  src: [
    {
      path: "../app/fonts/IvarDisplay-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../app/fonts/IvarDisplay-Medium.otf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../app/fonts/IvarDisplay-Italic.otf",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});
