'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, LayoutDashboard, Users, FolderKanban, BarChart3, CreditCard, Zap, ShieldCheck, Sparkles, ArrowRight, Clock, Building2 } from 'lucide-react';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const commands = [
  { id: 'cmd-dashboard', label: 'Go to Command Center', icon: LayoutDashboard, category: 'Navigate', shortcut: 'G D' },
  { id: 'cmd-admin', label: 'Go to Admin Panel', icon: ShieldCheck, category: 'Navigate', shortcut: 'G A' },
  { id: 'cmd-workforce', label: 'Go to Workforce', icon: Users, category: 'Navigate', shortcut: 'G W' },
  { id: 'cmd-projects', label: 'Go to Projects & SOW', icon: FolderKanban, category: 'Navigate', shortcut: 'G P' },
  { id: 'cmd-analytics', label: 'View Analytics', icon: BarChart3, category: 'Navigate', shortcut: 'G N' },
  { id: 'cmd-payroll', label: 'Run Payroll', icon: CreditCard, category: 'Actions', shortcut: null },
  { id: 'cmd-workflow', label: 'Create New Workflow', icon: Zap, category: 'Actions', shortcut: null },
  { id: 'cmd-ai', label: 'Ask AI Copilot', icon: Sparkles, category: 'AI', shortcut: '⌘ /' },
  { id: 'cmd-employee', label: 'Add New Employee', icon: Users, category: 'Actions', shortcut: null },
  { id: 'cmd-branch', label: 'Manage Branches', icon: Building2, category: 'Navigate', shortcut: null },
  { id: 'cmd-time', label: 'Start Time Tracker', icon: Clock, category: 'Actions', shortcut: null },
];

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, filtered.length, onClose]);

  if (!open) return null;

  const grouped = filtered.reduce<Record<string, typeof commands>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-card-elevated overflow-hidden animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands, people, modules..."
            className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground outline-none"
          />
          <kbd className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={`category-${category}`}>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest px-4 py-2">
                {category}
              </p>
              {items.map((item) => {
                const globalIdx = filtered.indexOf(item);
                const IconComp = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      globalIdx === selected
                        ? 'bg-primary/10 text-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                    onClick={onClose}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${globalIdx === selected ? 'bg-primary/20' : 'bg-muted'}`}>
                      <IconComp size={14} />
                    </div>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.shortcut && (
                      <span className="text-xs text-muted-foreground font-mono">{item.shortcut}</span>
                    )}
                    {globalIdx === selected && <ArrowRight size={14} className="text-primary" />}
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-muted-foreground">No commands found for "{query}"</p>
            </div>
          )}
        </div>

        <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><kbd className="bg-muted px-1 rounded font-mono">↑↓</kbd> Navigate</span>
          <span className="flex items-center gap-1"><kbd className="bg-muted px-1 rounded font-mono">↵</kbd> Select</span>
          <span className="flex items-center gap-1"><kbd className="bg-muted px-1 rounded font-mono">ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}