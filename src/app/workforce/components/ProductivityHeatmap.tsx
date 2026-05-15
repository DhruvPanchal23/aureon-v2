'use client';

import React from 'react';
import { productivityHeatmapData } from '../data/workforceData';

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
const hourKeys = ['h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13', 'h14', 'h15', 'h16', 'h17', 'h18', 'h19', 'h20'] as const;

function getHeatColor(value: number): string {
  if (value >= 90) return 'rgba(99, 102, 241, 0.9)';
  if (value >= 80) return 'rgba(99, 102, 241, 0.7)';
  if (value >= 70) return 'rgba(99, 102, 241, 0.5)';
  if (value >= 50) return 'rgba(99, 102, 241, 0.35)';
  if (value >= 30) return 'rgba(99, 102, 241, 0.2)';
  if (value >= 15) return 'rgba(99, 102, 241, 0.1)';
  return 'rgba(99, 102, 241, 0.04)';
}

export default function ProductivityHeatmap() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Productivity Heatmap</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Activity intensity by hour · This week</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Low</span>
          <div className="flex items-center gap-0.5">
            {[0.04, 0.1, 0.2, 0.35, 0.5, 0.7, 0.9].map((opacity, i) => (
              <div
                key={`legend-${i}`}
                className="w-4 h-4 rounded-sm"
                style={{ background: `rgba(99, 102, 241, ${opacity})` }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">High</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Hour labels */}
          <div className="flex items-center mb-1 ml-10">
            {hours.map((h, i) => (
              <div key={`hour-label-${i}`} className="w-8 text-center text-xs text-muted-foreground" style={{ fontSize: '10px' }}>
                {h}
              </div>
            ))}
          </div>

          {/* Heatmap rows */}
          {productivityHeatmapData.map((row) => (
            <div key={`heatmap-row-${row.day}`} className="flex items-center gap-0 mb-1">
              <div className="w-10 text-xs text-muted-foreground text-right pr-2 shrink-0">{row.day}</div>
              {hourKeys.map((key) => {
                const value = row[key];
                return (
                  <div
                    key={`cell-${row.day}-${key}`}
                    className="w-8 h-8 rounded-sm mx-0.5 flex items-center justify-center cursor-default transition-all duration-150 hover:scale-110 hover:z-10 relative group"
                    style={{ background: getHeatColor(value) }}
                    title={`${row.day} ${key.replace('h', '')}:00 — ${value}% activity`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                      <div className="bg-card border border-border rounded-lg px-2 py-1 text-xs text-foreground whitespace-nowrap shadow-lg">
                        {value}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Peak hours summary */}
      <div className="mt-4 pt-3 border-t border-border flex items-center gap-6">
        <div>
          <p className="text-xs text-muted-foreground">Peak hours</p>
          <p className="text-sm font-semibold text-foreground mt-0.5">9am – 11am · 2pm – 4pm</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Most productive day</p>
          <p className="text-sm font-semibold text-foreground mt-0.5">Tuesday</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Avg. daily activity</p>
          <p className="text-sm font-semibold text-primary mt-0.5 tabular-nums">78.4%</p>
        </div>
      </div>
    </div>
  );
}
