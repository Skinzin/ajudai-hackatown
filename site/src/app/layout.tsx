import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Toaster } from "react-hot-toast";
import favicon from "@/app/favicon.svg"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ajuda aí",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      </head>
      <body className={twMerge("flex flex-col h-screen", inter.className)}>
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
