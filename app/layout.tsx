import type React from "react"
import { Mona_Sans as FontSans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"
import { WalletProvider } from "@/components/wallet-provider"

import "@/app/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const mainNav = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Tokens",
    href: "/tokens",
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "About",
    href: "/about",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>MoonSet | ERC-20 Community Platform</title>
        <meta name="description" content="A decentralized community platform powered by the MOONSET token" />
      </head>
      <body className={`min-h-screen font-sans antialiased ${fontSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WalletProvider>
            <div className="app-wrapper relative flex min-h-screen flex-col">
              <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/30 to-blue-900/30"></div>
              <div className="fixed inset-0 -z-10 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent blur-3xl"></div>
              <div className="fixed inset-0 -z-10 bg-[radial-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-800/20 via-transparent to-transparent blur-3xl"></div>
              
              <SiteHeader />
              <Suspense>
                <div className="flex-1">{children}</div>
              </Suspense>
            </div>
            <TailwindIndicator />
          </WalletProvider>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export const metadata = {
  generator: 'v0.dev'
};
