import React from "react";
import "./globals.css";

export const metadata = {
  title: "Agent OS",
  description: "The Intelligent Organization Operating System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
