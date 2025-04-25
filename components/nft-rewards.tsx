"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const nftRewards = [
  {
    id: "1",
    name: "Premium Research Access",
    description: "Grants access to premium research tools and AI assistant",
    image: "/placeholder.svg?height=200&width=200",
    tier: "Silver",
    requiredStaking: "10,000 MOONSET for 30 days",
  },
  {
    id: "2",
    name: "Community Contributor",
    description: "Exclusive access to community events and discussions",
    image: "/placeholder.svg?height=200&width=200",
    tier: "Gold",
    requiredStaking: "25,000 MOONSET for 90 days",
  },
  {
    id: "3",
    name: "Governance Elite",
    description: "Enhanced voting power and proposal creation rights",
    image: "/placeholder.svg?height=200&width=200",
    tier: "Platinum",
    requiredStaking: "50,000 MOONSET for 180 days",
  },
]

export function NFTRewards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium Access NFTs</CardTitle>
        <CardDescription>
          Stake MOONSET tokens to earn these exclusive NFTs that unlock premium features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {nftRewards.map((nft) => (
            <Card key={nft.id} className="overflow-hidden">
              <div className="aspect-square w-full relative bg-muted">
                <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{nft.name}</CardTitle>
                  <Badge
                    variant="outline"
                    className={
                      nft.tier === "Silver"
                        ? "bg-gray-100 text-gray-800"
                        : nft.tier === "Gold"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                    }
                  >
                    {nft.tier}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2 h-10">{nft.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
                <div className="text-xs text-muted-foreground">Required: {nft.requiredStaking}</div>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
