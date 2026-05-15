// ============================================================
// Workforce Module — Typed Interfaces
// Backend integration point: Replace mock data with /api/workforce/* endpoints
// ============================================================

export type EmployeeStatus = 'Active' | 'On Leave' | 'Remote' | 'Offboarding' | 'Probation' | 'Suspended';
export type ShiftType = 'Morning' | 'Evening' | 'Night' | 'Flexible';
export type PerformanceTier = 'Exceptional' | 'High' | 'Meets Expectations' | 'Needs Improvement' | 'PIP';
export type RolePermission = 'admin' | 'manager' | 'hr' | 'employee' | 'viewer';
export type HiringStage = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
export type LeaveType = 'Annual' | 'Sick' | 'Maternity' | 'Paternity' | 'Emergency' | 'Unpaid' | 'Comp Off';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Half Day' | 'WFH';
export type AnomalyType = 'late_pattern' | 'absence_spike' | 'overtime_risk' | 'leave_clustering' | 'low_engagement';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  branch: string;
  email: string;
  phone: string;
  avatar: string;
  status: EmployeeStatus;
  joinDate: string;
  manager: string;
  salary: string;
  performance: number;
  attendance: number;
  skills: string[];
  projects: string[];
  leaveBalance: number;
  shiftType: ShiftType;
  // Enhanced fields
  performanceTier?: PerformanceTier;
  rolePermission?: RolePermission;
  teamScore?: number;
  engagementScore?: number;
  lastActive?: string;
  timezone?: string;
  employeeNumber?: string;
  contractType?: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
}

export interface Department {
  id: string;
  name: string;
  head: string;
  headAvatar: string;
  employees: number;
  budget: string;
  utilization: number;
  openRoles: number;
  color: string;
  // Enhanced fields
  efficiencyScore?: number;
  avgPerformance?: number;
  turnoverRisk?: 'Low' | 'Medium' | 'High';
  recentHires?: number;
  budgetUsed?: number;
}

export interface HiringCandidate {
  id: string;
  name: string;
  role: string;
  department: string;
  stage: HiringStage;
  appliedDate: string;
  source: string;
  score: number;
  avatar: string;
}

export interface OnboardingTask {
  id: string;
  employee: string;
  task: string;
  category: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  assignedTo: string;
}

export interface LeaveRequest {
  id: string;
  employee: string;
  department: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  avatar: string;
}

export interface ShiftEntry {
  id: string;
  employee: string;
  department: string;
  shift: ShiftType;
  date: string;
  checkIn: string;
  checkOut: string;
  hours: number;
  status: AttendanceStatus;
}

export interface WorkforceKPI {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDir: 'up' | 'down' | 'warning' | 'neutral';
  icon: string;
  color: string;
  subtext: string;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'positive' | 'info' | 'danger';
  title: string;
  summary: string;
  action: string;
  confidence: number;
}

export interface ActivityEvent {
  id: string;
  type: 'hire' | 'leave' | 'promotion' | 'offboard' | 'alert' | 'review' | 'transfer';
  actor: string;
  actorAvatar: string;
  subject: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface AttendanceAnomaly {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  type: AnomalyType;
  severity: 'low' | 'medium' | 'high';
  description: string;
  detectedAt: string;
  pattern?: string;
}

export interface SkillMatrixEntry {
  skill: string;
  category: string;
  employees: number;
  avgProficiency: number; // 1-5
  demand: 'Low' | 'Medium' | 'High' | 'Critical';
  gap: number; // negative = surplus, positive = gap
}

export interface TeamPerformanceScore {
  departmentId: string;
  departmentName: string;
  overallScore: number;
  velocityScore: number;
  collaborationScore: number;
  retentionScore: number;
  growthScore: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

// ============================================================
// API Response Wrappers (for future Supabase integration)
// ============================================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface WorkforceFilters {
  search: string;
  department: string;
  status: string;
  branch: string;
  shiftType: string;
  performanceTier: string;
  sortKey: string;
  sortDir: 'asc' | 'desc';
  page: number;
  perPage: number;
}

export interface BulkAction {
  type: 'export' | 'message' | 'assign_shift' | 'approve_leave' | 'update_status' | 'archive';
  label: string;
  icon: string;
  destructive?: boolean;
}

export interface QuickCreateEmployeeForm {
  name: string;
  role: string;
  department: string;
  branch: string;
  email: string;
  shiftType: ShiftType;
  contractType: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
  startDate: string;
  manager: string;
}
