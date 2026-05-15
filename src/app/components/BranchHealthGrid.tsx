'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Backend integration point: fetch branch health scores from /api/branches/health
const branches = [
  { id: 'branch-nyc', name: 'New York HQ', code: 'NYC', score: 91, employees: 387, trend: 'up', delta: '+2.1' },
  { id: 'branch-lon', name: 'London', code: 'LON', score: 87, employees: 214, trend: 'up', delta: '+0.8' },
  { id: 'branch-sfo', name: 'San Francisco', code: 'SFO', score: 84, employees: 198, trend: 'down', delta: '-1.4' },
  { id: 'branch-sgp', name: 'Singapore', code: 'SGP', score: 89, employees: 156, trend: 'up', delta: '+3.2' },
  { id: 'branch-ber', name: 'Berlin', code: 'BER', score: 76, employees: 121, trend: 'down', delta: '-4.1' },
  { id: 'branch-dub', name: 'Dubai', code: 'DUB', score: 82, employees: 93, trend: 'flat', delta: '0.0' },
  { id: 'branch-tok', name: 'Tokyo', code: 'TOK', score: 78, employees: 88, trend: 'down', delta: '-2.7' },
  { id: 'branch-syd', name: 'Sydney', code: 'SYD', score: 85, employees: 74, trend: 'up', delta: '+1.3' },
];

function getScoreColor(score: number) {
  if (score >= 90) return { bg: 'bg-positive/10', text: 'text-positive', border: 'border-positive/20' };
  if (score >= 85) return { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' };
  if (score >= 80) return { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20' };
  if (score >= 75) return { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' };
  return { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20' };
}

export default function BranchHealthGrid() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Branch Health Scores</h3>
          <p className="text-xs text-muted-foreground mt-0.5">14 branches · composite score</p>
        </div>
        <button className="text-xs text-primary hover:text-accent transition-colors">
          View all branches →
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {branches.map((branch) => {
          const colors = getScoreColor(branch.score);
          const isHovered = hovered === branch.id;
          return (
            <div
              key={branch.id}
              className={`rounded-lg border ${colors.border} ${colors.bg} p-3 cursor-pointer transition-all duration-200 ${isHovered ? 'scale-105' : ''}`}
              onMouseEnter={() => setHovered(branch.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-muted-foreground">{branch.code}</span>
                {branch.trend === 'up' && <TrendingUp size={10} className="text-positive" />}
                {branch.trend === 'down' && <TrendingDown size={10} className="text-danger" />}
                {branch.trend === 'flat' && <Minus size={10} className="text-muted-foreground" />}
              </div>
              <div className={`text-2xl font-bold tabular-nums ${colors.text}`}>{branch.score}</div>
              <div className="mt-1">
                <p className="text-xs text-muted-foreground truncate">{branch.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{branch.employees} emp</p>
                  <span className={`text-xs font-mono ${branch.trend === 'up' ? 'text-positive' : branch.trend === 'down' ? 'text-danger' : 'text-muted-foreground'}`}>
                    {branch.delta}
                  </span>
                </div>
              </div>
              {/* Score bar */}
              <div className="mt-2 h-1 rounded-full bg-border overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors.text.replace('text-', 'bg-')}`}
                  style={{ width: `${branch.score}%`, background: `currentColor` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}