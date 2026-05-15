'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDepartments } from '../hooks/useWorkforce';
import { Department } from '../types/workforce.types';
import { CardSkeleton, ErrorState } from './WorkforceShared';
import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const colorConfig: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  primary: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20', bar: 'bg-primary' },
  accent: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20', bar: 'bg-accent' },
  info: { bg: 'bg-info/10', text: 'text-info', border: 'border-info/20', bar: 'bg-info' },
  positive: { bg: 'bg-positive/10', text: 'text-positive', border: 'border-positive/20', bar: 'bg-positive' },
  warning: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20', bar: 'bg-warning' },
  danger: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20', bar: 'bg-danger' },
};

const avatarGradients = [
  'from-primary to-accent', 'from-info to-primary', 'from-positive to-info',
  'from-warning to-positive', 'from-accent to-danger', 'from-danger to-warning',
  'from-primary to-info', 'from-accent to-positive',
];

const efficiencyTrend = (score: number): { icon: React.ElementType; color: string; label: string } => {
  if (score >= 88) return { icon: TrendingUp, color: 'text-positive', label: 'High' };
  if (score >= 75) return { icon: Minus, color: 'text-muted-foreground', label: 'Stable' };
  return { icon: TrendingDown, color: 'text-danger', label: 'Low' };
};

const DeptRow = memo(({ dept, idx }: { dept: Department; idx: number }) => {
  const colors = colorConfig[dept.color] ?? colorConfig.primary;
  const gradClass = avatarGradients[idx % avatarGradients.length];
  const trend = efficiencyTrend(dept.utilization);
  const TrendIcon = trend.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.04 }}
      className="px-5 py-4 hover:bg-muted/10 transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className={`w-2 h-10 rounded-full ${colors.bar} shrink-0`} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{dept.name}</span>
              {dept.openRoles > 0 && (
                <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-warning/15 text-warning">
                  {dept.openRoles} open
                </span>
              )}
              <div className={`flex items-center gap-1 text-xs ${trend.color}`}>
                <TrendIcon size={10} />
                <span>{trend.label}</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{dept.budget}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${colors.bar}`}
                initial={{ width: 0 }}
                animate={{ width: `${dept.utilization}%` }}
                transition={{ duration: 0.7, delay: idx * 0.04 + 0.1 }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground tabular-nums w-8 text-right">{dept.utilization}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center text-xs font-bold text-white`}>
            {dept.headAvatar}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-foreground">{dept.head}</p>
            <p className="text-xs text-muted-foreground">Head</p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-center hidden md:block">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users size={11} />
              <span className="text-xs font-mono text-foreground tabular-nums">{dept.employees}</span>
            </div>
            <p className="text-xs text-muted-foreground">Staff</p>
          </div>
          {dept.efficiencyScore !== undefined && (
            <div className="text-center hidden lg:block">
              <p className={`text-xs font-bold tabular-nums ${dept.efficiencyScore >= 85 ? 'text-positive' : dept.efficiencyScore >= 70 ? 'text-warning' : 'text-danger'}`}>
                {dept.efficiencyScore}
              </p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
DeptRow.displayName = 'DeptRow';

export default function DepartmentManagement() {
  const { data: departments, loading, error, refetch } = useDepartments();

  const totalEmployees = departments?.reduce((s, d) => s + d.employees, 0) ?? 0;
  const avgUtilization = departments
    ? Math.round(departments.reduce((s, d) => s + d.utilization, 0) / departments.length)
    : 0;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Department Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {departments?.length ?? 0} departments · {totalEmployees.toLocaleString()} staff · {avgUtilization}% avg utilization
          </p>
        </div>
        <button
          suppressHydrationWarning
          className="px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
        >
          Manage
        </button>
      </div>

      {loading ? (
        <div className="p-4"><CardSkeleton lines={5} /></div>
      ) : error ? (
        <div className="p-4"><ErrorState message={error} onRetry={refetch} /></div>
      ) : (
        <div className="divide-y divide-border">
          {departments?.map((dept, idx) => (
            <DeptRow key={dept.id} dept={dept} idx={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
