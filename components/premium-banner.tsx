"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Lock } from "lucide-react"
import Link from "next/link"

export function PremiumBanner() {
  return (
    <Card className="dashboard-card border-white/20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-xl"></div>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-400" />
          <CardTitle className="text-white">Premium Access</CardTitle>
        </div>
        <CardDescription className="text-white/70">Unlock advanced features and exclusive content with Premium Access</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-center hover-lift">
            <Lock className="h-8 w-8 text-white/60" />
            <h3 className="text-lg font-semibold text-white">Advanced Analytics</h3>
            <p className="text-sm text-white/70">Access detailed market data and advanced charting tools</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-center hover-lift">
            <Lock className="h-8 w-8 text-white/60" />
            <h3 className="text-lg font-semibold text-white">AI Research Assistant</h3>
            <p className="text-sm text-white/70">Get personalized research assistance powered by AI</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-center hover-lift">
            <Lock className="h-8 w-8 text-white/60" />
            <h3 className="text-lg font-semibold text-white">Exclusive Content</h3>
            <p className="text-sm text-white/70">Access premium research papers and community resources</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-white/70">Stake MOONSET tokens to earn Premium Access NFTs</div>
        <Link href="/dashboard/staking">
          <Button className="dashboard-button-primary">
            Stake Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
