"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MoonsetLogo } from "@/components/moonset-logo"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/faqs",
      label: "FAQs",
      active: pathname === "/faqs",
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname === "/blog",
    },
    {
      href: "/whitepaper",
      label: "Whitepaper",
      active: pathname === "/whitepaper",
    }
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="theme-toggle md:hidden relative">
          <Menu className="h-5 w-5 text-white" />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-full max-w-xs p-0 border-r-white/10 bg-gradient-to-b from-[#1a1b30]/95 to-[#2a2c50]/95 backdrop-blur-xl"
      >
        {/* Blob accents */}
        <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-purple-600/10 filter blur-[80px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-blue-600/10 filter blur-[80px] opacity-60"></div>
        
        {/* Mobile menu header */}
        <div className="border-b border-white/10 p-6 relative">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group" onClick={() => setOpen(false)}>
              <div className="relative overflow-hidden h-8 transition-all duration-300 transform group-hover:scale-105">
                <MoonsetLogo width={120} variant="full" />
              </div>
            </Link>
            <button w
              className="theme-toggle" 
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
        
        {/* Mobile menu items */}
        <div className="flex flex-col py-8 px-4 relative">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center py-3.5 px-5 text-base font-medium rounded-xl my-1 transition-all",
                route.active
                  ? "text-white bg-white/10 backdrop-blur-md border border-white/5 shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/5 hover:backdrop-blur-md"
              )}
            >
              {route.label}
              {route.active && (
                <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-glow"></div>
              )}
            </Link>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="border-t border-white/10 p-6 space-y-3 relative">
          <Link href="/signup" className="w-full" onClick={() => setOpen(false)}>
            <button className="navbar-button secondary-button w-full py-3">
              SIGN IN
            </button>
          </Link>
          <Link href="/dashboard" className="w-full" onClick={() => setOpen(false)}>
            <button className="navbar-button primary-button w-full py-3 flex items-center justify-center">
              <span className="font-medium">DASHBOARD</span>
              <Sparkles className="ml-2 h-4 w-4 text-white/80" />
            </button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
