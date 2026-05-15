'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const WorkforceAnalyticsInner = dynamic(() => import('./WorkforceAnalyticsInner'), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center">
      <div className="animate-shimmer w-full h-full rounded-lg bg-muted/30" />
    </div>
  ),
});

export default function WorkforceAnalytics() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Workforce Analytics</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Headcount & utilization trends · 6 months</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Headcount</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-positive" />
            <span className="text-xs text-muted-foreground">Utilization %</span>
          </div>
        </div>
      </div>
      <WorkforceAnalyticsInner />
    </div>
  );
}
