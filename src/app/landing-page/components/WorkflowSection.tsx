import React from 'react';
import { Zap, ArrowRight, CheckCircle } from 'lucide-react';

const workflowSteps = [
  { id: 'wf-1', step: '01', title: 'Trigger', desc: 'Employee submits leave request', color: 'border-primary/40 bg-primary/5', dot: 'bg-primary' },
  { id: 'wf-2', step: '02', title: 'Validate', desc: 'AI checks balance, conflicts, SLA', color: 'border-accent/40 bg-accent/5', dot: 'bg-accent' },
  { id: 'wf-3', step: '03', title: 'Route', desc: 'Sent to Team Lead → HR Manager', color: 'border-info/40 bg-info/5', dot: 'bg-info' },
  { id: 'wf-4', step: '04', title: 'Approve', desc: 'One-click approval with audit trail', color: 'border-positive/40 bg-positive/5', dot: 'bg-positive' },
  { id: 'wf-5', step: '05', title: 'Notify', desc: 'Employee notified + calendar synced', color: 'border-warning/40 bg-warning/5', dot: 'bg-warning' },
];

const automationExamples = [
  'Auto-approve leave requests under 2 days if balance > 10 days',
  'Escalate overdue approvals to manager after 24 hours',
  'Trigger onboarding checklist when new employee is added',
  'Send payroll summary to Finance Director every Friday at 5pm',
  'Flag timesheets not submitted by Thursday EOD',
];

export default function WorkflowSection() {
  return (
    <section id="workflows" className="py-24 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-4">
            <Zap size={12} className="text-warning" />
            <span className="text-xs font-medium text-warning">Workflow Automation Engine</span>
          </div>
          <h2 className="text-hero-lg font-bold text-foreground mb-4">
            Automate the repetitive.
            <br />
            <span className="gradient-text">Focus on what matters.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Build powerful multi-step workflows without writing code. Set conditions, actions, and approvals that run automatically across your entire organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Workflow visualization */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">Example: Leave Request Workflow</p>
            {workflowSteps?.map((step, i) => (
              <div key={step?.id}>
                <div className={`flex items-center gap-4 p-4 rounded-xl border ${step?.color}`}>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className={`w-8 h-8 rounded-full ${step?.dot} flex items-center justify-center text-xs font-bold text-white`}>
                      {step?.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{step?.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step?.desc}</p>
                  </div>
                  <CheckCircle size={16} className="text-positive shrink-0" />
                </div>
                {i < workflowSteps?.length - 1 && (
                  <div className="flex items-center justify-center py-1">
                    <div className="w-px h-4 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Automation examples */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">Common Automations</p>
            <div className="space-y-3 mb-8">
              {automationExamples?.map((example) => (
                <div key={`auto-${example?.slice(0, 20)}`} className="flex items-start gap-3 p-4 glass-card rounded-xl hover:border-primary/30 transition-colors cursor-pointer">
                  <Zap size={14} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{example}</p>
                  <ArrowRight size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
            <div className="glass-card rounded-xl p-5 border-primary/20">
              <p className="text-sm font-semibold text-foreground mb-2">200+ pre-built templates</p>
              <p className="text-xs text-muted-foreground mb-4">Start from a template or build your own with our visual drag-and-drop workflow builder.</p>
              <button className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Browse Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}