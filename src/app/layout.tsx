"use client";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Apply dark mode permanently
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.style.backgroundColor = '#1a1a1a';
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>SinagTala</title>
        <meta name="description" content="Your personal mood companion" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-gray-200`}>
        {children}
      </body>
    </html>

  );
}
