'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';

interface OrgNode {
  id: string;
  name: string;
  role: string;
  dept: string;
  avatar: string;
  reports?: OrgNode[];
  gradient: string;
}

const orgTree: OrgNode = {
  id: 'ceo',
  name: 'Marcus Aldridge',
  role: 'CEO',
  dept: 'Executive',
  avatar: 'MA',
  gradient: 'from-primary to-accent',
  reports: [
    {
      id: 'vp-eng',
      name: 'Priya Sharma',
      role: 'VP Engineering',
      dept: 'Engineering',
      avatar: 'PS',
      gradient: 'from-info to-primary',
      reports: [
        { id: 'se-1', name: 'Yuki Tanaka', role: 'Senior Engineer', dept: 'Engineering', avatar: 'YT', gradient: 'from-positive to-info' },
        { id: 'se-2', name: 'James Calloway', role: 'Security Engineer', dept: 'Engineering', avatar: 'JC', gradient: 'from-warning to-positive' },
        { id: 'fe-1', name: 'Sofia Reyes', role: 'Frontend Engineer', dept: 'Engineering', avatar: 'SR', gradient: 'from-accent to-danger' },
      ],
    },
    {
      id: 'head-prod',
      name: 'Tariq Al-Hassan',
      role: 'Head of Product',
      dept: 'Product',
      avatar: 'TA',
      gradient: 'from-accent to-primary',
      reports: [
        { id: 'ds-1', name: 'Noah Berntsen', role: 'Data Scientist', dept: 'Analytics', avatar: 'NB', gradient: 'from-info to-accent' },
      ],
    },
    {
      id: 'cfo',
      name: 'Claire Okonkwo',
      role: 'CFO',
      dept: 'Finance',
      avatar: 'CO',
      gradient: 'from-positive to-info',
      reports: [],
    },
    {
      id: 'hr-bp',
      name: 'Amara Diallo',
      role: 'HR Business Partner',
      dept: 'Human Resources',
      avatar: 'AD',
      gradient: 'from-warning to-positive',
      reports: [],
    },
    {
      id: 'sales-dir',
      name: 'Dmitri Volkov',
      role: 'Sales Director',
      dept: 'Sales',
      avatar: 'DV',
      gradient: 'from-danger to-warning',
      reports: [
        { id: 'mkt-1', name: 'Kwame Asante', role: 'Marketing Manager', dept: 'Marketing', avatar: 'KA', gradient: 'from-primary to-danger' },
      ],
    },
  ],
};

interface OrgNodeCardProps {
  node: OrgNode;
  depth: number;
}

function OrgNodeCard({ node, depth }: OrgNodeCardProps) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasReports = node.reports && node.reports.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div
        className={`relative rounded-xl border border-border bg-card p-3 w-36 text-center card-hover cursor-pointer transition-all duration-200 ${
          depth === 0 ? 'border-primary/30 bg-primary/5 w-44' : ''
        }`}
        onClick={() => hasReports && setExpanded(!expanded)}
      >
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${node.gradient} flex items-center justify-center text-sm font-bold text-white mx-auto mb-2`}>
          {node.avatar}
        </div>
        <p className={`font-semibold text-foreground leading-tight ${depth === 0 ? 'text-sm' : 'text-xs'}`}>{node.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{node.role}</p>
        <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground mt-1.5 inline-block">
          {node.dept}
        </span>
        {hasReports && (
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center">
            {expanded
              ? <ChevronDown size={10} className="text-primary" />
              : <ChevronRight size={10} className="text-muted-foreground" />
            }
          </div>
        )}
      </div>

      {/* Children */}
      {hasReports && expanded && (
        <div className="mt-6 flex items-start gap-4 relative">
          {/* Connector line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-border -translate-y-4" />
          {/* Horizontal line spanning children */}
          {node.reports!.length > 1 && (
            <div
              className="absolute top-0 h-px bg-border"
              style={{
                left: `calc(${100 / (node.reports!.length * 2)}%)`,
                right: `calc(${100 / (node.reports!.length * 2)}%)`,
              }}
            />
          )}
          {node.reports!.map((child) => (
            <div key={child.id} className="flex flex-col items-center relative">
              <div className="w-px h-4 bg-border mb-0" />
              <OrgNodeCard node={child} depth={depth + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgChartVisualization() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Organization Chart</h3>
          <p className="text-xs text-muted-foreground mt-0.5">NovaTech Corp · Interactive hierarchy</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={13} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">1,579 total</span>
        </div>
      </div>
      <div className="p-6 overflow-x-auto">
        <div className="flex justify-center min-w-max">
          <OrgNodeCard node={orgTree} depth={0} />
        </div>
      </div>
    </div>
  );
}
