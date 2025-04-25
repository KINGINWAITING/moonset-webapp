"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"
import { useToast } from "@/components/ui/use-toast"

// Add window ethereum type
declare global {
  interface Window {
    ethereum?: any
  }
}

type WalletContextType = {
  address: string | null
  balance: string | null
  isConnected: boolean
  isConnecting: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  balance: null,
  isConnected: false,
  isConnecting: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  provider: null,
  signer: null,
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  // Set mounted state once component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only run on client side and when component is mounted
    if (!mounted || typeof window === "undefined") return

    // Check if wallet was previously connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const ethProvider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await ethProvider.listAccounts()

          if (accounts.length > 0) {
            const ethSigner = await ethProvider.getSigner()
            const addr = await ethSigner.getAddress()
            const bal = ethers.formatEther(await ethProvider.getBalance(addr))

            setProvider(ethProvider)
            setSigner(ethSigner)
            setAddress(addr)
            setBalance(bal)
            setIsConnected(true)
          }
        } catch (error) {
          console.error("Failed to reconnect wallet:", error)
        }
      }
    }

    checkConnection()
  }, [mounted])

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      toast({
        title: "Wallet not found",
        description: "Please install MetaMask or another Ethereum wallet",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      const ethProvider = new ethers.BrowserProvider(window.ethereum)
      await ethProvider.send("eth_requestAccounts", [])

      const ethSigner = await ethProvider.getSigner()
      const addr = await ethSigner.getAddress()
      const bal = ethers.formatEther(await ethProvider.getBalance(addr))

      setProvider(ethProvider)
      setSigner(ethSigner)
      setAddress(addr)
      setBalance(bal)
      setIsConnected(true)

      toast({
        title: "Wallet connected",
        description: `Connected to ${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`,
      })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setProvider(null)
    setSigner(null)
    setAddress(null)
    setBalance(null)
    setIsConnected(false)

    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        provider,
        signer,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
