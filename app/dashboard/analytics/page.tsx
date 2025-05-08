"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  ArrowUpRight, 
  CalendarDays, 
  Download, 
  Filter, 
  ChevronDown,
  CandlestickChart,
  AreaChart,
  Maximize,
  Share2,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"
import DashboardPageLayout from '@/components/dashboard-page-layout'
import DashboardTabs from '@/components/dashboard-tabs'
import { MoonsetTokenChart } from '@/components/moonset-token-chart'

export default function TokenAnalyticsPage() {
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Function to refresh data
  const refreshData = () => {
    alert("Refreshing analytics data...");
    // In a real implementation, this would fetch new data
  };

  // Function to export data
  const exportData = () => {
    alert("Exporting analytics data to CSV...");
    // In a real implementation, this would download data
  };

  const analyticsTabs = [
    {
      id: "price",
      label: "Price History",
      content: (
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white">Price History</CardTitle>
              <CardDescription className="text-white/70">Historical price performance of MOONSET token</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 text-xs">+4.28%</Badge>
              <div className="flex">
                <button 
                  className="text-white/60 hover:text-white"
                  onClick={refreshData}
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button 
                  className="text-white/60 hover:text-white ml-2"
                  onClick={() => alert("Share options would appear for social media/copy link")}
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <MoonsetTokenChart 
              height={350}
              showVolume={true}
              showMarketCap={true}
              lastUpdated="2 min ago"
              priceChange={{ value: 4.28, period: "last week" }}
              currentPrice={0.0842}
            />
            
            <div className="grid grid-cols-4 gap-2 mt-6 text-center">
              <div className="bg-white/5 rounded-md p-2">
                <div className="text-xs text-white/60">24h Low</div>
                <div className="text-white font-medium">$0.0781</div>
              </div>
              <div className="bg-white/5 rounded-md p-2">
                <div className="text-xs text-white/60">24h High</div>
                <div className="text-white font-medium">$0.0874</div>
              </div>
              <div className="bg-white/5 rounded-md p-2">
                <div className="text-xs text-white/60">ATH</div>
                <div className="text-white font-medium">$0.1284</div>
              </div>
              <div className="bg-white/5 rounded-md p-2">
                <div className="text-xs text-white/60">ATL</div>
                <div className="text-white font-medium">$0.0124</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: "volume",
      label: "Trading Volume",
      content: (
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white">Trading Volume</CardTitle>
              <CardDescription className="text-white/70">Historical trading activity for MOONSET token</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <MoonsetTokenChart 
              height={400}
              showVolume={true}
              showMarketCap={false}
              lastUpdated="2 min ago"
              priceChange={{ value: 4.28, period: "last week" }}
              currentPrice={0.0842}
            />
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 rounded-md p-4">
                <h4 className="text-white font-medium mb-2">Volume Analysis</h4>
                <p className="text-white/70 text-sm">
                  Trading volume has increased by 28% over the past month, indicating growing interest in the MOONSET token.
                </p>
              </div>
              <div className="bg-white/5 rounded-md p-4">
                <h4 className="text-white font-medium mb-2">Volume/Market Cap Ratio</h4>
                <p className="text-white/70 text-sm">
                  Current ratio: 0.36 - A healthy indicator showing reasonable trading activity relative to the token's market capitalization.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: "distribution",
      label: "Distribution",
      content: (
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white">Token Distribution</CardTitle>
              <CardDescription className="text-white/70">Distribution of MOONSET token across wallets</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center py-20">
              <div className="text-white/40 text-center">
                <div className="text-9xl opacity-10 mb-4">🔄</div>
                <div className="text-lg">Distribution chart visualization would appear here</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: "metrics",
      label: "Key Metrics",
      content: (
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white">Key Token Metrics</CardTitle>
              <CardDescription className="text-white/70">Essential metrics for MOONSET token performance</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-sm text-white/70">Market Cap Rank</span>
                <span className="font-medium text-white">#428</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-sm text-white/70">All-Time ROI</span>
                <span className="font-medium text-green-400">+624%</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-sm text-white/70">Launch Date</span>
                <span className="font-medium text-white">June 15, 2022</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-sm text-white/70">Diluted Valuation</span>
                <span className="font-medium text-white">$12.6M</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-sm text-white/70">Max Supply</span>
                <span className="font-medium text-white">200,000,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
  ];
  
  return (
    <DashboardPageLayout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Token Analytics</h1>
          <div className="page-date">
            <CalendarDays className="h-4 w-4 text-white/60" />
            <span>{currentDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="dashboard-button flex items-center gap-2"
            onClick={refreshData}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Refresh</span>
          </Button>
          <Button 
            className="dashboard-button-primary flex items-center gap-2"
            onClick={exportData}
          >
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Export</span>
          </Button>
        </div>
      </div>

      <div className="dashboard-grid mb-6">
        <Link href="#volume-details" className="block">
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">24h Volume</CardTitle>
              <div className="absolute top-3 right-3 text-green-400">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-value-lg">$428,651</div>
              <div className="flex items-center mt-1">
                <Badge className="bg-green-500/20 text-green-400 border-0 text-xs font-normal">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +8.2% from yesterday
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="#supply-details" className="block">
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">Circulating Supply</CardTitle>
              <div className="absolute top-3 right-3 text-blue-400">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-value-lg">100M / 150M</div>
              <div className="flex items-center mt-1">
                <span className="text-label">66.7% of total supply in circulation</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="#holders-details" className="block">
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">Holders</CardTitle>
              <div className="absolute top-3 right-3 text-purple-400">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-value-lg">14,526</div>
              <div className="flex items-center mt-1">
                <Badge className="bg-green-500/20 text-green-400 border-0 text-xs font-normal">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +34 new holders this week
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="#volatility-details" className="block">
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">Volatility</CardTitle>
              <div className="absolute top-3 right-3 text-yellow-400">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-value-lg">Medium</div>
              <div className="flex items-center mt-1">
                <span className="text-label">0.85 beta coefficient</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Dashboard tabs */}
      <DashboardTabs tabs={analyticsTabs} defaultTab="price" />
    </DashboardPageLayout>
  )
} 