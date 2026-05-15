'use client';

import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { shiftData } from '../data/workforceData';

const statusConfig: Record<string, { dot: string; badge: string }> = {
  Present: { dot: 'status-dot-positive', badge: 'bg-positive/10 text-positive' },
  Absent: { dot: 'status-dot-danger', badge: 'bg-danger/10 text-danger' },
  Late: { dot: 'status-dot-warning', badge: 'bg-warning/10 text-warning' },
  'Half Day': { dot: 'status-dot-info', badge: 'bg-info/10 text-info' },
};

const shiftColors: Record<string, string> = {
  Morning: 'bg-primary/10 text-primary',
  Evening: 'bg-accent/10 text-accent',
  Night: 'bg-info/10 text-info',
  Flexible: 'bg-muted text-muted-foreground',
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

export default function AttendanceOverview() {
  const present = shiftData.filter(s => s.status === 'Present').length;
  const absent = shiftData.filter(s => s.status === 'Absent').length;
  const late = shiftData.filter(s => s.status === 'Late').length;
  const halfDay = shiftData.filter(s => s.status === 'Half Day').length;
  const attendanceRate = Math.round((present / shiftData.length) * 100);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Attendance Overview</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Today · May 15, 2026</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="status-dot-positive" style={{ width: '6px', height: '6px' }} />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Present', count: present, color: 'text-positive', bg: 'bg-positive/10 border-positive/20' },
            { label: 'Absent', count: absent, color: 'text-danger', bg: 'bg-danger/10 border-danger/20' },
            { label: 'Late', count: late, color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
            { label: 'Half Day', count: halfDay, color: 'text-info', bg: 'bg-info/10 border-info/20' },
          ].map(stat => (
            <div key={`att-stat-${stat.label}`} className={`rounded-lg border ${stat.bg} p-3 text-center`}>
              <p className={`text-xl font-bold tabular-nums ${stat.color}`}>{stat.count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Attendance rate bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Overall attendance rate</span>
            <span className="text-xs font-mono font-bold text-positive tabular-nums">{attendanceRate}%</span>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-positive transition-all duration-700"
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Shift table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest">Employee</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest">Shift</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest">Check In</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest">Check Out</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest">Hours</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody>
            {shiftData.map((entry, idx) => {
              const gradClass = avatarColors[idx % avatarColors.length];
              const initials = entry.employee.split(' ').map(n => n[0]).join('').slice(0, 2);
              return (
                <tr key={entry.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{entry.employee}</p>
                        <p className="text-xs text-muted-foreground">{entry.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${shiftColors[entry.shift]}`}>
                      {entry.shift}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-sm text-foreground">
                      <Clock size={12} className="text-muted-foreground" />
                      {entry.checkIn}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-foreground">{entry.checkOut}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-mono text-foreground tabular-nums">
                      {entry.hours > 0 ? `${entry.hours}h` : '—'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className={statusConfig[entry.status].dot} style={{ width: '6px', height: '6px' }} />
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusConfig[entry.status].badge}`}>
                        {entry.status}
                      </span>
                      {entry.status === 'Late' && <AlertTriangle size={11} className="text-warning" />}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
