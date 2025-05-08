"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    // Create the media query
    const mediaQuery = window.matchMedia(query)

    // Initial check
    setMatches(mediaQuery.matches)

    // Function to update the match state
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Listen for changes
    try {
      // Modern browsers
      mediaQuery.addEventListener("change", handleChange)
      
      // Clean up
      return () => mediaQuery.removeEventListener("change", handleChange)
    } catch (e) {
      // For older browsers
      mediaQuery.addListener(handleChange)
      
      // Clean up
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [query])

  return matches
} 