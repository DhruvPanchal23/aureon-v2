'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Users, CreditCard, CheckCircle, Clock, AlertTriangle, Activity } from 'lucide-react';

const metrics = [
  {
    id: 'metric-org-health',
    label: 'Org Health Score',
    value: '87.4',
    unit: '/100',
    trend: '+3.2',
    trendDir: 'up',
    subtext: 'Above industry avg of 78',
    color: 'positive',
    span: 'col-span-2',
    hero: true,
  },
  {
    id: 'metric-workforce',
    label: 'Workforce Utilization',
    value: '79%',
    unit: '',
    trend: '-2.1%',
    trendDir: 'down',
    subtext: '1,247 of 1,579 employees assigned',
    color: 'warning',
    span: 'col-span-1',
    hero: false,
  },
  {
    id: 'metric-payroll',
    label: 'May Payroll Status',
    value: '$4.2M',
    unit: '',
    trend: 'Pending',
    trendDir: 'warning',
    subtext: 'Awaiting 2 approvals — due May 20',
    color: 'warning',
    span: 'col-span-1',
    hero: false,
  },
  {
    id: 'metric-approvals',
    label: 'Approval SLA',
    value: '91.6%',
    unit: '',
    trend: '+1.4%',
    trendDir: 'up',
    subtext: '3 approvals breach SLA in <1hr',
    color: 'danger',
    span: 'col-span-1',
    hero: false,
  },
  {
    id: 'metric-attendance',
    label: "Today\'s Attendance",
    value: '94.3%',
    unit: '',
    trend: '+0.8%',
    trendDir: 'up',
    subtext: '1,489 present · 90 absent',
    color: 'positive',
    span: 'col-span-1',
    hero: false,
  },
  {
    id: 'metric-projects',
    label: 'Active Projects',
    value: '34',
    unit: '',
    trend: '6 at risk',
    trendDir: 'danger',
    subtext: '82% on-time delivery rate',
    color: 'danger',
    span: 'col-span-1',
    hero: false,
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  positive: {
    bg: 'bg-positive/5',
    text: 'text-positive',
    border: 'border-positive/20',
    badge: 'bg-positive/15 text-positive',
  },
  warning: {
    bg: 'bg-warning/5',
    text: 'text-warning',
    border: 'border-warning/20',
    badge: 'bg-warning/15 text-warning',
  },
  danger: {
    bg: 'bg-danger/5',
    text: 'text-danger',
    border: 'border-danger/20',
    badge: 'bg-danger/15 text-danger',
  },
  info: {
    bg: 'bg-info/5',
    text: 'text-info',
    border: 'border-info/20',
    badge: 'bg-info/15 text-info',
  },
};

const iconMap: Record<string, React.ReactNode> = {
  'metric-org-health': <Activity size={20} />,
  'metric-workforce': <Users size={20} />,
  'metric-payroll': <CreditCard size={20} />,
  'metric-approvals': <CheckCircle size={20} />,
  'metric-attendance': <Clock size={20} />,
  'metric-projects': <AlertTriangle size={20} />,
};

export default function DashboardBentoGrid() {
  // Grid plan: 6 cards → grid-cols-4
  // Row 1: hero spans 2 cols + 2 regular cards
  // Row 2: 4 regular cards (but we have 3 remaining) → last spans 2 cols... wait
  // Actually: hero(2) + 2 regular = row1 (4 cols filled)
  // Row 2: 3 remaining → one spans 2 cols to fill 4 cols: 2+1+1 = 4 ✓

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {/* Hero card */}
      {metrics.slice(0, 1).map((m) => {
        const colors = colorMap[m.color];
        return (
          <div
            key={m.id}
            className={`col-span-2 relative overflow-hidden rounded-xl border ${colors.border} ${colors.bg} p-6 card-hover cursor-default`}
          >
            <div className="absolute top-0 right-0 w-40 h-40 blob-primary opacity-20 pointer-events-none" />
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{m.label}</p>
              </div>
              <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border} ${colors.text}`}>
                {iconMap[m.id]}
              </div>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className={`text-5xl font-bold tabular-nums ${colors.text}`}>{m.value}</span>
              <span className="text-xl text-muted-foreground mb-1">{m.unit}</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.badge}`}>
                {m.trendDir === 'up' ? '↑' : '↓'} {m.trend} this week
              </span>
              <span className="text-xs text-muted-foreground">{m.subtext}</span>
            </div>
            {/* Mini sparkline bars */}
            <div className="flex items-end gap-1 mt-4 h-8">
              {[72, 78, 75, 82, 79, 84, 87].map((v, i) => (
                <div
                  key={`spark-health-${i}`}
                  className={`flex-1 rounded-sm ${colors.bg} border ${colors.border}`}
                  style={{ height: `${(v / 100) * 32}px`, background: `rgba(16, 185, 129, ${0.1 + (i / 7) * 0.4})` }}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Row 1 remaining: 2 cards */}
      {metrics.slice(1, 3).map((m) => {
        const colors = colorMap[m.color];
        return (
          <div
            key={m.id}
            className="col-span-1 relative overflow-hidden rounded-xl border border-border bg-card p-5 card-hover cursor-default"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest leading-tight">{m.label}</p>
              <div className={`p-1.5 rounded-lg ${colors.bg} ${colors.text}`}>
                {iconMap[m.id]}
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-3xl font-bold tabular-nums ${colors.text}`}>{m.value}</span>
            </div>
            <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
              {m.trendDir === 'up' && <TrendingUp size={10} />}
              {m.trendDir === 'down' && <TrendingDown size={10} />}
              {m.trendDir === 'warning' && <AlertTriangle size={10} />}
              {m.trend}
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{m.subtext}</p>
          </div>
        );
      })}

      {/* Row 2: 3 remaining → last spans 2 cols */}
      {metrics.slice(3, 5).map((m) => {
        const colors = colorMap[m.color];
        return (
          <div
            key={m.id}
            className="col-span-1 relative overflow-hidden rounded-xl border border-border bg-card p-5 card-hover cursor-default"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest leading-tight">{m.label}</p>
              <div className={`p-1.5 rounded-lg ${colors.bg} ${colors.text}`}>
                {iconMap[m.id]}
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-3xl font-bold tabular-nums ${colors.text}`}>{m.value}</span>
            </div>
            <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
              {m.trendDir === 'up' && <TrendingUp size={10} />}
              {m.trendDir === 'down' && <TrendingDown size={10} />}
              {m.trendDir === 'danger' && <AlertTriangle size={10} />}
              {m.trend}
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{m.subtext}</p>
          </div>
        );
      })}

      {/* Last card spans 2 cols to fill row */}
      {metrics.slice(5, 6).map((m) => {
        const colors = colorMap[m.color];
        return (
          <div
            key={m.id}
            className="col-span-2 relative overflow-hidden rounded-xl border border-danger/20 bg-danger/5 p-5 card-hover cursor-default"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{m.label}</p>
                <p className="text-xs text-danger mt-1 font-medium">⚠ 6 projects require immediate attention</p>
              </div>
              <div className="p-1.5 rounded-lg bg-danger/10 text-danger">
                {iconMap[m.id]}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <span className="text-3xl font-bold tabular-nums text-danger">{m.value}</span>
                <p className="text-xs text-muted-foreground mt-1">{m.subtext}</p>
              </div>
              {/* Project status breakdown */}
              <div className="flex gap-3 flex-1">
                {[
                  { label: 'On Track', count: 22, color: 'bg-positive' },
                  { label: 'At Risk', count: 6, color: 'bg-warning' },
                  { label: 'Delayed', count: 4, color: 'bg-danger' },
                  { label: 'Completed', count: 2, color: 'bg-info' },
                ].map((s) => (
                  <div key={`proj-status-${s.label}`} className="text-center">
                    <div className={`w-2 h-2 rounded-full ${s.color} mx-auto mb-1`} />
                    <p className="text-sm font-bold tabular-nums text-foreground">{s.count}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}