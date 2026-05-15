'use client';

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, Award, Briefcase, Clock, ChevronRight, Shield, Star, Activity } from 'lucide-react';
import { Employee } from '../types/workforce.types';
import { getAvatarGradient, statusColors, getPerformanceTier, performanceTierColors } from '../utils/tableUtils';

interface EmployeeProfileDrawerProps {
  employee: Employee | null;
  onClose: () => void;
}

const MetricBar = memo(({ label, value, color }: { label: string; value: number; color: string }) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-mono text-foreground tabular-nums">{value}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-border overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      />
    </div>
  </div>
));
MetricBar.displayName = 'MetricBar';

const rolePermissionConfig: Record<string, { label: string; color: string }> = {
  admin: { label: 'Admin', color: 'text-danger bg-danger/10' },
  manager: { label: 'Manager', color: 'text-warning bg-warning/10' },
  hr: { label: 'HR', color: 'text-accent bg-accent/10' },
  employee: { label: 'Employee', color: 'text-info bg-info/10' },
  viewer: { label: 'Viewer', color: 'text-muted-foreground bg-muted/50' },
};

export default function EmployeeProfileDrawer({ employee, onClose }: EmployeeProfileDrawerProps) {
  const gradClass = employee
    ? getAvatarGradient(employee.id.charCodeAt(employee.id.length - 1) % 8)
    : 'from-primary to-accent';

  const tier = employee ? getPerformanceTier(employee.performance) : '';
  const permission = employee?.rolePermission ?? 'employee';
  const permConfig = rolePermissionConfig[permission];

  return (
    <AnimatePresence>
      {employee && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-border">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 blob-primary opacity-20" />
              </div>
              <div className="relative flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradClass} flex items-center justify-center text-lg font-bold text-white shrink-0`}
                  >
                    {employee.avatar}
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{employee.name}</h2>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[employee.status]} border-current/20`}>
                        {employee.status}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${performanceTierColors[tier]}`}>
                        <Star size={9} className="inline mr-0.5" />
                        {tier}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${permConfig.color}`}>
                        <Shield size={9} className="inline mr-0.5" />
                        {permConfig.label}
                      </span>
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
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Performance', value: `${employee.performance}%`, color: 'text-primary' },
                  { label: 'Attendance', value: `${employee.attendance}%`, color: 'text-positive' },
                  { label: 'Leave Days', value: String(employee.leaveBalance), color: 'text-accent' },
                  { label: 'Team Score', value: `${employee.teamScore ?? Math.round(employee.performance * 0.9)}`, color: 'text-info' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="rounded-lg bg-muted/30 border border-border p-2.5 text-center"
                  >
                    <p className={`text-base font-bold tabular-nums ${stat.color}`}>{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
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
              </motion.div>

              {/* Employment Details */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Employment Details</h3>
                <div className="rounded-lg border border-border bg-muted/20 divide-y divide-border">
                  {[
                    { label: 'Manager', value: employee.manager, icon: Briefcase },
                    { label: 'Salary', value: employee.salary, icon: Award },
                    { label: 'Shift Type', value: employee.shiftType, icon: Clock },
                    { label: 'Contract', value: employee.contractType ?? 'Full-time', icon: Shield },
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
              </motion.div>

              {/* Skills */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill) => (
                    <span
                      key={`skill-${skill}`}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Active Projects */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Active Projects</h3>
                <div className="space-y-2">
                  {employee.projects.map((project) => (
                    <div
                      key={`proj-${project}`}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/30 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{project}</span>
                      </div>
                      <ChevronRight size={13} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={13} className="text-muted-foreground" />
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Performance Overview</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Overall Performance', value: employee.performance, color: 'bg-primary' },
                    { label: 'Attendance Rate', value: employee.attendance, color: 'bg-positive' },
                    { label: 'Task Completion', value: Math.round(employee.performance * 0.95), color: 'bg-accent' },
                    { label: 'Collaboration Score', value: Math.round(employee.performance * 0.88), color: 'bg-info' },
                    { label: 'Engagement Index', value: employee.engagementScore ?? Math.round(employee.performance * 0.82), color: 'bg-warning' },
                  ].map((metric) => (
                    <MetricBar key={`metric-${metric.label}`} {...metric} />
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-3 pt-2"
              >
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
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
