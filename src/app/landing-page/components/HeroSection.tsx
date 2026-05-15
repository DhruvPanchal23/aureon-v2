'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';

const floatingCards = [
  {
    id: 'float-health',
    label: 'Org Health Score',
    value: '87.4',
    badge: '+3.2 this week',
    badgeColor: 'text-positive',
    position: 'top-[15%] left-[5%]',
    delay: '0ms',
  },
  {
    id: 'float-payroll',
    label: 'Payroll Accuracy',
    value: '99.8%',
    badge: '0 errors',
    badgeColor: 'text-positive',
    position: 'top-[10%] right-[8%]',
    delay: '800ms',
  },
  {
    id: 'float-ai',
    label: 'AI Insights',
    value: '3 new',
    badge: 'Action required',
    badgeColor: 'text-warning',
    position: 'bottom-[25%] left-[3%]',
    delay: '400ms',
  },
  {
    id: 'float-approvals',
    label: 'Pending Approvals',
    value: '5',
    badge: '1 SLA breach',
    badgeColor: 'text-danger',
    position: 'bottom-[20%] right-[5%]',
    delay: '1200ms',
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blob-primary opacity-40" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] blob-accent opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] blob-blue opacity-30" />
        <div className="absolute inset-0 grid-dots opacity-40" />
      </div>
      {/* Floating metric cards */}
      {floatingCards?.map((card) => (
        <div
          key={card?.id}
          className={`absolute hidden xl:block ${card?.position} glass-card rounded-xl px-4 py-3 min-w-[160px] animate-float`}
          style={{ animationDelay: card?.delay }}
        >
          <p className="text-xs text-muted-foreground">{card?.label}</p>
          <p className="text-xl font-bold tabular-nums text-foreground mt-0.5">{card?.value}</p>
          <p className={`text-xs font-medium mt-1 ${card?.badgeColor}`}>{card?.badge}</p>
        </div>
      ))}
      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <Sparkles size={14} className="text-primary" />
          <span className="text-sm font-medium gradient-text">The AI-Native Enterprise OS — Now in 2026</span>
          <ArrowRight size={12} className="text-muted-foreground" />
        </div>

        {/* Headline */}
        <h1 className="text-hero-xl font-bold text-foreground mb-6">
          <span className="gradient-text-white">The Intelligent</span>
          <br />
          <span className="gradient-text">Operating System</span>
          <br />
          <span className="gradient-text-white">for Modern Enterprises</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Replace 12 fragmented tools with one unified platform. Aureon combines ERP, HRMS, payroll, project management, 
          and AI-powered automation into a single cinematic enterprise experience.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 active:scale-95 transition-all neon-glow text-base"
          >
            Start Free Trial
            <ArrowRight size={16} />
          </Link>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-foreground font-medium hover:border-primary/30 transition-all text-base">
            <Play size={16} className="text-primary" />
            Watch Demo
          </button>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
          <p className="text-xs text-muted-foreground">Trusted by forward-thinking enterprises</p>
          {['NovaTech', 'Meridian Financial', 'Solaris Health', 'Apex Logistics', 'Pinnacle Consulting']?.map((company) => (
            <span key={`trust-${company}`} className="text-sm font-medium text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              {company}
            </span>
          ))}
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 relative">
          <div className="glass-card-elevated rounded-2xl p-1 neon-glow max-w-4xl mx-auto">
            <div className="rounded-xl bg-card overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-danger/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-positive/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-muted/50 rounded-md px-3 py-1 text-xs text-muted-foreground text-center max-w-xs mx-auto">
                    app.aureon.io/dashboard
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={12} className="text-primary" />
                  <span className="text-xs text-primary font-medium">AI Active</span>
                </div>
              </div>
              {/* Dashboard mockup */}
              <div className="p-4 space-y-3">
                {/* KPI row */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Org Health', val: '87.4', color: 'text-positive', span: 'col-span-2' },
                    { label: 'Utilization', val: '79%', color: 'text-warning', span: 'col-span-1' },
                    { label: 'Attendance', val: '94.3%', color: 'text-primary', span: 'col-span-1' },
                  ]?.map((k) => (
                    <div key={`mock-kpi-${k?.label}`} className={`${k?.span} bg-muted/40 rounded-lg p-3`}>
                      <p className="text-xs text-muted-foreground">{k?.label}</p>
                      <p className={`text-xl font-bold tabular-nums ${k?.color}`}>{k?.val}</p>
                    </div>
                  ))}
                </div>
                {/* Chart area */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 bg-muted/40 rounded-lg p-3 h-24 flex items-end gap-1">
                    {[40, 55, 48, 62, 58, 71, 65, 78, 72, 84, 79, 87]?.map((h, i) => (
                      <div
                        key={`chart-bar-${i}`}
                        className="flex-1 rounded-sm"
                        style={{ height: `${h}%`, background: `rgba(99,102,241,${0.2 + (i / 12) * 0.6})` }}
                      />
                    ))}
                  </div>
                  <div className="bg-muted/40 rounded-lg p-3 h-24 flex flex-col justify-between">
                    <p className="text-xs text-muted-foreground">AI Insights</p>
                    {[1, 2, 3]?.map((i) => (
                      <div key={`ai-mock-${i}`} className="h-2 bg-primary/20 rounded-full" style={{ width: `${90 - i * 15}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}