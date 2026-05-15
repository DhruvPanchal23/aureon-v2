'use client';

import React, { useState } from 'react';
import { Sparkles, ChevronRight, TrendingDown, AlertTriangle, RefreshCw, TrendingUp } from 'lucide-react';
import { aiWorkforceInsights } from '../data/workforceData';

const typeStyles: Record<string, { border: string; bg: string; badge: string; icon: string }> = {
  warning: { border: 'border-warning/20', bg: 'bg-warning/5', badge: 'bg-warning/15 text-warning', icon: 'text-warning' },
  info: { border: 'border-info/20', bg: 'bg-info/5', badge: 'bg-info/15 text-info', icon: 'text-info' },
  positive: { border: 'border-positive/20', bg: 'bg-positive/5', badge: 'bg-positive/15 text-positive', icon: 'text-positive' },
  danger: { border: 'border-danger/20', bg: 'bg-danger/5', badge: 'bg-danger/15 text-danger', icon: 'text-danger' },
};

const typeIcons: Record<string, typeof AlertTriangle> = {
  warning: AlertTriangle,
  info: TrendingDown,
  positive: TrendingUp,
  danger: AlertTriangle,
};

export default function AIWorkforceInsights() {
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = useState<string | null>('ai-ins-001');

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">AI Workforce Insights</h3>
            <p className="text-xs text-muted-foreground">{aiWorkforceInsights.length} recommendations</p>
          </div>
        </div>
        <button
          suppressHydrationWarning
          onClick={handleRefresh}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {aiWorkforceInsights.map((insight) => {
          const styles = typeStyles[insight.type];
          const IconComp = typeIcons[insight.type];
          const isExpanded = expanded === insight.id;

          return (
            <div
              key={insight.id}
              className={`rounded-lg border ${styles.border} ${styles.bg} p-3 cursor-pointer transition-all duration-200`}
              onClick={() => setExpanded(isExpanded ? null : insight.id)}
            >
              <div className="flex items-start gap-2.5">
                <div className={`mt-0.5 shrink-0 ${styles.icon}`}>
                  <IconComp size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground leading-snug">{insight.title}</p>
                    <ChevronRight
                      size={12}
                      className={`text-muted-foreground shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                  {isExpanded && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">{insight.summary}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">Confidence</span>
                          <div className="w-16 h-1 rounded-full bg-border overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${insight.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-primary">{insight.confidence}%</span>
                        </div>
                        <button
                          suppressHydrationWarning
                          className={`text-xs font-medium px-2.5 py-1 rounded-lg ${styles.badge} hover:opacity-80 transition-opacity`}
                        >
                          {insight.action} →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <button
          suppressHydrationWarning
          className="w-full text-xs text-primary hover:text-accent transition-colors flex items-center justify-center gap-1.5 py-1"
        >
          <Sparkles size={12} />
          Ask AI Copilot about your workforce
        </button>
      </div>
    </div>
  );
}
