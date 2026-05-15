import React from 'react';
import AppLayout from '@/components/AppLayout';
import AdminKPICards from './components/AdminKPICards';
import OrgManagementTable from './components/OrgManagementTable';
import AuditLogFeed from './components/AuditLogFeed';
import FeatureFlagsPanel from './components/FeatureFlagsPanel';
import SystemHealthPanel from './components/SystemHealthPanel';

export default function AdminPanelPage() {
  return (
    <AppLayout currentPath="/admin-panel">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-danger/15 text-danger">
                Super Admin
              </span>
              <span className="text-xs text-muted-foreground">Full platform access</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Admin Control Center</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Platform-wide management · 47 organizations · $2.4M MRR
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button suppressHydrationWarning className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
              Export Report
            </button>
            <button suppressHydrationWarning className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all">
              + New Organization
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <AdminKPICards />

        {/* System health */}
        <SystemHealthPanel />

        {/* Main content: org table + side panels */}
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 2xl:col-span-2">
            <OrgManagementTable />
          </div>
          <div className="xl:col-span-1 2xl:col-span-1 space-y-6">
            <AuditLogFeed />
            <FeatureFlagsPanel />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}