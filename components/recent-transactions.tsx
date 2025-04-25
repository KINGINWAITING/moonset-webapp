"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatAddress } from "@/lib/utils"

const transactions = [
  {
    id: "1",
    from: "0x1234567890123456789012345678901234567890",
    to: "0x0987654321098765432109876543210987654321",
    amount: "42,000",
    timestamp: "2 minutes ago",
    type: "transfer",
  },
  {
    id: "2",
    from: "0x2345678901234567890123456789012345678901",
    to: "0x1098765432109876543210987654321098765432",
    amount: "18,500",
    timestamp: "15 minutes ago",
    type: "stake",
  },
  {
    id: "3",
    from: "0x3456789012345678901234567890123456789012",
    to: "0x2109876543210987654321098765432109876543",
    amount: "5,250",
    timestamp: "1 hour ago",
    type: "transfer",
  },
  {
    id: "4",
    from: "0x4567890123456789012345678901234567890123",
    to: "0x3210987654321098765432109876543210987654",
    amount: "128,000",
    timestamp: "3 hours ago",
    type: "unstake",
  },
  {
    id: "5",
    from: "0x5678901234567890123456789012345678901234",
    to: "0x4321098765432109876543210987654321098765",
    amount: "84,200",
    timestamp: "5 hours ago",
    type: "transfer",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-white/5">
          <Avatar className="h-9 w-9 ring-2 ring-white/10">
            <AvatarFallback
              className={
                transaction.type === "transfer"
                  ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-white backdrop-blur-sm"
                  : transaction.type === "stake"
                    ? "bg-gradient-to-br from-green-500/30 to-blue-500/30 text-white backdrop-blur-sm"
                    : "bg-gradient-to-br from-orange-500/30 to-purple-500/30 text-white backdrop-blur-sm"
              }
            >
              {transaction.type === "transfer" ? "T" : transaction.type === "stake" ? "S" : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              {formatAddress(transaction.from)} <span className="text-white/50">→</span> {formatAddress(transaction.to)}
            </p>
            <p className="text-sm text-white/60">{transaction.timestamp}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">{transaction.amount} MOONSET</p>
            <p className="text-xs text-white/60 capitalize">{transaction.type}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
