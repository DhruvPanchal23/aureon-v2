'use client';

import React, { useState } from 'react';
import { Zap, Sparkles, Shield, Clock, BarChart3, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

// Backend integration point: fetch feature flags from /api/admin/feature-flags
const initialFlags = [
  { id: 'flag-ai-copilot', label: 'AI Copilot', desc: 'AI-powered assistant across all modules', icon: Sparkles, enabled: true, scope: 'Global' },
  { id: 'flag-time-screenshots', label: 'Time Tracker Screenshots', desc: 'Optional screenshot capture in time tracking', icon: Clock, enabled: false, scope: 'Enterprise' },
  { id: 'flag-sso', label: 'SSO / SAML', desc: 'Single sign-on with enterprise identity providers', icon: Shield, enabled: true, scope: 'Enterprise' },
  { id: 'flag-advanced-analytics', label: 'Advanced Analytics', desc: 'Predictive insights and AI-generated reports', icon: BarChart3, enabled: true, scope: 'Growth+' },
  { id: 'flag-collab', label: 'Real-time Collaboration', desc: 'Live cursors, co-editing, presence indicators', icon: MessageSquare, enabled: true, scope: 'Global' },
  { id: 'flag-automation', label: 'Workflow Automation', desc: 'No-code automation builder and triggers', icon: Zap, enabled: true, scope: 'Pro+' },
];

export default function FeatureFlagsPanel() {
  const [flags, setFlags] = useState(initialFlags);

  const toggle = (id: string) => {
    setFlags(prev => prev.map(f => {
      if (f.id !== id) return f;
      const next = { ...f, enabled: !f.enabled };
      toast.success(`${next.label} ${next.enabled ? 'enabled' : 'disabled'} globally`);
      return next;
    }));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Feature Flags</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Global platform controls</p>
        </div>
        <span className="text-xs text-muted-foreground">{flags.filter(f => f.enabled).length}/{flags.length} active</span>
      </div>

      <div className="space-y-3">
        {flags.map((flag) => {
          const IconComp = flag.icon;
          return (
            <div key={flag.id} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${flag.enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <IconComp size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-foreground">{flag.label}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">{flag.scope}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{flag.desc}</p>
              </div>
              {/* Toggle */}
              <button
                onClick={() => toggle(flag.id)}
                className={`relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0 ${flag.enabled ? 'bg-primary' : 'bg-muted'}`}
                role="switch"
                aria-checked={flag.enabled}
                aria-label={`Toggle ${flag.label}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${flag.enabled ? 'translate-x-4' : 'translate-x-0.5'}`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}