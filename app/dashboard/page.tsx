"use client"

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, ArrowUpRight, TrendingUp, BarChart2, Users, Vote, Lock, ArrowRight, ChevronRight, FileText, Bell, Clock } from 'lucide-react'
import DashboardPageLayout from '@/components/dashboard-page-layout'
import DashboardTabs from '@/components/dashboard-tabs'
import { MoonsetTokenChart } from '@/components/moonset-token-chart'

export default function DashboardPage() {
  // Format current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const dashboardTabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="dashboard-grid-2">
          {/* Token stats */}
          <Link href="/dashboard/analytics" className="cursor-pointer">
            <Card className="dashboard-card hover-lift bg-[rgba(40,20,65,0.15)] border-[rgba(140,43,255,0.15)]">
              <div className="dashboard-card-header">
                <h3 className="dashboard-card-title">Token Statistics</h3>
                <span className="text-xs text-muted-foreground">Key metrics</span>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-sm text-muted-foreground">Circulating Supply</span>
                    <span className="font-medium">100M / 200M</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-sm text-muted-foreground">Staked Tokens</span>
                    <span className="font-medium">42.5M / 100M</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-sm text-muted-foreground">Burned Tokens</span>
                    <span className="font-medium">5M / 200M</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
          
          {/* Activity summary */}
          <Card className="dashboard-card hover-lift bg-[rgba(40,20,65,0.15)] border-[rgba(140,43,255,0.15)]">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">Recent Activity</h3>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-400/10 badge-glow">
                New
              </Badge>
            </div>
            <div className="p-5">
              <div className="mt-2 space-y-3">
                <Link href="/dashboard/market" className="flex justify-between items-center cursor-pointer hover:bg-white/5 p-2 rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">24h Volume</p>
                      <p className="text-xs text-muted-foreground">Updated 5 min ago</p>
                    </div>
                  </div>
                  <p className="font-semibold">$1.24M</p>
                </Link>
                
                <Link href="/dashboard/community" className="flex justify-between items-center cursor-pointer hover:bg-white/5 p-2 rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Holders</p>
                      <p className="text-xs text-muted-foreground">Total unique addresses</p>
                    </div>
                  </div>
                  <p className="font-semibold">12,482</p>
                </Link>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Vote className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Active Proposals</p>
                      <p className="text-xs text-muted-foreground">Governance votes needed</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold">2</p>
                    <Link href="/dashboard/governance">
                      <Button variant="link" size="sm" className="text-primary ml-1 p-0">
                        <span className="text-xs">Vote</span>
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Market overview */}
          <Card className="dashboard-card hover-lift bg-[rgba(40,20,65,0.15)] border-[rgba(140,43,255,0.15)]">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">Market Overview</h3>
              <span className="text-xs text-muted-foreground">Global metrics</span>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">Market Cap</span>
                  <span className="font-medium">$8.42M</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">24h Trading Volume</span>
                  <span className="font-medium">$1.24M</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">All Time High</span>
                  <span className="font-medium">$0.1284</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Community info */}
          <Card className="dashboard-card hover-lift bg-[rgba(40,20,65,0.15)] border-[rgba(140,43,255,0.15)]">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">Community</h3>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/10">
                Growing
              </Badge>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">Total Holders</span>
                  <span className="font-medium">12,482</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">Active Members</span>
                  <span className="font-medium">2,842</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">New Members (24h)</span>
                  <span className="font-medium text-green-400">+124</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: "analytics",
      label: "Analytics",
      content: (
        <div className="flex items-center justify-center p-12 text-center">
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <BarChart2 className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Detailed analytics are available with Premium Access
            </p>
            <Link href="/dashboard/staking">
              <Button className="dashboard-button dashboard-button-primary">
                Upgrade to Premium
              </Button>
            </Link>
          </div>
        </div>
      )
    },
    {
      id: "reports",
      label: "Reports",
      content: (
        <div className="flex items-center justify-center p-12 text-center">
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Reports Coming Soon</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Customized reports will be available in the next update
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                // Set an alert for updates
                alert("Alert set for new report updates!");
              }}
            >
              Set Alert for Updates
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "notifications",
      label: "Notifications",
      content: (
        <div className="flex items-center justify-center p-12 text-center">
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Bell className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No New Notifications</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              You're all caught up! No new notifications at this time
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                // Open notification settings
                alert("Notification settings would open here");
              }}
            >
              Configure Notification Settings
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <DashboardPageLayout>
      {/* Header with date */}
      <div className="dashboard-header-with-date fadeInUp">
        <div className="dashboard-header-left-content">
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-description">
            Welcome back! Here's what's happening with your portfolio
          </p>
        </div>
        <div className="dashboard-date">
          <CalendarDays className="w-4 h-4" />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Token price chart at the top */}
      <Card className="dashboard-card hover-lift mb-6 bg-[rgba(40,20,65,0.15)] border-[rgba(140,43,255,0.15)]">
        <div className="dashboard-card-header">
          <h3 className="dashboard-card-title">MOONSET Token Price</h3>
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/10">
            +4.28%
          </Badge>
        </div>
        <div className="p-5">
          <MoonsetTokenChart 
            height={300}
            showVolume={true}
            showMarketCap={true}
            lastUpdated="2 min ago"
            priceChange={{ value: 4.28, period: "last week" }}
            currentPrice={0.0842}
          />
        </div>
      </Card>

      {/* Key stats */}
      <div className="dashboard-grid-4 mb-6">
        <Link href="/dashboard/market" className="cursor-pointer">
          <Card className="dashboard-card hover-lift bg-[rgba(40,20,65,0.15)] border-[rgba(140,43,255,0.15)]">
            <div className="stats-card">
              <div className="stats-card-header">
                <p className="stats-card-title">MOONSET PRICE</p>
                <div className="stats-card-icon">
                  <TrendingUp className="text-green-500 h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="stats-card-value">$0.0842</h3>
                <div className="stats-card-trend positive">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+2.5% from yesterday</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link href="/dashboard/market" className="cursor-pointer">
          <Card className="dashboard-card hover-lift bg-[rgba(40,20,65,0.15)] border-[rgba(140,43,255,0.15)]">
            <div className="stats-card">
              <div className="stats-card-header">
                <p className="stats-card-title">MARKET CAP</p>
                <div className="stats-card-icon">
                  <ArrowUpRight className="text-green-500 h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="stats-card-value">$8.42M</h3>
                <div className="stats-card-trend positive">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+5.1% from last week</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link href="/dashboard/staking" className="cursor-pointer">
          <Card className="dashboard-card hover-lift bg-[rgba(40,20,65,0.15)] border-[rgba(140,43,255,0.15)]">
            <div className="stats-card">
              <div className="stats-card-header">
                <p className="stats-card-title">TOTAL STAKED</p>
                <div className="stats-card-icon">
                  <BarChart2 className="text-indigo-500 h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="stats-card-value">42.5M</h3>
                <div className="stats-card-trend positive">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+0.8% from yesterday</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link href="/dashboard/community" className="cursor-pointer">
          <Card className="dashboard-card hover-lift bg-[rgba(40,20,65,0.15)] border-[rgba(140,43,255,0.15)]">
            <div className="stats-card">
              <div className="stats-card-header">
                <p className="stats-card-title">ACTIVE USERS</p>
                <div className="stats-card-icon">
                  <Users className="text-blue-500 h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="stats-card-value">2,842</h3>
                <div className="stats-card-trend positive">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+12.3% from last month</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Premium access section */}
      <Card className="dashboard-card mb-8 bg-gradient-to-br from-[#050110]/90 to-[#1e0c45]/80 border-[rgba(140,43,255,0.15)]">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500/20 to-amber-500/20">
              <span className="text-purple-400 text-lg">✦</span>
            </div>
            <h2 className="text-xl font-semibold">Premium Access</h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Unlock advanced features and exclusive content with Premium Access
          </p>

          <div className="dashboard-grid-3 mb-6 gap-6">
            <Link href="/dashboard/analytics" className="cursor-pointer">
              <Card className="bg-[rgba(40,20,65,0.25)] border-purple-500/15 hover-lift premium-card h-full">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <BarChart2 className="text-indigo-400 h-7 w-7" />
                  </div>
                  <h3 className="text-base font-medium mb-3">Advanced Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Access detailed market data and advanced charting tools
                  </p>
                </div>
              </Card>
            </Link>
            
            <Link href="/dashboard/research" className="cursor-pointer">
              <Card className="bg-[rgba(40,20,65,0.25)] border-purple-500/15 hover-lift premium-card h-full">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <Users className="text-blue-400 h-7 w-7" />
                  </div>
                  <h3 className="text-base font-medium mb-3">AI Research Assistant</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Get personalized research assistance powered by AI
                  </p>
                </div>
              </Card>
            </Link>
            
            <Link href="/dashboard/research" className="cursor-pointer">
              <Card className="bg-[rgba(40,20,65,0.25)] border-purple-500/15 hover-lift premium-card h-full">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                    <Lock className="text-purple-400 h-7 w-7" />
                  </div>
                  <h3 className="text-base font-medium mb-3">Exclusive Content</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Access premium research papers and community resources
                  </p>
                </div>
              </Card>
            </Link>
          </div>

          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-muted-foreground">
              Stake MOONSET tokens to earn Premium Access NFTs
            </p>
            <Link href="/dashboard/staking">
              <Button className="bg-gradient-to-r from-[#8c2bff] to-[#a05af5] hover:from-[#9061ff] hover:to-[#b066dc] text-white border-0 shadow-md hover:shadow-lg hover:shadow-purple-500/20 transition-all px-6 py-2.5">
                Stake Now
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Dashboard tabs */}
      <DashboardTabs tabs={dashboardTabs} defaultTab="overview" />
    </DashboardPageLayout>
  )
}
