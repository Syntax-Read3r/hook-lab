import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hook Lab - Interactive React Hooks Learning Platform",
  description: "Master React Hooks and Next.js features with interactive examples, code explanations, and common gotchas. Built with Next.js 15 + React 19 + TypeScript.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
