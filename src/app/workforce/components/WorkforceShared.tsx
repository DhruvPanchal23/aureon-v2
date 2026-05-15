'use client';

import React, { memo } from 'react';
import { SkeletonLine, SkeletonBox } from '@/app/workforce/components/WorkforceShared';


// ============================================================
// Skeleton Loader Components
// ============================================================

export const SkeletonLine = memo(({ width = 'w-full', height = 'h-3' }: { width?: string; height?: string }) => (
  <div className={`${width} ${height} rounded-full bg-muted/60 animate-pulse`} />
));
SkeletonLine.displayName = 'SkeletonLine';

export const SkeletonBox = memo(({ className = '' }: { className?: string }) => (
  <div className={`rounded-lg bg-muted/60 animate-pulse ${className}`} />
));
SkeletonBox.displayName = 'SkeletonBox';

export const KPICardSkeleton = memo(() => (
  <div className="rounded-xl border border-border bg-card p-4 space-y-3">
    <div className="flex items-center justify-between">
      <SkeletonLine width="w-20" height="h-2.5" />
      <SkeletonBox className="w-7 h-7" />
    </div>
    <SkeletonLine width="w-16" height="h-7" />
    <SkeletonLine width="w-24" height="h-4" />
    <SkeletonLine width="w-32" height="h-2.5" />
  </div>
));
KPICardSkeleton.displayName = 'KPICardSkeleton';

export const TableRowSkeleton = memo(({ cols = 7 }: { cols?: number }) => (
  <tr className="border-b border-border">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={`skel-td-${i}`} className="px-5 py-4">
        {i === 0 ? (
          <div className="flex items-center gap-3">
            <SkeletonBox className="w-8 h-8 rounded-full" />
            <div className="space-y-1.5">
              <SkeletonLine width="w-28" height="h-3" />
              <SkeletonLine width="w-36" height="h-2.5" />
            </div>
          </div>
        ) : (
          <SkeletonLine width="w-20" height="h-3" />
        )}
      </td>
    ))}
  </tr>
));
TableRowSkeleton.displayName = 'TableRowSkeleton';

export const CardSkeleton = memo(({ lines = 4 }: { lines?: number }) => (
  <div className="rounded-xl border border-border bg-card p-5 space-y-3">
    <div className="flex items-center justify-between mb-4">
      <SkeletonLine width="w-32" height="h-4" />
      <SkeletonBox className="w-20 h-7 rounded-lg" />
    </div>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={`card-skel-${i}`} className="flex items-center gap-3 py-2">
        <SkeletonBox className="w-8 h-8 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <SkeletonLine width="w-3/4" height="h-3" />
          <SkeletonLine width="w-1/2" height="h-2.5" />
        </div>
        <SkeletonLine width="w-16" height="h-3" />
      </div>
    ))}
  </div>
));
CardSkeleton.displayName = 'CardSkeleton';

// ============================================================
// Empty State Component
// ============================================================

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState = memo(({ icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground mb-4">
      {icon}
    </div>
    <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground max-w-xs mb-4">{description}</p>
    {action && (
      <button
        suppressHydrationWarning
        onClick={action.onClick}
        className="px-4 py-2 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 active:scale-95 transition-all"
      >
        {action.label}
      </button>
    )}
  </div>
));
EmptyState.displayName = 'EmptyState';

// ============================================================
// Error State Component
// ============================================================

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = memo(({ message = 'Something went wrong', onRetry }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
    <div className="w-12 h-12 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger mb-3">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    <p className="text-sm font-medium text-foreground mb-1">Failed to load</p>
    <p className="text-xs text-muted-foreground mb-4">{message}</p>
    {onRetry && (
      <button
        suppressHydrationWarning
        onClick={onRetry}
        className="px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
      >
        Try again
      </button>
    )}
  </div>
));
ErrorState.displayName = 'ErrorState';

// ============================================================
// Contextual Toast Helpers (uses sonner)
// ============================================================

export const workforceToasts = {
  employeeCreated: (name: string) => ({
    message: `${name} added to workforce`,
    description: 'Onboarding workflow initiated automatically',
  }),
  employeeUpdated: (name: string) => ({
    message: `${name}'s profile updated`,description: 'Changes saved successfully',
  }),
  leaveApproved: (name: string) => ({
    message: `Leave approved for ${name}`,
    description: 'Employee has been notified via email',
  }),
  leaveRejected: (name: string) => ({
    message: `Leave request rejected`,
    description: `${name} has been notified`,
  }),
  bulkAction: (count: number, action: string) => ({
    message: `${action} applied to ${count} employee${count > 1 ? 's' : ''}`,
    description: 'Changes will reflect in 30 seconds',
  }),
  exportStarted: () => ({
    message: 'Export started',description: 'Your file will be ready in a moment',
  }),
  anomalyDismissed: () => ({
    message: 'Anomaly dismissed',description: 'AI will continue monitoring this pattern',
  }),
};
