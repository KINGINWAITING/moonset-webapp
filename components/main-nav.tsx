"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
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
    <div className="flex-1 flex items-center">
      <Link href="/" className="mr-8 flex items-center">
        <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">MOONSET</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "nav-item transition-colors duration-200 relative px-3 py-2",
              route.active 
                ? "text-white font-medium" 
                : "text-white/70 hover:text-white"
            )}
          >
            {route.label}
            {route.active && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}
