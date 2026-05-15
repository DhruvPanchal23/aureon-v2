'use client';

import React, { useState } from 'react';
import { Search, Bell, Sparkles, Plus, ChevronDown, Command } from 'lucide-react';

interface TopbarProps {
  onCommandOpen: () => void;
}

export default function Topbar({ onCommandOpen }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 'notif-1', type: 'warning', title: 'Payroll run delayed', desc: 'May 2026 payroll pending approval', time: '5m ago' },
    { id: 'notif-2', type: 'info', title: 'New SOW submitted', desc: 'Priya Nair submitted SOW-2026-047', time: '12m ago' },
    { id: 'notif-3', type: 'danger', title: 'SLA breach imminent', desc: 'Approval #APR-884 expires in 30min', time: '18m ago' },
    { id: 'notif-4', type: 'positive', title: 'Sprint completed', desc: 'Horizon Platform v2.1 sprint closed', time: '1h ago' },
  ];

  const typeColor: Record<string, string> = {
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info',
    danger: 'bg-danger/10 text-danger',
    positive: 'bg-positive/10 text-positive',
  };

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6 gap-4 shrink-0 z-10">
      {/* Command palette trigger */}
      <button
        suppressHydrationWarning
        onClick={onCommandOpen}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-150 text-sm min-w-[200px]"
      >
        <Search size={14} />
        <span className="flex-1 text-left">Search or run a command...</span>
        <div className="flex items-center gap-0.5">
          <kbd className="text-xs bg-muted px-1 py-0.5 rounded font-mono">⌘</kbd>
          <kbd className="text-xs bg-muted px-1 py-0.5 rounded font-mono">K</kbd>
        </div>
      </button>

      <div className="flex-1" />

      {/* AI Status */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
        <Sparkles size={14} className="text-primary" />
        <span className="text-xs font-medium text-primary">AI Active</span>
        <div className="status-dot-positive" style={{ width: '6px', height: '6px' }} />
      </div>

      {/* Quick add */}
      <button suppressHydrationWarning className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all duration-150">
        <Plus size={14} />
        <span>New</span>
        <ChevronDown size={12} />
      </button>

      {/* Notifications */}
      <div className="relative">
        <button
          suppressHydrationWarning
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative w-9 h-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-150"
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger" />
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-card-elevated z-50 animate-fade-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground">Notifications</p>
              <button className="text-xs text-primary hover:text-accent transition-colors">Mark all read</button>
            </div>
            <div className="divide-y divide-border">
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-3 hover:bg-muted/30 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${typeColor[n.type]}`}>
                      {n.type}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border">
              <button className="text-xs text-primary hover:text-accent transition-colors w-full text-center">
                View all notifications
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User avatar */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white">
          MA
        </div>
        <ChevronDown size={12} className="text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </header>
  );
}