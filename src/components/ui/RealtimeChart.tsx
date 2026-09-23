"use client"

import type React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface RealtimeChartProps {
  ch1: number[]
  ch2: number[]
  ch3: number[]
}

const formatAmplitude = (value: number) => {
  const absoluteValue = Math.abs(value)

  if (absoluteValue >= 1000) {
    return `${Number((value / 1000).toFixed(1))}k`
  }

  if (absoluteValue > 0 && absoluteValue < 0.01) {
    return value.toExponential(1)
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)
}

const RealtimeChart: React.FC<RealtimeChartProps> = ({ ch1, ch2, ch3 }) => {
  const chartData = (ch1 || []).map((value, index) => ({
    index,
    BHE: value,
    BHN: ch2?.[index] ?? 0,
    BHZ: ch3?.[index] ?? 0,
  }))
  const lastSample = Math.max(chartData.length - 1, 0)
  const sampleTicks = lastSample
    ? Array.from({ length: 5 }, (_, index) => Math.round((lastSample * index) / 4))
    : [0]

  return (
    <div className="h-[360px] w-full sm:h-[440px] lg:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 12, right: 12, left: -8, bottom: 28 }}>
          <CartesianGrid strokeDasharray="2 6" stroke="#181818" strokeOpacity={0.16} vertical={false} />
          <Tooltip
            formatter={(value) => formatAmplitude(Number(value))}
            labelFormatter={(label) => `Sample ${Math.round(Number(label))}`}
            labelStyle={{ color: "#f3f0e8", fontFamily: "monospace", fontWeight: 700 }}
            itemStyle={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}
            contentStyle={{
              background: "#181818",
              border: "2px solid #181818",
              borderRadius: 0,
              color: "#ffffff",
            }}
          />
          <XAxis
            dataKey="index"
            type="number"
            domain={[0, lastSample]}
            ticks={sampleTicks}
            allowDecimals={false}
            tick={{ fill: "#5d5951", fontFamily: "monospace", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#181818", strokeWidth: 1.5 }}
            tickMargin={10}
            label={{
              value: "Sample index",
              position: "insideBottom",
              offset: -18,
              fill: "#5d5951",
              fontFamily: "monospace",
              fontSize: 10,
            }}
          />
          <YAxis
            tick={{ fill: "#5d5951", fontFamily: "monospace", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={64}
            tickFormatter={(value) => formatAmplitude(Number(value))}
          />
          <Line type="monotone" dataKey="BHE" name="BHE · East" stroke="#e14d32" dot={false} strokeWidth={1.8} isAnimationActive={false} />
          <Line type="monotone" dataKey="BHN" name="BHN · North" stroke="#1685d1" dot={false} strokeWidth={1.8} isAnimationActive={false} />
          <Line type="monotone" dataKey="BHZ" name="BHZ · Vertical" stroke="#5c9414" dot={false} strokeWidth={1.8} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RealtimeChart
