"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard" || pathname.startsWith("/dashboard/"),
    },
    {
      href: "/whitepaper",
      label: "Whitepaper",
      active: pathname === "/whitepaper",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 bg-gradient-to-br from-purple-600 to-blue-600">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <span className="text-xl font-semibold text-white">MOONSET</span>
        </Link>
        <div className="my-6 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-white/80 transition-colors hover:text-white relative py-2",
                  route.active && "text-white font-medium",
                )}
              >
                {route.label}
                {route.active && (
                  <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-white/40 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
