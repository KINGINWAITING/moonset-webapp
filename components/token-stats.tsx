"use client"

import { Progress } from "@/components/ui/progress"

export function TokenStats() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-white">Circulating Supply</div>
          <div className="text-sm font-medium text-white">100M / 200M</div>
        </div>
        <Progress value={50} className="h-2 bg-white/10">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: '50%' }} />
        </Progress>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-white">Staked Tokens</div>
          <div className="text-sm font-medium text-white">42.5M / 100M</div>
        </div>
        <Progress value={42.5} className="h-2 bg-white/10">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: '42.5%' }} />
        </Progress>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-white">Burned Tokens</div>
          <div className="text-sm font-medium text-white">5M / 200M</div>
        </div>
        <Progress value={2.5} className="h-2 bg-white/10">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: '2.5%' }} />
        </Progress>
      </div>
      <div className="grid grid-cols-2 gap-5 pt-4">
        <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="text-sm font-medium text-white/70">24h Volume</div>
          <div className="text-xl font-bold text-white">$1.24M</div>
        </div>
        <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="text-sm font-medium text-white/70">Holders</div>
          <div className="text-xl font-bold text-white">12,482</div>
        </div>
        <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="text-sm font-medium text-white/70">Liquidity</div>
          <div className="text-xl font-bold text-white">$4.2M</div>
        </div>
        <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="text-sm font-medium text-white/70">Market Rank</div>
          <div className="text-xl font-bold text-white">#428</div>
        </div>
      </div>
    </div>
  )
}
