'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { departments } from '../data/workforceData';

const colorConfig: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  primary: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20', bar: 'bg-primary' },
  accent: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20', bar: 'bg-accent' },
  info: { bg: 'bg-info/10', text: 'text-info', border: 'border-info/20', bar: 'bg-info' },
  positive: { bg: 'bg-positive/10', text: 'text-positive', border: 'border-positive/20', bar: 'bg-positive' },
  warning: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20', bar: 'bg-warning' },
  danger: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20', bar: 'bg-danger' },
};

const avatarColors = [
  'from-primary to-accent',
  'from-info to-primary',
  'from-positive to-info',
  'from-warning to-positive',
  'from-accent to-danger',
  'from-danger to-warning',
  'from-primary to-info',
  'from-accent to-positive',
];

export default function DepartmentManagement() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Department Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{departments.length} departments · NovaTech Corp</p>
        </div>
        <button
          suppressHydrationWarning
          className="px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
        >
          Manage Departments
        </button>
      </div>
      <div className="divide-y divide-border">
        {departments.map((dept, idx) => {
          const colors = colorConfig[dept.color];
          const gradClass = avatarColors[idx % avatarColors.length];
          return (
            <div
              key={dept.id}
              className="px-5 py-4 hover:bg-muted/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Dept color indicator */}
                <div className={`w-2 h-10 rounded-full ${colors.bar} shrink-0`} />

                {/* Dept info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{dept.name}</span>
                      {dept.openRoles > 0 && (
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-warning/15 text-warning">
                          {dept.openRoles} open
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{dept.budget}</span>
                  </div>

                  {/* Utilization bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colors.bar} transition-all duration-700`}
                        style={{ width: `${dept.utilization}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground tabular-nums w-8 text-right">{dept.utilization}%</span>
                  </div>
                </div>

                {/* Head */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center text-xs font-bold text-white`}>
                    {dept.headAvatar}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-medium text-foreground">{dept.head}</p>
                    <p className="text-xs text-muted-foreground">Head</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-center hidden md:block">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users size={11} />
                      <span className="text-xs font-mono text-foreground tabular-nums">{dept.employees}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Staff</p>
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
