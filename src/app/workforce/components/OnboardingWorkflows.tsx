'use client';

import React from 'react';
import { CheckCircle, Clock, AlertCircle, User } from 'lucide-react';
import { onboardingTasks } from '../data/workforceData';

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string; border: string }> = {
  Completed: { icon: CheckCircle, color: 'text-positive', bg: 'bg-positive/10', border: 'border-positive/20' },
  'In Progress': { icon: Clock, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  Pending: { icon: AlertCircle, color: 'text-muted-foreground', bg: 'bg-muted/50', border: 'border-border' },
};

const categoryColors: Record<string, string> = {
  IT: 'bg-info/10 text-info',
  Legal: 'bg-accent/10 text-accent',
  Training: 'bg-primary/10 text-primary',
  Orientation: 'bg-warning/10 text-warning',
  Finance: 'bg-positive/10 text-positive',
  HR: 'bg-muted text-muted-foreground',
};

export default function OnboardingWorkflows() {
  const completed = onboardingTasks.filter(t => t.status === 'Completed').length;
  const total = onboardingTasks.length;
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Onboarding Workflows</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Active onboarding · 1 new hire</p>
          </div>
          <button
            suppressHydrationWarning
            className="px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            View All
          </button>
        </div>

        {/* New hire card */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-positive to-info flex items-center justify-center text-xs font-bold text-white shrink-0">
            ML
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Mei Lin</p>
            <p className="text-xs text-muted-foreground">UX Designer · Design Team · Started May 13</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-primary tabular-nums">{progress}%</p>
            <p className="text-xs text-muted-foreground">complete</p>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">{completed} of {total} tasks completed</span>
            <span className="text-xs font-mono text-primary tabular-nums">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="divide-y divide-border">
        {onboardingTasks.map((task) => {
          const config = statusConfig[task.status];
          const StatusIcon = config.icon;
          return (
            <div key={task.id} className="px-5 py-3.5 hover:bg-muted/10 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-6 h-6 rounded-full ${config.bg} border ${config.border} flex items-center justify-center shrink-0`}>
                  <StatusIcon size={12} className={config.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium leading-snug ${task.status === 'Completed' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {task.task}
                    </p>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full shrink-0 ${categoryColors[task.category] || 'bg-muted text-muted-foreground'}`}>
                      {task.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User size={10} />
                      {task.assignedTo}
                    </div>
                    <span className="text-xs text-muted-foreground">Due {task.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
