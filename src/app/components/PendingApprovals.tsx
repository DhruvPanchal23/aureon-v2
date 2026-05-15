'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

// Backend integration point: fetch pending approvals from /api/approvals/pending
const approvals = [
  {
    id: 'apr-001',
    title: 'May 2026 Payroll Run',
    type: 'Payroll',
    requestedBy: 'Elena Vasquez',
    amount: '$4,218,440',
    sla: '2h 14m left',
    slaStatus: 'danger',
    priority: 'Critical',
  },
  {
    id: 'apr-002',
    title: 'SOW-2026-047 — Horizon Platform',
    type: 'Statement of Work',
    requestedBy: 'Priya Nair',
    amount: '$340,000',
    sla: '18h left',
    slaStatus: 'warning',
    priority: 'High',
  },
  {
    id: 'apr-003',
    title: 'Q2 Marketing Budget Reallocation',
    type: 'Finance',
    requestedBy: 'James Okafor',
    amount: '$85,000',
    sla: '3d left',
    slaStatus: 'positive',
    priority: 'Medium',
  },
  {
    id: 'apr-004',
    title: 'Berlin Branch Headcount Expansion',
    type: 'HR',
    requestedBy: 'Sven Lindqvist',
    amount: '12 FTEs',
    sla: '5d left',
    slaStatus: 'positive',
    priority: 'Medium',
  },
  {
    id: 'apr-005',
    title: 'AWS Infrastructure Upgrade — Q2',
    type: 'Operations',
    requestedBy: 'Ravi Menon',
    amount: '$127,500',
    sla: '1d left',
    slaStatus: 'warning',
    priority: 'High',
  },
];

const typeColors: Record<string, string> = {
  Payroll: 'bg-accent/10 text-accent',
  'Statement of Work': 'bg-primary/10 text-primary',
  Finance: 'bg-info/10 text-info',
  HR: 'bg-positive/10 text-positive',
  Operations: 'bg-warning/10 text-warning',
};

const priorityColors: Record<string, string> = {
  Critical: 'bg-danger/15 text-danger',
  High: 'bg-warning/15 text-warning',
  Medium: 'bg-muted text-muted-foreground',
};

const slaColors: Record<string, string> = {
  danger: 'text-danger',
  warning: 'text-warning',
  positive: 'text-positive',
};

export default function PendingApprovals() {
  const [items, setItems] = useState(approvals);

  const handleApprove = (id: string, title: string) => {
    setItems(prev => prev.filter(a => a.id !== id));
    toast.success(`Approved: ${title}`);
  };

  const handleReject = (id: string, title: string) => {
    setItems(prev => prev.filter(a => a.id !== id));
    toast.error(`Rejected: ${title}`);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Pending Approvals</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{items.length} items awaiting your action</p>
        </div>
        <button className="text-xs text-primary hover:text-accent transition-colors flex items-center gap-1">
          View all <ChevronRight size={12} />
        </button>
      </div>

      <div className="space-y-2">
        {items.length === 0 && (
          <div className="py-8 text-center">
            <CheckCircle size={28} className="text-positive mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">All caught up</p>
            <p className="text-xs text-muted-foreground mt-1">No approvals pending right now</p>
          </div>
        )}
        {items.map((apr) => (
          <div
            key={apr.id}
            className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/20 transition-all duration-150"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[apr.type] || 'bg-muted text-muted-foreground'}`}>
                  {apr.type}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[apr.priority]}`}>
                  {apr.priority}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground truncate">{apr.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground">{apr.requestedBy}</span>
                <span className="text-xs font-mono font-medium text-foreground">{apr.amount}</span>
                <div className={`flex items-center gap-1 text-xs font-medium ${slaColors[apr.slaStatus]}`}>
                  <Clock size={10} />
                  {apr.sla}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <button
                onClick={() => handleApprove(apr.id, apr.title)}
                className="w-7 h-7 rounded-lg bg-positive/10 border border-positive/20 flex items-center justify-center text-positive hover:bg-positive/20 transition-colors active:scale-95"
                title="Approve this request"
              >
                <CheckCircle size={14} />
              </button>
              <button
                onClick={() => handleReject(apr.id, apr.title)}
                className="w-7 h-7 rounded-lg bg-danger/10 border border-danger/20 flex items-center justify-center text-danger hover:bg-danger/20 transition-colors active:scale-95"
                title="Reject this request"
              >
                <XCircle size={14} />
              </button>
            </div>
            {apr.slaStatus === 'danger' && (
              <AlertTriangle size={14} className="text-danger shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}