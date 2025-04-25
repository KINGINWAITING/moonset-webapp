"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, ArrowRight } from "lucide-react"

export default function RoadmapPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">MOONSET Roadmap</h1>
        <p className="text-xl text-muted-foreground">Our journey and future plans for the MOONSET platform</p>
      </div>

      <div className="space-y-12">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-6 md:ml-8"></div>

          <div className="space-y-12">
            <div className="relative">
              <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-100 dark:bg-green-900 z-10">
                <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" />
              </div>

              <div className="pl-16 md:pl-24">
                <div className="mb-4">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400"
                  >
                    Completed
                  </Badge>
                  <h2 className="text-2xl font-bold mt-2">Q1 2023: Foundation</h2>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Concept Development</p>
                          <p className="text-sm text-muted-foreground">Initial concept and whitepaper development</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Team Formation</p>
                          <p className="text-sm text-muted-foreground">
                            Assembly of core development and research team
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Smart Contract Development</p>
                          <p className="text-sm text-muted-foreground">
                            Development and auditing of MOONSET token smart contracts
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Private Funding Round</p>
                          <p className="text-sm text-muted-foreground">
                            Securing initial investment from strategic partners
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-100 dark:bg-green-900 z-10">
                <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" />
              </div>

              <div className="pl-16 md:pl-24">
                <div className="mb-4">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400"
                  >
                    Completed
                  </Badge>
                  <h2 className="text-2xl font-bold mt-2">Q2-Q3 2023: Development</h2>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Token Launch</p>
                          <p className="text-sm text-muted-foreground">
                            Public launch of MOONSET token on Ethereum mainnet
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Platform MVP</p>
                          <p className="text-sm text-muted-foreground">
                            Development of minimum viable product with basic features
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Staking Mechanism</p>
                          <p className="text-sm text-muted-foreground">
                            Implementation of token staking and rewards system
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Community Building</p>
                          <p className="text-sm text-muted-foreground">
                            Initial community outreach and ambassador program
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 dark:bg-blue-900 z-10">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="pl-16 md:pl-24">
                <div className="mb-4">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400">
                    In Progress
                  </Badge>
                  <h2 className="text-2xl font-bold mt-2">Q4 2023 - Q1 2024: Platform Growth</h2>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Research Archive</p>
                          <p className="text-sm text-muted-foreground">
                            Launch of comprehensive research archive with initial content
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">AI Research Assistant</p>
                          <p className="text-sm text-muted-foreground">Integration of AI-powered research assistant</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">NFT Access System</p>
                          <p className="text-sm text-muted-foreground">
                            Implementation of Premium Access NFTs for stakers
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Governance Portal</p>
                          <p className="text-sm text-muted-foreground">
                            Launch of decentralized governance system for token holders
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted z-10">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
              </div>

              <div className="pl-16 md:pl-24">
                <div className="mb-4">
                  <Badge variant="outline">Planned</Badge>
                  <h2 className="text-2xl font-bold mt-2">Q2-Q4 2024: Expansion</h2>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Advanced Analytics</p>
                          <p className="text-sm text-muted-foreground">
                            Integration of advanced market analytics and visualization tools
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Mobile Application</p>
                          <p className="text-sm text-muted-foreground">
                            Launch of native mobile applications for iOS and Android
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Strategic Partnerships</p>
                          <p className="text-sm text-muted-foreground">
                            Partnerships with research institutions and crypto projects
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Cross-Chain Integration</p>
                          <p className="text-sm text-muted-foreground">Expansion to additional blockchain networks</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted z-10">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
              </div>

              <div className="pl-16 md:pl-24">
                <div className="mb-4">
                  <Badge variant="outline">Planned</Badge>
                  <h2 className="text-2xl font-bold mt-2">2025 and Beyond: Ecosystem</h2>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Decentralized Research Marketplace</p>
                          <p className="text-sm text-muted-foreground">
                            Platform for commissioning and selling research
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Research DAO</p>
                          <p className="text-sm text-muted-foreground">
                            Fully decentralized autonomous organization for research funding
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Global Research Grants</p>
                          <p className="text-sm text-muted-foreground">
                            Funding program for blockchain and cryptocurrency research
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Ecosystem Expansion</p>
                          <p className="text-sm text-muted-foreground">
                            Development of additional tools and services within the MOONSET ecosystem
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
