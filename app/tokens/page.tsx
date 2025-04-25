"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Filter, TrendingUp, ChevronRight, ArrowUp, ArrowDown, Star, Clock } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useState } from "react"

// Sample data for tokens
const tokens = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 69423.52,
    priceChange: 2.4,
    marketCap: 1354000000000,
    volume: 28900000000,
    logo: "/btc-logo.png",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3421.18,
    priceChange: 1.7,
    marketCap: 409000000000,
    volume: 12500000000,
    logo: "/eth-logo.png",
  },
  {
    id: 3,
    name: "MOONSET",
    symbol: "MOON",
    price: 0.842,
    priceChange: 12.5,
    marketCap: 84200000,
    volume: 7800000,
    logo: "/moonset-logo.png",
  },
  {
    id: 4,
    name: "Solana",
    symbol: "SOL",
    price: 145.32,
    priceChange: -0.8,
    marketCap: 67500000000,
    volume: 2400000000,
    logo: "/sol-logo.png",
  },
  {
    id: 5,
    name: "Binance Coin",
    symbol: "BNB",
    price: 582.46,
    priceChange: -1.2,
    marketCap: 87900000000,
    volume: 1680000000,
    logo: "/bnb-logo.png",
  },
  {
    id: 6,
    name: "Cardano",
    symbol: "ADA",
    price: 0.452,
    priceChange: 3.6,
    marketCap: 15800000000,
    volume: 720000000,
    logo: "/ada-logo.png",
  },
  {
    id: 7,
    name: "XRP",
    symbol: "XRP",
    price: 0.592,
    priceChange: 1.3,
    marketCap: 34200000000,
    volume: 980000000,
    logo: "/xrp-logo.png",
  },
  {
    id: 8,
    name: "Polkadot",
    symbol: "DOT",
    price: 7.32,
    priceChange: -0.5,
    marketCap: 9800000000,
    volume: 320000000,
    logo: "/dot-logo.png",
  }
];

// Trending tokens
const trendingTokens = [
  {
    id: 101,
    name: "Arbitrum",
    symbol: "ARB",
    price: 1.23,
    priceChange: 18.2,
    logo: "/arb-logo.png",
  },
  {
    id: 102,
    name: "Optimism",
    symbol: "OP",
    price: 2.85,
    priceChange: 15.7,
    logo: "/op-logo.png",
  },
  {
    id: 103,
    name: "MOONSET",
    symbol: "MOON",
    price: 0.842,
    priceChange: 12.5,
    logo: "/moonset-logo.png",
  },
  {
    id: 104,
    name: "Avalanche",
    symbol: "AVAX",
    price: 37.92,
    priceChange: 9.3,
    logo: "/avax-logo.png",
  }
];

// Format numbers
function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(1)}B`;
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(1)}K`;
  }
  return `$${num.toFixed(0)}`;
}

export default function TokensPage() {
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [activeTab, setActiveTab] = useState("all");
  const [selectedSort, setSelectedSort] = useState("market_cap");

  // Function to handle filtering
  const handleFilter = () => {
    alert("Filter options would appear here");
  };

  // Function to handle export
  const handleExport = () => {
    alert("Exporting tokens data to CSV...");
  };

  // Function to handle token row click
  const handleTokenClick = (symbol) => {
    alert(`Navigating to ${symbol} analytics page`);
  };

  // Function to toggle watchlist status
  const toggleWatchlist = (e, symbol) => {
    e.stopPropagation(); // Prevent row click
    alert(`Added ${symbol} to watchlist`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tokens</h1>
          <div className="page-date">
            <CalendarDays className="h-4 w-4 text-white/60" />
            <span>{currentDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="dashboard-button flex items-center gap-2" 
            onClick={handleExport}
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden md:inline">Export</span>
          </Button>
          <Button 
            className="dashboard-button-primary flex items-center gap-2"
            onClick={() => alert("Refreshing token data...")}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Refresh</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
          <Input
            type="search"
            placeholder="Search tokens..."
            className="pl-8 bg-white/5 border-white/10 text-white w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            className="dashboard-button flex items-center gap-2"
            onClick={handleFilter}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <div className="relative">
            <Button 
              className="dashboard-button flex items-center gap-2"
              onClick={() => alert("Sort options would appear here")}
            >
              <ArrowUpDown className="h-4 w-4" />
              <span>Sort by</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="dashboard-tabs-list mb-6">
        <button 
          className={`dashboard-tab ${activeTab === "all" ? "active" : ""}`}
          data-state={activeTab === "all" ? "active" : "inactive"}
          onClick={() => setActiveTab("all")}
        >
          All Tokens
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "defi" ? "active" : ""}`}
          data-state={activeTab === "defi" ? "active" : "inactive"}
          onClick={() => setActiveTab("defi")}
        >
          DeFi
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "layer1" ? "active" : ""}`}
          data-state={activeTab === "layer1" ? "active" : "inactive"}
          onClick={() => setActiveTab("layer1")}
        >
          Layer 1
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "layer2" ? "active" : ""}`}
          data-state={activeTab === "layer2" ? "active" : "inactive"}
          onClick={() => setActiveTab("layer2")}
        >
          Layer 2
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "watchlist" ? "active" : ""}`}
          data-state={activeTab === "watchlist" ? "active" : "inactive"}
          onClick={() => setActiveTab("watchlist")}
        >
          Watchlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="dashboard-card col-span-full md:col-span-3">
          <CardHeader>
            <CardTitle className="text-white">Market Overview</CardTitle>
            <CardDescription>
              Global crypto market cap is $2.34T, a 2.8% increase over the last day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white/5 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-white/60 text-sm mb-1">Market Cap</div>
                  <div className="text-white font-semibold text-2xl">$2.34T</div>
                  <div className="flex items-center text-green-400 text-xs mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>2.8%</span>
                  </div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">24h Volume</div>
                  <div className="text-white font-semibold text-2xl">$148.2B</div>
                  <div className="flex items-center text-green-400 text-xs mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>5.1%</span>
                  </div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">BTC Dominance</div>
                  <div className="text-white font-semibold text-2xl">39.8%</div>
                  <div className="flex items-center text-red-400 text-xs mt-1">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    <span>0.4%</span>
                  </div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Active Tokens</div>
                  <div className="text-white font-semibold text-2xl">22,874</div>
                  <div className="flex items-center text-green-400 text-xs mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>125</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-white/60 font-medium text-sm">#</th>
                    <th className="text-left py-3 text-white/60 font-medium text-sm">Name</th>
                    <th className="text-right py-3 text-white/60 font-medium text-sm">Price</th>
                    <th className="text-right py-3 text-white/60 font-medium text-sm">24h %</th>
                    <th className="text-right py-3 text-white/60 font-medium text-sm">Market Cap</th>
                    <th className="text-right py-3 text-white/60 font-medium text-sm">Volume (24h)</th>
                    <th className="text-right py-3 text-white/60 font-medium text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token, index) => (
                    <tr 
                      key={token.symbol}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                      onClick={() => handleTokenClick(token.symbol)}
                    >
                      <td className="py-4 text-white/80 font-medium">{index + 1}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs mr-3">
                            {token.symbol.substring(0, 1)}
                          </div>
                          <div>
                            <div className="text-white font-medium">{token.name}</div>
                            <div className="text-white/60 text-xs">{token.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right text-white font-medium">${token.price.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <span className={token.priceChange >= 0 ? "text-green-400" : "text-red-400"}>
                          {token.priceChange >= 0 ? "+" : ""}{token.priceChange}%
                        </span>
                      </td>
                      <td className="py-4 text-right text-white/80">${token.marketCap}B</td>
                      <td className="py-4 text-right text-white/80">${token.volume}B</td>
                      <td className="py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full hover:bg-white/10 text-white/60 hover:text-yellow-400"
                          onClick={(e) => toggleWatchlist(e, token.symbol)}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="text-white/60 text-sm">
                Showing <span className="font-medium">1-8</span> of <span className="font-medium">100</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="dashboard-button"
                  onClick={() => alert("Previous page")}
                  disabled
                >
                  Previous
                </Button>
                <Button 
                  className="dashboard-button"
                  onClick={() => alert("Next page")}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white">Trending</CardTitle>
            <CardDescription>
              Tokens with significant momentum in the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingTokens.map((token) => (
                <div 
                  key={token.symbol}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                  onClick={() => handleTokenClick(token.symbol)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs mr-3">
                      {token.symbol.substring(0, 1)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{token.name}</div>
                      <div className="text-white/60 text-xs">{token.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">${token.price}</div>
                    <div className="text-green-400 text-xs">+{token.priceChange}%</div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4 dashboard-button-primary"
              onClick={() => alert("View all trending tokens")}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              View All Trending
            </Button>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Recently Added</CardTitle>
            <CardDescription>
              New tokens added to our tracking database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center items-center py-20 text-white/40 text-center">
                <div>
                  <div className="text-5xl opacity-20 mb-4">🚀</div>
                  <div className="text-lg mb-2">New tokens coming soon</div>
                  <div className="text-sm max-w-md mx-auto">We're constantly expanding our tracking database with new tokens. Check back soon!</div>
                </div>
              </div>
            </div>
            <Button 
              className="w-full mt-4 dashboard-button"
              onClick={() => alert("Subscribe to token alerts")}
            >
              Subscribe to Token Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 