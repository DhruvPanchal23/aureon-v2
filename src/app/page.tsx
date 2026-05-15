import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardBentoGrid from './components/DashboardBentoGrid';
import AIInsightsPanel from './components/AIInsightsPanel';
import DepartmentPerformanceChart from './components/DepartmentPerformanceChart';
import BranchHealthGrid from './components/BranchHealthGrid';
import PendingApprovals from './components/PendingApprovals';
import ActivityFeed from './components/ActivityFeed';
import OrgPulseChart from './components/OrgPulseChart';

export default function DashboardPage() {
  return (
    <AppLayout currentPath="/">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Command Center</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Thursday, May 15, 2026 · NovaTech Corp · 14 branches active
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Last updated</span>
            <span className="text-xs font-mono text-primary">06:15 UTC</span>
            <div className="status-dot-positive pulse-ring" />
          </div>
        </div>

        {/* Bento KPI grid */}
        <DashboardBentoGrid />

        {/* Mid row: Org Pulse chart + AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrgPulseChart />
          </div>
          <div className="lg:col-span-1">
            <AIInsightsPanel />
          </div>
        </div>

        {/* Lower row: Department chart + Branch health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6">
          <DepartmentPerformanceChart />
          <BranchHealthGrid />
        </div>

        {/* Bottom row: Approvals + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-5 gap-6">
          <div className="2xl:col-span-2">
            <PendingApprovals />
          </div>
          <div className="2xl:col-span-3">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}