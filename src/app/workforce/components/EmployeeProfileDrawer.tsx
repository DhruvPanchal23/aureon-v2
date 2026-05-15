'use client';

import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, Award, Briefcase, Clock, ChevronRight } from 'lucide-react';
import { Employee } from '../data/workforceData';

const statusColors: Record<string, string> = {
  Active: 'bg-positive/10 text-positive border-positive/20',
  'On Leave': 'bg-warning/10 text-warning border-warning/20',
  Remote: 'bg-info/10 text-info border-info/20',
  Offboarding: 'bg-danger/10 text-danger border-danger/20',
};

const avatarColors = [
  'from-primary to-accent',
  'from-info to-primary',
  'from-positive to-info',
  'from-warning to-positive',
  'from-accent to-danger',
];

interface EmployeeProfileDrawerProps {
  employee: Employee | null;
  onClose: () => void;
}

export default function EmployeeProfileDrawer({ employee, onClose }: EmployeeProfileDrawerProps) {
  if (!employee) return null;

  const gradClass = avatarColors[employee.id.charCodeAt(employee.id.length - 1) % avatarColors.length];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative p-6 border-b border-border">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 blob-primary opacity-20" />
          </div>
          <div className="relative flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradClass} flex items-center justify-center text-lg font-bold text-white shrink-0`}>
                {employee.avatar}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{employee.name}</h2>
                <p className="text-sm text-muted-foreground">{employee.role}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[employee.status]}`}>
                    {employee.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{employee.department}</span>
                </div>
              </div>
            </div>
            <button
              suppressHydrationWarning
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/30 border border-border p-3 text-center">
              <p className="text-lg font-bold text-primary tabular-nums">{employee.performance}%</p>
              <p className="text-xs text-muted-foreground mt-0.5">Performance</p>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-3 text-center">
              <p className="text-lg font-bold text-positive tabular-nums">{employee.attendance}%</p>
              <p className="text-xs text-muted-foreground mt-0.5">Attendance</p>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-3 text-center">
              <p className="text-lg font-bold text-accent tabular-nums">{employee.leaveBalance}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Leave Days</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Contact Information</h3>
            <div className="space-y-2.5">
              {[
                { icon: Mail, label: employee.email },
                { icon: Phone, label: employee.phone },
                { icon: MapPin, label: employee.branch },
                { icon: Calendar, label: `Joined ${employee.joinDate}` },
              ].map((item, i) => {
                const IconComp = item.icon;
                return (
                  <div key={`contact-${i}`} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground shrink-0">
                      <IconComp size={13} />
                    </div>
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Employment Details */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Employment Details</h3>
            <div className="rounded-lg border border-border bg-muted/20 divide-y divide-border">
              {[
                { label: 'Manager', value: employee.manager, icon: Briefcase },
                { label: 'Salary', value: employee.salary, icon: Award },
                { label: 'Shift Type', value: employee.shiftType, icon: Clock },
              ].map((item, i) => {
                const IconComp = item.icon;
                return (
                  <div key={`detail-${i}`} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IconComp size={13} />
                      <span className="text-xs">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill) => (
                <span
                  key={`skill-${skill}`}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Active Projects</h3>
            <div className="space-y-2">
              {employee.projects.map((project) => (
                <div
                  key={`proj-${project}`}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">{project}</span>
                  </div>
                  <ChevronRight size={13} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Performance bar */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Performance Overview</h3>
            <div className="space-y-3">
              {[
                { label: 'Overall Performance', value: employee.performance, color: 'bg-primary' },
                { label: 'Attendance Rate', value: employee.attendance, color: 'bg-positive' },
                { label: 'Task Completion', value: Math.round(employee.performance * 0.95), color: 'bg-accent' },
                { label: 'Collaboration Score', value: Math.round(employee.performance * 0.88), color: 'bg-info' },
              ].map((metric) => (
                <div key={`metric-${metric.label}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                    <span className="text-xs font-mono text-foreground tabular-nums">{metric.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className={`h-full rounded-full ${metric.color} transition-all duration-700`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              suppressHydrationWarning
              className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            >
              Send Message
            </button>
            <button
              suppressHydrationWarning
              className="flex-1 px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
