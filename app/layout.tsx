import type React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Toaster } from "sonner";
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import "./globals.css";
import { ConvexClientProvider } from "./convexClientProvider";

// Initialize Arabic font
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  title: "حلويات السعادة",
  description: "اكتشف كعكاتنا المصنوعة يدويًا بكل حب",
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");

  return (
    <html lang="ar" dir="rtl">
      <body className={`${arabic.variable} font-arabic`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Toaster 
          position="bottom-left" 
          toastOptions={{
            style: { fontFamily: 'var(--font-arabic)' }
          }}
        />
      </body>
    </html>
  );
}
