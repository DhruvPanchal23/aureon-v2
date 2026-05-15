'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import WorkforceKPICards from './components/WorkforceKPICards';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeProfileDrawer from './components/EmployeeProfileDrawer';
import DepartmentManagement from './components/DepartmentManagement';
import OrgChartVisualization from './components/OrgChartVisualization';
import AttendanceOverview from './components/AttendanceOverview';
import LeaveManagement from './components/LeaveManagement';
import HiringPipeline from './components/HiringPipeline';
import OnboardingWorkflows from './components/OnboardingWorkflows';
import WorkforceAnalytics from './components/WorkforceAnalytics';
import AIWorkforceInsights from './components/AIWorkforceInsights';
import ProductivityHeatmap from './components/ProductivityHeatmap';
import { Employee } from './data/workforceData';
import { Users, BarChart3, Building2, Briefcase, Clock, Download, Plus,  } from 'lucide-react';

type WorkforceTab = 'overview' | 'directory' | 'departments' | 'attendance' | 'hiring' | 'analytics';

const tabs: { id: WorkforceTab; label: string; icon: typeof Users }[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'directory', label: 'Directory', icon: Users },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'attendance', label: 'Attendance', icon: Clock },
  { id: 'hiring', label: 'Hiring', icon: Briefcase },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function WorkforcePage() {
  const [activeTab, setActiveTab] = useState<WorkforceTab>('overview');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  return (
    <AppLayout currentPath="/workforce">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                HR Operating System
              </span>
              <span className="text-xs text-muted-foreground">NovaTech Corp · 1,579 employees</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Workforce</h1>
            <p className="text-sm text-muted-foreground mt-1">
              AI-native people operations · 14 branches · 8 departments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              suppressHydrationWarning
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            >
              <Download size={14} />
              Export
            </button>
            <button
              suppressHydrationWarning
              className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus size={14} />
              Add Employee
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <WorkforceKPICards />

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={`tab-${tab.id}`}
                suppressHydrationWarning
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-px ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <IconComp size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top row: Analytics + AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WorkforceAnalytics />
              </div>
              <div className="lg:col-span-1">
                <AIWorkforceInsights />
              </div>
            </div>

            {/* Productivity Heatmap */}
            <ProductivityHeatmap />

            {/* Bottom row: Leave + Onboarding */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LeaveManagement />
              <OnboardingWorkflows />
            </div>
          </div>
        )}

        {activeTab === 'directory' && (
          <div className="space-y-6">
            <EmployeeDirectory onSelectEmployee={setSelectedEmployee} />
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <DepartmentManagement />
              <OrgChartVisualization />
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <AttendanceOverview />
            <ProductivityHeatmap />
          </div>
        )}

        {activeTab === 'hiring' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <HiringPipeline />
              </div>
              <div className="xl:col-span-1">
                <OnboardingWorkflows />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WorkforceAnalytics />
              </div>
              <div className="lg:col-span-1">
                <AIWorkforceInsights />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentManagement />
              <ProductivityHeatmap />
            </div>
          </div>
        )}
      </div>

      {/* Employee Profile Drawer */}
      <EmployeeProfileDrawer
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </AppLayout>
  );
}
