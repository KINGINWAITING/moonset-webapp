"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WhitepaperPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">MOONSET Whitepaper</h1>
        <p className="text-xl text-muted-foreground">A comprehensive overview of the MOONSET platform and token</p>
      </div>

      <Tabs defaultValue="introduction" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="introduction">Introduction</TabsTrigger>
          <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="introduction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introduction to MOONSET</CardTitle>
              <CardDescription>Vision, mission, and core principles</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h2>Vision</h2>
              <p>
                MOONSET aims to revolutionize cryptocurrency research and community collaboration through a
                decentralized platform powered by blockchain technology. Our vision is to create an ecosystem where
                knowledge is accessible, verifiable, and rewarded.
              </p>

              <h2>Mission</h2>
              <p>
                Our mission is to build a comprehensive platform that combines AI-powered research tools, community
                collaboration, and decentralized governance to advance the cryptocurrency space. By incentivizing
                quality research and community participation through our token economy, we aim to create a
                self-sustaining ecosystem that benefits all participants.
              </p>

              <h2>Core Principles</h2>
              <ol>
                <li>
                  <strong>Decentralization:</strong> MOONSET is built on the principles of decentralization, ensuring
                  that no single entity controls the platform or its direction.
                </li>
                <li>
                  <strong>Transparency:</strong> All platform operations, token distributions, and governance decisions
                  are transparent and verifiable on the blockchain.
                </li>
                <li>
                  <strong>Community-Driven:</strong> The MOONSET community is at the heart of the platform, with
                  governance rights and the ability to shape its future.
                </li>
                <li>
                  <strong>Quality Research:</strong> We prioritize high-quality, verifiable research and provide tools
                  to facilitate knowledge creation and sharing.
                </li>
                <li>
                  <strong>Accessibility:</strong> While premium features require token staking, basic platform
                  functionality is accessible to all users.
                </li>
              </ol>

              <h2>Problem Statement</h2>
              <p>
                The cryptocurrency space suffers from information asymmetry, fragmented research, and a lack of reliable
                sources. Researchers and community members often work in silos, with limited tools for collaboration and
                verification. Additionally, quality research is rarely rewarded adequately, leading to a proliferation
                of low-quality content.
              </p>

              <h2>Solution</h2>
              <p>MOONSET addresses these challenges by creating a unified platform that combines:</p>
              <ul>
                <li>AI-powered research tools for data analysis and content creation</li>
                <li>A comprehensive archive of verified documents, videos, and research papers</li>
                <li>Community collaboration features for knowledge sharing</li>
                <li>Token-based incentives for quality contributions</li>
                <li>Decentralized governance for platform evolution</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokenomics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>MOONSET Tokenomics</CardTitle>
              <CardDescription>Token distribution, utility, and economic model</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h2>Token Overview</h2>
              <p>
                MOONSET is an ERC-20 token built on the Ethereum blockchain with a total supply of 200 million tokens.
                The token serves as the primary utility and governance token for the MOONSET platform.
              </p>

              <h2>Token Distribution</h2>
              <ul>
                <li>
                  <strong>Community and Ecosystem (40%):</strong> 80 million tokens allocated to community rewards,
                  staking incentives, and ecosystem development.
                </li>
                <li>
                  <strong>Team and Advisors (20%):</strong> 40 million tokens allocated to the founding team and
                  advisors, with a 2-year vesting period.
                </li>
                <li>
                  <strong>Private Sale (15%):</strong> 30 million tokens sold to early investors with a 1-year vesting
                  period.
                </li>
                <li>
                  <strong>Public Sale (10%):</strong> 20 million tokens available for public sale.
                </li>
                <li>
                  <strong>Treasury (10%):</strong> 20 million tokens reserved for future development and partnerships.
                </li>
                <li>
                  <strong>Liquidity (5%):</strong> 10 million tokens allocated to provide liquidity on decentralized
                  exchanges.
                </li>
              </ul>

              <h2>Token Utility</h2>
              <ol>
                <li>
                  <strong>Staking:</strong> Users can stake MOONSET tokens to earn rewards and Premium Access NFTs.
                  Staking periods range from 30 to 180 days, with longer periods offering higher rewards.
                </li>
                <li>
                  <strong>Governance:</strong> MOONSET token holders can propose and vote on platform changes, feature
                  additions, and treasury allocations.
                </li>
                <li>
                  <strong>Premium Access:</strong> While basic platform features are available to all users, premium
                  features require either direct token payments or ownership of Premium Access NFTs (earned through
                  staking).
                </li>
                <li>
                  <strong>Research Incentives:</strong> Quality research contributions are rewarded with MOONSET tokens,
                  creating a sustainable ecosystem for knowledge creation.
                </li>
              </ol>

              <h2>Economic Model</h2>
              <p>The MOONSET economic model is designed to create a sustainable ecosystem with balanced token flows:</p>
              <ul>
                <li>
                  <strong>Token Inflows:</strong> Staking deposits, premium feature payments, and governance deposits.
                </li>
                <li>
                  <strong>Token Outflows:</strong> Staking rewards, research incentives, and community rewards.
                </li>
              </ul>

              <p>
                A portion of all premium feature payments is burned, creating a deflationary mechanism that increases
                token scarcity over time. Additionally, the governance system can adjust economic parameters based on
                community decisions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Platform details will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Research details will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Governance details will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
