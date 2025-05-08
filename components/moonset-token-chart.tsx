"use client"

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, TooltipProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

// Mock data for MOONSET token prices from CoinMarketCap
export const tokenPriceData = [
  { date: 'Jan 1', price: 0.054, volume: 1.2, marketCap: 5.4 },
  { date: 'Jan 8', price: 0.057, volume: 1.5, marketCap: 5.7 },
  { date: 'Jan 15', price: 0.062, volume: 1.7, marketCap: 6.2 },
  { date: 'Jan 22', price: 0.060, volume: 1.6, marketCap: 6.0 },
  { date: 'Feb 1', price: 0.058, volume: 1.4, marketCap: 5.8 },
  { date: 'Feb 8', price: 0.061, volume: 1.7, marketCap: 6.1 },
  { date: 'Feb 15', price: 0.063, volume: 1.9, marketCap: 6.3 },
  { date: 'Feb 22', price: 0.067, volume: 2.1, marketCap: 6.7 },
  { date: 'Mar 1', price: 0.071, volume: 2.3, marketCap: 7.1 },
  { date: 'Mar 8', price: 0.070, volume: 2.2, marketCap: 7.0 },
  { date: 'Mar 15', price: 0.069, volume: 2.1, marketCap: 6.9 },
  { date: 'Mar 22', price: 0.072, volume: 2.4, marketCap: 7.2 },
  { date: 'Apr 1', price: 0.074, volume: 2.5, marketCap: 7.4 },
  { date: 'Apr 8', price: 0.076, volume: 2.6, marketCap: 7.6 },
  { date: 'Apr 15', price: 0.079, volume: 2.8, marketCap: 7.9 },
  { date: 'Apr 22', price: 0.075, volume: 2.6, marketCap: 7.5 },
  { date: 'May 1', price: 0.072, volume: 2.3, marketCap: 7.2 },
  { date: 'May 8', price: 0.074, volume: 2.5, marketCap: 7.4 },
  { date: 'May 15', price: 0.076, volume: 2.6, marketCap: 7.6 },
  { date: 'May 22', price: 0.078, volume: 2.7, marketCap: 7.8 },
  { date: 'Jun 1', price: 0.081, volume: 3.0, marketCap: 8.1 },
  { date: 'Jun 8', price: 0.082, volume: 3.1, marketCap: 8.2 },
  { date: 'Jun 15', price: 0.079, volume: 2.8, marketCap: 7.9 },
  { date: 'Jun 22', price: 0.080, volume: 2.9, marketCap: 8.0 },
  { date: 'Jul 1', price: 0.084, volume: 3.2, marketCap: 8.4 },
  { date: 'Jul 8', price: 0.0842, volume: 3.3, marketCap: 8.42 },
]

// Custom tooltip component for the chart
interface ChartDataPoint {
  date: string;
  price: number;
  volume: number;
  marketCap: number;
}

interface MoonsetTokenChartProps {
  height?: number;
  showVolume?: boolean;
  showMarketCap?: boolean;
  lastUpdated?: string;
  priceChange?: {
    value: number;
    period: string;
  };
  currentPrice?: number;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a0d2c] p-3 border border-[#8066dc]/20 rounded-md shadow-lg backdrop-blur-md">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-sm text-purple-300">
          <span className="font-medium">Price: </span>
          ${(payload[0].value as number).toFixed(4)}
        </p>
        {payload[1] && (
          <p className="text-sm text-blue-300">
            <span className="font-medium">Volume: </span>
            ${payload[1].value}M
          </p>
        )}
        {payload[2] && (
          <p className="text-sm text-green-300">
            <span className="font-medium">Market Cap: </span>
            ${payload[2].value}M
          </p>
        )}
      </div>
    )
  }
  return null
}

// Format numbers for the Y-axis
const formatYAxis = (value: number): string => {
  return `$${value.toFixed(3)}`
}

// Format market cap for Y-axis
const formatMarketCapAxis = (value: number): string => {
  return `$${value}M`
}

export function MoonsetTokenChart({
  height = 300,
  showVolume = true,
  showMarketCap = false,
  lastUpdated = "5 min ago",
  priceChange = { value: 2.5, period: "yesterday" },
  currentPrice = 0.0842
}: MoonsetTokenChartProps) {
  const isPositiveChange = priceChange.value >= 0;
  
  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">${currentPrice.toFixed(4)}</div>
          <div className="text-xs text-muted-foreground">Updated {lastUpdated}</div>
        </div>
        <div className={`stats-card-trend ${isPositiveChange ? 'positive' : 'negative'}`}>
          {isPositiveChange ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          <span>{isPositiveChange ? '+' : ''}{priceChange.value}% from {priceChange.period}</span>
        </div>
      </div>

      <div className="relative h-[300px] w-full" style={{ height: `${height}px` }}>
        <div className="absolute top-3 right-3 flex space-x-2 z-10">
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/10 badge-glow">
            <Clock className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={tokenPriceData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9061FF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#9061FF" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6347d9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6347d9" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorMarketCap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              yAxisId="left" 
              tickFormatter={formatYAxis}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              domain={['dataMin - 0.005', 'dataMax + 0.005']}
            />
            {showVolume && (
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
            )}
            {showMarketCap && (
              <YAxis 
                yAxisId="marketCap" 
                orientation="right" 
                tickFormatter={formatMarketCapAxis}
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ bottom: 0, color: 'white' }}
              iconType="circle"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="price"
              stroke="#9061FF"
              strokeWidth={2}
              dot={{ stroke: '#9061FF', strokeWidth: 2, r: 4, fill: '#9061FF' }}
              activeDot={{ r: 8, stroke: '#9061FF', strokeWidth: 2, fill: '#9061FF' }}
              name="Price (USD)"
              fill="url(#colorPrice)"
            />
            {showVolume && (
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="volume" 
                stroke="#6347d9" 
                strokeWidth={2}
                dot={{ stroke: '#6347d9', strokeWidth: 2, r: 4, fill: '#6347d9' }}
                activeDot={{ r: 8, stroke: '#6347d9', strokeWidth: 2, fill: '#6347d9' }}
                name="Volume (M)" 
              />
            )}
            {showMarketCap && (
              <Line 
                yAxisId="marketCap" 
                type="monotone" 
                dataKey="marketCap" 
                stroke="#4ade80" 
                strokeWidth={2}
                dot={{ stroke: '#4ade80', strokeWidth: 2, r: 4, fill: '#4ade80' }}
                activeDot={{ r: 8, stroke: '#4ade80', strokeWidth: 2, fill: '#4ade80' }}
                name="Market Cap (M)" 
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 