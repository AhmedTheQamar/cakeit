import type React from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sweet Delights Bakery",
  description: "Discover our handcrafted cakes made with love",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent")

  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'