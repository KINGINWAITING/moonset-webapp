"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, X, ChevronDown, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { MoonsetLogo } from "@/components/moonset-logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  // Handle blob movement on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return
      
      // Update mouse position state
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Create subtle parallax effect on blobs
      const blob1 = headerRef.current.querySelector('.navbar-blob-1') as HTMLElement
      const blob2 = headerRef.current.querySelector('.navbar-blob-2') as HTMLElement
      
      if (blob1 && blob2) {
        const rect = headerRef.current.getBoundingClientRect()
        const centerX = rect.width / 2
        
        // Calculate movement based on mouse position
        const moveX1 = (e.clientX - centerX) / 50
        const moveX2 = (e.clientX - centerX) / -40
        
        blob1.style.transform = `translate(${moveX1}px, 0)`
        blob2.style.transform = `translate(${moveX2}px, 0)`
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Don't show header on auth pages or dashboard pages
  if (pathname === "/signin" || 
      pathname === "/signup" || 
      pathname === "/dashboard" || 
      pathname.startsWith("/dashboard/")) {
    return null
  }

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 blobby-navbar ${
        scrolled ? "scrolled" : ""
      }`}
    >
      {/* Blob accents */}
      <div className="navbar-blob navbar-blob-1"></div>
      <div className="navbar-blob navbar-blob-2"></div>
      
      {/* Accent line */}
      <div className="navbar-accent"></div>
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center group">
              <div className="relative overflow-hidden h-10 transition-all duration-300 transform group-hover:scale-105">
                <MoonsetLogo width={180} variant="full" />
              </div>
            </Link>
            
            <MainNav />
          </div>
          
          {/* Mobile Nav */}
          <div className="md:hidden">
            <MobileNav />
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
            </button>
            
            {/* Nav Links Dropdown (Small Screens) */}
            <div className="hidden sm:block md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="navbar-button secondary-button flex items-center gap-1">
                    Menu
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#1a1b30]/90 backdrop-blur-xl border-white/10 w-[180px] rounded-xl">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/about", label: "About" },
                    { href: "/whitepaper", label: "Whitepaper" },
                    { href: "/blog", label: "Blog" },
                    { href: "/faqs", label: "FAQs" }
                  ].map((item) => (
                    <DropdownMenuItem 
                      key={item.href}
                      asChild 
                      className="text-white focus:bg-white/10 focus:text-white rounded-lg my-0.5 mx-1 px-3 py-2"
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Sign In Button */}
            <Link href="/signup">
              <button className="navbar-button secondary-button">
                SIGN IN
              </button>
            </Link>
            
            {/* Dashboard Button (only show if not on dashboard) */}
            <Link href="/dashboard" className="hidden sm:block">
              <button className="navbar-button primary-button flex items-center">
                <span className="font-medium tracking-wide">DASHBOARD</span>
                <Sparkles className="ml-1.5 h-4 w-4 text-white/80" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
