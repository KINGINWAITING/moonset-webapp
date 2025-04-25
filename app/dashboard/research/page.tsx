"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Clock, Download, FileText, BarChart, Search, Star, Bookmark, Lock, CalendarDays, SlidersHorizontal, ArrowUpDown, TrendingUp, ExternalLink, FileCheck, ChartBar, Filter } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import DashboardPageLayout from '../../../components/dashboard-page-layout'

export default function ResearchPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle search input
  const handleSearch = (e) => {
    console.log("Searching for:", e.target.value);
    // Implement search functionality
  }

  // Handle research item action
  const handleResearchItemAction = (item, action) => {
    if (action === 'read') {
      alert(`Opening report: ${item.title}`);
      // Implement navigation to report
    } else if (action === 'download') {
      alert(`Downloading report: ${item.title}`);
      // Implement download functionality
    } else if (action === 'bookmark') {
      alert(`Bookmarking report: ${item.title}`);
      // Implement bookmark functionality
    }
  }

  return (
    <DashboardPageLayout>
      <div>
        {/* Header with date */}
        <div className="dashboard-header-with-date">
          <div className="dashboard-header-left-content">
            <h1 className="dashboard-title">Research Platform</h1>
            <p className="dashboard-description">
              Access cutting-edge research, reports, and market analysis to make informed decisions
            </p>
          </div>
          <div className="dashboard-date">
            <CalendarDays size={16} />
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for reports, analysis or topics..."
              className="dashboard-search-input pl-9"
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => alert("Filter options will be available soon")}
            >
              <Filter size={16} />
              Filters
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => alert("Sort options will be available soon")}
            >
              <ArrowUpDown size={16} />
              Sort
            </Button>
          </div>
        </div>

        {/* Tabs for different research categories */}
        <div className="dashboard-tabs-list mb-6">
          <button 
            className={`dashboard-tab ${activeTab === "all" ? "active" : ""}`}
            data-state={activeTab === "all" ? "active" : "inactive"}
            onClick={() => setActiveTab("all")}
          >
            All Research
          </button>
          <button 
            className={`dashboard-tab ${activeTab === "reports" ? "active" : ""}`}
            data-state={activeTab === "reports" ? "active" : "inactive"}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
          <button 
            className={`dashboard-tab ${activeTab === "analysis" ? "active" : ""}`}
            data-state={activeTab === "analysis" ? "active" : "inactive"}
            onClick={() => setActiveTab("analysis")}
          >
            Analysis
          </button>
          <button 
            className={`dashboard-tab ${activeTab === "data" ? "active" : ""}`}
            data-state={activeTab === "data" ? "active" : "inactive"}
            onClick={() => setActiveTab("data")}
          >
            Data
          </button>
          <button 
            className={`dashboard-tab ${activeTab === "saved" ? "active" : ""}`}
            data-state={activeTab === "saved" ? "active" : "inactive"}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        </div>

        {activeTab === "all" && (
          <>
            {/* Featured Report */}
            <Card className="dashboard-card hover-lift mb-6 p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2 bg-white/10">Featured Report</Badge>
                    <h2 className="text-xl font-bold mb-2">The Evolution of DeFi: Q3 2023 Market Overview</h2>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive analysis of DeFi markets with projections for Q4 and beyond. Includes yield farming opportunities and risk assessment.
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileCheck size={16} />
                        <span>30 pages</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays size={16} />
                        <span>Oct 15, 2023</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="dashboard-button-primary"
                    onClick={() => alert("Opening featured report: The Evolution of DeFi: Q3 2023 Market Overview")}
                  >
                    Read Report
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Research Grid */}
            <h2 className="dashboard-section-title mb-4">Latest Research</h2>
            <div className="dashboard-grid-3 mb-6">
              {researchItems.slice(0, 6).map((item, index) => (
                <Card key={index} className="dashboard-card hover-lift overflow-hidden">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant={item.premium ? "secondary" : "outline"} className={item.premium ? "bg-gradient-to-r from-yellow-500/20 to-amber-700/20 text-amber-400" : ""}>
                        {item.category}
                        {item.premium && " • Premium"}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleResearchItemAction(item, 'bookmark')}
                      >
                        <BookOpen size={16} />
                      </Button>
                    </div>
                    <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {item.date}
                      </div>
                      {item.premium ? (
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleResearchItemAction(item, 'download')}
                        >
                          <Download size={14} />
                          Download
                        </Button>
                      ) : (
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="gap-1 p-0"
                          onClick={() => handleResearchItemAction(item, 'read')}
                        >
                          Read More
                          <ArrowRight size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Market Analysis Tools */}
            <h2 className="dashboard-section-title mb-4">Market Analysis Tools</h2>
            <div className="dashboard-grid-2 mb-6">
              <Card className="dashboard-card hover-lift">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold">On-Chain Analytics Dashboard</h3>
                    <ChartBar size={20} className="text-indigo-400" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced visualization tools for analyzing blockchain data, transaction volumes, and network activity.
                  </p>
                  <Button 
                    className="w-full dashboard-button-primary"
                    onClick={() => alert("Opening On-Chain Analytics Dashboard")}
                  >
                    Open Dashboard
                  </Button>
                </div>
              </Card>
              <Card className="dashboard-card hover-lift">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold">Market Sentiment Analyzer</h3>
                    <TrendingUp size={20} className="text-green-400" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track social media sentiment, news impact, and market psychology indicators for major cryptocurrencies.
                  </p>
                  <Button 
                    className="w-full dashboard-button-primary"
                    onClick={() => alert("Opening Market Sentiment Analyzer")}
                  >
                    Analyze Sentiment
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "reports" && (
          <div className="dashboard-grid-3">
            {researchItems.filter(item => item.category === "Report").map((item, index) => (
              <Card key={index} className="dashboard-card hover-lift overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant={item.premium ? "secondary" : "outline"} className={item.premium ? "bg-gradient-to-r from-yellow-500/20 to-amber-700/20 text-amber-400" : ""}>
                      {item.category}
                      {item.premium && " • Premium"}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleResearchItemAction(item, 'bookmark')}
                    >
                      <BookOpen size={16} />
                    </Button>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {item.date}
                    </div>
                    {item.premium ? (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleResearchItemAction(item, 'download')}
                      >
                        <Download size={14} />
                        Download
                      </Button>
                    ) : (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="gap-1 p-0"
                        onClick={() => handleResearchItemAction(item, 'read')}
                      >
                        Read More
                        <ArrowRight size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="dashboard-grid-3">
            {researchItems.filter(item => item.category === "Analysis").map((item, index) => (
              <Card key={index} className="dashboard-card hover-lift overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant={item.premium ? "secondary" : "outline"} className={item.premium ? "bg-gradient-to-r from-yellow-500/20 to-amber-700/20 text-amber-400" : ""}>
                      {item.category}
                      {item.premium && " • Premium"}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleResearchItemAction(item, 'bookmark')}
                    >
                      <BookOpen size={16} />
                    </Button>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {item.date}
                    </div>
                    {item.premium ? (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleResearchItemAction(item, 'download')}
                      >
                        <Download size={14} />
                        Download
                      </Button>
                    ) : (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="gap-1 p-0"
                        onClick={() => handleResearchItemAction(item, 'read')}
                      >
                        Read More
                        <ArrowRight size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "data" && (
          <div className="dashboard-grid-3">
            {researchItems.filter(item => item.category === "Data").map((item, index) => (
              <Card key={index} className="dashboard-card hover-lift overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant={item.premium ? "secondary" : "outline"} className={item.premium ? "bg-gradient-to-r from-yellow-500/20 to-amber-700/20 text-amber-400" : ""}>
                      {item.category}
                      {item.premium && " • Premium"}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleResearchItemAction(item, 'bookmark')}
                    >
                      <BookOpen size={16} />
                    </Button>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {item.date}
                    </div>
                    {item.premium ? (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleResearchItemAction(item, 'download')}
                      >
                        <Download size={14} />
                        Download
                      </Button>
                    ) : (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="gap-1 p-0"
                        onClick={() => handleResearchItemAction(item, 'read')}
                      >
                        Read More
                        <ArrowRight size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "saved" && (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No saved research yet</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              When you save research reports or analysis, they will appear here for quick access
            </p>
            <Button 
              className="dashboard-button-primary"
              onClick={() => setActiveTab("all")}
            >
              Browse Research
            </Button>
          </div>
        )}
      </div>
    </DashboardPageLayout>
  )
}

// Sample research items data
const researchItems = [
  {
    title: "Bitcoin Halving: Impacts on Price and Mining Economics",
    description: "Analysis of historical halving events and projections for the next cycle based on on-chain metrics and miner behavior patterns.",
    category: "Report",
    premium: true,
    date: "Nov 12, 2023"
  },
  {
    title: "Ethereum Layer 2 Ecosystem Comparison",
    description: "Detailed analysis of major L2 solutions including TVL, transaction fees, and developer activity.",
    category: "Analysis",
    premium: false,
    date: "Nov 5, 2023"
  },
  {
    title: "NFT Market Recovery Signals",
    description: "Key indicators pointing to a potential revival in NFT markets after prolonged downturn.",
    category: "Data",
    premium: false,
    date: "Oct 28, 2023"
  },
  {
    title: "Regulatory Landscape: Global Crypto Policy Outlook",
    description: "Comprehensive overview of regulatory developments across major jurisdictions and potential impacts.",
    category: "Report",
    premium: true,
    date: "Oct 22, 2023"
  },
  {
    title: "DeFi Yield Opportunities: Risk-Adjusted Returns",
    description: "Analysis of current yield farming strategies with risk assessment and expected returns.",
    category: "Analysis",
    premium: true,
    date: "Oct 15, 2023"
  },
  {
    title: "Institutional Adoption: Tracking Fund Flows",
    description: "Data on institutional investment in crypto assets across different vehicles and instruments.",
    category: "Data",
    premium: false,
    date: "Oct 8, 2023"
  },
  {
    title: "Consensus Mechanisms: Efficiency and Security Trade-offs",
    description: "Technical analysis of PoW, PoS, and emerging consensus algorithms with comparative metrics.",
    category: "Report",
    premium: false,
    date: "Oct 1, 2023"
  },
  {
    title: "Cross-Chain Bridge Security Analysis",
    description: "Audit of major bridge implementations, historical vulnerabilities, and security best practices.",
    category: "Analysis",
    premium: true,
    date: "Sep 24, 2023"
  },
  {
    title: "BTC and ETH Correlation Analysis: 2023 Edition",
    description: "Statistical analysis of correlation patterns between major cryptocurrencies across different market regimes.",
    category: "Data",
    premium: true,
    date: "Sep 18, 2023"
  }
] 