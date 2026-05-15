'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  } from 'recharts';
import { TrendingUp } from 'lucide-react';

// Backend integration point: fetch org health time-series from /api/analytics/org-pulse
const pulseData = [
  { date: 'May 1', healthScore: 81.2, attendance: 92.1, utilization: 76.4 },
  { date: 'May 3', healthScore: 79.8, attendance: 88.4, utilization: 74.1 },
  { date: 'May 5', healthScore: 82.4, attendance: 93.7, utilization: 77.8 },
  { date: 'May 7', healthScore: 80.1, attendance: 90.2, utilization: 75.3 },
  { date: 'May 8', healthScore: 83.6, attendance: 94.1, utilization: 78.9 },
  { date: 'May 10', healthScore: 85.2, attendance: 93.8, utilization: 80.2 },
  { date: 'May 12', healthScore: 84.7, attendance: 91.4, utilization: 79.1 },
  { date: 'May 13', healthScore: 86.1, attendance: 95.2, utilization: 80.7 },
  { date: 'May 14', healthScore: 87.4, attendance: 94.3, utilization: 79.0 },
];

const ranges = [
  { id: 'range-7d', label: '7D' },
  { id: 'range-14d', label: '14D' },
  { id: 'range-30d', label: '30D' },
  { id: 'range-90d', label: '90D' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-card-elevated min-w-[160px]">
      <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
      {payload.map((p) => (
        <div key={`tooltip-${p.name}`} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-xs text-muted-foreground capitalize">{p.name}</span>
          </div>
          <span className="text-xs font-semibold tabular-nums text-foreground">{p.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

export default function OrgPulseChartInner() {
  const [activeRange, setActiveRange] = useState('range-14d');

  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Organization Pulse</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Health score, attendance & utilization over time</p>
        </div>
        <div className="flex items-center gap-1">
          {ranges.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRange(r.id)}
              className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                activeRange === r.id
                  ? 'bg-primary/20 text-primary font-medium' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Health Score</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-positive" />
          <span className="text-xs text-muted-foreground">Attendance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">Utilization</span>
        </div>
        <div className="ml-auto flex items-center gap-1 text-xs text-positive">
          <TrendingUp size={12} />
          <span>+3.2% vs last period</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={pulseData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradHealth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradAttend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--positive)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--positive)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradUtil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            domain={[60, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="healthScore"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#gradHealth)"
            dot={false}
            activeDot={{ r: 4, fill: 'var(--primary)' }}
          />
          <Area
            type="monotone"
            dataKey="attendance"
            stroke="var(--positive)"
            strokeWidth={2}
            fill="url(#gradAttend)"
            dot={false}
            activeDot={{ r: 4, fill: 'var(--positive)' }}
          />
          <Area
            type="monotone"
            dataKey="utilization"
            stroke="var(--accent)"
            strokeWidth={2}
            fill="url(#gradUtil)"
            dot={false}
            activeDot={{ r: 4, fill: 'var(--accent)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}