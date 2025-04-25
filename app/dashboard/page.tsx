"use client"

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, ArrowUpRight, TrendingUp, BarChart2, Users, Vote, Lock, ArrowRight, ChevronRight, FileText, Bell } from 'lucide-react'
import DashboardPageLayout from '../../components/dashboard-page-layout'
import DashboardTabs from '../../components/dashboard-tabs'

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
          {/* Token chart */}
          <Link href="/dashboard/analytics" className="cursor-pointer col-span-1 row-span-2">
            <Card className="dashboard-card hover-lift h-full">
              <div className="dashboard-card-header">
                <h3 className="dashboard-card-title">MOONSET Token Price</h3>
              </div>
              <div className="p-5">
                <div className="aspect-[4/3] bg-black/20 rounded-md mb-4 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Token price chart visualization</p>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
            </Card>
          </Link>

          {/* Token stats */}
          <Link href="/dashboard/analytics" className="cursor-pointer">
            <Card className="dashboard-card hover-lift">
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
          <Card className="dashboard-card hover-lift">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-title">Recent Activity</h3>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-400/10">
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
      <div className="dashboard-header-with-date">
        <div className="dashboard-header-left-content">
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-description">
            Welcome back! Here's what's happening with your portfolio
          </p>
        </div>
        <div className="dashboard-date">
          <CalendarDays size={16} />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Key stats */}
      <div className="dashboard-grid-4 mb-6">
        <Link href="/dashboard/market" className="cursor-pointer">
          <Card className="dashboard-card hover-lift">
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
          <Card className="dashboard-card hover-lift">
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
          <Card className="dashboard-card hover-lift">
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
          <Card className="dashboard-card hover-lift">
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
      <Card className="dashboard-card mb-6">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20">
              <span className="text-amber-400 text-lg">✦</span>
            </div>
            <h2 className="text-xl font-semibold">Premium Access</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Unlock advanced features and exclusive content with Premium Access
          </p>

          <div className="dashboard-grid-3 mb-6">
            <Link href="/dashboard/analytics" className="cursor-pointer">
              <Card className="bg-black/20 border-black/10 hover-lift">
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <BarChart2 className="text-indigo-400 h-6 w-6" />
                  </div>
                  <h3 className="text-base font-medium mb-2">Advanced Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access detailed market data and advanced charting tools
                  </p>
                </div>
              </Card>
            </Link>
            
            <Link href="/dashboard/research" className="cursor-pointer">
              <Card className="bg-black/20 border-black/10 hover-lift">
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <Users className="text-blue-400 h-6 w-6" />
                  </div>
                  <h3 className="text-base font-medium mb-2">AI Research Assistant</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get personalized research assistance powered by AI
                  </p>
                </div>
              </Card>
            </Link>
            
            <Link href="/dashboard/research" className="cursor-pointer">
              <Card className="bg-black/20 border-black/10 hover-lift">
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                    <Lock className="text-purple-400 h-6 w-6" />
                  </div>
                  <h3 className="text-base font-medium mb-2">Exclusive Content</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access premium research papers and community resources
                  </p>
                </div>
              </Card>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Stake MOONSET tokens to earn Premium Access NFTs
            </p>
            <Link href="/dashboard/staking">
              <Button className="dashboard-button dashboard-button-primary">
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
