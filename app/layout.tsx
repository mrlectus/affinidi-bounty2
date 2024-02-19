import "./globals.css";
import QueryProvider from "./provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Navbar } from "@/components/navbar";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

/**
 * Root layout component.
 * Provides context providers and global app components.
 */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link sizes="any" type="image/x-icon" rel="icon" href="/favicon.png" />
      </head>
      <QueryProvider>
        <UserProvider>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-left"
              />
              <Toaster />
            </ThemeProvider>
          </body>
        </UserProvider>
      </QueryProvider>
    </html>
  );
}
