// Backend integration point: Replace all mock data with /api/workforce/* endpoints

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  branch: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'Active' | 'On Leave' | 'Remote' | 'Offboarding';
  joinDate: string;
  manager: string;
  salary: string;
  performance: number;
  attendance: number;
  skills: string[];
  projects: string[];
  leaveBalance: number;
  shiftType: 'Morning' | 'Evening' | 'Night' | 'Flexible';
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
}

export interface HiringCandidate {
  id: string;
  name: string;
  role: string;
  department: string;
  stage: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
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
  type: 'Annual' | 'Sick' | 'Maternity' | 'Paternity' | 'Emergency' | 'Unpaid';
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  avatar: string;
}

export interface ShiftEntry {
  id: string;
  employee: string;
  department: string;
  shift: 'Morning' | 'Evening' | 'Night' | 'Flexible';
  date: string;
  checkIn: string;
  checkOut: string;
  hours: number;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
}

export const employees: Employee[] = [
  {
    id: 'emp-001',
    name: 'Marcus Aldridge',
    role: 'Chief Executive Officer',
    department: 'Executive',
    branch: 'HQ - New York',
    email: 'marcus.aldridge@novatech.com',
    phone: '+1 (212) 555-0101',
    avatar: 'MA',
    status: 'Active',
    joinDate: 'Jan 12, 2020',
    manager: '—',
    salary: '$380,000',
    performance: 96,
    attendance: 98,
    skills: ['Leadership', 'Strategy', 'M&A', 'Fundraising'],
    projects: ['Horizon Platform', 'Global Expansion 2026'],
    leaveBalance: 24,
    shiftType: 'Flexible',
  },
  {
    id: 'emp-002',
    name: 'Priya Sharma',
    role: 'VP Engineering',
    department: 'Engineering',
    branch: 'HQ - New York',
    email: 'priya.sharma@novatech.com',
    phone: '+1 (212) 555-0102',
    avatar: 'PS',
    status: 'Active',
    joinDate: 'Mar 5, 2021',
    manager: 'Marcus Aldridge',
    salary: '$240,000',
    performance: 94,
    attendance: 97,
    skills: ['React', 'Node.js', 'System Design', 'Team Leadership'],
    projects: ['Horizon Platform', 'API Gateway v3'],
    leaveBalance: 18,
    shiftType: 'Flexible',
  },
  {
    id: 'emp-003',
    name: 'Tariq Al-Hassan',
    role: 'Head of Product',
    department: 'Product',
    branch: 'London',
    email: 'tariq.alhassan@novatech.com',
    phone: '+44 20 7946 0103',
    avatar: 'TA',
    status: 'Remote',
    joinDate: 'Jun 18, 2021',
    manager: 'Marcus Aldridge',
    salary: '$210,000',
    performance: 91,
    attendance: 95,
    skills: ['Product Strategy', 'Roadmapping', 'User Research', 'OKRs'],
    projects: ['Workforce Module', 'AI Copilot'],
    leaveBalance: 14,
    shiftType: 'Flexible',
  },
  {
    id: 'emp-004',
    name: 'Claire Okonkwo',
    role: 'Chief Financial Officer',
    department: 'Finance',
    branch: 'HQ - New York',
    email: 'claire.okonkwo@novatech.com',
    phone: '+1 (212) 555-0104',
    avatar: 'CO',
    status: 'Active',
    joinDate: 'Aug 2, 2020',
    manager: 'Marcus Aldridge',
    salary: '$290,000',
    performance: 93,
    attendance: 99,
    skills: ['Financial Modeling', 'FP&A', 'Compliance', 'M&A'],
    projects: ['Q2 Audit', 'Series C Prep'],
    leaveBalance: 20,
    shiftType: 'Morning',
  },
  {
    id: 'emp-005',
    name: 'Yuki Tanaka',
    role: 'Senior Engineer',
    department: 'Engineering',
    branch: 'Tokyo',
    email: 'yuki.tanaka@novatech.com',
    phone: '+81 3-5555-0105',
    avatar: 'YT',
    status: 'Active',
    joinDate: 'Nov 14, 2022',
    manager: 'Priya Sharma',
    salary: '$145,000',
    performance: 88,
    attendance: 96,
    skills: ['Go', 'Kubernetes', 'PostgreSQL', 'gRPC'],
    projects: ['API Gateway v3', 'Data Pipeline'],
    leaveBalance: 12,
    shiftType: 'Morning',
  },
  {
    id: 'emp-006',
    name: 'Isabelle Fontaine',
    role: 'Design Lead',
    department: 'Design',
    branch: 'Paris',
    email: 'isabelle.fontaine@novatech.com',
    phone: '+33 1 5555 0106',
    avatar: 'IF',
    status: 'On Leave',
    joinDate: 'Feb 20, 2022',
    manager: 'Tariq Al-Hassan',
    salary: '$130,000',
    performance: 92,
    attendance: 91,
    skills: ['Figma', 'Design Systems', 'Motion Design', 'User Testing'],
    projects: ['Design System v3', 'Workforce Module'],
    leaveBalance: 8,
    shiftType: 'Flexible',
  },
  {
    id: 'emp-007',
    name: 'Noah Berntsen',
    role: 'Data Scientist',
    department: 'Analytics',
    branch: 'Berlin',
    email: 'noah.berntsen@novatech.com',
    phone: '+49 30 5555 0107',
    avatar: 'NB',
    status: 'Active',
    joinDate: 'Apr 8, 2023',
    manager: 'Priya Sharma',
    salary: '$155,000',
    performance: 87,
    attendance: 94,
    skills: ['Python', 'ML', 'Spark', 'dbt'],
    projects: ['AI Copilot', 'Predictive Analytics'],
    leaveBalance: 16,
    shiftType: 'Flexible',
  },
  {
    id: 'emp-008',
    name: 'Amara Diallo',
    role: 'HR Business Partner',
    department: 'Human Resources',
    branch: 'HQ - New York',
    email: 'amara.diallo@novatech.com',
    phone: '+1 (212) 555-0108',
    avatar: 'AD',
    status: 'Active',
    joinDate: 'Sep 1, 2021',
    manager: 'Marcus Aldridge',
    salary: '$115,000',
    performance: 90,
    attendance: 97,
    skills: ['Talent Acquisition', 'HRIS', 'Compensation', 'L&D'],
    projects: ['Onboarding Revamp', 'Culture Initiative'],
    leaveBalance: 22,
    shiftType: 'Morning',
  },
  {
    id: 'emp-009',
    name: 'James Calloway',
    role: 'Security Engineer',
    department: 'Engineering',
    branch: 'HQ - New York',
    email: 'james.calloway@novatech.com',
    phone: '+1 (212) 555-0109',
    avatar: 'JC',
    status: 'Active',
    joinDate: 'Jul 15, 2022',
    manager: 'Priya Sharma',
    salary: '$165,000',
    performance: 89,
    attendance: 98,
    skills: ['Penetration Testing', 'SOC 2', 'Zero Trust', 'AWS Security'],
    projects: ['Security Audit 2026', 'SOC 2 Type II'],
    leaveBalance: 14,
    shiftType: 'Morning',
  },
  {
    id: 'emp-010',
    name: 'Dmitri Volkov',
    role: 'Sales Director',
    department: 'Sales',
    branch: 'Berlin',
    email: 'dmitri.volkov@novatech.com',
    phone: '+49 30 5555 0110',
    avatar: 'DV',
    status: 'Remote',
    joinDate: 'Jan 3, 2022',
    manager: 'Marcus Aldridge',
    salary: '$195,000',
    performance: 85,
    attendance: 92,
    skills: ['Enterprise Sales', 'CRM', 'Negotiation', 'EMEA Markets'],
    projects: ['EMEA Expansion', 'Q2 Pipeline'],
    leaveBalance: 10,
    shiftType: 'Flexible',
  },
  {
    id: 'emp-011',
    name: 'Sofia Reyes',
    role: 'Frontend Engineer',
    department: 'Engineering',
    branch: 'Mexico City',
    email: 'sofia.reyes@novatech.com',
    phone: '+52 55 5555 0111',
    avatar: 'SR',
    status: 'Active',
    joinDate: 'Mar 22, 2023',
    manager: 'Priya Sharma',
    salary: '$120,000',
    performance: 86,
    attendance: 95,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    projects: ['Horizon Platform', 'Workforce Module'],
    leaveBalance: 18,
    shiftType: 'Morning',
  },
  {
    id: 'emp-012',
    name: 'Kwame Asante',
    role: 'Marketing Manager',
    department: 'Marketing',
    branch: 'London',
    email: 'kwame.asante@novatech.com',
    phone: '+44 20 7946 0112',
    avatar: 'KA',
    status: 'Active',
    joinDate: 'May 10, 2023',
    manager: 'Marcus Aldridge',
    salary: '$105,000',
    performance: 83,
    attendance: 93,
    skills: ['Growth Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    projects: ['Brand Refresh', 'Q2 Campaign'],
    leaveBalance: 16,
    shiftType: 'Flexible',
  },
];

export const departments: Department[] = [
  { id: 'dept-001', name: 'Engineering', head: 'Priya Sharma', headAvatar: 'PS', employees: 487, budget: '$12.4M', utilization: 82, openRoles: 8, color: 'primary' },
  { id: 'dept-002', name: 'Product', head: 'Tariq Al-Hassan', headAvatar: 'TA', employees: 64, budget: '$3.2M', utilization: 91, openRoles: 3, color: 'accent' },
  { id: 'dept-003', name: 'Design', head: 'Isabelle Fontaine', headAvatar: 'IF', employees: 38, budget: '$1.8M', utilization: 78, openRoles: 2, color: 'info' },
  { id: 'dept-004', name: 'Finance', head: 'Claire Okonkwo', headAvatar: 'CO', employees: 72, budget: '$2.1M', utilization: 88, openRoles: 1, color: 'positive' },
  { id: 'dept-005', name: 'Sales', head: 'Dmitri Volkov', headAvatar: 'DV', employees: 143, budget: '$5.6M', utilization: 94, openRoles: 12, color: 'warning' },
  { id: 'dept-006', name: 'Human Resources', head: 'Amara Diallo', headAvatar: 'AD', employees: 28, budget: '$1.2M', utilization: 85, openRoles: 2, color: 'positive' },
  { id: 'dept-007', name: 'Analytics', head: 'Noah Berntsen', headAvatar: 'NB', employees: 45, budget: '$2.8M', utilization: 76, openRoles: 4, color: 'accent' },
  { id: 'dept-008', name: 'Marketing', head: 'Kwame Asante', headAvatar: 'KA', employees: 52, budget: '$2.4M', utilization: 80, openRoles: 3, color: 'warning' },
];

export const hiringCandidates: HiringCandidate[] = [
  { id: 'cand-001', name: 'Aisha Patel', role: 'Senior Backend Engineer', department: 'Engineering', stage: 'Interview', appliedDate: 'May 2, 2026', source: 'LinkedIn', score: 88, avatar: 'AP' },
  { id: 'cand-002', name: 'Luca Romano', role: 'Product Manager', department: 'Product', stage: 'Offer', appliedDate: 'Apr 28, 2026', source: 'Referral', score: 92, avatar: 'LR' },
  { id: 'cand-003', name: 'Zara Osei', role: 'Data Engineer', department: 'Analytics', stage: 'Screening', appliedDate: 'May 8, 2026', source: 'Indeed', score: 79, avatar: 'ZO' },
  { id: 'cand-004', name: 'Ben Kowalski', role: 'DevOps Engineer', department: 'Engineering', stage: 'Applied', appliedDate: 'May 12, 2026', source: 'Website', score: 74, avatar: 'BK' },
  { id: 'cand-005', name: 'Mei Lin', role: 'UX Designer', department: 'Design', stage: 'Hired', appliedDate: 'Apr 15, 2026', source: 'Referral', score: 95, avatar: 'ML' },
  { id: 'cand-006', name: 'Carlos Mendez', role: 'Sales Executive', department: 'Sales', stage: 'Interview', appliedDate: 'May 5, 2026', source: 'LinkedIn', score: 81, avatar: 'CM' },
  { id: 'cand-007', name: 'Fatima Nkosi', role: 'Marketing Analyst', department: 'Marketing', stage: 'Screening', appliedDate: 'May 10, 2026', source: 'AngelList', score: 77, avatar: 'FN' },
  { id: 'cand-008', name: 'Oliver Chen', role: 'Frontend Engineer', department: 'Engineering', stage: 'Rejected', appliedDate: 'Apr 20, 2026', source: 'GitHub', score: 62, avatar: 'OC' },
];

export const onboardingTasks: OnboardingTask[] = [
  { id: 'ob-001', employee: 'Mei Lin', task: 'Complete IT setup & device provisioning', category: 'IT', status: 'Completed', dueDate: 'May 13, 2026', assignedTo: 'IT Team' },
  { id: 'ob-002', employee: 'Mei Lin', task: 'Sign employment contract & NDA', category: 'Legal', status: 'Completed', dueDate: 'May 13, 2026', assignedTo: 'HR' },
  { id: 'ob-003', employee: 'Mei Lin', task: 'Complete compliance training modules', category: 'Training', status: 'In Progress', dueDate: 'May 20, 2026', assignedTo: 'L&D Team' },
  { id: 'ob-004', employee: 'Mei Lin', task: 'Meet with design team & manager', category: 'Orientation', status: 'In Progress', dueDate: 'May 16, 2026', assignedTo: 'Isabelle Fontaine' },
  { id: 'ob-005', employee: 'Mei Lin', task: 'Set up payroll & benefits enrollment', category: 'Finance', status: 'Pending', dueDate: 'May 22, 2026', assignedTo: 'Finance' },
  { id: 'ob-006', employee: 'Mei Lin', task: 'Complete 30-day onboarding survey', category: 'HR', status: 'Pending', dueDate: 'Jun 12, 2026', assignedTo: 'Amara Diallo' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'leave-001', employee: 'Yuki Tanaka', department: 'Engineering', type: 'Annual', startDate: 'May 20', endDate: 'May 27', days: 6, status: 'Pending', avatar: 'YT' },
  { id: 'leave-002', employee: 'Sofia Reyes', department: 'Engineering', type: 'Sick', startDate: 'May 15', endDate: 'May 16', days: 2, status: 'Approved', avatar: 'SR' },
  { id: 'leave-003', employee: 'Kwame Asante', department: 'Marketing', type: 'Annual', startDate: 'Jun 1', endDate: 'Jun 7', days: 5, status: 'Pending', avatar: 'KA' },
  { id: 'leave-004', employee: 'Isabelle Fontaine', department: 'Design', type: 'Maternity', startDate: 'May 10', endDate: 'Aug 10', days: 90, status: 'Approved', avatar: 'IF' },
  { id: 'leave-005', employee: 'Noah Berntsen', department: 'Analytics', type: 'Emergency', startDate: 'May 14', endDate: 'May 15', days: 2, status: 'Approved', avatar: 'NB' },
  { id: 'leave-006', employee: 'Dmitri Volkov', department: 'Sales', type: 'Annual', startDate: 'May 25', endDate: 'May 29', days: 5, status: 'Rejected', avatar: 'DV' },
];

export const shiftData: ShiftEntry[] = [
  { id: 'shift-001', employee: 'Marcus Aldridge', department: 'Executive', shift: 'Flexible', date: 'May 15', checkIn: '08:45', checkOut: '19:30', hours: 10.75, status: 'Present' },
  { id: 'shift-002', employee: 'Priya Sharma', department: 'Engineering', shift: 'Flexible', date: 'May 15', checkIn: '09:00', checkOut: '18:30', hours: 9.5, status: 'Present' },
  { id: 'shift-003', employee: 'Yuki Tanaka', department: 'Engineering', shift: 'Morning', date: 'May 15', checkIn: '09:22', checkOut: '18:00', hours: 8.63, status: 'Late' },
  { id: 'shift-004', employee: 'Claire Okonkwo', department: 'Finance', shift: 'Morning', date: 'May 15', checkIn: '08:00', checkOut: '17:00', hours: 9.0, status: 'Present' },
  { id: 'shift-005', employee: 'James Calloway', department: 'Engineering', shift: 'Morning', date: 'May 15', checkIn: '08:15', checkOut: '17:15', hours: 9.0, status: 'Present' },
  { id: 'shift-006', employee: 'Isabelle Fontaine', department: 'Design', shift: 'Flexible', date: 'May 15', checkIn: '—', checkOut: '—', hours: 0, status: 'Absent' },
  { id: 'shift-007', employee: 'Noah Berntsen', department: 'Analytics', shift: 'Flexible', date: 'May 15', checkIn: '10:00', checkOut: '14:00', hours: 4.0, status: 'Half Day' },
  { id: 'shift-008', employee: 'Amara Diallo', department: 'Human Resources', shift: 'Morning', date: 'May 15', checkIn: '08:30', checkOut: '17:30', hours: 9.0, status: 'Present' },
];

export const workforceKPIs = [
  { id: 'kpi-headcount', label: 'Total Headcount', value: '1,579', trend: '+23 this month', trendDir: 'up', icon: 'Users', color: 'primary', subtext: '1,489 active · 90 on leave' },
  { id: 'kpi-utilization', label: 'Workforce Utilization', value: '79%', trend: '-2.1% vs last week', trendDir: 'down', icon: 'Activity', color: 'warning', subtext: '1,247 of 1,579 assigned' },
  { id: 'kpi-attendance', label: "Today\'s Attendance", value: '94.3%', trend: '+0.8% vs yesterday', trendDir: 'up', icon: 'Clock', color: 'positive', subtext: '1,489 present · 90 absent' },
  { id: 'kpi-open-roles', label: 'Open Positions', value: '35', trend: '+8 this month', trendDir: 'up', icon: 'Briefcase', color: 'info', subtext: 'Across 8 departments' },
  { id: 'kpi-turnover', label: 'Turnover Rate', value: '3.2%', trend: '-0.4% vs Q1', trendDir: 'up', icon: 'TrendingDown', color: 'positive', subtext: 'Below 5% industry avg' },
  { id: 'kpi-avg-tenure', label: 'Avg. Tenure', value: '2.8 yrs', trend: '+0.2 yrs YoY', trendDir: 'up', icon: 'Award', color: 'accent', subtext: 'Median: 2.1 years' },
];

export const productivityHeatmapData = [
  { day: 'Mon', h6: 12, h7: 28, h8: 65, h9: 88, h10: 92, h11: 89, h12: 71, h13: 58, h14: 85, h15: 91, h16: 87, h17: 76, h18: 52, h19: 31, h20: 14 },
  { day: 'Tue', h6: 10, h7: 31, h8: 68, h9: 91, h10: 95, h11: 93, h12: 74, h13: 61, h14: 88, h15: 94, h16: 90, h17: 79, h18: 55, h19: 28, h20: 11 },
  { day: 'Wed', h6: 8, h7: 25, h8: 62, h9: 85, h10: 90, h11: 87, h12: 68, h13: 55, h14: 82, h15: 88, h16: 84, h17: 72, h18: 48, h19: 25, h20: 9 },
  { day: 'Thu', h6: 14, h7: 33, h8: 70, h9: 90, h10: 94, h11: 91, h12: 73, h13: 60, h14: 87, h15: 92, h16: 88, h17: 77, h18: 53, h19: 30, h20: 13 },
  { day: 'Fri', h6: 9, h7: 22, h8: 58, h9: 80, h10: 86, h11: 83, h12: 65, h13: 52, h14: 78, h15: 84, h16: 79, h17: 65, h18: 40, h19: 18, h20: 7 },
];

export const aiWorkforceInsights = [
  {
    id: 'ai-ins-001',
    type: 'warning',
    title: 'Engineering bench risk detected',
    summary: '23 engineers are bench-allocated for 14+ days. Reassigning to Horizon Platform backlog could recover $340K in utilization value.',
    action: 'View Engineers',
    confidence: 91,
  },
  {
    id: 'ai-ins-002',
    type: 'positive',
    title: 'Hiring velocity on track',
    summary: 'Time-to-hire dropped to 18 days avg (from 26 days in Q1). Referral channel is 3.2× more efficient than job boards.',
    action: 'View Pipeline',
    confidence: 88,
  },
  {
    id: 'ai-ins-003',
    type: 'info',
    title: 'Leave clustering in Engineering',
    summary: '8 engineers have overlapping leave requests in the last week of May. Consider staggering approvals to maintain sprint velocity.',
    action: 'Review Leaves',
    confidence: 85,
  },
  {
    id: 'ai-ins-004',
    type: 'warning',
    title: 'Turnover signal in Sales',
    summary: '4 Sales team members show low engagement scores and have updated LinkedIn profiles. Proactive retention conversations recommended.',
    action: 'View Employees',
    confidence: 79,
  },
];
