"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowDown, 
  ArrowUp, 
  TrendingDown, 
  TrendingUp, 
  Globe, 
  Search, 
  Filter,
  Download,
  ChevronDown,
  CalendarDays,
  Maximize,
  Share2,
  RefreshCw,
  FileDown
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"
import DashboardPageLayout from '../../../components/dashboard-page-layout'

export default function MarketDataPage() {
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [activeTab, setActiveTab] = useState("overview");
  
  // Function to refresh data
  const refreshData = () => {
    alert("Refreshing market data...");
    // In a real implementation, this would fetch new data
  };

  // Function to export data
  const exportData = () => {
    alert("Exporting market data to CSV...");
    // In a real implementation, this would download data
  };
  
  return (
    <DashboardPageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="dashboard-title text-3xl mb-2">Market Data</h1>
          <p className="dashboard-subtitle flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-white/60" />
            <span>{currentDate}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-white/20 bg-white/5 hover:bg-white/10"
            onClick={exportData}
          >
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-white/20 bg-white/5 hover:bg-white/10"
            onClick={refreshData}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Link href="/dashboard/analytics" className="block">
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">BTC Dominance</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">51.4%</div>
              <p className="text-xs text-white/70">
                <span className="text-green-400">+0.8%</span> from yesterday
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/analytics" className="block">
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Global Market Cap</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$1.82T</div>
              <p className="text-xs text-white/70">
                <span className="text-green-400">+2.4%</span> in 24h
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/analytics" className="block">
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">24h Volume</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$84.5B</div>
              <p className="text-xs text-white/70">
                <span className="text-red-400">-5.2%</span> in 24h
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/analytics" className="block">
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Fear & Greed Index</CardTitle>
              <Globe className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">65 - Greed</div>
              <p className="text-xs text-white/70">
                <span className="text-amber-400">+3</span> from yesterday
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="dashboard-tabs-list mb-6">
        <button 
          className={`dashboard-tab ${activeTab === "overview" ? "active" : ""}`}
          data-state={activeTab === "overview" ? "active" : "inactive"}
          onClick={() => setActiveTab("overview")}
        >
          Market Overview
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "trending" ? "active" : ""}`}
          data-state={activeTab === "trending" ? "active" : "inactive"}
          onClick={() => setActiveTab("trending")}
        >
          Trending
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "topMovers" ? "active" : ""}`}
          data-state={activeTab === "topMovers" ? "active" : "inactive"}
          onClick={() => setActiveTab("topMovers")}
        >
          Top Movers
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "exchanges" ? "active" : ""}`}
          data-state={activeTab === "exchanges" ? "active" : "inactive"}
          onClick={() => setActiveTab("exchanges")}
        >
          Exchanges
        </button>
      </div>
        
      {activeTab === "overview" && (
        <Card className="dashboard-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-white">Top Cryptocurrencies</CardTitle>
              <CardDescription className="text-white/70">Market data for top cryptocurrencies by market cap</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/60" />
                <Input placeholder="Search coins..." className="pl-8 bg-white/5 border-white/20 text-white placeholder:text-white/60" />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => {
                  alert("Maximize view would expand the table to full screen");
                }}
              >
                <Maximize className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => {
                  alert("Share options would appear for social media/copy link");
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto rounded-md border border-white/10">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="h-10 px-2 text-left font-medium text-white/70">#</th>
                    <th className="h-10 px-4 text-left font-medium text-white/70">Name</th>
                    <th className="h-10 px-4 text-right font-medium text-white/70">Price</th>
                    <th className="h-10 px-4 text-right font-medium text-white/70">24h %</th>
                    <th className="h-10 px-4 text-right font-medium text-white/70">7d %</th>
                    <th className="h-10 px-4 text-right font-medium text-white/70">Market Cap</th>
                    <th className="h-10 px-4 text-right font-medium text-white/70">Volume (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10 transition-colors hover:bg-white/5 cursor-pointer" onClick={() => alert("Navigating to BTC detail page")}>
                    <td className="p-2 align-middle text-white">1</td>
                    <td className="p-4 align-middle font-medium text-white">Bitcoin (BTC)</td>
                    <td className="p-4 align-middle text-right text-white">$51,284.62</td>
                    <td className="p-4 align-middle text-right text-green-400">+2.3%</td>
                    <td className="p-4 align-middle text-right text-green-400">+5.8%</td>
                    <td className="p-4 align-middle text-right text-white">$1.01T</td>
                    <td className="p-4 align-middle text-right text-white">$28.5B</td>
                  </tr>
                  <tr className="border-t border-white/10 transition-colors hover:bg-white/5 cursor-pointer" onClick={() => alert("Navigating to ETH detail page")}>
                    <td className="p-2 align-middle text-white">2</td>
                    <td className="p-4 align-middle font-medium text-white">Ethereum (ETH)</td>
                    <td className="p-4 align-middle text-right text-white">$2,842.18</td>
                    <td className="p-4 align-middle text-right text-green-400">+1.8%</td>
                    <td className="p-4 align-middle text-right text-green-400">+4.2%</td>
                    <td className="p-4 align-middle text-right text-white">$318.5B</td>
                    <td className="p-4 align-middle text-right text-white">$12.3B</td>
                  </tr>
                  <tr className="border-t border-white/10 transition-colors hover:bg-white/5 cursor-pointer" onClick={() => alert("Navigating to BNB detail page")}>
                    <td className="p-2 align-middle text-white">3</td>
                    <td className="p-4 align-middle font-medium text-white">Binance Coin (BNB)</td>
                    <td className="p-4 align-middle text-right text-white">$428.65</td>
                    <td className="p-4 align-middle text-right text-red-400">-0.4%</td>
                    <td className="p-4 align-middle text-right text-green-400">+2.1%</td>
                    <td className="p-4 align-middle text-right text-white">$72.8B</td>
                    <td className="p-4 align-middle text-right text-white">$1.8B</td>
                  </tr>
                  <tr className="border-t border-white/10 transition-colors hover:bg-white/5 cursor-pointer" onClick={() => alert("Navigating to SOL detail page")}>
                    <td className="p-2 align-middle text-white">4</td>
                    <td className="p-4 align-middle font-medium text-white">Solana (SOL)</td>
                    <td className="p-4 align-middle text-right text-white">$142.84</td>
                    <td className="p-4 align-middle text-right text-green-400">+3.6%</td>
                    <td className="p-4 align-middle text-right text-green-400">+10.2%</td>
                    <td className="p-4 align-middle text-right text-white">$62.5B</td>
                    <td className="p-4 align-middle text-right text-white">$2.4B</td>
                  </tr>
                  <tr className="border-t border-white/10 transition-colors hover:bg-white/5 cursor-pointer" onClick={() => alert("Navigating to MOONSET detail page")}>
                    <td className="p-2 align-middle text-white">5</td>
                    <td className="p-4 align-middle font-medium text-white">MOONSET</td>
                    <td className="p-4 align-middle text-right text-white">$0.0842</td>
                    <td className="p-4 align-middle text-right text-green-400">+2.5%</td>
                    <td className="p-4 align-middle text-right text-green-400">+8.4%</td>
                    <td className="p-4 align-middle text-right text-white">$8.4M</td>
                    <td className="p-4 align-middle text-right text-white">$428K</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="mx-1 text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Navigate to previous page")}
                disabled
              >Previous</Button>
              <Button variant="outline" size="sm" className="mx-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">1</Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="mx-1 text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Navigate to page 2")}
              >2</Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="mx-1 text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Navigate to page 3")}
              >3</Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="mx-1 text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Navigate to next page")}
              >Next</Button>
            </div>
          </CardContent>
        </Card>
      )}
        
      {activeTab === "trending" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="dashboard-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Trending Coins (24h)</CardTitle>
              <CardDescription className="text-white/70">Coins with the highest interest in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover-lift cursor-pointer" onClick={() => alert("Navigating to PEPE detail page")}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">1.</span>
                    <span className="font-medium text-white">PEPE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">+18.4%</span>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover-lift cursor-pointer" onClick={() => alert("Navigating to WIF detail page")}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">2.</span>
                    <span className="font-medium text-white">WIF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">+12.6%</span>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover-lift cursor-pointer" onClick={() => alert("Navigating to MOONSET detail page")}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">3.</span>
                    <span className="font-medium text-white">MOONSET</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">+8.4%</span>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover-lift cursor-pointer" onClick={() => alert("Navigating to BONK detail page")}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">4.</span>
                    <span className="font-medium text-white">BONK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">+7.9%</span>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover-lift cursor-pointer" onClick={() => alert("Navigating to SHIB detail page")}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">5.</span>
                    <span className="font-medium text-white">SHIB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">+5.6%</span>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Trending Topics</CardTitle>
              <CardDescription className="text-white/70">Most discussed topics in the crypto community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-white/5 border border-white/10 p-3 hover-lift cursor-pointer" onClick={() => alert("Navigating to Bitcoin ETF research")}>
                  <h3 className="font-medium text-white">Bitcoin ETF Inflows</h3>
                  <p className="text-sm text-white/70">Bitcoin ETFs see $284M in inflows yesterday</p>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-3 hover-lift cursor-pointer" onClick={() => alert("Navigating to Ethereum L2 research")}>
                  <h3 className="font-medium text-white">Ethereum Layer 2 Growth</h3>
                  <p className="text-sm text-white/70">Layer 2 TVL increases 15% in the past week</p>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-3 hover-lift cursor-pointer" onClick={() => alert("Navigating to MOONSET ecosystem research")}>
                  <h3 className="font-medium text-white">MOONSET Ecosystem Expansion</h3>
                  <p className="text-sm text-white/70">MOONSET announces new partnerships and integrations</p>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-3 hover-lift cursor-pointer" onClick={() => alert("Navigating to regulatory research")}>
                  <h3 className="font-medium text-white">Regulatory Developments</h3>
                  <p className="text-sm text-white/70">New crypto regulations proposed in the EU</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
        
      {activeTab === "topMovers" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="dashboard-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Top Gainers (24h)</CardTitle>
              <CardDescription className="text-white/70">Coins with the highest price increase in 24h</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["ARB", "LINK", "OP", "MATIC", "ADA"].map((coin, i) => (
                  <div 
                    key={`gainer-${i}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover-lift cursor-pointer"
                    onClick={() => alert(`Navigating to ${coin} detail page`)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{i + 1}.</span>
                      <span className="font-medium text-white">{coin}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">+{Math.floor(15 + Math.random() * 10)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Top Losers (24h)</CardTitle>
              <CardDescription className="text-white/70">Coins with the highest price decrease in 24h</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["DOGE", "AVAX", "DOT", "ATOM", "UNI"].map((coin, i) => (
                  <div 
                    key={`loser-${i}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover-lift cursor-pointer"
                    onClick={() => alert(`Navigating to ${coin} detail page`)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{i + 1}.</span>
                      <span className="font-medium text-white">{coin}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowDown className="h-4 w-4 text-red-400" />
                      <span className="text-red-400">-{Math.floor(5 + Math.random() * 8)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
        
      {activeTab === "exchanges" && (
        <Card className="dashboard-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Top Exchanges by Volume</CardTitle>
            <CardDescription className="text-white/70">Ranked by 24h trading volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto rounded-md border border-white/10">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="h-10 px-2 text-left font-medium text-white/70">Rank</th>
                    <th className="h-10 px-4 text-left font-medium text-white/70">Exchange</th>
                    <th className="h-10 px-4 text-right font-medium text-white/70">Volume (24h)</th>
                    <th className="h-10 px-4 text-right font-medium text-white/70">Markets</th>
                    <th className="h-10 px-4 text-right font-medium text-white/70">Trust Score</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Binance", volume: "$12.8B", markets: 1458, score: "9.8/10" },
                    { name: "Coinbase", volume: "$4.2B", markets: 648, score: "9.6/10" },
                    { name: "Kraken", volume: "$1.9B", markets: 589, score: "9.5/10" },
                    { name: "KuCoin", volume: "$1.7B", markets: 1204, score: "9.1/10" },
                    { name: "OKX", volume: "$1.6B", markets: 768, score: "8.9/10" }
                  ].map((exchange, i) => (
                    <tr 
                      key={`exchange-${i}`} 
                      className="border-t border-white/10 transition-colors hover:bg-white/5 cursor-pointer"
                      onClick={() => alert(`Navigating to ${exchange.name} details`)}
                    >
                      <td className="p-2 align-middle text-white">{i + 1}</td>
                      <td className="p-4 align-middle font-medium text-white">{exchange.name}</td>
                      <td className="p-4 align-middle text-right text-white">{exchange.volume}</td>
                      <td className="p-4 align-middle text-right text-white">{exchange.markets}</td>
                      <td className="p-4 align-middle text-right text-white">{exchange.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardPageLayout>
  )
} 