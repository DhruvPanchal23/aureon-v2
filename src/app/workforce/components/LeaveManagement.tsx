'use client';

import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { leaveRequests } from '../data/workforceData';
import { toast } from 'sonner';

const typeColors: Record<string, string> = {
  Annual: 'bg-primary/10 text-primary',
  Sick: 'bg-warning/10 text-warning',
  Maternity: 'bg-accent/10 text-accent',
  Paternity: 'bg-info/10 text-info',
  Emergency: 'bg-danger/10 text-danger',
  Unpaid: 'bg-muted text-muted-foreground',
};

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  Pending: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  Approved: { icon: CheckCircle, color: 'text-positive', bg: 'bg-positive/10' },
  Rejected: { icon: XCircle, color: 'text-danger', bg: 'bg-danger/10' },
};

const avatarColors = [
  'from-primary to-accent',
  'from-info to-primary',
  'from-positive to-info',
  'from-warning to-positive',
  'from-accent to-danger',
  'from-danger to-warning',
];

export default function LeaveManagement() {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const filtered = leaveRequests.filter(r => filter === 'All' || r.status === filter);

  const counts = {
    Pending: leaveRequests.filter(r => r.status === 'Pending').length,
    Approved: leaveRequests.filter(r => r.status === 'Approved').length,
    Rejected: leaveRequests.filter(r => r.status === 'Rejected').length,
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Leave Management</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{counts.Pending} pending approvals</p>
          </div>
          <button
            suppressHydrationWarning
            className="px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            + Request Leave
          </button>
        </div>
        {/* Filter tabs */}
        <div className="flex items-center gap-1">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(tab => (
            <button
              key={`leave-tab-${tab}`}
              suppressHydrationWarning
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab
                  ? 'bg-primary/15 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {tab}
              {tab !== 'All' && (
                <span className="ml-1.5 text-xs opacity-70">{counts[tab]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border">
        {filtered.map((req, idx) => {
          const StatusIcon = statusConfig[req.status].icon;
          const gradClass = avatarColors[idx % avatarColors.length];
          return (
            <div key={req.id} className="px-5 py-4 hover:bg-muted/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {req.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{req.employee}</p>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${statusConfig[req.status].bg}`}>
                      <StatusIcon size={11} className={statusConfig[req.status].color} />
                      <span className={`text-xs font-medium ${statusConfig[req.status].color}`}>{req.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${typeColors[req.type]}`}>{req.type}</span>
                    <span className="text-xs text-muted-foreground">{req.startDate} → {req.endDate}</span>
                    <span className="text-xs text-muted-foreground">· {req.days}d</span>
                  </div>
                </div>
                {req.status === 'Pending' && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      suppressHydrationWarning
                      onClick={() => toast.success(`Leave approved for ${req.employee}`)}
                      className="p-1.5 rounded-lg bg-positive/10 text-positive hover:bg-positive/20 transition-colors"
                      title="Approve"
                    >
                      <CheckCircle size={13} />
                    </button>
                    <button
                      suppressHydrationWarning
                      onClick={() => toast.error(`Leave rejected for ${req.employee}`)}
                      className="p-1.5 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
                      title="Reject"
                    >
                      <XCircle size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
