'use client';

import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, ExternalLink, Shield, ChevronUp, ChevronDown, Eye, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Backend integration point: fetch organizations from /api/admin/organizations
const organizations = [
  {
    id: 'org-001',
    name: 'NovaTech Corp',
    domain: 'novatech.com',
    plan: 'Enterprise',
    branches: 14,
    employees: 1579,
    mrr: '$48,400',
    healthScore: 87,
    status: 'Active',
    owner: 'Marcus Aldridge',
    lastActive: 'Just now',
    createdAt: 'Jan 12, 2024',
  },
  {
    id: 'org-002',
    name: 'Meridian Financial',
    domain: 'meridianfinancial.io',
    plan: 'Enterprise',
    branches: 8,
    employees: 934,
    mrr: '$31,200',
    healthScore: 92,
    status: 'Active',
    owner: 'Claire Okonkwo',
    lastActive: '4m ago',
    createdAt: 'Mar 5, 2024',
  },
  {
    id: 'org-003',
    name: 'Apex Logistics',
    domain: 'apexlogistics.net',
    plan: 'Growth',
    branches: 5,
    employees: 412,
    mrr: '$12,800',
    healthScore: 74,
    status: 'Active',
    owner: 'Tariq Al-Hassan',
    lastActive: '22m ago',
    createdAt: 'Jun 18, 2024',
  },
  {
    id: 'org-004',
    name: 'Solaris Health',
    domain: 'solarishealth.com',
    plan: 'Enterprise',
    branches: 11,
    employees: 2104,
    mrr: '$62,100',
    healthScore: 89,
    status: 'Active',
    owner: 'Yuki Tanaka',
    lastActive: '1h ago',
    createdAt: 'Aug 2, 2023',
  },
  {
    id: 'org-005',
    name: 'Vertex Studios',
    domain: 'vertexstudios.design',
    plan: 'Pro',
    branches: 2,
    employees: 87,
    mrr: '$4,200',
    healthScore: 81,
    status: 'Active',
    owner: 'Isabelle Fontaine',
    lastActive: '3h ago',
    createdAt: 'Oct 14, 2024',
  },
  {
    id: 'org-006',
    name: 'Crestwood Manufacturing',
    domain: 'crestwoodmfg.com',
    plan: 'Growth',
    branches: 6,
    employees: 678,
    mrr: '$18,600',
    healthScore: 68,
    status: 'Suspended',
    owner: 'Dmitri Volkov',
    lastActive: '2d ago',
    createdAt: 'Feb 28, 2024',
  },
  {
    id: 'org-007',
    name: 'Luminary EdTech',
    domain: 'luminaryedtech.io',
    plan: 'Starter',
    branches: 1,
    employees: 34,
    mrr: '$890',
    healthScore: 77,
    status: 'Trial',
    owner: 'Amara Diallo',
    lastActive: '5h ago',
    createdAt: 'May 1, 2026',
  },
  {
    id: 'org-008',
    name: 'Pinnacle Consulting',
    domain: 'pinnacleconsult.com',
    plan: 'Enterprise',
    branches: 4,
    employees: 521,
    mrr: '$24,700',
    healthScore: 85,
    status: 'Active',
    owner: 'Noah Berntsen',
    lastActive: '12m ago',
    createdAt: 'Nov 7, 2023',
  },
  {
    id: 'org-009',
    name: 'Aurora Biotech',
    domain: 'aurorabiotech.science',
    plan: 'Growth',
    branches: 3,
    employees: 289,
    mrr: '$9,400',
    healthScore: 83,
    status: 'Active',
    owner: 'Priya Sharma',
    lastActive: '45m ago',
    createdAt: 'Apr 22, 2025',
  },
  {
    id: 'org-010',
    name: 'Irongate Security',
    domain: 'irongate.security',
    plan: 'Pro',
    branches: 2,
    employees: 143,
    mrr: '$6,200',
    healthScore: 91,
    status: 'Active',
    owner: 'James Calloway',
    lastActive: '8m ago',
    createdAt: 'Sep 3, 2024',
  },
];

const planColors: Record<string, string> = {
  Enterprise: 'bg-accent/15 text-accent',
  Growth: 'bg-primary/15 text-primary',
  Pro: 'bg-info/15 text-info',
  Starter: 'bg-muted text-muted-foreground',
};

const statusColors: Record<string, string> = {
  Active: 'bg-positive/10 text-positive',
  Suspended: 'bg-danger/10 text-danger',
  Trial: 'bg-warning/10 text-warning',
};

function getHealthColor(score: number) {
  if (score >= 90) return 'text-positive';
  if (score >= 80) return 'text-primary';
  if (score >= 70) return 'text-warning';
  return 'text-danger';
}

type SortKey = keyof typeof organizations[0];

export default function OrgManagementTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('healthScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionOpen, setActionOpen] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = organizations.filter(org => {
    const matchSearch = org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.domain.toLowerCase().includes(search.toLowerCase()) ||
      org.owner.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === 'All' || org.plan === planFilter;
    const matchStatus = statusFilter === 'All' || org.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
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
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="text-muted-foreground opacity-30" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-primary" />
      : <ChevronDown size={12} className="text-primary" />;
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search organizations..."
            className="w-full bg-muted/50 border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
            suppressHydrationWarning
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-muted-foreground" />
          <select
            value={planFilter}
            onChange={e => { setPlanFilter(e.target.value); setPage(1); }}
            className="bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
            suppressHydrationWarning
          >
            {['All', 'Enterprise', 'Growth', 'Pro', 'Starter'].map(p => (
              <option key={`plan-filter-${p}`} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
            suppressHydrationWarning
          >
            {['All', 'Active', 'Trial', 'Suspended'].map(s => (
              <option key={`status-filter-${s}`} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
          {filtered.length} organizations
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {[
                { key: 'name', label: 'Organization' },
                { key: 'plan', label: 'Plan' },
                { key: 'status', label: 'Status' },
                { key: 'branches', label: 'Branches' },
                { key: 'employees', label: 'Employees' },
                { key: 'mrr', label: 'MRR' },
                { key: 'healthScore', label: 'Health' },
                { key: 'owner', label: 'Owner' },
                { key: 'lastActive', label: 'Last Active' },
                { key: 'actions', label: '' },
              ].map((col) => (
                <th
                  key={`th-${col.key}`}
                  className={`px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest whitespace-nowrap ${col.key !== 'actions' ? 'cursor-pointer select-none hover:text-foreground' : ''}`}
                  onClick={() => col.key !== 'actions' && handleSort(col.key as SortKey)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}{col.key !== 'actions' && <SortIcon col={col.key as SortKey} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((org) => (
              <tr
                key={org.id}
                className="group hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {org.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground whitespace-nowrap">{org.name}</p>
                      <p className="text-xs text-muted-foreground">{org.domain}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${planColors[org.plan] || 'bg-muted text-muted-foreground'}`}>
                    {org.plan}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusColors[org.status] || 'bg-muted text-muted-foreground'}`}>
                    {org.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm tabular-nums text-foreground">{org.branches}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm tabular-nums text-foreground">{org.employees.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm tabular-nums font-medium text-foreground">{org.mrr}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold tabular-nums ${getHealthColor(org.healthScore)}`}>{org.healthScore}</span>
                    <div className="w-12 h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${org.healthScore}%`,
                          background: org.healthScore >= 90 ? 'var(--positive)' : org.healthScore >= 80 ? 'var(--primary)' : org.healthScore >= 70 ? 'var(--warning)' : 'var(--danger)',
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{org.owner}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">{org.lastActive}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="View organization details"
                      onClick={() => toast.info(`Viewing ${org.name}`)}
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Impersonate workspace"
                      onClick={() => toast.info(`Impersonating ${org.name} workspace`)}
                    >
                      <ExternalLink size={13} />
                    </button>
                    <button
                      className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Edit organization"
                      onClick={() => toast.info(`Editing ${org.name}`)}
                    >
                      <Pencil size={13} />
                    </button>
                    <div className="relative">
                      <button
                        className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="More actions"
                        onClick={() => setActionOpen(actionOpen === org.id ? null : org.id)}
                      >
                        <MoreHorizontal size={13} />
                      </button>
                      {actionOpen === org.id && (
                        <div className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-card-elevated z-20 py-1 animate-fade-in">
                          {[
                            { label: 'Manage Billing', icon: Shield },
                            { label: 'View Audit Log', icon: Shield },
                            { label: 'Suspend Org', icon: Shield, danger: false },
                            { label: 'Delete Organization', icon: Trash2, danger: true },
                          ].map((action) => (
                            <button
                              key={`action-${org.id}-${action.label}`}
                              className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-muted/50 transition-colors ${action.danger ? 'text-danger' : 'text-muted-foreground hover:text-foreground'}`}
                              onClick={() => {
                                setActionOpen(null);
                                if (action.danger) {
                                  toast.error(`Delete action requires confirmation`);
                                } else {
                                  toast.info(`${action.label}: ${org.name}`);
                                }
                              }}
                            >
                              <action.icon size={12} />
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Showing {Math.min((page - 1) * perPage + 1, sorted.length)}–{Math.min(page * perPage, sorted.length)} of {sorted.length} organizations
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            suppressHydrationWarning
            className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              suppressHydrationWarning
              className={`w-7 h-7 rounded-lg text-xs transition-colors ${page === p ? 'bg-primary/20 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            suppressHydrationWarning
            className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}