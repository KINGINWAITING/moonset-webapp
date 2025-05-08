"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StakingRewards } from "@/components/staking-rewards"
import { NFTRewards } from "@/components/nft-rewards"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Clock, Coins, HelpCircle, Info, Lock, Unlock, CalendarDays } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import DashboardPageLayout from '@/components/dashboard-page-layout'

export default function StakingPage() {
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [activeTab, setActiveTab] = useState("flexible");

  return (
    <DashboardPageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="dashboard-title text-3xl mb-2 text-white">Staking</h1>
          <p className="dashboard-subtitle flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-white/60" />
            <span>{currentDate}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card className="dashboard-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Available to Stake</CardTitle>
            <Coins className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7,842 MOONSET</div>
            <p className="text-xs text-white/70">
              ≈ $660.29 USD
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Currently Staked</CardTitle>
            <Lock className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5,000 MOONSET</div>
            <p className="text-xs text-white/70">
              ≈ $421.00 USD
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Rewards Earned</CardTitle>
            <Coins className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">342 MOONSET</div>
            <p className="text-xs text-white/70">
              <span className="text-green-400">+42</span> this week
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Current APY</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-white/70" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Annual Percentage Yield for staked tokens</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">12.4%</div>
            <p className="text-xs text-white/70">
              Adjusted weekly
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="dashboard-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Staking Pools</CardTitle>
              <CardDescription className="text-white/70">Choose a staking pool based on lock duration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="dashboard-tabs-list mb-6">
                <button 
                  className={`dashboard-tab ${activeTab === "flexible" ? "active" : ""}`}
                  data-state={activeTab === "flexible" ? "active" : "inactive"}
                  onClick={() => setActiveTab("flexible")}
                >
                  Flexible (0% APY)
                </button>
                <button 
                  className={`dashboard-tab ${activeTab === "30days" ? "active" : ""}`}
                  data-state={activeTab === "30days" ? "active" : "inactive"}
                  onClick={() => setActiveTab("30days")}
                >
                  30 Days (8.4% APY)
                </button>
                <button 
                  className={`dashboard-tab ${activeTab === "90days" ? "active" : ""}`}
                  data-state={activeTab === "90days" ? "active" : "inactive"}
                  onClick={() => setActiveTab("90days")}
                >
                  90 Days (12.4% APY)
                </button>
              </div>
              
              {activeTab === "flexible" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white">Flexible Staking</h3>
                        <Badge variant="outline" className="border-white/20 text-white bg-white/10">No Lock Period</Badge>
                      </div>
                      <p className="text-sm text-white/70">
                        Stake your tokens with no locking period. Withdraw anytime but earn no APY.
                      </p>
                      <div className="flex items-center mt-2 text-sm">
                        <Info className="h-4 w-4 text-white/70 mr-1" />
                        <span className="text-white/70">This pool does not earn interest but provides instant liquidity.</span>
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="border border-white/10 bg-white/5">
                    <AlertCircle className="h-4 w-4 text-white" />
                    <AlertTitle className="text-white">Note</AlertTitle>
                    <AlertDescription className="text-white/70">
                      The flexible staking pool does not earn APY but allows instant unstaking.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid gap-4 pt-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="amount" className="text-sm font-medium text-white">Amount to stake</label>
                        <span className="text-xs text-white/70">Available: 7,842 MOONSET</span>
                      </div>
                      <div className="relative">
                        <Input
                          id="amount"
                          placeholder="0.00"
                          className="pr-20 bg-white/5 border-white/20 text-white placeholder:text-white/60"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-white/60">
                          MOONSET
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Estimated Rewards (24h)</span>
                      <span className="text-white">0 MOONSET</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
                    onClick={() => {
                      // In a real app, this would handle the staking process
                      alert("Your tokens would be staked in the flexible pool");
                    }}
                  >Stake MOONSET</Button>
                </div>
              )}
              
              {activeTab === "30days" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white">30-Day Staking</h3>
                        <Badge variant="outline" className="bg-blue-500/10 border-blue-400 text-blue-400">8.4% APY</Badge>
                      </div>
                      <p className="text-sm text-white/70">
                        Stake your tokens for 30 days to earn 8.4% APY. Early withdrawal incurs a 10% penalty.
                      </p>
                      <div className="flex items-center mt-2 text-sm">
                        <Clock className="h-4 w-4 text-amber-400 mr-1" />
                        <span className="text-amber-400">30-day lock period applies</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 pt-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="amount" className="text-sm font-medium text-white">Amount to stake</label>
                        <span className="text-xs text-white/70">Available: 7,842 MOONSET</span>
                      </div>
                      <div className="relative">
                        <Input
                          id="amount"
                          placeholder="0.00"
                          className="pr-20 bg-white/5 border-white/20 text-white placeholder:text-white/60"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-white/60">
                          MOONSET
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Lock Period</span>
                        <span className="text-white">30 days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Early Unstake Fee</span>
                        <span className="text-white">10%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Estimated Rewards (30 days)</span>
                        <span className="text-white">69 MOONSET</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
                    onClick={() => {
                      // In a real app, this would handle the staking process
                      alert("Your tokens would be staked in the 30-day pool");
                    }}
                  >Stake MOONSET</Button>
                </div>
              )}
              
              {activeTab === "90days" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white">90-Day Staking</h3>
                        <Badge variant="outline" className="bg-blue-500/10 border-blue-400 text-blue-400">12.4% APY</Badge>
                      </div>
                      <p className="text-sm text-white/70">
                        Stake your tokens for 90 days to earn our highest APY of 12.4%. Early withdrawal incurs a 20% penalty.
                      </p>
                      <div className="flex items-center mt-2 text-sm">
                        <Lock className="h-4 w-4 text-amber-400 mr-1" />
                        <span className="text-amber-400">90-day lock period applies</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 pt-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="amount" className="text-sm font-medium text-white">Amount to stake</label>
                        <span className="text-xs text-white/70">Available: 7,842 MOONSET</span>
                      </div>
                      <div className="relative">
                        <Input
                          id="amount"
                          placeholder="0.00"
                          className="pr-20 bg-white/5 border-white/20 text-white placeholder:text-white/60"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-white/60">
                          MOONSET
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Lock Period</span>
                        <span className="text-white">90 days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Early Unstake Fee</span>
                        <span className="text-white">20%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Estimated Rewards (90 days)</span>
                        <span className="text-white">310 MOONSET</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
                    onClick={() => {
                      // In a real app, this would handle the staking process
                      alert("Your tokens would be staked in the 90-day pool");
                    }}
                  >Stake MOONSET</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader>
              <CardTitle className="text-white">Your Staked Tokens</CardTitle>
              <CardDescription className="text-white/70">Currently staked tokens and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-white">90-Day Staking Pool</h3>
                        <p className="text-sm text-white/70">Staked on June 1, 2023</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 border-blue-400 text-blue-400">12.4% APY</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Amount</span>
                        <span className="font-medium text-white">5,000 MOONSET</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Rewards Earned</span>
                        <span className="font-medium text-green-400">+342 MOONSET</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Unlock Date</span>
                        <span className="font-medium text-white">August 30, 2023</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Time Remaining</span>
                        <span className="font-medium text-white">30 days</span>
                      </div>
                      <Progress value={67} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500" />
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>0 days</span>
                        <span>90 days</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between gap-2">
                  <Button 
                    className="w-full text-white border-white/20 bg-white/5 hover:bg-white/10" 
                    variant="outline"
                    onClick={() => {
                      // In a real app, this would show an unstake confirmation with penalty warning
                      alert("Warning: Unstaking early will incur a 20% penalty. Do you wish to continue?");
                    }}
                  >
                    <Unlock className="mr-2 h-4 w-4" />
                    Unstake Early
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
                    onClick={() => {
                      // In a real app, this would claim staking rewards
                      alert("342 MOONSET rewards claimed successfully!");
                    }}
                  >
                    <Coins className="mr-2 h-4 w-4" />
                    Claim Rewards
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader>
              <CardTitle className="text-white">Staking Benefits</CardTitle>
              <CardDescription className="text-white/70">Unlock premium features by staking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-gradient-to-r from-green-500 to-green-400 text-white border-0">Active</Badge>
                    <h3 className="font-medium text-white">NFT Rewards</h3>
                  </div>
                  <p className="text-sm text-white/70 mt-2">
                    Earn premium access NFTs based on your staking amount and duration.
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">Level 1</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">Unlocked</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">Level 2</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">Unlocked</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">Level 3</span>
                      <Badge variant="outline" className="text-white/70 border-white/20">50% Progress</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                    <div>
                      <h3 className="font-medium text-white">Governance Voting</h3>
                      <p className="text-xs text-white/70">Vote on platform proposals</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                    <div>
                      <h3 className="font-medium text-white">Research Access</h3>
                      <p className="text-xs text-white/70">Access premium research tools</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                    <div>
                      <h3 className="font-medium text-white">Early Access</h3>
                      <p className="text-xs text-white/70">Preview new features</p>
                    </div>
                    <Badge variant="outline" className="text-white/70 border-white/20">Locked</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader>
              <CardTitle className="text-white">Level Progress</CardTitle>
              <CardDescription className="text-white/70">Progress to the next NFT level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Level 3 NFT</span>
                  <span className="text-sm text-white/70">50% Complete</span>
                </div>
                <Progress value={50} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500" />
                <div className="text-xs text-white/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Current Stake</span>
                    <span className="text-white">5,000 MOONSET</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Required for Level 3</span>
                    <span className="text-white">10,000 MOONSET</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Remaining</span>
                    <span className="text-white">5,000 MOONSET</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
                onClick={() => {
                  // In a real app, this would take the user to staking form
                  document.querySelector('.dashboard-tab')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >Stake More to Level Up</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  )
}
