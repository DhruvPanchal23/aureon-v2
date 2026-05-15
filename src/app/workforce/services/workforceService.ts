// ============================================================
// Workforce Service Layer
// Backend integration point: Replace mock implementations with
// actual Supabase queries or REST API calls
// ============================================================

import {
  Employee,
  Department,
  HiringCandidate,
  LeaveRequest,
  ShiftEntry,
  ActivityEvent,
  AttendanceAnomaly,
  SkillMatrixEntry,
  TeamPerformanceScore,
  WorkforceFilters,
  PaginatedResponse,
  ApiResponse,
} from '../types/workforce.types';

import {
  employees as mockEmployees,
  departments as mockDepartments,
  hiringCandidates as mockCandidates,
  leaveRequests as mockLeaves,
  shiftData as mockShifts,
} from '../data/workforceData';

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================
// Employee Service
// ============================================================

export const employeeService = {
  async getAll(filters?: Partial<WorkforceFilters>): Promise<ApiResponse<PaginatedResponse<Employee>>> {
    await delay(400);
    // Backend integration point: supabase.from('employees').select('*').match(filters)
    try {
      let data = [...mockEmployees];
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        data = data.filter(e =>
          e.name.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q)
        );
      }
      if (filters?.department && filters.department !== 'All') {
        data = data.filter(e => e.department === filters.department);
      }
      if (filters?.status && filters.status !== 'All') {
        data = data.filter(e => e.status === filters.status);
      }
      const page = filters?.page ?? 1;
      const perPage = filters?.perPage ?? 8;
      const total = data.length;
      const paginated = data.slice((page - 1) * perPage, page * perPage);
      return {
        data: { data: paginated, total, page, perPage, totalPages: Math.ceil(total / perPage) },
        error: null,
        loading: false,
      };
    } catch {
      return { data: null, error: 'Failed to fetch employees', loading: false };
    }
  },

  async getById(id: string): Promise<ApiResponse<Employee>> {
    await delay(200);
    // Backend integration point: supabase.from('employees').select('*').eq('id', id).single()
    const emp = mockEmployees.find(e => e.id === id);
    if (!emp) return { data: null, error: 'Employee not found', loading: false };
    return { data: emp, error: null, loading: false };
  },

  async create(data: Partial<Employee>): Promise<ApiResponse<Employee>> {
    await delay(600);
    // Backend integration point: supabase.from('employees').insert(data).select().single()
    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      name: data.name ?? '',
      role: data.role ?? '',
      department: data.department ?? '',
      branch: data.branch ?? '',
      email: data.email ?? '',
      phone: '',
      avatar: (data.name ?? 'NA').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      status: 'Active',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      manager: data.manager ?? '',
      salary: '$0',
      performance: 0,
      attendance: 100,
      skills: [],
      projects: [],
      leaveBalance: 20,
      shiftType: data.shiftType ?? 'Flexible',
    };
    return { data: newEmp, error: null, loading: false };
  },

  async update(id: string, updates: Partial<Employee>): Promise<ApiResponse<Employee>> {
    await delay(300);
    // Backend integration point: supabase.from('employees').update(updates).eq('id', id).select().single()
    const emp = mockEmployees.find(e => e.id === id);
    if (!emp) return { data: null, error: 'Employee not found', loading: false };
    return { data: { ...emp, ...updates }, error: null, loading: false };
  },

  async bulkUpdate(ids: string[], updates: Partial<Employee>): Promise<ApiResponse<{ updated: number }>> {
    await delay(500);
    // Backend integration point: supabase.from('employees').update(updates).in('id', ids)
    return { data: { updated: ids.length }, error: null, loading: false };
  },
};

// ============================================================
// Department Service
// ============================================================

export const departmentService = {
  async getAll(): Promise<ApiResponse<Department[]>> {
    await delay(300);
    // Backend integration point: supabase.from('departments').select('*, employees(count)')
    return { data: mockDepartments, error: null, loading: false };
  },

  async getEfficiencyScores(): Promise<ApiResponse<TeamPerformanceScore[]>> {
    await delay(500);
    // Backend integration point: supabase.rpc('get_department_efficiency_scores')
    const scores: TeamPerformanceScore[] = mockDepartments.map(dept => ({
      departmentId: dept.id,
      departmentName: dept.name,
      overallScore: dept.utilization,
      velocityScore: Math.round(dept.utilization * 0.95 + Math.random() * 5),
      collaborationScore: Math.round(dept.utilization * 0.9 + Math.random() * 8),
      retentionScore: Math.round(85 + Math.random() * 12),
      growthScore: Math.round(70 + Math.random() * 25),
      trend: dept.utilization > 85 ? 'up' : dept.utilization < 75 ? 'down' : 'stable',
      trendValue: Math.round((Math.random() - 0.3) * 8 * 10) / 10,
    }));
    return { data: scores, error: null, loading: false };
  },
};

// ============================================================
// Hiring Service
// ============================================================

export const hiringService = {
  async getCandidates(): Promise<ApiResponse<HiringCandidate[]>> {
    await delay(350);
    // Backend integration point: supabase.from('hiring_candidates').select('*').order('applied_date', { ascending: false })
    return { data: mockCandidates, error: null, loading: false };
  },
};

// ============================================================
// Leave Service
// ============================================================

export const leaveService = {
  async getRequests(): Promise<ApiResponse<LeaveRequest[]>> {
    await delay(300);
    // Backend integration point: supabase.from('leave_requests').select('*, employees(name, avatar)').order('created_at', { ascending: false })
    return { data: mockLeaves, error: null, loading: false };
  },

  async approve(id: string): Promise<ApiResponse<{ success: boolean }>> {
    await delay(400);
    // Backend integration point: supabase.from('leave_requests').update({ status: 'Approved' }).eq('id', id)
    return { data: { success: true }, error: null, loading: false };
  },

  async reject(id: string): Promise<ApiResponse<{ success: boolean }>> {
    await delay(400);
    // Backend integration point: supabase.from('leave_requests').update({ status: 'Rejected' }).eq('id', id)
    return { data: { success: true }, error: null, loading: false };
  },
};

// ============================================================
// Attendance Service
// ============================================================

export const attendanceService = {
  async getShifts(): Promise<ApiResponse<ShiftEntry[]>> {
    await delay(300);
    // Backend integration point: supabase.from('shift_entries').select('*').eq('date', today)
    return { data: mockShifts, error: null, loading: false };
  },

  async getAnomalies(): Promise<ApiResponse<AttendanceAnomaly[]>> {
    await delay(600);
    // Backend integration point: supabase.rpc('detect_attendance_anomalies')
    const anomalies: AttendanceAnomaly[] = [
      {
        id: 'anom-001',
        employeeId: 'emp-003',
        employeeName: 'Yuki Tanaka',
        department: 'Engineering',
        type: 'late_pattern',
        severity: 'medium',
        description: 'Late check-in detected 4 times in the past 2 weeks (avg 22 min late)',
        detectedAt: '2026-05-15T09:30:00Z',
        pattern: '4 occurrences · Mon/Thu pattern',
      },
      {
        id: 'anom-002',
        employeeId: 'emp-007',
        employeeName: 'Noah Berntsen',
        department: 'Analytics',
        type: 'absence_spike',
        severity: 'high',
        description: '3 unplanned absences this month — 2.4× above team average',
        detectedAt: '2026-05-15T08:00:00Z',
        pattern: '3 absences · May 2026',
      },
      {
        id: 'anom-003',
        employeeId: 'emp-002',
        employeeName: 'Priya Sharma',
        department: 'Engineering',
        type: 'overtime_risk',
        severity: 'medium',
        description: 'Averaging 11.2 hrs/day for 3 consecutive weeks — burnout risk elevated',
        detectedAt: '2026-05-14T18:00:00Z',
        pattern: '3 weeks · 11.2 hrs avg',
      },
      {
        id: 'anom-004',
        employeeId: 'emp-010',
        employeeName: 'Dmitri Volkov',
        department: 'Sales',
        type: 'low_engagement',
        severity: 'high',
        description: 'Login frequency dropped 60% vs last month. No project activity in 8 days.',
        detectedAt: '2026-05-13T12:00:00Z',
        pattern: '8 days inactive',
      },
    ];
    return { data: anomalies, error: null, loading: false };
  },
};

// ============================================================
// Analytics Service
// ============================================================

export const analyticsService = {
  async getSkillMatrix(): Promise<ApiResponse<SkillMatrixEntry[]>> {
    await delay(500);
    // Backend integration point: supabase.rpc('get_skill_matrix')
    const matrix: SkillMatrixEntry[] = [
      { skill: 'React / Next.js', category: 'Frontend', employees: 48, avgProficiency: 3.8, demand: 'Critical', gap: 12 },
      { skill: 'Python / ML', category: 'Data', employees: 22, avgProficiency: 3.5, demand: 'High', gap: 8 },
      { skill: 'Kubernetes', category: 'DevOps', employees: 15, avgProficiency: 3.2, demand: 'High', gap: 6 },
      { skill: 'Product Strategy', category: 'Product', employees: 18, avgProficiency: 4.1, demand: 'Medium', gap: -2 },
      { skill: 'Figma / Design', category: 'Design', employees: 31, avgProficiency: 4.3, demand: 'Medium', gap: -5 },
      { skill: 'Go / gRPC', category: 'Backend', employees: 12, avgProficiency: 3.0, demand: 'High', gap: 9 },
      { skill: 'Enterprise Sales', category: 'Sales', employees: 67, avgProficiency: 3.7, demand: 'Critical', gap: 15 },
      { skill: 'Financial Modeling', category: 'Finance', employees: 24, avgProficiency: 4.0, demand: 'Low', gap: -3 },
      { skill: 'Security / SOC 2', category: 'Security', employees: 8, avgProficiency: 3.9, demand: 'Critical', gap: 7 },
      { skill: 'Data Engineering', category: 'Data', employees: 19, avgProficiency: 3.4, demand: 'High', gap: 5 },
    ];
    return { data: matrix, error: null, loading: false };
  },

  async getAISummary(): Promise<ApiResponse<string>> {
    await delay(800);
    // Backend integration point: POST /api/ai/workforce-summary (OpenAI/Gemini)
    const summary = `Workforce health is **strong** with 94.3% attendance and 3.2% turnover — both outperforming industry benchmarks. Engineering utilization at 82% signals capacity for 2 additional sprint teams. The Sales department shows early retention risk signals for 4 employees; proactive 1:1s are recommended this week. Hiring velocity improved 31% QoQ with referral channel driving 3.2× better quality scores. Skill gaps in React, Go, and Security roles are the top blockers for Q3 roadmap delivery — recommend accelerating those 3 open requisitions.`;
    return { data: summary, error: null, loading: false };
  },
};

// ============================================================
// Activity Timeline Service
// ============================================================

export const activityService = {
  async getTimeline(): Promise<ApiResponse<ActivityEvent[]>> {
    await delay(400);
    // Backend integration point: supabase.from('activity_events').select('*').order('created_at', { ascending: false }).limit(20)
    const events: ActivityEvent[] = [
      {
        id: 'evt-001',
        type: 'hire',
        actor: 'Amara Diallo',
        actorAvatar: 'AD',
        subject: 'Mei Lin',
        description: 'was hired as UX Designer in Design department',
        timestamp: '2026-05-15T09:15:00Z',
        metadata: { department: 'Design', branch: 'Paris' },
      },
      {
        id: 'evt-002',
        type: 'leave',
        actor: 'Yuki Tanaka',
        actorAvatar: 'YT',
        subject: 'Annual Leave',
        description: 'submitted a 6-day annual leave request (May 20–27)',
        timestamp: '2026-05-15T08:42:00Z',
        metadata: { days: '6', type: 'Annual' },
      },
      {
        id: 'evt-003',
        type: 'alert',
        actor: 'AI Copilot',
        actorAvatar: 'AI',
        subject: 'Attendance Anomaly',
        description: 'detected late-check-in pattern for 3 Engineering employees',
        timestamp: '2026-05-15T08:00:00Z',
        metadata: { severity: 'medium', affected: '3' },
      },
      {
        id: 'evt-004',
        type: 'promotion',
        actor: 'Marcus Aldridge',
        actorAvatar: 'MA',
        subject: 'James Calloway',
        description: 'was promoted to Senior Security Engineer',
        timestamp: '2026-05-14T16:30:00Z',
        metadata: { from: 'Security Engineer', to: 'Senior Security Engineer' },
      },
      {
        id: 'evt-005',
        type: 'review',
        actor: 'Priya Sharma',
        actorAvatar: 'PS',
        subject: 'Q2 Performance Reviews',
        description: 'completed performance reviews for 12 Engineering team members',
        timestamp: '2026-05-14T14:00:00Z',
        metadata: { count: '12', avg_score: '88' },
      },
      {
        id: 'evt-006',
        type: 'transfer',
        actor: 'Amara Diallo',
        actorAvatar: 'AD',
        subject: 'Sofia Reyes',
        description: 'was transferred from Mexico City to HQ - New York',
        timestamp: '2026-05-13T11:00:00Z',
        metadata: { from: 'Mexico City', to: 'HQ - New York' },
      },
      {
        id: 'evt-007',
        type: 'offboard',
        actor: 'Amara Diallo',
        actorAvatar: 'AD',
        subject: 'Former Employee',
        description: 'offboarding process initiated for Analytics department',
        timestamp: '2026-05-12T09:00:00Z',
        metadata: { department: 'Analytics' },
      },
    ];
    return { data: events, error: null, loading: false };
  },
};
