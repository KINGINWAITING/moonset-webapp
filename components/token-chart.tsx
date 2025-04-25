"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", price: 0.042, volume: 1.2 },
  { name: "Feb", price: 0.048, volume: 1.5 },
  { name: "Mar", price: 0.051, volume: 1.8 },
  { name: "Apr", price: 0.062, volume: 2.1 },
  { name: "May", price: 0.058, volume: 1.9 },
  { name: "Jun", price: 0.065, volume: 2.3 },
  { name: "Jul", price: 0.072, volume: 2.5 },
  { name: "Aug", price: 0.078, volume: 2.8 },
  { name: "Sep", price: 0.082, volume: 3.0 },
  { name: "Oct", price: 0.079, volume: 2.9 },
  { name: "Nov", price: 0.085, volume: 3.2 },
  { name: "Dec", price: 0.0842, volume: 3.4 },
]

export function TokenChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9c27b0" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#9c27b0" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3f51b5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3f51b5" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
          <YAxis yAxisId="left" stroke="rgba(255,255,255,0.6)" />
          <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.6)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
            labelStyle={{ color: "white" }}
            itemStyle={{ color: "white" }}
          />
          <Legend 
            wrapperStyle={{ color: "white" }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            stroke="url(#priceGradient)"
            strokeWidth={2}
            dot={{ stroke: "#9c27b0", strokeWidth: 2, r: 4, fill: "#9c27b0" }}
            activeDot={{ r: 8, stroke: "#9c27b0", strokeWidth: 2, fill: "#9c27b0" }}
            name="Price (USD)"
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="volume" 
            stroke="url(#volumeGradient)" 
            strokeWidth={2}
            dot={{ stroke: "#3f51b5", strokeWidth: 2, r: 4, fill: "#3f51b5" }}
            activeDot={{ r: 8, stroke: "#3f51b5", strokeWidth: 2, fill: "#3f51b5" }}
            name="Volume (M)" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
