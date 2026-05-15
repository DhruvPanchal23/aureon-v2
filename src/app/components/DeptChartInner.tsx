'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Backend integration point: fetch department performance from /api/analytics/departments
const deptData = [
  { dept: 'Engineering', performance: 88, headcount: 312, utilization: 82 },
  { dept: 'Design', performance: 91, headcount: 48, utilization: 89 },
  { dept: 'Product', performance: 85, headcount: 61, utilization: 87 },
  { dept: 'Sales', performance: 73, headcount: 204, utilization: 68 },
  { dept: 'Operations', performance: 79, headcount: 189, utilization: 74 },
  { dept: 'Finance', performance: 94, headcount: 67, utilization: 91 },
  { dept: 'HR', performance: 82, headcount: 43, utilization: 79 },
  { dept: 'Marketing', performance: 77, headcount: 88, utilization: 71 },
];

function getBarColor(performance: number) {
  if (performance >= 90) return 'var(--positive)';
  if (performance >= 80) return 'var(--primary)';
  if (performance >= 70) return 'var(--warning)';
  return 'var(--danger)';
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: typeof deptData[0] }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-card-elevated">
      <p className="text-sm font-semibold text-foreground mb-2">{d.dept}</p>
      <div className="space-y-1">
        <div className="flex justify-between gap-6 text-xs">
          <span className="text-muted-foreground">Performance</span>
          <span className="font-semibold tabular-nums text-foreground">{d.performance}%</span>
        </div>
        <div className="flex justify-between gap-6 text-xs">
          <span className="text-muted-foreground">Headcount</span>
          <span className="font-semibold tabular-nums text-foreground">{d.headcount}</span>
        </div>
        <div className="flex justify-between gap-6 text-xs">
          <span className="text-muted-foreground">Utilization</span>
          <span className="font-semibold tabular-nums text-foreground">{d.utilization}%</span>
        </div>
      </div>
    </div>
  );
}

export default function DeptChartInner() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Department Performance</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Performance score vs utilization rate</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {[
            { label: '≥90 Excellent', color: 'bg-positive' },
            { label: '80–89 Good', color: 'bg-primary' },
            { label: '70–79 Fair', color: 'bg-warning' },
            { label: '<70 Poor', color: 'bg-danger' },
          ].map((leg) => (
            <div key={`leg-${leg.label}`} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${leg.color}`} />
              <span className="text-muted-foreground">{leg.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={deptData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="dept"
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
          <Bar dataKey="performance" radius={[4, 4, 0, 0]}>
            {deptData.map((entry, index) => (
              <Cell key={`cell-dept-${index}`} fill={getBarColor(entry.performance)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}