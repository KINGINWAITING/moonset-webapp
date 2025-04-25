"use client"

import Link from "next/link"
import { ChevronRight, Zap, Shield, Users, BarChart, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="py-6 px-6 md:px-10 z-10 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">MOONSET</div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-white/80 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-white/80 transition-colors">
              About
            </Link>
            <Link href="/faqs" className="text-white hover:text-white/80 transition-colors">
              FAQs
            </Link>
            <Link href="/blog" className="text-white hover:text-white/80 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-white hover:text-white/80 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background Gradient Blobs */}
        <div className="absolute top-0 -right-[300px] w-[600px] h-[600px] bg-indigo-600/30 rounded-full filter blur-[80px] z-0"></div>
        <div className="absolute -bottom-[200px] -left-[300px] w-[500px] h-[500px] bg-blue-600/30 rounded-full filter blur-[80px] z-0"></div>
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-purple-600/20 rounded-full filter blur-[80px] z-0"></div>
        
        {/* Content Card */}
        <div className="relative z-10 max-w-3xl w-full bg-gradient-to-br from-blue-900/70 to-indigo-900/70 backdrop-blur-md rounded-3xl p-10 md:p-16 border border-white/10">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Landing Page</h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          
          <Link href="/dashboard" className="inline-block px-8 py-3 border-2 border-white text-white font-medium text-lg hover:bg-white hover:text-indigo-900 transition-all uppercase tracking-wide">
            SIGN IN
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 text-center text-white/50 text-sm relative z-10">
        <p>&copy; {new Date().getFullYear()} MOONSET. All rights reserved.</p>
      </footer>
    </div>
  )
}
