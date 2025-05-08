"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowDownLeft, ArrowUpRight, Copy, QrCode, RefreshCw, Send, Wallet, CalendarDays } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DashboardPageLayout from '@/components/dashboard-page-layout'

export default function WalletPage() {
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [activeTab, setActiveTab] = useState("transactions");

  return (
    <DashboardPageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="dashboard-title text-3xl mb-2 text-white">Wallet</h1>
          <p className="dashboard-subtitle flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-white/60" />
            <span>{currentDate}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="col-span-7 md:col-span-5 space-y-6">
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white">Your Balance</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 gap-1 text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => {
                  // In a real app, this would refresh the wallet data
                  alert("Wallet data refreshed");
                }}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Refresh</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">12,842</span>
                    <span className="text-lg font-medium mb-1 text-white">MOONSET</span>
                  </div>
                  <p className="text-sm text-white/70">≈ $1,081.29 USD</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
                    onClick={() => {
                      document.getElementById('send-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-white border-white/20 bg-white/5 hover:bg-white/10"
                    onClick={() => {
                      document.getElementById('wallet-address')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <ArrowDownLeft className="mr-2 h-4 w-4" />
                    Receive
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="dashboard-tabs-list mb-6">
            <button 
              className={`dashboard-tab ${activeTab === "transactions" ? "active" : ""}`}
              data-state={activeTab === "transactions" ? "active" : "inactive"}
              onClick={() => setActiveTab("transactions")}
            >
              Transactions
            </button>
            <button 
              className={`dashboard-tab ${activeTab === "staking" ? "active" : ""}`}
              data-state={activeTab === "staking" ? "active" : "inactive"}
              onClick={() => setActiveTab("staking")}
            >
              Staking
            </button>
            <button 
              className={`dashboard-tab ${activeTab === "rewards" ? "active" : ""}`}
              data-state={activeTab === "rewards" ? "active" : "inactive"}
              onClick={() => setActiveTab("rewards")}
            >
              Rewards
            </button>
          </div>

          {activeTab === "transactions" && (
            <Card className="dashboard-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Transactions</CardTitle>
                <CardDescription className="text-white/70">
                  Your recent MOONSET token transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-4">
                    {[
                      { type: "received", from: "0x742...8A9b", amount: 1000, date: "2023-06-24", status: "completed" },
                      { type: "sent", to: "0x619...2D1c", amount: 250, date: "2023-06-22", status: "completed" },
                      { type: "staked", amount: 500, date: "2023-06-20", status: "completed" },
                      { type: "received", from: "0x8F2...4E3a", amount: 2500, date: "2023-06-15", status: "completed" },
                      { type: "reward", amount: 42, date: "2023-06-14", status: "completed" },
                      { type: "unstaked", amount: 1000, date: "2023-06-10", status: "completed" },
                      { type: "sent", to: "0xA84...1B7d", amount: 300, date: "2023-06-05", status: "completed" }
                    ].map((tx, i) => (
                      <div key={`tx-${i}`} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0 hover:bg-white/5 p-2 rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "received" || tx.type === "reward" ? "bg-green-400/10" : 
                            tx.type === "sent" ? "bg-red-400/10" : 
                            "bg-blue-400/10"
                          }`}>
                            {tx.type === "received" ? <ArrowDownLeft className={`h-5 w-5 text-green-400`} /> : 
                             tx.type === "sent" ? <ArrowUpRight className={`h-5 w-5 text-red-400`} /> : 
                             tx.type === "staked" ? <Wallet className={`h-5 w-5 text-blue-400`} /> :
                             tx.type === "unstaked" ? <Wallet className={`h-5 w-5 text-amber-400`} /> :
                             <Wallet className={`h-5 w-5 text-green-400`} />}
                          </div>
                          <div>
                            <p className="font-medium capitalize text-white">
                              {tx.type === "reward" ? "Staking Reward" : tx.type}
                            </p>
                            <div className="text-xs text-white/60">
                              {tx.from && <span>From: {tx.from}</span>}
                              {tx.to && <span>To: {tx.to}</span>}
                              {!tx.from && !tx.to && <span>{tx.date}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${
                            tx.type === "received" || tx.type === "reward" ? "text-green-400" : 
                            tx.type === "sent" ? "text-red-400" : "text-white"
                          }`}>
                            {tx.type === "received" || tx.type === "reward" ? "+" : 
                             tx.type === "sent" ? "-" : ""}
                            {tx.amount} MOONSET
                          </p>
                          <div className="text-xs text-white/60">{tx.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/wallet/transactions" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full text-white border-white/20 bg-white/5 hover:bg-white/10"
                  >
                    View All Transactions
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )}

          {activeTab === "staking" && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="dashboard-card border-white/10 hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">Staking Overview</CardTitle>
                  <CardDescription className="text-white/70">Current staking information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Total Staked</span>
                      <span className="font-medium text-white">5,000 MOONSET</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Current APY</span>
                      <span className="font-medium text-green-400">12.4%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Rewards Earned</span>
                      <span className="font-medium text-white">342 MOONSET</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Next Reward</span>
                      <span className="font-medium text-white">In 22 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Locked Period</span>
                      <span className="font-medium text-white">30 days remaining</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Link href="/dashboard/staking" className="w-full">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
                    >
                      Stake More
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full text-white border-white/20 bg-white/5 hover:bg-white/10"
                    onClick={() => {
                      alert("Unstake Modal would appear here");
                    }}
                  >
                    Unstake
                  </Button>
                </CardFooter>
              </Card>
              <Card className="dashboard-card border-white/10 hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">Staking Rewards</CardTitle>
                  <CardDescription className="text-white/70">Projected and historical rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
                    <h3 className="font-medium mb-2 text-white">Projected Rewards</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Daily</span>
                        <span className="text-white">1.69 MOONSET</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Weekly</span>
                        <span className="text-white">11.83 MOONSET</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Monthly</span>
                        <span className="text-white">51.67 MOONSET</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Yearly</span>
                        <span className="text-white">620 MOONSET</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-white">NFT Rewards</h3>
                      <p className="text-xs text-white/70">Stake more to earn NFT rewards</p>
                    </div>
                    <Badge variant="outline" className="text-blue-400 border-blue-400">Level 2</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "rewards" && (
            <Card className="dashboard-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Premium Access NFTs</CardTitle>
                <CardDescription className="text-white/70">NFTs earned through staking rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center space-y-3 hover-lift">
                    <div className="h-32 rounded-md bg-gradient-to-r from-purple-500/20 to-blue-500/20 mb-2 flex items-center justify-center">
                      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Level 1</span>
                    </div>
                    <h3 className="font-medium text-white">Basic Access</h3>
                    <p className="text-xs text-white/70">Basic research tools and community access</p>
                    <Badge className="bg-gradient-to-r from-green-500 to-green-400 text-white border-0">Owned</Badge>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center space-y-3 hover-lift">
                    <div className="h-32 rounded-md bg-gradient-to-r from-purple-500/20 to-blue-500/20 mb-2 flex items-center justify-center">
                      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Level 2</span>
                    </div>
                    <h3 className="font-medium text-white">Extended Access</h3>
                    <p className="text-xs text-white/70">Premium research tools and governance voting</p>
                    <Badge className="bg-gradient-to-r from-green-500 to-green-400 text-white border-0">Owned</Badge>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center space-y-3 hover-lift">
                    <div className="h-32 rounded-md bg-gradient-to-r from-purple-500/20 to-blue-500/20 mb-2 flex items-center justify-center">
                      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Level 3</span>
                    </div>
                    <h3 className="font-medium text-white">Full Access</h3>
                    <p className="text-xs text-white/70">All premium features and early access</p>
                    <Badge variant="outline" className="text-white/70 border-white/20">50% Progress</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="col-span-7 md:col-span-2 space-y-6">
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader>
              <CardTitle className="text-white">Wallet Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col items-center space-y-3" id="wallet-address">
                <div className="w-24 h-24 rounded-md bg-white p-2">
                  <QrCode className="w-full h-full text-black" />
                </div>
                <div className="text-xs text-center break-all text-white">
                  0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-white border-white/20 bg-white/5 hover:bg-white/10"
                  onClick={() => {
                    navigator.clipboard.writeText("0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB");
                    alert("Address copied to clipboard");
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Address
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader>
              <CardTitle className="text-white">Send MOONSET</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" id="send-form">
                <div className="grid gap-3">
                  <label className="text-sm font-medium text-white">Recipient Address</label>
                  <Input placeholder="0x..." className="bg-white/5 border-white/20 text-white placeholder:text-white/60" />
                </div>
                <div className="grid gap-3">
                  <label className="text-sm font-medium text-white">Amount</label>
                  <div className="relative">
                    <Input placeholder="0.00" className="pr-20 bg-white/5 border-white/20 text-white placeholder:text-white/60" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-white/60">
                      MOONSET
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
                  onClick={() => {
                    alert("Transaction would be sent here");
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send MOONSET
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader>
              <CardTitle className="text-white">Connected Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/dashboard" className="block">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-400/20 flex items-center justify-center">
                        <Wallet className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">MOONSET Platform</p>
                        <p className="text-xs text-white/70">Full access</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-400 text-green-400">Active</Badge>
                  </div>
                </Link>
                <Link href="/dashboard/governance" className="block">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-400/20 flex items-center justify-center">
                        <Wallet className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Governance Portal</p>
                        <p className="text-xs text-white/70">Voting access</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-400 text-green-400">Active</Badge>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  )
} 