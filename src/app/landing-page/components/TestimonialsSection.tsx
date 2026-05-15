import React from 'react';

const testimonials = [
  {
    id: 'test-001',
    quote: 'Aureon replaced 7 separate tools we were using — Workday, Jira, Slack, BambooHR, QuickBooks, Confluence, and Monday. The ROI in the first 3 months was staggering.',
    author: 'Claire Okonkwo',
    role: 'Chief Operations Officer',
    company: 'Meridian Financial',
    avatar: 'CO',
    metric: '7 tools replaced',
    metricColor: 'text-primary',
  },
  {
    id: 'test-002',
    quote: 'The AI insights are genuinely useful — not generic advice. It flagged a payroll anomaly that would have cost us $340K before it hit disbursement. That alone paid for 2 years of subscription.',
    author: 'Yuki Tanaka',
    role: 'VP People & Operations',
    company: 'Solaris Health',
    avatar: 'YT',
    metric: '$340K saved',
    metricColor: 'text-positive',
  },
  {
    id: 'test-003',
    quote: 'We manage 14 branches across 8 countries. Aureon gives us a single dashboard for everything — branch health scores, payroll, attendance, compliance. The multi-tenant architecture is enterprise-grade.',
    author: 'Marcus Aldridge',
    role: 'CEO',
    company: 'NovaTech Corp',
    avatar: 'MA',
    metric: '14 branches unified',
    metricColor: 'text-accent',
  },
  {
    id: 'test-004',
    quote: 'Implementation took 3 weeks, not 3 months like our previous ERP. The workflow automation alone saved our HR team 14 hours per week in manual approvals.',
    author: 'Priya Sharma',
    role: 'Head of HR',
    company: 'Aurora Biotech',
    avatar: 'PS',
    metric: '14h/week saved',
    metricColor: 'text-warning',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-hero-lg font-bold text-foreground mb-4">
            Trusted by enterprise leaders
            <br />
            <span className="gradient-text">across every industry</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From 50-person scale-ups to 2,000-person enterprises — Aureon adapts to your organization's complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-5">
          {testimonials?.map((t) => (
            <div key={t?.id} className="glass-card rounded-2xl p-6 flex flex-col card-hover cursor-default">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5]?.map((s) => (
                  <span key={`star-${t?.id}-${s}`} className="text-warning text-sm">★</span>
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                "{t?.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {t?.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t?.author}</p>
                  <p className="text-xs text-muted-foreground">{t?.role} · {t?.company}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold tabular-nums ${t?.metricColor}`}>{t?.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}