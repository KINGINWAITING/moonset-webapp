"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/components/wallet-provider"
import { formatAddress, formatBalance } from "@/lib/utils"

export function WalletButton() {
  const { address, balance, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          <span>{formatAddress(address || "")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">Address</p>
          <p className="text-xs text-muted-foreground break-all">{address}</p>
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">Balance</p>
          <p className="text-xs text-muted-foreground">{formatBalance(balance || "0")} ETH</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            disconnectWallet()
            setIsOpen(false)
          }}
          className="text-destructive focus:text-destructive"
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
