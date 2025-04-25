"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Vote, Plus, ThumbsUp, ThumbsDown, Users, Clock, CalendarDays } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DashboardPageLayout from '../../../components/dashboard-page-layout'

export default function GovernancePage() {
  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [activeTab, setActiveTab] = useState("active");

  return (
    <DashboardPageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="dashboard-title text-3xl mb-2 text-white">Governance</h1>
          <p className="dashboard-subtitle flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-white/60" />
            <span>{currentDate}</span>
          </p>
        </div>
        <Link href="/dashboard/governance/create">
          <Button 
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
            onClick={(e) => {
              // Since we don't have a create page yet, prevent navigation and show an alert
              e.preventDefault();
              alert("Create Proposal feature coming soon!");
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Proposal
          </Button>
        </Link>
      </div>

      <Card className="dashboard-card border-white/10 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Governance Overview</CardTitle>
          <CardDescription className="text-white/70">MOONSET token holders can propose and vote on changes to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-white/10 bg-white/5 p-4 text-center hover-lift">
              <div className="rounded-full bg-purple-500/20 p-3">
                <Vote className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">12</h3>
              <p className="text-sm text-white/70">Active Proposals</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-white/10 bg-white/5 p-4 text-center hover-lift">
              <div className="rounded-full bg-blue-500/20 p-3">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">1,842</h3>
              <p className="text-sm text-white/70">Governance Participants</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-white/10 bg-white/5 p-4 text-center hover-lift">
              <div className="rounded-full bg-indigo-500/20 p-3">
                <Clock className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white">3 Days</h3>
              <p className="text-sm text-white/70">Average Voting Period</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="dashboard-tabs-list mb-6">
        <button 
          className={`dashboard-tab ${activeTab === "active" ? "active" : ""}`}
          data-state={activeTab === "active" ? "active" : "inactive"}
          onClick={() => setActiveTab("active")}
        >
          Active Proposals
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "passed" ? "active" : ""}`}
          data-state={activeTab === "passed" ? "active" : "inactive"}
          onClick={() => setActiveTab("passed")}
        >
          Passed
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "rejected" ? "active" : ""}`}
          data-state={activeTab === "rejected" ? "active" : "inactive"}
          onClick={() => setActiveTab("rejected")}
        >
          Rejected
        </button>
        <button 
          className={`dashboard-tab ${activeTab === "executed" ? "active" : ""}`}
          data-state={activeTab === "executed" ? "active" : "inactive"}
          onClick={() => setActiveTab("executed")}
        >
          Executed
        </button>
      </div>

      {activeTab === "active" && (
        <>
          <Card className="dashboard-card border-white/10 hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-green-400/10 text-green-400 border-green-400/30">
                  Active
                </Badge>
                <div className="text-sm text-white/60">Ends in 2 days</div>
              </div>
              <CardTitle className="text-white">MIP-01: Increase Staking Rewards</CardTitle>
              <CardDescription className="text-white/70">
                Proposal to increase the staking rewards by 2% to incentivize long-term token holders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-green-400" />
                      <span className="text-white">For (68%)</span>
                    </div>
                    <span className="text-white">3.4M MOONSET</span>
                  </div>
                  <Progress value={68} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-green-500 to-green-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <ThumbsDown className="mr-2 h-4 w-4 text-red-400" />
                      <span className="text-white">Against (32%)</span>
                    </div>
                    <span className="text-white">1.6M MOONSET</span>
                  </div>
                  <Progress value={32} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-red-500 to-red-400" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                className="text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Viewing details for MIP-01: Increase Staking Rewards")}
              >
                View Details
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-green-400/50 text-green-400 bg-green-400/10 hover:bg-green-400/20 hover:text-green-400"
                  onClick={() => alert("You voted FOR MIP-01: Increase Staking Rewards")}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Vote For
                </Button>
                <Button 
                  variant="outline" 
                  className="border-red-400/50 text-red-400 bg-red-400/10 hover:bg-red-400/20 hover:text-red-400"
                  onClick={() => alert("You voted AGAINST MIP-01: Increase Staking Rewards")}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Vote Against
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="dashboard-card border-white/10 hover-lift mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-green-400/10 text-green-400 border-green-400/30">
                  Active
                </Badge>
                <div className="text-sm text-white/60">Ends in 5 days</div>
              </div>
              <CardTitle className="text-white">MIP-02: Add New Research Categories</CardTitle>
              <CardDescription className="text-white/70">
                Proposal to add three new research categories to the platform: DeFi, NFTs, and Layer 2 Solutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4 text-green-400" />
                      <span className="text-white">For (92%)</span>
                    </div>
                    <span className="text-white">4.6M MOONSET</span>
                  </div>
                  <Progress value={92} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-green-500 to-green-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <ThumbsDown className="mr-2 h-4 w-4 text-red-400" />
                      <span className="text-white">Against (8%)</span>
                    </div>
                    <span className="text-white">0.4M MOONSET</span>
                  </div>
                  <Progress value={8} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-red-500 to-red-400" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                className="text-white border-white/20 bg-white/5 hover:bg-white/10"
                onClick={() => alert("Viewing details for MIP-02: Add New Research Categories")}
              >
                View Details
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-green-400/50 text-green-400 bg-green-400/10 hover:bg-green-400/20 hover:text-green-400"
                  onClick={() => alert("You voted FOR MIP-02: Add New Research Categories")}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Vote For
                </Button>
                <Button 
                  variant="outline" 
                  className="border-red-400/50 text-red-400 bg-red-400/10 hover:bg-red-400/20 hover:text-red-400"
                  onClick={() => alert("You voted AGAINST MIP-02: Add New Research Categories")}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Vote Against
                </Button>
              </div>
            </CardFooter>
          </Card>
        </>
      )}

      {activeTab === "passed" && (
        <Card className="dashboard-card border-white/10">
          <CardContent className="p-8 text-center">
            <p className="text-white/70">Passed proposals will be displayed here</p>
          </CardContent>
        </Card>
      )}

      {activeTab === "rejected" && (
        <Card className="dashboard-card border-white/10">
          <CardContent className="p-8 text-center">
            <p className="text-white/70">Rejected proposals will be displayed here</p>
          </CardContent>
        </Card>
      )}

      {activeTab === "executed" && (
        <Card className="dashboard-card border-white/10">
          <CardContent className="p-8 text-center">
            <p className="text-white/70">Executed proposals will be displayed here</p>
          </CardContent>
        </Card>
      )}
    </DashboardPageLayout>
  )
} 