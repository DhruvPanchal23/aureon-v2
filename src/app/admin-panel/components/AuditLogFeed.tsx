'use client';

import React, { useState } from 'react';
import { Shield, User, Settings, CreditCard, Building2, RefreshCw } from 'lucide-react';

// Backend integration point: fetch audit logs from /api/admin/audit-logs
const auditLogs = [
  {
    id: 'audit-001',
    actor: 'System Admin',
    actorEmail: 'admin@aureon.io',
    action: 'org.suspended',
    target: 'Crestwood Manufacturing',
    severity: 'high',
    icon: Building2,
    time: '2m ago',
  },
  {
    id: 'audit-002',
    actor: 'Marcus Aldridge',
    actorEmail: 'marcus@novatech.com',
    action: 'payroll.approved',
    target: 'May 2026 Payroll — $4.2M',
    severity: 'medium',
    icon: CreditCard,
    time: '18m ago',
  },
  {
    id: 'audit-003',
    actor: 'System Admin',
    actorEmail: 'admin@aureon.io',
    action: 'feature.toggled',
    target: 'AI Copilot → Enabled for Meridian Financial',
    severity: 'low',
    icon: Settings,
    time: '41m ago',
  },
  {
    id: 'audit-004',
    actor: 'Claire Okonkwo',
    actorEmail: 'claire@meridianfinancial.io',
    action: 'user.role_changed',
    target: 'Elena Vasquez → Finance Manager',
    severity: 'medium',
    icon: User,
    time: '1h ago',
  },
  {
    id: 'audit-005',
    actor: 'System Admin',
    actorEmail: 'admin@aureon.io',
    action: 'org.plan_upgraded',
    target: 'Aurora Biotech: Pro → Growth',
    severity: 'low',
    icon: Shield,
    time: '2h ago',
  },
  {
    id: 'audit-006',
    actor: 'Noah Berntsen',
    actorEmail: 'noah@pinnacleconsult.com',
    action: 'sow.approved',
    target: 'SOW-2026-044 — $215,000',
    severity: 'medium',
    icon: CreditCard,
    time: '3h ago',
  },
];

const severityColors: Record<string, string> = {
  high: 'bg-danger/10 text-danger',
  medium: 'bg-warning/10 text-warning',
  low: 'bg-muted text-muted-foreground',
};

export default function AuditLogFeed() {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Audit Log</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Recent platform-wide events</p>
        </div>
        <button
          onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          suppressHydrationWarning
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="space-y-2">
        {auditLogs.map((log) => {
          const IconComp = log.icon;
          return (
            <div key={log.id} className="flex items-start gap-2.5 py-2 border-b border-border last:border-0">
              <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                <IconComp size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-medium text-foreground">{log.actor}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${severityColors[log.severity]}`}>
                    {log.action}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{log.target}</p>
              </div>
              <span className="text-xs text-muted-foreground font-mono whitespace-nowrap shrink-0">{log.time}</span>
            </div>
          );
        })}
      </div>

      <button className="mt-3 w-full text-xs text-primary hover:text-accent transition-colors py-1" suppressHydrationWarning>
        View full audit trail →
      </button>
    </div>
  );
}