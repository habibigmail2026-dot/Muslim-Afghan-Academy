import type { Metadata } from "next";
import "./globals.css"; // Global styles

import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Muslim Afghan Academy",
  description: "Online Learning and Examination Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4EFE6] text-[#1E1E1E]" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
