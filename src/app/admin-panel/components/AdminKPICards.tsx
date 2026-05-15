'use client';

import React from 'react';
import { Building2, DollarSign, Users, Activity, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const kpis = [
  {
    id: 'kpi-total-orgs',
    label: 'Total Organizations',
    value: '47',
    trend: '+3 this month',
    trendDir: 'up',
    icon: Building2,
    color: 'primary',
    subtext: '44 active · 3 in trial',
  },
  {
    id: 'kpi-mrr',
    label: 'Monthly Recurring Revenue',
    value: '$2.41M',
    trend: '+$128K vs Apr',
    trendDir: 'up',
    icon: DollarSign,
    color: 'positive',
    subtext: '+5.6% MoM growth',
  },
  {
    id: 'kpi-total-users',
    label: 'Total Active Users',
    value: '18,420',
    trend: '+847 this month',
    trendDir: 'up',
    icon: Users,
    color: 'accent',
    subtext: 'Across all organizations',
  },
  {
    id: 'kpi-uptime',
    label: 'Platform Uptime',
    value: '99.97%',
    trend: '1 incident this month',
    trendDir: 'warning',
    icon: Activity,
    color: 'warning',
    subtext: '4.3min downtime in May',
  },
  {
    id: 'kpi-churn',
    label: 'Churn Rate',
    value: '1.2%',
    trend: '+0.3% vs Apr',
    trendDir: 'danger',
    icon: AlertTriangle,
    color: 'danger',
    subtext: '1 org downgraded this month',
  },
];

const colorConfig: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  primary: { bg: 'bg-primary/5', text: 'text-primary', border: 'border-primary/20', badge: 'bg-primary/15 text-primary' },
  positive: { bg: 'bg-positive/5', text: 'text-positive', border: 'border-positive/20', badge: 'bg-positive/15 text-positive' },
  accent: { bg: 'bg-accent/5', text: 'text-accent', border: 'border-accent/20', badge: 'bg-accent/15 text-accent' },
  warning: { bg: 'bg-warning/5', text: 'text-warning', border: 'border-warning/20', badge: 'bg-warning/15 text-warning' },
  danger: { bg: 'bg-danger/5', text: 'text-danger', border: 'border-danger/20', badge: 'bg-danger/15 text-danger' },
};

export default function AdminKPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
      {kpis.map((kpi) => {
        const colors = colorConfig[kpi.color];
        const IconComp = kpi.icon;
        return (
          <div
            key={kpi.id}
            className={`rounded-xl border ${colors.border} ${colors.bg} p-4 card-hover cursor-default`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest leading-tight">{kpi.label}</p>
              <div className={`p-1.5 rounded-lg ${colors.bg} ${colors.text}`}>
                <IconComp size={14} />
              </div>
            </div>
            <div className={`text-2xl font-bold tabular-nums ${colors.text} mb-2`}>{kpi.value}</div>
            <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
              {kpi.trendDir === 'up' && <TrendingUp size={10} />}
              {kpi.trendDir === 'down' && <TrendingDown size={10} />}
              {kpi.trendDir === 'warning' && <AlertTriangle size={10} />}
              {kpi.trendDir === 'danger' && <TrendingDown size={10} />}
              {kpi.trend}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{kpi.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}