'use client';

import React, { useState } from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import { hiringCandidates } from '../data/workforceData';

const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'] as const;

const stageColors: Record<string, { bg: string; text: string; border: string }> = {
  Applied: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' },
  Screening: { bg: 'bg-info/10', text: 'text-info', border: 'border-info/20' },
  Interview: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
  Offer: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20' },
  Hired: { bg: 'bg-positive/10', text: 'text-positive', border: 'border-positive/20' },
  Rejected: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20' },
};

const avatarColors = [
  'from-primary to-accent',
  'from-info to-primary',
  'from-positive to-info',
  'from-warning to-positive',
  'from-accent to-danger',
  'from-danger to-warning',
  'from-primary to-info',
  'from-accent to-positive',
];

function ScoreBar({ score }: { score: number }) {
  const color = score >= 90 ? 'bg-positive' : score >= 80 ? 'bg-primary' : score >= 70 ? 'bg-warning' : 'bg-danger';
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1.5 rounded-full bg-border overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-mono text-foreground tabular-nums">{score}</span>
    </div>
  );
}

export default function HiringPipeline() {
  const [activeStage, setActiveStage] = useState<string>('All');

  const filtered = activeStage === 'All'
    ? hiringCandidates
    : hiringCandidates.filter(c => c.stage === activeStage);

  const stageCounts = stages.reduce((acc, s) => {
    acc[s] = hiringCandidates.filter(c => c.stage === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Hiring Pipeline</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{hiringCandidates.length} candidates · {stageCounts['Offer'] || 0} offers pending</p>
          </div>
          <button
            suppressHydrationWarning
            className="px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            + Post Job
          </button>
        </div>

        {/* Pipeline stage funnel */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          <button
            suppressHydrationWarning
            onClick={() => setActiveStage('All')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeStage === 'All' ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            All ({hiringCandidates.length})
          </button>
          {stages.map(stage => {
            const colors = stageColors[stage];
            return (
              <button
                key={`stage-btn-${stage}`}
                suppressHydrationWarning
                onClick={() => setActiveStage(stage)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  activeStage === stage
                    ? `${colors.bg} ${colors.text} ${colors.border}`
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {stage}
                {stageCounts[stage] > 0 && (
                  <span className={`text-xs px-1 rounded ${activeStage === stage ? colors.bg : 'bg-muted'}`}>
                    {stageCounts[stage]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Candidates list */}
      <div className="divide-y divide-border">
        {filtered.map((candidate, idx) => {
          const colors = stageColors[candidate.stage];
          const gradClass = avatarColors[idx % avatarColors.length];
          return (
            <div key={candidate.id} className="px-5 py-4 hover:bg-muted/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {candidate.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{candidate.name}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                      {candidate.stage}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{candidate.role}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{candidate.department}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={10} />
                      {candidate.appliedDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <ScoreBar score={candidate.score} />
                  <span className="text-xs text-muted-foreground hidden sm:block">{candidate.source}</span>
                  <ChevronRight size={13} className="text-muted-foreground" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
