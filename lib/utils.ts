import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatBalance(balance: string): string {
  const num = Number.parseFloat(balance)
  if (isNaN(num)) return "0.00"

  // Format with commas and 4 decimal places
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })
}
