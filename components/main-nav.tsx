"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export function MainNav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  // Add hover effect that follows the mouse
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const links = nav.querySelectorAll('.blobby-nav-link')
      
      links.forEach((link) => {
        // Ensure link is an HTMLElement before using DOM methods
        if (!(link instanceof HTMLElement)) return
        
        const rect = link.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        if (link.classList.contains('active')) return
        
        if (
          x >= 0 &&
          y >= 0 &&
          x <= rect.width &&
          y <= rect.height
        ) {
          link.style.setProperty('--x', `${x}px`)
          link.style.setProperty('--y', `${y}px`)
        }
      })
    }
    
    nav.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      nav.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

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
    <nav className="hidden md:flex items-center space-x-1" ref={navRef}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "blobby-nav-link",
            route.active ? "active" : ""
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
