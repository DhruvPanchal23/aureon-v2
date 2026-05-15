'use client';

import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Dec', headcount: 1420, utilization: 81 },
  { month: 'Jan', headcount: 1455, utilization: 78 },
  { month: 'Feb', headcount: 1490, utilization: 82 },
  { month: 'Mar', headcount: 1512, utilization: 80 },
  { month: 'Apr', headcount: 1556, utilization: 77 },
  { month: 'May', headcount: 1579, utilization: 79 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={`tooltip-${entry.name}`} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name}:</span>
            <span className="font-mono font-semibold text-foreground">
              {entry.name === 'utilization' ? `${entry.value}%` : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function WorkforceAnalyticsInner() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="left"
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={[1300, 1700]}
          tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={[60, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          yAxisId="left"
          dataKey="headcount"
          fill="rgba(99,102,241,0.25)"
          radius={[4, 4, 0, 0]}
          stroke="rgba(99,102,241,0.5)"
          strokeWidth={1}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="utilization"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#10b981', strokeWidth: 0 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
