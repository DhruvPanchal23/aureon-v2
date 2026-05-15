'use client';

import React, { useState } from 'react';
import { Search, Filter, ChevronUp, ChevronDown, Eye, UserCheck, MapPin } from 'lucide-react';
import { employees, Employee } from '../data/workforceData';

const statusColors: Record<string, string> = {
  Active: 'bg-positive/10 text-positive',
  'On Leave': 'bg-warning/10 text-warning',
  Remote: 'bg-info/10 text-info',
  Offboarding: 'bg-danger/10 text-danger',
};

const statusDots: Record<string, string> = {
  Active: 'status-dot-positive',
  'On Leave': 'status-dot-warning',
  Remote: 'status-dot-info',
  Offboarding: 'status-dot-danger',
};

const avatarColors = [
  'from-primary to-accent',
  'from-info to-primary',
  'from-positive to-info',
  'from-warning to-positive',
  'from-accent to-danger',
  'from-danger to-warning',
];

interface EmployeeDirectoryProps {
  onSelectEmployee: (emp: Employee) => void;
}

type SortKey = 'name' | 'department' | 'role' | 'performance' | 'attendance';

export default function EmployeeDirectory({ onSelectEmployee }: EmployeeDirectoryProps) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];
  const statuses = ['All', 'Active', 'On Leave', 'Remote', 'Offboarding'];

  const filtered = employees.filter(emp => {
    const matchSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
      emp.branch.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All' || emp.department === deptFilter;
    const matchStatus = statusFilter === 'All' || emp.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === 'number' && typeof bv === 'number') {
      return sortDir === 'asc' ? av - bv : bv - av;
    }
    return sortDir === 'asc'
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="text-muted-foreground opacity-30" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-primary" />
      : <ChevronDown size={12} className="text-primary" />;
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Employee Directory</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} employees found</p>
          </div>
          <button
            suppressHydrationWarning
            className="px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            + Add Employee
          </button>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search employees..."
              className="w-full bg-muted/50 border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
              suppressHydrationWarning
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-muted-foreground" />
            <select
              value={deptFilter}
              onChange={e => { setDeptFilter(e.target.value); setPage(1); }}
              className="bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
              suppressHydrationWarning
            >
              {departments.map(d => <option key={`dept-f-${d}`} value={d}>{d}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
              suppressHydrationWarning
            >
              {statuses.map(s => <option key={`status-f-${s}`} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
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
            {paginated.map((emp, idx) => {
              const gradClass = avatarColors[idx % avatarColors.length];
              return (
                <tr
                  key={emp.id}
                  className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors cursor-pointer"
                  onClick={() => onSelectEmployee(emp)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
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
                    <span className="text-sm text-foreground">{emp.role}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${emp.performance}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-foreground tabular-nums">{emp.performance}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-positive"
                          style={{ width: `${emp.attendance}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-foreground tabular-nums">{emp.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className={statusDots[emp.status]} style={{ width: '6px', height: '6px' }} />
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
                    <div className="flex items-center justify-end gap-1">
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
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-positive hover:bg-positive/10 transition-colors"
                        title="Approve"
                      >
                        <UserCheck size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, sorted.length)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              suppressHydrationWarning
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={`page-${p}`}
                suppressHydrationWarning
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  page === p ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              suppressHydrationWarning
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
