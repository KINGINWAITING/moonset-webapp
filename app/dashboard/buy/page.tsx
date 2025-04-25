import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, CreditCard, ExternalLink, HelpCircle, Info, RefreshCw, Wallet, CalendarDays, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export default function BuyMoonsetPage() {
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="dashboard-title text-3xl mb-2 text-white">Buy MOONSET</h1>
          <p className="dashboard-subtitle flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-white/60" />
            <span>{currentDate}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 dashboard-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Purchase MOONSET Tokens</CardTitle>
            <CardDescription className="text-white/70">
              Use credit card, crypto, or connect with an exchange
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="card" className="space-y-4">
              <TabsList className="dashboard-tabs-list">
                <TabsTrigger value="card" className="dashboard-tab">Credit Card</TabsTrigger>
                <TabsTrigger value="crypto" className="dashboard-tab">Crypto</TabsTrigger>
                <TabsTrigger value="exchange" className="dashboard-tab">Exchange</TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="space-y-4 pt-2">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="amount" className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Amount (USD)
                      </label>
                      <div className="flex items-center text-sm text-white/60">
                        <span>1 MOONSET = $0.0842</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 text-white/60 hover:text-white">
                                <HelpCircle className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Current market price of MOONSET token</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="amount"
                          placeholder="0.00"
                          className="pr-16 bg-white/5 border-white/20 text-white placeholder:text-white/60"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-white/60">
                          USD
                        </div>
                      </div>
                      <Button variant="outline" size="icon" className="text-white border-white/20 bg-white/5 hover:bg-white/10">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                      <div className="relative flex-1">
                        <Input
                          placeholder="0.00"
                          className="pr-24 bg-white/5 border-white/20 text-white placeholder:text-white/60"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-white/60">
                          MOONSET
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none text-white">
                      Card Details
                    </label>
                    <div className="rounded-md border border-white/10 bg-white/5 p-4 space-y-4">
                      <div className="grid gap-4">
                        <Input placeholder="Cardholder Name" className="bg-white/5 border-white/20 text-white placeholder:text-white/60" />
                        <div className="relative">
                          <Input placeholder="Card Number" className="bg-white/5 border-white/20 text-white placeholder:text-white/60" />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <CreditCard className="h-4 w-4 text-white/60" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="MM/YY" className="bg-white/5 border-white/20 text-white placeholder:text-white/60" />
                        <Input placeholder="CVC" className="bg-white/5 border-white/20 text-white placeholder:text-white/60" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border border-white/10 bg-white/5 p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Subtotal</span>
                      <span className="text-white">$100.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span className="text-white/70">Processing Fee (3%)</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 text-white/60 hover:text-white">
                                <Info className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Fee charged by payment processor</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="text-white">$3.00</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex items-center justify-between font-medium">
                      <span className="text-white">Total</span>
                      <span className="text-white">$103.00</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90">Buy MOONSET</Button>
              </TabsContent>
              <TabsContent value="crypto" className="space-y-4 pt-2">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="amount" className="text-sm font-medium leading-none text-white">
                      Pay With
                    </label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        <SelectItem value="btc" className="focus:bg-white/10 focus:text-white">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth" className="focus:bg-white/10 focus:text-white">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdt" className="focus:bg-white/10 focus:text-white">Tether (USDT)</SelectItem>
                        <SelectItem value="usdc" className="focus:bg-white/10 focus:text-white">USD Coin (USDC)</SelectItem>
                        <SelectItem value="bnb" className="focus:bg-white/10 focus:text-white">Binance Coin (BNB)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="amount" className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Amount
                      </label>
                      <div className="flex items-center gap-1 text-sm text-white/60">
                        <span>1 ETH = 33,792 MOONSET</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4 text-white/60 hover:text-white">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          placeholder="0.00"
                          className="pr-16 bg-white/5 border-white/20 text-white placeholder:text-white/60"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-white/60">
                          ETH
                        </div>
                      </div>
                      <Button variant="outline" size="icon" className="text-white border-white/20 bg-white/5 hover:bg-white/10">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                      <div className="relative flex-1">
                        <Input
                          placeholder="0.00"
                          className="pr-24 bg-white/5 border-white/20 text-white placeholder:text-white/60"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-white/60">
                          MOONSET
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-white/10 bg-white/5 p-4 hover-lift">
                    <div className="flex flex-col items-center space-y-2">
                      <p className="text-sm text-white/70">Send ETH to this address:</p>
                      <div className="bg-slate-800 p-4 w-full rounded-md text-center break-all text-xs md:text-sm text-white">
                        0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7
                      </div>
                      <p className="text-xs text-white/70 mt-2">
                        MOONSET tokens will be sent to your connected wallet
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </TabsContent>
              <TabsContent value="exchange" className="space-y-4 pt-2">
                <div className="rounded-md border border-white/10 bg-white/5 p-4 hover-lift">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-medium text-white">Buy on External Exchanges</h3>
                    <p className="text-sm text-white/70">
                      MOONSET token is available on the following exchanges:
                    </p>
                    <div className="grid gap-2 md:grid-cols-2 mt-4">
                      {[
                        { name: "Binance", url: "https://binance.com" },
                        { name: "Coinbase", url: "https://coinbase.com" },
                        { name: "KuCoin", url: "https://kucoin.com" },
                        { name: "OKX", url: "https://okx.com" }
                      ].map((exchange, i) => (
                        <Button key={`exchange-${i}`} variant="outline" className="justify-between text-white border-white/20 bg-white/5 hover:bg-white/10">
                          {exchange.name}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border border-white/10 bg-white/5 p-4 space-y-3 hover-lift">
                  <h3 className="font-medium text-white">Trading Pairs</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">MOONSET/USDT</span>
                      <span className="text-white/70">Most popular</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">MOONSET/BTC</span>
                      <span className="text-white/70">Available on 3 exchanges</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">MOONSET/ETH</span>
                      <span className="text-white/70">Available on 2 exchanges</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader>
              <CardTitle className="text-white">MOONSET Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">$0.0842</div>
              <p className="text-sm text-green-400 font-medium">+2.5% (24h)</p>
              <div className="mt-4 h-[100px] w-full rounded-md bg-white/5 border border-white/10">
                <div className="h-full w-full flex items-end">
                  <div className="flex-1 bg-gradient-to-t from-green-500/20 to-green-500/5 h-[70%]"></div>
                  <div className="flex-1 bg-gradient-to-t from-green-500/20 to-green-500/5 h-[60%]"></div>
                  <div className="flex-1 bg-gradient-to-t from-green-500/20 to-green-500/5 h-[80%]"></div>
                  <div className="flex-1 bg-gradient-to-t from-green-500/20 to-green-500/5 h-[75%]"></div>
                  <div className="flex-1 bg-gradient-to-t from-green-500/20 to-green-500/5 h-[85%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader>
              <CardTitle className="text-white">Quick Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-white/70">Market Cap</span>
                <span className="text-sm font-medium text-white">$8.42M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/70">24h Volume</span>
                <span className="text-sm font-medium text-white">$428K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/70">Circulating Supply</span>
                <span className="text-sm font-medium text-white">100M MOONSET</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white/70">Total Supply</span>
                <span className="text-sm font-medium text-white">150M MOONSET</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-white border-white/20 bg-white/5 hover:bg-white/10" size="sm">
                View Token Analytics
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Buy MOONSET with</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Badge className="flex justify-center py-3 bg-white/5 hover:bg-white/10 text-white border-white/10">
                  <img src="/visa.svg" alt="Visa" className="h-5 opacity-70" />
                </Badge>
                <Badge className="flex justify-center py-3 bg-white/5 hover:bg-white/10 text-white border-white/10">
                  <img src="/mastercard.svg" alt="Mastercard" className="h-5 opacity-70" />
                </Badge>
                <Badge className="flex justify-center py-3 bg-white/5 hover:bg-white/10 text-white border-white/10">
                  <img src="/bitcoin.svg" alt="Bitcoin" className="h-5 opacity-70" />
                </Badge>
                <Badge className="flex justify-center py-3 bg-white/5 hover:bg-white/10 text-white border-white/10">
                  <img src="/ethereum.svg" alt="Ethereum" className="h-5 opacity-70" />
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
} 