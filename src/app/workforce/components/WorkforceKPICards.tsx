'use client';

import React from 'react';
import { Users, Activity, Clock, Briefcase, TrendingDown, Award, TrendingUp, AlertTriangle } from 'lucide-react';
import { workforceKPIs } from '../data/workforceData';

const colorConfig: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  primary: { bg: 'bg-primary/5', text: 'text-primary', border: 'border-primary/20', badge: 'bg-primary/15 text-primary' },
  positive: { bg: 'bg-positive/5', text: 'text-positive', border: 'border-positive/20', badge: 'bg-positive/15 text-positive' },
  accent: { bg: 'bg-accent/5', text: 'text-accent', border: 'border-accent/20', badge: 'bg-accent/15 text-accent' },
  warning: { bg: 'bg-warning/5', text: 'text-warning', border: 'border-warning/20', badge: 'bg-warning/15 text-warning' },
  danger: { bg: 'bg-danger/5', text: 'text-danger', border: 'border-danger/20', badge: 'bg-danger/15 text-danger' },
  info: { bg: 'bg-info/5', text: 'text-info', border: 'border-info/20', badge: 'bg-info/15 text-info' },
};

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={14} />,
  Activity: <Activity size={14} />,
  Clock: <Clock size={14} />,
  Briefcase: <Briefcase size={14} />,
  TrendingDown: <TrendingDown size={14} />,
  Award: <Award size={14} />,
};

export default function WorkforceKPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {workforceKPIs.map((kpi) => {
        const colors = colorConfig[kpi.color];
        return (
          <div
            key={kpi.id}
            className={`rounded-xl border ${colors.border} ${colors.bg} p-4 card-hover cursor-default`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest leading-tight">{kpi.label}</p>
              <div className={`p-1.5 rounded-lg ${colors.bg} ${colors.text}`}>
                {iconMap[kpi.icon]}
              </div>
            </div>
            <div className={`text-2xl font-bold tabular-nums ${colors.text} mb-2`}>{kpi.value}</div>
            <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
              {kpi.trendDir === 'up' && <TrendingUp size={10} />}
              {kpi.trendDir === 'down' && <TrendingDown size={10} />}
              {kpi.trendDir === 'warning' && <AlertTriangle size={10} />}
              {kpi.trend}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{kpi.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
