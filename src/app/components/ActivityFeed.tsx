'use client';

import React from 'react';
import { UserPlus, CheckCircle, AlertTriangle, Zap, CreditCard, FolderKanban, Clock, Users } from 'lucide-react';

// Backend integration point: fetch real-time activity from /api/activity/feed (WebSocket)
const activities = [
  {
    id: 'act-001',
    type: 'approval',
    icon: CheckCircle,
    iconBg: 'bg-positive/10',
    iconColor: 'text-positive',
    title: 'SOW-2026-044 approved',
    desc: 'Quantum Analytics Platform — $215K approved by Marcus Aldridge',
    time: '2 min ago',
    entity: 'SOW',
  },
  {
    id: 'act-002',
    type: 'alert',
    icon: AlertTriangle,
    iconBg: 'bg-danger/10',
    iconColor: 'text-danger',
    title: 'SLA breach — APR-884',
    desc: 'Approval APR-884 has breached its 48hr SLA — escalated to VP Operations',
    time: '8 min ago',
    entity: 'Approval',
  },
  {
    id: 'act-003',
    type: 'automation',
    icon: Zap,
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    title: 'Automation triggered',
    desc: 'Onboarding workflow initiated for 3 new hires — Engineering dept',
    time: '15 min ago',
    entity: 'Workflow',
  },
  {
    id: 'act-004',
    type: 'employee',
    icon: UserPlus,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'New employee onboarded',
    desc: 'Amara Osei joined as Senior Data Engineer — Singapore branch',
    time: '31 min ago',
    entity: 'Employee',
  },
  {
    id: 'act-005',
    type: 'payroll',
    icon: CreditCard,
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    title: 'Payroll run initiated',
    desc: 'May 2026 payroll processing started — $4.2M for 1,579 employees',
    time: '47 min ago',
    entity: 'Payroll',
  },
  {
    id: 'act-006',
    type: 'project',
    icon: FolderKanban,
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
    title: 'Sprint completed',
    desc: 'Horizon Platform v2.1 — Sprint 14 closed with 97% task completion',
    time: '1h 12m ago',
    entity: 'Project',
  },
  {
    id: 'act-007',
    type: 'time',
    icon: Clock,
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
    title: 'Timesheet approved',
    desc: 'Q2 Week 19 timesheets approved for Design team — 48 entries',
    time: '2h 3m ago',
    entity: 'Timesheet',
  },
  {
    id: 'act-008',
    type: 'org',
    icon: Users,
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    title: 'Team restructure applied',
    desc: 'Berlin Engineering sub-team merged into Core Platform — 14 members',
    time: '3h 41m ago',
    entity: 'Organization',
  },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Live Activity Feed</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time organizational events</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="status-dot-positive" style={{ width: '6px', height: '6px' }} />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-0">
        {activities?.map((act, i) => {
          const IconComp = act?.icon;
          return (
            <div
              key={act?.id}
              className="flex gap-3 py-3 border-b border-border last:border-0 hover:bg-muted/10 -mx-2 px-2 rounded transition-colors cursor-pointer"
            >
              <div className="relative shrink-0">
                <div className={`w-8 h-8 rounded-lg ${act?.iconBg} flex items-center justify-center ${act?.iconColor}`}>
                  <IconComp size={14} />
                </div>
                {i < activities?.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-8 w-px h-3 bg-border" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-foreground">{act?.title}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{act?.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{act?.desc}</p>
                <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground mt-1 inline-block">
                  {act?.entity}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <button className="text-xs text-primary hover:text-accent transition-colors w-full text-center">
          View full activity log →
        </button>
      </div>
    </div>
  );
}