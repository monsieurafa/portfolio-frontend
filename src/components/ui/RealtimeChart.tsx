// src/components/ui/RealtimeChart.tsx
"use client"

import type React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

interface RealtimeChartProps {
  ch1: number[]
  ch2: number[]
  ch3: number[]
}

const RealtimeChart: React.FC<RealtimeChartProps> = ({ ch1, ch2, ch3 }) => {
  const chartData = (ch1 || []).map((value, index) => ({
    index: index,
    BHE: value,
    BHN: ch2?.[index] ?? 0,
    BHZ: ch3?.[index] ?? 0,
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        // UPDATED: Increased bottom margin to create more space
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 50, // Increased from 30 to 50
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

        <Tooltip
          labelStyle={{ color: "#333" }}
          contentStyle={{
            background: "rgba(255, 255, 255, 0.8)",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
          }}
        />

        {/* UPDATED: Aligned legend to the bottom to better use the new space */}
        <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: "10px"}} />

        <XAxis
          dataKey="index"
          label={{
            value: "Sample Index",
            position: "bottom",
            fill: "#A0AEC0",
            dy: -10,
          }}
          tick={{ fill: "#718096", fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "#cccccc" }}
        />

        <YAxis
          label={{
            value: "Amplitude",
            angle: -90,
            position: "insideLeft",
            fill: "#A0AEC0",
            dx: -10,
          }}
          tick={{ fill: "#718096", fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "#cccccc" }}
        />

        <Line type="monotone" dataKey="BHE" name="Channel E" stroke="#8884d8" dot={false} strokeWidth={2} isAnimationActive={false} />
        <Line type="monotone" dataKey="BHN" name="Channel N" stroke="#82ca9d" dot={false} strokeWidth={2} isAnimationActive={false} />
        <Line type="monotone" dataKey="BHZ" name="Channel Z" stroke="#ffc658" dot={false} strokeWidth={2} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default RealtimeChart
