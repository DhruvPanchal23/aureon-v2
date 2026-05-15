import React from 'react';
import { Users, CreditCard, FolderKanban, BarChart3, Zap, Clock, FileText, MessageSquare, Building2, Sparkles } from 'lucide-react';

const features = [
  {
    id: 'feat-hrms',
    icon: Users,
    title: 'Smart HRMS',
    desc: 'End-to-end employee lifecycle management — onboarding, attendance, shifts, leaves, and offboarding in one unified flow.',
    gradient: 'from-primary/20 to-accent/10',
    iconColor: 'text-primary',
    tags: ['Onboarding', 'Attendance', 'Payroll'],
  },
  {
    id: 'feat-projects',
    icon: FolderKanban,
    title: 'Projects & SOW',
    desc: 'Enterprise-grade project management with SOW tracking, milestone delivery, Kanban boards, and real-time budget monitoring.',
    gradient: 'from-accent/20 to-info/10',
    iconColor: 'text-accent',
    tags: ['SOW', 'Milestones', 'Kanban'],
  },
  {
    id: 'feat-payroll',
    icon: CreditCard,
    title: 'Payroll Automation',
    desc: 'Fully automated payroll with multi-currency support, tax management, reimbursements, and one-click disbursement.',
    gradient: 'from-positive/20 to-primary/10',
    iconColor: 'text-positive',
    tags: ['Auto-run', 'Tax', 'Payslips'],
  },
  {
    id: 'feat-analytics',
    icon: BarChart3,
    title: 'Advanced Analytics',
    desc: 'Real-time dashboards, predictive insights, department heatmaps, and AI-generated executive reports.',
    gradient: 'from-info/20 to-accent/10',
    iconColor: 'text-info',
    tags: ['Real-time', 'Predictive', 'Reports'],
  },
  {
    id: 'feat-automation',
    icon: Zap,
    title: 'Workflow Engine',
    desc: 'Visual no-code automation builder with approval chains, SLA enforcement, escalation rules, and 200+ integrations.',
    gradient: 'from-warning/20 to-positive/10',
    iconColor: 'text-warning',
    tags: ['No-code', 'Approvals', 'SLA'],
  },
  {
    id: 'feat-time',
    icon: Clock,
    title: 'Time Intelligence',
    desc: 'Web and desktop time tracking with deep work analytics, idle detection, productivity scoring, and team timesheets.',
    gradient: 'from-accent/20 to-primary/10',
    iconColor: 'text-accent',
    tags: ['Tracker', 'Analytics', 'Timesheets'],
  },
  {
    id: 'feat-docs',
    icon: FileText,
    title: 'Document & Wiki',
    desc: 'Internal knowledge base, SOP management, AI-powered document search, and smart contract repository.',
    gradient: 'from-primary/20 to-info/10',
    iconColor: 'text-primary',
    tags: ['Wiki', 'SOP', 'AI Search'],
  },
  {
    id: 'feat-collab',
    icon: MessageSquare,
    title: 'Collaboration Hub',
    desc: 'Team channels, announcements, activity feeds, mentions, and live commenting — all inside your enterprise OS.',
    gradient: 'from-positive/20 to-accent/10',
    iconColor: 'text-positive',
    tags: ['Channels', 'Feeds', 'Mentions'],
  },
  {
    id: 'feat-branches',
    icon: Building2,
    title: 'Multi-Branch Admin',
    desc: 'Manage unlimited branches with individual health scores, compliance tracking, and cross-branch analytics.',
    gradient: 'from-info/20 to-primary/10',
    iconColor: 'text-info',
    tags: ['Multi-branch', 'Health Score', 'Compliance'],
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blob-primary opacity-20 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-4">
            <Sparkles size={12} className="text-primary" />
            <span className="text-xs font-medium text-primary">10 Integrated Modules</span>
          </div>
          <h2 className="text-hero-lg font-bold text-foreground mb-4">
            Every tool your enterprise needs.
            <br />
            <span className="gradient-text">One unified platform.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Replace your fragmented stack of HR software, project tools, payroll systems, and analytics platforms with a single AI-native operating system.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
          {features?.map((feat) => {
            const IconComp = feat?.icon;
            return (
              <div
                key={feat?.id}
                className={`glass-card rounded-2xl p-6 card-hover cursor-default bg-gradient-to-br ${feat?.gradient}`}
              >
                <div className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center mb-4 ${feat?.iconColor}`}>
                  <IconComp size={20} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feat?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feat?.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {feat?.tags?.map((tag) => (
                    <span key={`tag-${feat?.id}-${tag}`} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}