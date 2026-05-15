// ============================================================
// Workforce Table Utilities
// ============================================================

import { Employee } from '../types/workforce.types';

export type SortKey = keyof Pick<Employee, 'name' | 'department' | 'role' | 'performance' | 'attendance' | 'status'>;

export function sortEmployees(employees: Employee[], key: SortKey, dir: 'asc' | 'desc'): Employee[] {
  return [...employees].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === 'number' && typeof bv === 'number') {
      return dir === 'asc' ? av - bv : bv - av;
    }
    return dir === 'asc'
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });
}

export function paginateArray<T>(arr: T[], page: number, perPage: number): { items: T[]; totalPages: number; total: number } {
  const total = arr.length;
  const totalPages = Math.ceil(total / perPage);
  const items = arr.slice((page - 1) * perPage, page * perPage);
  return { items, totalPages, total };
}

export function getSmartPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [];
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }
  return pages;
}

export const avatarGradients = [
  'from-primary to-accent',
  'from-info to-primary',
  'from-positive to-info',
  'from-warning to-positive',
  'from-accent to-danger',
  'from-danger to-warning',
  'from-primary to-info',
  'from-accent to-positive',
];

export function getAvatarGradient(index: number): string {
  return avatarGradients[index % avatarGradients.length];
}

export const statusColors: Record<string, string> = {
  Active: 'bg-positive/10 text-positive',
  'On Leave': 'bg-warning/10 text-warning',
  Remote: 'bg-info/10 text-info',
  Offboarding: 'bg-danger/10 text-danger',
  Probation: 'bg-accent/10 text-accent',
  Suspended: 'bg-danger/20 text-danger',
};

export const statusDotColors: Record<string, string> = {
  Active: 'bg-positive',
  'On Leave': 'bg-warning',
  Remote: 'bg-info',
  Offboarding: 'bg-danger',
  Probation: 'bg-accent',
  Suspended: 'bg-danger',
};

export const performanceTierColors: Record<string, string> = {
  Exceptional: 'text-positive bg-positive/10',
  High: 'text-primary bg-primary/10',
  'Meets Expectations': 'text-info bg-info/10',
  'Needs Improvement': 'text-warning bg-warning/10',
  PIP: 'text-danger bg-danger/10',
};

export function getPerformanceTier(score: number): string {
  if (score >= 95) return 'Exceptional';
  if (score >= 85) return 'High';
  if (score >= 70) return 'Meets Expectations';
  if (score >= 55) return 'Needs Improvement';
  return 'PIP';
}

export function formatRelativeTime(isoString: string): string {
  const now = new Date('2026-05-15T10:00:00Z');
  const then = new Date(isoString);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}
