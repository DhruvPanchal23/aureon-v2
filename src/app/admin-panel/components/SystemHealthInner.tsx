'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Server } from 'lucide-react';

// Backend integration point: fetch system metrics from /api/admin/system-health
const apiData = [
  { time: '00:00', latency: 42, requests: 1240, errors: 2 },
  { time: '02:00', latency: 38, requests: 890, errors: 1 },
  { time: '04:00', latency: 35, requests: 620, errors: 0 },
  { time: '06:00', latency: 44, requests: 1820, errors: 3 },
  { time: '08:00', latency: 67, requests: 4210, errors: 8 },
  { time: '10:00', latency: 71, requests: 5840, errors: 12 },
  { time: '12:00', latency: 58, requests: 5120, errors: 6 },
  { time: '14:00', latency: 52, requests: 4780, errors: 4 },
  { time: '16:00', latency: 48, requests: 4340, errors: 3 },
  { time: '18:00', latency: 55, requests: 3890, errors: 5 },
  { time: '20:00', latency: 46, requests: 2760, errors: 2 },
  { time: '22:00', latency: 40, requests: 1840, errors: 1 },
];

const services = [
  { id: 'svc-api', name: 'API Gateway', status: 'operational', latency: '48ms', uptime: '99.98%' },
  { id: 'svc-db', name: 'PostgreSQL Primary', status: 'operational', latency: '12ms', uptime: '99.99%' },
  { id: 'svc-redis', name: 'Redis Cache', status: 'operational', latency: '3ms', uptime: '100%' },
  { id: 'svc-ws', name: 'WebSocket Server', status: 'degraded', latency: '124ms', uptime: '98.7%' },
  { id: 'svc-jobs', name: 'Job Queue', status: 'operational', latency: '—', uptime: '99.94%' },
  { id: 'svc-storage', name: 'Object Storage', status: 'operational', latency: '82ms', uptime: '99.99%' },
];

const statusConfig: Record<string, { dot: string; badge: string; label: string }> = {
  operational: { dot: 'status-dot-positive', badge: 'bg-positive/10 text-positive', label: 'Operational' },
  degraded: { dot: 'status-dot-warning', badge: 'bg-warning/10 text-warning', label: 'Degraded' },
  down: { dot: 'status-dot-danger', badge: 'bg-danger/10 text-danger', label: 'Down' },
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-card-elevated">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map(p => (
        <div key={`sysmetric-${p.name}`} className="flex justify-between gap-4 text-xs">
          <span className="text-muted-foreground capitalize">{p.name}</span>
          <span className="font-semibold tabular-nums text-foreground">{p.value}{p.name === 'latency' ? 'ms' : ''}</span>
        </div>
      ))}
    </div>
  );
}

export default function SystemHealthInner() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-positive" />
          <h3 className="text-sm font-semibold text-foreground">System Health</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-positive/10 text-positive font-medium">All Systems Operational</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">Last 24 hours</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-6">
        {/* Chart */}
        <div>
          <p className="text-xs text-muted-foreground mb-3">API Latency (ms) & Request Volume</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={apiData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="latency" stroke="var(--primary)" strokeWidth={2} dot={false} activeDot={{ r: 3 }} />
              <Line type="monotone" dataKey="errors" stroke="var(--danger)" strokeWidth={1.5} dot={false} strokeDasharray="4 2" activeDot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service status */}
        <div>
          <p className="text-xs text-muted-foreground mb-3">Service Status</p>
          <div className="space-y-2">
            {services.map((svc) => {
              const config = statusConfig[svc.status];
              return (
                <div key={svc.id} className="flex items-center gap-3 py-1.5">
                  <div className={config.dot} />
                  <span className="text-sm text-foreground flex-1">{svc.name}</span>
                  <span className="text-xs font-mono text-muted-foreground">{svc.latency}</span>
                  <span className="text-xs font-mono text-muted-foreground">{svc.uptime}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}