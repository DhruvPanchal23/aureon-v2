'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Users,
  Building2,
  FolderKanban,
  BarChart3,
  CreditCard,
  Zap,
  MessageSquare,
  Clock,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Bell,
  HelpCircle,
  LogOut,
  Globe,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPath: string;
}

const navGroups = [
  {
    label: 'Core',
    items: [
      { label: 'Command Center', icon: LayoutDashboard, href: '/', badge: null },
      { label: 'AI Insights', icon: Sparkles, href: '/ai-insights', badge: '3' },
    ],
  },
  {
    label: 'Organization',
    items: [
      { label: 'Workforce', icon: Users, href: '/workforce', badge: null },
      { label: 'Branches', icon: Building2, href: '/branches', badge: null },
      { label: 'Admin Panel', icon: ShieldCheck, href: '/admin-panel', badge: null },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Projects & SOW', icon: FolderKanban, href: '/projects', badge: '5' },
      { label: 'Workflows', icon: Zap, href: '/workflows', badge: null },
      { label: 'Time Tracking', icon: Clock, href: '/time', badge: null },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Payroll', icon: CreditCard, href: '/payroll', badge: null },
      { label: 'Analytics', icon: BarChart3, href: '/analytics', badge: null },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Collaboration', icon: MessageSquare, href: '/collaboration', badge: '12' },
      { label: 'Documents', icon: FileText, href: '/documents', badge: null },
      { label: 'Global Hub', icon: Globe, href: '/landing-page', badge: null },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle, currentPath }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside
      className="relative flex flex-col h-screen border-r border-border bg-card transition-all duration-300 ease-in-out z-20"
      style={{ width: collapsed ? '64px' : '240px', minWidth: collapsed ? '64px' : '240px' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 blob-primary opacity-30" />
      </div>

      {/* Logo */}
      <div className="relative flex items-center h-16 px-3 border-b border-border">
        <div className="flex items-center gap-2 overflow-hidden">
          <AppLogo size={32} className="shrink-0" />
          {!collapsed && (
            <span className="font-semibold text-base text-foreground tracking-tight whitespace-nowrap">
              Aureon
            </span>
          )}
        </div>
        <button
          suppressHydrationWarning
          onClick={onToggle}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-150 z-10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      {/* Workspace switcher */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-border">
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
            <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center text-xs font-bold text-white shrink-0">
              N
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">NovaTech Corp</p>
              <p className="text-xs text-muted-foreground">Enterprise</p>
            </div>
            <ChevronRight size={12} className="text-muted-foreground shrink-0" />
          </div>
        </div>
      )}

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={`group-${group.label}`}>
            {!collapsed && (
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest px-2 mb-1">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = currentPath === item.href;
                const IconComp = item.icon;
                return (
                  <div
                    key={`nav-${item.href}`}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                        isActive
                          ? 'bg-primary/10 text-primary border-l-2 border-primary -ml-px pl-[calc(0.5rem+1px)]'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/4'
                      }`}
                    >
                      <IconComp size={16} className="shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                    {/* Tooltip when collapsed */}
                    {collapsed && hoveredItem === item.href && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 pointer-events-none">
                        <div className="bg-card border border-border rounded-lg px-3 py-1.5 text-sm text-foreground whitespace-nowrap shadow-card-elevated">
                          {item.label}
                          {item.badge && (
                            <span className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border p-2 space-y-0.5">
        {[
          { icon: Bell, label: 'Notifications', badge: '4' },
          { icon: Settings, label: 'Settings' },
          { icon: HelpCircle, label: 'Help & Docs' },
        ].map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={`bottom-${item.label}`}
              className="relative"
              onMouseEnter={() => setHoveredItem(`bottom-${item.label}`)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                suppressHydrationWarning
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/4 transition-colors"
              >
                <IconComp size={16} className="shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-danger/20 text-danger">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
              {collapsed && hoveredItem === `bottom-${item.label}` && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 pointer-events-none">
                  <div className="bg-card border border-border rounded-lg px-3 py-1.5 text-sm text-foreground whitespace-nowrap shadow-card-elevated">
                    {item.label}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* User profile */}
        <div className="pt-2 mt-2 border-t border-border">
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/4 cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white shrink-0">
              MA
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">Marcus Aldridge</p>
                <p className="text-xs text-muted-foreground truncate">Org Owner</p>
              </div>
            )}
            {!collapsed && <LogOut size={12} className="text-muted-foreground shrink-0" />}
          </div>
        </div>
      </div>
    </aside>
  );
}