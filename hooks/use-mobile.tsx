"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window === "undefined") return

    // Initial check
    setIsMobile(window.innerWidth < 768)

    // Add resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
