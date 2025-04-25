"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Bell, Globe, Twitter, MessageSquare, ExternalLink, Search, Bookmark, Share2, ThumbsUp, BarChart } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function NewsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Crypto News</h2>
        <p className="text-muted-foreground">
          Stay up to date with the latest news, market updates, and development announcements.
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 top-12 mt-1 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-lg blur-3xl opacity-50 -z-10 h-[300px]"></div>
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/60" />
                <Input placeholder="Search for news stories, topics, or sources..." className="h-12 pl-10 pr-4 rounded-full border-border/40" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-12 whitespace-nowrap rounded-full px-4">
                  <Globe className="mr-2 h-4 w-4" />
                  All Sources
                </Button>
                <Button variant="outline" size="sm" className="h-12 rounded-full w-12 p-0 flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="top" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="top">Top Stories</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="moonset">MOONSET News</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Switch id="auto-refresh" />
              <label htmlFor="auto-refresh" className="text-muted-foreground">Auto-refresh</label>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <Clock className="mr-2 h-3.5 w-3.5" />
              Latest
            </Button>
          </div>
        </div>

        <TabsContent value="top" className="space-y-6">
          {/* Featured story */}
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-3 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-blue-500">Top Story</Badge>
                  <span className="text-sm text-muted-foreground">5 hours ago</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Bitcoin Breaks $70,000 Amid Renewed Institutional Interest</h3>
                <p className="text-muted-foreground mb-4">
                  Bitcoin has surged beyond $70,000 for the first time in weeks, driven by a new wave of institutional adoption 
                  and increased interest in cryptocurrency as an inflation hedge. Analysts point to macro-economic factors and 
                  regulatory clarity as key catalysts for the movement.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar-news.jpg" alt="CryptoInsider" />
                    <AvatarFallback>CI</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">CryptoInsider</p>
                    <p className="text-muted-foreground">Verified Source</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button className="gradient-bg">
                    Read Full Story
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="md:col-span-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="p-6 text-center">
                  <BarChart className="h-16 w-16 mx-auto mb-3 text-primary" />
                  <p className="font-medium">Bitcoin Price Action</p>
                  <p className="text-sm text-muted-foreground">24h Change: +7.2%</p>
                </div>
              </div>
            </div>
          </Card>

          {/* News grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Ethereum Development Accelerates as Developers Focus on Scalability Solutions",
                source: "ETH Daily",
                time: "8 hours ago",
                category: "Development",
                image: "eth"
              },
              {
                title: "SEC Approves New Cryptocurrency ETF Applications from Major Asset Managers",
                source: "Regulatory Watch",
                time: "10 hours ago",
                category: "Regulation",
                image: "regulatory"
              },
              {
                title: "MOONSET Token Records 30% Increase Following New Platform Features Announcement",
                source: "MOONSET Official",
                time: "12 hours ago",
                category: "MOONSET News",
                image: "moonset"
              },
              {
                title: "DeFi Protocols Report Record TVL as Investors Seek Alternative Yield Opportunities",
                source: "DeFi Pulse",
                time: "1 day ago",
                category: "DeFi",
                image: "defi"
              },
              {
                title: "NFT Market Shows Signs of Recovery with High-Profile Collection Launches",
                source: "NFT Insider",
                time: "1 day ago",
                category: "NFTs",
                image: "nft"
              },
              {
                title: "Crypto Exchange Trading Volumes Surge to Yearly Highs Amid Market Rally",
                source: "Exchange Monitor",
                time: "1 day ago",
                category: "Markets",
                image: "exchange"
              }
            ].map((item, i) => (
              <Card key={`news-${i}`} className="overflow-hidden flex flex-col">
                <div className={`h-32 bg-gradient-to-br ${
                  item.image === "eth" ? "from-blue-500/20 to-purple-500/20" :
                  item.image === "regulatory" ? "from-indigo-500/20 to-blue-500/20" :
                  item.image === "moonset" ? "from-purple-500/20 to-blue-500/20" :
                  item.image === "defi" ? "from-green-500/20 to-blue-500/20" :
                  item.image === "nft" ? "from-pink-500/20 to-blue-500/20" :
                  "from-amber-500/20 to-blue-500/20"
                }`}>
                  <div className="p-3">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-0">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-xs">{item.source.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{item.source}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto pt-2">
                  <div className="flex w-full justify-between">
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="latest" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Latest News</CardTitle>
                <p className="text-sm text-muted-foreground">Last updated: 3 minutes ago</p>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {[
                    {
                      title: "Leading Exchange Launches New Staking Products for PoS Cryptocurrencies",
                      source: "Exchange Daily",
                      time: "12 minutes ago",
                      content: "The exchange has announced new staking offerings with competitive APYs for multiple proof-of-stake cryptocurrencies, expanding their yield-generating product suite."
                    },
                    {
                      title: "Major Bank Partners with Blockchain Provider to Offer Institutional Custody",
                      source: "Banking Tech",
                      time: "45 minutes ago",
                      content: "In a significant move for traditional finance adoption, a top global bank has announced a partnership to provide institutional-grade custody solutions for digital assets."
                    },
                    {
                      title: "Developers Complete Successful Testnet for Upcoming Protocol Upgrade",
                      source: "Crypto Developer News",
                      time: "1 hour ago",
                      content: "The much-anticipated protocol upgrade has been successfully deployed on testnet, with the mainnet launch scheduled for next month pending security audits."
                    },
                    {
                      title: "NFT Marketplace Introduces Zero-Fee Trading to Attract New Users",
                      source: "NFT Insider",
                      time: "2 hours ago",
                      content: "In a bid to increase market share, a major NFT marketplace has announced a limited-time zero-fee trading promotion for all collections."
                    },
                    {
                      title: "Mining Difficulty Reaches All-Time High Following Hash Rate Surge",
                      source: "Mining Monitor",
                      time: "3 hours ago",
                      content: "Bitcoin mining difficulty has adjusted upward by 3.4% after network hash rate hit record levels, signaling increased competition among miners."
                    },
                    {
                      title: "Central Bank Publishes Research Paper on CBDC Implementation",
                      source: "Regulatory Watch",
                      time: "4 hours ago",
                      content: "A major central bank has released a comprehensive research paper outlining potential frameworks for implementing a central bank digital currency."
                    },
                    {
                      title: "DeFi Insurance Protocol Launches Coverage for Smart Contract Exploits",
                      source: "DeFi Daily",
                      time: "6 hours ago",
                      content: "A new insurance product specifically designed to cover losses from smart contract exploits has been launched, aiming to reduce risk for DeFi users."
                    },
                    {
                      title: "Gaming Studio Raises $50M to Develop Blockchain-Based MMO",
                      source: "GameFi News",
                      time: "8 hours ago",
                      content: "A prominent gaming studio has secured $50 million in funding to develop a massively multiplayer online game with integrated blockchain elements and tokenized assets."
                    }
                  ].map((item, i) => (
                    <div key={`latest-${i}`} className="pb-6 border-b last:border-b-0">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground mb-3">{item.content}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{item.source.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{item.source}</span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="markets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Market Headlines</CardTitle>
                  <CardDescription>Major market moves and significant financial developments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Bitcoin Options Open Interest Hits $24B as Derivatives Market Expands",
                        source: "Trading View",
                        time: "3 hours ago",
                        trend: "up",
                        change: "+5.2%"
                      },
                      {
                        title: "Stablecoin Market Cap Reaches New All-Time High of $160 Billion",
                        source: "Stablecoin Monitor",
                        time: "7 hours ago",
                        trend: "up",
                        change: "+2.8%"
                      },
                      {
                        title: "Altcoin Season Index Signals Strong Diversification from Bitcoin",
                        source: "Altcoin Daily",
                        time: "9 hours ago",
                        trend: "up",
                        change: "+12.5%"
                      },
                      {
                        title: "Market Liquidations: $250M in Short Positions Cleared in 24 Hours",
                        source: "Liquidation Watch",
                        time: "10 hours ago",
                        trend: "down",
                        change: "-32%"
                      },
                      {
                        title: "Global Crypto Market Trading Volume Surpasses $300B Daily",
                        source: "Volume Tracker",
                        time: "12 hours ago",
                        trend: "up",
                        change: "+18.3%"
                      }
                    ].map((item, i) => (
                      <div key={`market-${i}`} className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-3 ${
                          item.trend === "up" ? "bg-green-500/10" : "bg-red-500/10"
                        }`}>
                          <BarChart className={`h-6 w-6 ${
                            item.trend === "up" ? "text-green-500" : "text-red-500"
                          }`} />
                        </div>
                        <div className="flex-grow mr-3">
                          <p className="font-medium line-clamp-1">{item.title}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-muted-foreground">{item.source}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{item.time}</span>
                          </div>
                        </div>
                        <Badge className={item.trend === "up" ? "bg-green-500" : "bg-red-500"}>
                          {item.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Market Sentiment</CardTitle>
                  <CardDescription>Social and trading sentiment indicators</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 text-center">
                      <h3 className="text-lg font-bold mb-2">Fear & Greed Index</h3>
                      <div className="text-4xl font-bold text-green-500 mb-2">72</div>
                      <Badge className="bg-green-500">Greed</Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Popular Topics</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Bitcoin", "ETF", "Regulation", "Altcoin Season", "Tech Stocks", "Fed", "Ethereum", "DeFi"].map((topic, i) => (
                          <Badge key={`topic-${i}`} variant="outline" className="hover:bg-primary/10 cursor-pointer">
                            #{topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Social Activity</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                            <span className="text-sm">Twitter Mentions</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">+24%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 text-green-400" />
                            <span className="text-sm">Discussion Volume</span>
                          </div>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">+32%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Detailed Analysis
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="moonset" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>MOONSET News & Updates</CardTitle>
                  <CardDescription>Latest news about MOONSET development, partnerships, and ecosystem</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-primary">Featured Update</Badge>
                    <span className="text-sm text-muted-foreground">12 hours ago</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">MOONSET Platform Launches Advanced Staking Features</h3>
                  <p className="text-muted-foreground mb-4">
                    We're excited to announce the launch of our enhanced staking system with improved yield strategies, NFT rewards, and governance voting for all MOONSET token holders.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">
                      Read Full Announcement
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Staking Page
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  {[
                    {
                      title: "MOONSET Partners with Leading DeFi Protocol to Enhance Yield Options",
                      date: "2 days ago",
                      excerpt: "New strategic partnership aims to provide additional yield opportunities for MOONSET holders through integrated DeFi solutions."
                    },
                    {
                      title: "MOONSET Token Listed on Three New Exchanges",
                      date: "4 days ago",
                      excerpt: "MOONSET expands its availability with new exchange listings, increasing liquidity and access for global users."
                    },
                    {
                      title: "Community Governance Vote Results: New Feature Priorities Announced",
                      date: "1 week ago",
                      excerpt: "The results from our recent governance vote are in: the community has selected the next set of features for development priority."
                    },
                    {
                      title: "MOONSET Foundation Establishes $2M Developer Grant Program",
                      date: "2 weeks ago",
                      excerpt: "New initiative launched to support developers building applications and services in the MOONSET ecosystem."
                    }
                  ].map((item, i) => (
                    <div key={`moonset-news-${i}`} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.excerpt}</p>
                      <Button size="sm" variant="link" className="h-6 p-0">Read more</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sources You Follow</CardTitle>
              <CardDescription>News and updates from your followed sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">You're not following any sources yet</h3>
                <p className="text-muted-foreground mb-4">
                  Follow news sources to customize your feed and get updates from your favorite publications
                </p>
                <Button>
                  Discover Sources
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 