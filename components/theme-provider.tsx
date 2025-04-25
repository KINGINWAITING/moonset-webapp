"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ThemeContextType = {
  theme?: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: undefined,
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: {
  children: ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  [key: string]: any
}) {
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme as "light" | "dark")
  const [mounted, setMounted] = useState(false)

  // Once mounted, we can safely access the window object
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else if (enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme)
    }
  }, [mounted, enableSystem])

  useEffect(() => {
    if (!mounted) return

    if (theme) {
      localStorage.setItem("theme", theme)

      if (attribute === "class") {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(theme)
      } else {
        document.documentElement.setAttribute(attribute, theme)
      }
    }
  }, [theme, mounted, attribute])

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}
