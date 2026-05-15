'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronUp, ChevronDown, Eye, UserCheck, MapPin,
  CheckSquare, Square, Minus, Download, MessageSquare, Trash2, X,
  SlidersHorizontal, RotateCcw, Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { employees as mockEmployees } from '../data/workforceData';
import { Employee } from '../types/workforce.types';
import {
  sortEmployees, paginateArray, getSmartPageRange, getAvatarGradient,
  statusColors, statusDotColors, getPerformanceTier, performanceTierColors,
  type SortKey
} from '../utils/tableUtils';
import { useBulkSelection, useWorkforceFilters } from '../hooks/useWorkforce';
import { TableRowSkeleton, EmptyState } from './WorkforceShared';
import { workforceToasts } from './WorkforceShared';
import Icon from '@/components/ui/AppIcon';


interface EmployeeDirectoryProps {
  onSelectEmployee: (emp: Employee) => void;
  onAddEmployee?: () => void;
}

const PerformanceBar = memo(({ value, color }: { value: number; color: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
    <span className="text-xs font-mono text-foreground tabular-nums">{value}%</span>
  </div>
));
PerformanceBar.displayName = 'PerformanceBar';

const BulkActionBar = memo(({ count, onAction, onClear }: {
  count: number;
  onAction: (action: string) => void;
  onClear: () => void;
}) => (
  <AnimatePresence>
    {count > 0 && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="flex items-center gap-3 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-lg"
      >
        <span className="text-xs font-medium text-primary">{count} selected</span>
        <div className="flex items-center gap-1 ml-auto">
          {[
            { icon: Download, label: 'Export', action: 'export' },
            { icon: MessageSquare, label: 'Message', action: 'message' },
            { icon: UserCheck, label: 'Approve Leave', action: 'approve_leave' },
            { icon: Trash2, label: 'Archive', action: 'archive', danger: true },
          ].map(({ icon: Icon, label, action, danger }) => (
            <button
              key={action}
              suppressHydrationWarning
              onClick={() => onAction(action)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                danger
                  ? 'text-danger hover:bg-danger/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              title={label}
            >
              <Icon size={12} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
          <button
            suppressHydrationWarning
            onClick={onClear}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors ml-1"
          >
            <X size={12} />
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));
BulkActionBar.displayName = 'BulkActionBar';

export default function EmployeeDirectory({ onSelectEmployee, onAddEmployee }: EmployeeDirectoryProps) {
  const { filters, updateFilter, resetFilters, activeFilterCount } = useWorkforceFilters();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isLoading] = useState(false);

  const departments = useMemo(() => ['All', ...Array.from(new Set(mockEmployees.map(e => e.department)))], []);
  const statuses = ['All', 'Active', 'On Leave', 'Remote', 'Offboarding'];
  const branches = useMemo(() => ['All', ...Array.from(new Set(mockEmployees.map(e => e.branch)))], []);

  const filtered = useMemo(() => {
    let data = [...mockEmployees];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        e.branch.toLowerCase().includes(q)
      );
    }
    if (filters.department !== 'All') data = data.filter(e => e.department === filters.department);
    if (filters.status !== 'All') data = data.filter(e => e.status === filters.status);
    if (filters.branch !== 'All') data = data.filter(e => e.branch === filters.branch);
    return sortEmployees(data, filters.sortKey as SortKey, filters.sortDir);
  }, [filters]);

  const { items: paginated, totalPages } = useMemo(
    () => paginateArray(filtered, filters.page, filters.perPage),
    [filtered, filters.page, filters.perPage]
  );

  const pageRange = useMemo(() => getSmartPageRange(filters.page, totalPages), [filters.page, totalPages]);

  const bulk = useBulkSelection(paginated);

  const handleSort = useCallback((key: SortKey) => {
    if (filters.sortKey === key) {
      updateFilter('sortDir', filters.sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      updateFilter('sortKey', key);
      updateFilter('sortDir', 'asc');
    }
  }, [filters.sortKey, filters.sortDir, updateFilter]);

  const handleBulkAction = useCallback((action: string) => {
    const t = workforceToasts.bulkAction(bulk.selectedCount, action.replace('_', ' '));
    toast.success(t.message, { description: t.description });
    bulk.clearSelection();
  }, [bulk]);

  const SortIcon = useCallback(({ col }: { col: SortKey }) => {
    if (filters.sortKey !== col) return <ChevronUp size={12} className="text-muted-foreground opacity-30" />;
    return filters.sortDir === 'asc'
      ? <ChevronUp size={12} className="text-primary" />
      : <ChevronDown size={12} className="text-primary" />;
  }, [filters.sortKey, filters.sortDir]);

  const CheckboxIcon = useCallback(({ checked, partial }: { checked: boolean; partial?: boolean }) => {
    if (partial) return <Minus size={12} className="text-primary" />;
    if (checked) return <CheckSquare size={12} className="text-primary" />;
    return <Square size={12} className="text-muted-foreground" />;
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Employee Directory</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {filtered.length} employee{filtered.length !== 1 ? 's' : ''} found
              {activeFilterCount > 0 && (
                <span className="ml-1.5 text-primary">· {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                suppressHydrationWarning
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              >
                <RotateCcw size={11} />
                Reset
              </button>
            )}
            <button
              suppressHydrationWarning
              onClick={() => setShowAdvancedFilters(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                showAdvancedFilters
                  ? 'border-primary/40 text-primary bg-primary/10' :'border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
            >
              <SlidersHorizontal size={12} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <button
              suppressHydrationWarning
              onClick={onAddEmployee}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus size={12} />
              Add Employee
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={filters.search}
            onChange={e => updateFilter('search', e.target.value)}
            placeholder="Search by name, role, department, branch... (⌘F)"
            className="w-full bg-muted/50 border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
            suppressHydrationWarning
          />
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <Filter size={13} className="text-muted-foreground" />
                {[
                  { label: 'Department', key: 'department' as const, options: departments },
                  { label: 'Status', key: 'status' as const, options: statuses },
                  { label: 'Branch', key: 'branch' as const, options: branches },
                ].map(({ label, key, options }) => (
                  <select
                    key={key}
                    value={filters[key]}
                    onChange={e => updateFilter(key, e.target.value)}
                    className="bg-muted/50 border border-border rounded-lg px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary/50 transition-colors"
                    suppressHydrationWarning
                  >
                    {options.map(o => <option key={`${key}-${o}`} value={o}>{o === 'All' ? `All ${label}s` : o}</option>)}
                  </select>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Action Bar */}
        <BulkActionBar
          count={bulk.selectedCount}
          onAction={handleBulkAction}
          onClear={bulk.clearSelection}
        />
      </div>

      {/* Sticky Table Controls */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-card">
            <tr className="border-b border-border">
              <th className="px-5 py-3 w-10">
                <button
                  suppressHydrationWarning
                  onClick={bulk.toggleAll}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <CheckboxIcon checked={bulk.isAllSelected} partial={bulk.isPartialSelected} />
                </button>
              </th>
              {[
                { key: 'name' as SortKey, label: 'Employee' },
                { key: 'department' as SortKey, label: 'Department' },
                { key: 'role' as SortKey, label: 'Role' },
                { key: 'performance' as SortKey, label: 'Performance' },
                { key: 'attendance' as SortKey, label: 'Attendance' },
              ].map(col => (
                <th
                  key={`th-${col.key}`}
                  onClick={() => handleSort(col.key)}
                  className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest cursor-pointer hover:text-foreground transition-colors select-none"
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest">Status</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest">Branch</th>
              <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <TableRowSkeleton key={`skel-${i}`} cols={8} />)
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <EmptyState
                    icon={<Search size={20} />}
                    title="No employees found"
                    description="Try adjusting your search or filter criteria"
                    action={{ label: 'Reset Filters', onClick: resetFilters }}
                  />
                </td>
              </tr>
            ) : (
              paginated.map((emp, idx) => {
                const gradClass = getAvatarGradient(idx);
                const tier = getPerformanceTier(emp.performance);
                const isSelected = bulk.isSelected(emp.id);
                return (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`border-b border-border last:border-0 transition-colors cursor-pointer group ${
                      isSelected ? 'bg-primary/5' : 'hover:bg-muted/10'
                    }`}
                    onClick={() => onSelectEmployee(emp)}
                  >
                    <td className="px-5 py-3.5" onClick={e => { e.stopPropagation(); bulk.toggleItem(emp.id); }}>
                      <button suppressHydrationWarning className="text-muted-foreground hover:text-primary transition-colors">
                        <CheckboxIcon checked={isSelected} />
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center text-xs font-bold text-white shrink-0 group-hover:scale-105 transition-transform`}>
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-muted-foreground">{emp.department}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div>
                        <span className="text-sm text-foreground">{emp.role}</span>
                        <span className={`ml-2 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${performanceTierColors[tier]}`}>
                          {tier}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <PerformanceBar value={emp.performance} color="bg-primary" />
                    </td>
                    <td className="px-5 py-3.5">
                      <PerformanceBar value={emp.attendance} color="bg-positive" />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${statusDotColors[emp.status]}`} />
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[emp.status]}`}>
                          {emp.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={11} />
                        <span>{emp.branch}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          suppressHydrationWarning
                          onClick={() => onSelectEmployee(emp)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View profile"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          suppressHydrationWarning
                          onClick={() => {
                            const t = workforceToasts.employeeUpdated(emp.name);
                            toast.success(t.message, { description: t.description });
                          }}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-positive hover:bg-positive/10 transition-colors"
                          title="Quick approve"
                        >
                          <UserCheck size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Smart Pagination */}
      {totalPages > 1 && (
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {((filters.page - 1) * filters.perPage) + 1}–{Math.min(filters.page * filters.perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              suppressHydrationWarning
              onClick={() => updateFilter('page', Math.max(1, filters.page - 1))}
              disabled={filters.page === 1}
              className="px-2 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              ←
            </button>
            {pageRange.map((p, i) => (
              p === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 py-1 text-xs text-muted-foreground">…</span>
              ) : (
                <button
                  key={`page-${p}`}
                  suppressHydrationWarning
                  onClick={() => updateFilter('page', p as number)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                    filters.page === p
                      ? 'bg-primary text-white' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {p}
                </button>
              )
            ))}
            <button
              suppressHydrationWarning
              onClick={() => updateFilter('page', Math.min(totalPages, filters.page + 1))}
              disabled={filters.page === totalPages}
              className="px-2 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
