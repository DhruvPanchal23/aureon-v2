// ============================================================
// Workforce Hooks — Reusable data access layer
// Backend integration point: Replace service calls with Supabase hooks
// ============================================================

'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Employee,
  Department,
  ActivityEvent,
  AttendanceAnomaly,
  SkillMatrixEntry,
  TeamPerformanceScore,
  WorkforceFilters,
  ApiResponse,
  PaginatedResponse,
} from '../types/workforce.types';
import {
  employeeService,
  departmentService,
  attendanceService,
  analyticsService,
  activityService,
} from '../services/workforceService';

// ============================================================
// Generic async hook
// ============================================================

function useAsync<T>(
  asyncFn: () => Promise<ApiResponse<T>>,
  deps: unknown[] = []
): { data: T | null; loading: boolean; error: string | null; refetch: () => void } {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: string | null }>({
    data: null,
    loading: true,
    error: null,
  });
  const mountedRef = useRef(true);

  const execute = useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }));
    const result = await asyncFn();
    if (mountedRef.current) {
      setState({ data: result.data, loading: result.loading, error: result.error });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    execute();
    return () => { mountedRef.current = false; };
  }, [execute]);

  return { ...state, refetch: execute };
}

// ============================================================
// Employee Hooks
// ============================================================

export function useEmployees(filters?: Partial<WorkforceFilters>) {
  const filterKey = JSON.stringify(filters);
  return useAsync<PaginatedResponse<Employee>>(
    () => employeeService.getAll(filters),
    [filterKey]
  );
}

export function useEmployee(id: string | null) {
  return useAsync<Employee>(
    () => id ? employeeService.getById(id) : Promise.resolve({ data: null, error: null, loading: false }),
    [id]
  );
}

// ============================================================
// Department Hooks
// ============================================================

export function useDepartments() {
  return useAsync<Department[]>(() => departmentService.getAll(), []);
}

export function useTeamPerformance() {
  return useAsync<TeamPerformanceScore[]>(() => departmentService.getEfficiencyScores(), []);
}

// ============================================================
// Attendance Hooks
// ============================================================

export function useAttendanceAnomalies() {
  return useAsync<AttendanceAnomaly[]>(() => attendanceService.getAnomalies(), []);
}

// ============================================================
// Analytics Hooks
// ============================================================

export function useSkillMatrix() {
  return useAsync<SkillMatrixEntry[]>(() => analyticsService.getSkillMatrix(), []);
}

export function useAISummary() {
  return useAsync<string>(() => analyticsService.getAISummary(), []);
}

// ============================================================
// Activity Timeline Hook
// ============================================================

export function useActivityTimeline() {
  return useAsync<ActivityEvent[]>(() => activityService.getTimeline(), []);
}

// ============================================================
// Workforce Filter Hook
// ============================================================

export function useWorkforceFilters(initial?: Partial<WorkforceFilters>) {
  const [filters, setFilters] = useState<WorkforceFilters>({
    search: '',
    department: 'All',
    status: 'All',
    branch: 'All',
    shiftType: 'All',
    performanceTier: 'All',
    sortKey: 'name',
    sortDir: 'asc',
    page: 1,
    perPage: 8,
    ...initial,
  });

  const updateFilter = useCallback(<K extends keyof WorkforceFilters>(key: K, value: WorkforceFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value, page: key !== 'page' ? 1 : (value as number) }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      department: 'All',
      status: 'All',
      branch: 'All',
      shiftType: 'All',
      performanceTier: 'All',
      sortKey: 'name',
      sortDir: 'asc',
      page: 1,
      perPage: 8,
    });
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.department !== 'All') count++;
    if (filters.status !== 'All') count++;
    if (filters.branch !== 'All') count++;
    if (filters.shiftType !== 'All') count++;
    return count;
  }, [filters]);

  return { filters, updateFilter, resetFilters, activeFilterCount };
}

// ============================================================
// Bulk Selection Hook
// ============================================================

export function useBulkSelection<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelectedIds(prev => {
      if (prev.size === items.length) return new Set();
      return new Set(items.map(i => i.id));
    });
  }, [items]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);

  const selectedItems = useMemo(
    () => items.filter(i => selectedIds.has(i.id)),
    [items, selectedIds]
  );

  const isAllSelected = items.length > 0 && selectedIds.size === items.length;
  const isPartialSelected = selectedIds.size > 0 && selectedIds.size < items.length;

  return {
    selectedIds,
    selectedItems,
    selectedCount: selectedIds.size,
    isSelected,
    isAllSelected,
    isPartialSelected,
    toggleItem,
    toggleAll,
    clearSelection,
  };
}

// ============================================================
// Optimistic Update Hook
// ============================================================

export function useOptimisticUpdate<T>(initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [isPending, setIsPending] = useState(false);

  const optimisticUpdate = useCallback(async (
    optimisticValue: T,
    asyncFn: () => Promise<T>
  ) => {
    const previousData = data;
    setData(optimisticValue);
    setIsPending(true);
    try {
      const result = await asyncFn();
      setData(result);
    } catch {
      setData(previousData); // Rollback on error
    } finally {
      setIsPending(false);
    }
  }, [data]);

  return { data, setData, isPending, optimisticUpdate };
}

// ============================================================
// Keyboard Shortcut Hook
// ============================================================

export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = [
        e.metaKey || e.ctrlKey ? 'cmd' : '',
        e.shiftKey ? 'shift' : '',
        e.altKey ? 'alt' : '',
        e.key.toLowerCase(),
      ].filter(Boolean).join('+');

      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcuts]);
}
