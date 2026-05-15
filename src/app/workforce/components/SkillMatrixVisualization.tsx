'use client';

import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSkillMatrix } from '../hooks/useWorkforce';
import { SkillMatrixEntry } from '../types/workforce.types';
import { CardSkeleton, ErrorState } from './WorkforceShared';
import { TrendingUp, TrendingDown, AlertCircle, Users } from 'lucide-react';

const demandConfig: Record<string, { color: string; bg: string; dot: string }> = {
  Critical: { color: 'text-danger', bg: 'bg-danger/10 border-danger/20', dot: 'bg-danger' },
  High: { color: 'text-warning', bg: 'bg-warning/10 border-warning/20', dot: 'bg-warning' },
  Medium: { color: 'text-info', bg: 'bg-info/10 border-info/20', dot: 'bg-info' },
  Low: { color: 'text-muted-foreground', bg: 'bg-muted/30 border-border', dot: 'bg-muted-foreground' },
};

const categoryColors: Record<string, string> = {
  Frontend: 'bg-primary/20 text-primary',
  Backend: 'bg-accent/20 text-accent',
  Data: 'bg-info/20 text-info',
  DevOps: 'bg-warning/20 text-warning',
  Design: 'bg-positive/20 text-positive',
  Product: 'bg-accent/20 text-accent',
  Sales: 'bg-warning/20 text-warning',
  Finance: 'bg-positive/20 text-positive',
  Security: 'bg-danger/20 text-danger',
};

const ProficiencyDots = memo(({ value }: { value: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full transition-colors ${
          i <= Math.round(value) ? 'bg-primary' : 'bg-border'
        }`}
      />
    ))}
  </div>
));
ProficiencyDots.displayName = 'ProficiencyDots';

const SkillRow = memo(({ entry, index }: { entry: SkillMatrixEntry; index: number }) => {
  const demand = demandConfig[entry.demand];
  const catColor = categoryColors[entry.category] ?? 'bg-muted/30 text-muted-foreground';
  const hasGap = entry.gap > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0 hover:bg-muted/10 transition-colors group"
    >
      {/* Skill + Category */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground">{entry.skill}</span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${catColor}`}>
            {entry.category}
          </span>
        </div>
        <ProficiencyDots value={entry.avgProficiency} />
      </div>

      {/* Employees */}
      <div className="flex items-center gap-1.5 w-16 shrink-0">
        <Users size={11} className="text-muted-foreground" />
        <span className="text-xs font-mono text-foreground tabular-nums">{entry.employees}</span>
      </div>

      {/* Demand */}
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium w-20 shrink-0 ${demand.bg} ${demand.color}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${demand.dot}`} />
        {entry.demand}
      </div>

      {/* Gap indicator */}
      <div className={`flex items-center gap-1 w-20 shrink-0 text-xs font-medium ${hasGap ? 'text-danger' : 'text-positive'}`}>
        {hasGap ? (
          <>
            <TrendingDown size={11} />
            <span>Gap: {entry.gap}</span>
          </>
        ) : (
          <>
            <TrendingUp size={11} />
            <span>+{Math.abs(entry.gap)}</span>
          </>
        )}
      </div>
    </motion.div>
  );
});
SkillRow.displayName = 'SkillRow';

export default function SkillMatrixVisualization() {
  const { data: matrix, loading, error, refetch } = useSkillMatrix();
  const [filter, setFilter] = React.useState<'All' | 'Critical' | 'High' | 'Gap'>('All');

  const filtered = React.useMemo(() => {
    if (!matrix) return [];
    if (filter === 'Critical') return matrix.filter(e => e.demand === 'Critical');
    if (filter === 'High') return matrix.filter(e => e.demand === 'High');
    if (filter === 'Gap') return matrix.filter(e => e.gap > 0);
    return matrix;
  }, [matrix, filter]);

  const criticalCount = matrix?.filter(e => e.demand === 'Critical').length ?? 0;
  const gapCount = matrix?.filter(e => e.gap > 0).length ?? 0;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">Skill Matrix</h3>
              {criticalCount > 0 && (
                <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-danger/10 text-danger">
                  <AlertCircle size={10} />
                  {criticalCount} critical gaps
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {matrix?.length ?? 0} skills tracked · {gapCount} with active gaps
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {(['All', 'Critical', 'High', 'Gap'] as const).map(f => (
            <button
              key={f}
              suppressHydrationWarning
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-primary/15 text-primary border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Column Headers */}
      <div className="flex items-center gap-4 px-5 py-2 border-b border-border bg-muted/20">
        <div className="flex-1 text-xs font-medium text-muted-foreground uppercase tracking-widest">Skill</div>
        <div className="w-16 text-xs font-medium text-muted-foreground uppercase tracking-widest">Staff</div>
        <div className="w-20 text-xs font-medium text-muted-foreground uppercase tracking-widest">Demand</div>
        <div className="w-20 text-xs font-medium text-muted-foreground uppercase tracking-widest">Gap</div>
      </div>

      <div>
        {loading ? (
          <CardSkeleton lines={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          filtered.map((entry, i) => (
            <SkillRow key={entry.skill} entry={entry} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
