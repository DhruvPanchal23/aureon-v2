'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { toast } from 'sonner';
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
import QuickCreateEmployeeModal from './components/QuickCreateEmployeeModal';
import AttendanceAnomalyDetector from './components/AttendanceAnomalyDetector';
import TeamPerformanceScoring from './components/TeamPerformanceScoring';
import SkillMatrixVisualization from './components/SkillMatrixVisualization';
import ActivityTimeline from './components/ActivityTimeline';
import AIWorkforceSummary from './components/AIWorkforceSummary';
import { Employee } from './types/workforce.types';
import { useKeyboardShortcuts } from './hooks/useWorkforce';
import {
  Users, BarChart3, Building2, Briefcase, Clock, Download, Plus,
  Keyboard, Command
} from 'lucide-react';

type WorkforceTab = 'overview' | 'directory' | 'departments' | 'attendance' | 'hiring' | 'analytics';

const tabs: { id: WorkforceTab; label: string; icon: typeof Users }[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'directory', label: 'Directory', icon: Users },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'attendance', label: 'Attendance', icon: Clock },
  { id: 'hiring', label: 'Hiring', icon: Briefcase },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const tabOrder: WorkforceTab[] = ['overview', 'directory', 'departments', 'attendance', 'hiring', 'analytics'];

// Keyboard shortcut hint component
function ShortcutHint({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>{label}</span>
      <div className="flex items-center gap-0.5">
        {keys.map(k => (
          <kbd key={k} className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">{k}</kbd>
        ))}
      </div>
    </div>
  );
}

export default function WorkforcePage() {
  const [activeTab, setActiveTab] = useState<WorkforceTab>('overview');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'cmd+shift+n': () => setShowCreateModal(true),
    'cmd+shift+e': () => {
      toast.success('Export started', { description: 'Workforce data export initiated' });
    },
    '1': () => setActiveTab('overview'),
    '2': () => setActiveTab('directory'),
    '3': () => setActiveTab('departments'),
    '4': () => setActiveTab('attendance'),
    '5': () => setActiveTab('hiring'),
    '6': () => setActiveTab('analytics'),
    '?': () => setShowShortcuts(v => !v),
  });

  // Tab navigation with arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && !e.metaKey && !e.ctrlKey) {
        setActiveTab(prev => {
          const idx = tabOrder.indexOf(prev);
          return tabOrder[Math.min(idx + 1, tabOrder.length - 1)];
        });
      }
      if (e.key === 'ArrowLeft' && !e.metaKey && !e.ctrlKey) {
        setActiveTab(prev => {
          const idx = tabOrder.indexOf(prev);
          return tabOrder[Math.max(idx - 1, 0)];
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleEmployeeCreated = useCallback((name: string) => {
    toast.success(`${name} added to workforce`, {
      description: 'Onboarding workflow initiated automatically',
    });
  }, []);

  return (
    <AppLayout currentPath="/workforce">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
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
          <div className="flex items-center gap-2 flex-wrap">
            <button
              suppressHydrationWarning
              onClick={() => setShowShortcuts(v => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              title="Keyboard shortcuts (?)"
            >
              <Keyboard size={13} />
              <span className="hidden sm:inline">Shortcuts</span>
            </button>
            <button
              suppressHydrationWarning
              onClick={() => toast.success('Export started', { description: 'Workforce data export initiated' })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            >
              <Download size={14} />
              Export
            </button>
            <button
              suppressHydrationWarning
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus size={14} />
              Add Employee
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-white/20 font-mono text-[10px]">⌘⇧N</kbd>
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Panel */}
        <AnimatePresence>
          {showShortcuts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Command size={13} className="text-primary" />
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest">Keyboard Shortcuts</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <ShortcutHint keys={['⌘', '⇧', 'N']} label="Add Employee" />
                  <ShortcutHint keys={['⌘', '⇧', 'E']} label="Export Data" />
                  <ShortcutHint keys={['1']} label="Overview Tab" />
                  <ShortcutHint keys={['2']} label="Directory Tab" />
                  <ShortcutHint keys={['3']} label="Departments Tab" />
                  <ShortcutHint keys={['4']} label="Attendance Tab" />
                  <ShortcutHint keys={['5']} label="Hiring Tab" />
                  <ShortcutHint keys={['6']} label="Analytics Tab" />
                  <ShortcutHint keys={['←', '→']} label="Navigate Tabs" />
                  <ShortcutHint keys={['?']} label="Toggle Shortcuts" />
                  <ShortcutHint keys={['⌘', 'K']} label="Command Palette" />
                  <ShortcutHint keys={['ESC']} label="Close Panels" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* Tab Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* AI Summary */}
                <AIWorkforceSummary />

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

                {/* Activity Timeline + Leave */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ActivityTimeline />
                  <LeaveManagement />
                </div>

                {/* Onboarding */}
                <OnboardingWorkflows />
              </div>
            )}

            {activeTab === 'directory' && (
              <div className="space-y-6">
                <EmployeeDirectory
                  onSelectEmployee={setSelectedEmployee}
                  onAddEmployee={() => setShowCreateModal(true)}
                />
              </div>
            )}

            {activeTab === 'departments' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <DepartmentManagement />
                  <OrgChartVisualization />
                </div>
                <TeamPerformanceScoring />
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AttendanceOverview />
                  <AttendanceAnomalyDetector />
                </div>
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
                <SkillMatrixVisualization />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DepartmentManagement />
                  <ProductivityHeatmap />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Employee Profile Drawer */}
      <EmployeeProfileDrawer
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />

      {/* Quick Create Employee Modal */}
      <QuickCreateEmployeeModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={handleEmployeeCreated}
      />
    </AppLayout>
  );
}
