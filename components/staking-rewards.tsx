"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Token Rewards", value: 70 },
  { name: "NFT Rewards", value: 20 },
  { name: "Governance Rights", value: 10 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]

export function StakingRewards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Staking Rewards Distribution</CardTitle>
        <CardDescription>How staking rewards are distributed across different reward types</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium">Token Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Earn additional MOONSET tokens based on your staking amount and duration. The longer you stake, the
                higher your rewards.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium">NFT Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Earn Premium Access NFTs that unlock exclusive platform features. NFTs are distributed based on staking
                amount and duration.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium">Governance Rights</h3>
              <p className="text-sm text-muted-foreground">
                Stakers receive enhanced voting power in governance proposals, allowing you to help shape the future of
                the platform.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
