"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"

export function SiteHeader() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  // Don't show header on auth pages or dashboard pages
  if (pathname === "/signin" || 
      pathname === "/signup" || 
      pathname === "/dashboard" || 
      pathname.startsWith("/dashboard/")) {
    return null
  }

  return (
    <header 
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-gradient-to-r from-purple-600/90 to-blue-600/90 shadow-md"
    >
      <div className="container max-w-7xl mx-auto h-16 flex items-center justify-between">
        <MainNav />
        <MobileNav />
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full text-white hover:bg-white/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link href="/signup">
            <Button 
              className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
            >
              SIGN IN
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
