'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    id: 'plan-starter',
    name: 'Starter',
    desc: 'For growing teams getting started with unified operations',
    monthlyPrice: 29,
    annualPrice: 23,
    per: 'per employee / month',
    badge: null,
    color: 'border-border',
    cta: 'Start Free Trial',
    ctaStyle: 'border border-border text-foreground hover:border-primary/40 hover:text-primary',
    features: [
      'Up to 100 employees',
      '1 branch',
      'HRMS & Attendance',
      'Basic Payroll',
      'Task Management',
      'Email Support',
      '5GB Document Storage',
      'Standard Analytics',
    ],
    missing: ['AI Copilot', 'Workflow Automation', 'Multi-branch', 'Advanced Analytics', 'SSO'],
  },
  {
    id: 'plan-growth',
    name: 'Growth',
    desc: 'For scaling organizations needing automation and deeper insights',
    monthlyPrice: 79,
    annualPrice: 63,
    per: 'per employee / month',
    badge: 'Most Popular',
    color: 'border-primary/50',
    cta: 'Start Free Trial',
    ctaStyle: 'gradient-primary text-white hover:opacity-90',
    features: [
      'Up to 500 employees',
      '5 branches',
      'Full HRMS Suite',
      'Advanced Payroll + Tax',
      'Projects & SOW',
      'Workflow Automation',
      'AI Insights (Core)',
      'Advanced Analytics',
      '50GB Document Storage',
      'Priority Support',
    ],
    missing: ['AI Copilot', 'SSO / SAML', 'Unlimited branches', 'White-label'],
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    desc: 'For large organizations requiring full AI capabilities and compliance',
    monthlyPrice: null,
    annualPrice: null,
    per: 'Custom pricing',
    badge: 'AI-Powered',
    color: 'border-accent/50',
    cta: 'Contact Sales',
    ctaStyle: 'glass-card-elevated text-foreground hover:border-accent/50',
    features: [
      'Unlimited employees',
      'Unlimited branches',
      'Full AI Copilot',
      'Custom Workflow Builder',
      'SOC 2 Type II Compliance',
      'SSO / SAML / 2FA',
      'White-label Support',
      'Dedicated Success Manager',
      'On-premise AI Deployment',
      'Custom Integrations',
      'SLA Guarantee',
      'Audit & Compliance Suite',
    ],
    missing: [],
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blob-primary opacity-15 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-hero-lg font-bold text-foreground mb-4">
            Simple, transparent pricing
            <br />
            <span className="gradient-text">that scales with you</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            No hidden fees. No per-module charges. Everything included in your plan.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-4 py-2">
            <button
              onClick={() => setAnnual(false)}
              className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${!annual ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${annual ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`}
            >
              Annual
            </button>
            {annual && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-positive/15 text-positive">
                Save 20%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan) => (
            <div
              key={plan?.id}
              className={`relative glass-card rounded-2xl p-7 flex flex-col border ${plan?.color} ${plan?.badge === 'Most Popular' ? 'neon-glow' : ''}`}
            >
              {plan?.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${plan?.badge === 'Most Popular' ? 'gradient-primary text-white' : 'bg-accent/20 text-accent border border-accent/30'}`}>
                    {plan?.badge === 'AI-Powered' && <Sparkles size={10} />}
                    {plan?.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground">{plan?.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{plan?.desc}</p>
              </div>

              <div className="mb-6">
                {plan?.monthlyPrice ? (
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold tabular-nums gradient-text">
                      ${annual ? plan?.annualPrice : plan?.monthlyPrice}
                    </span>
                    <span className="text-xs text-muted-foreground mb-1.5 leading-tight">{plan?.per}</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-3xl font-bold text-foreground">Custom</p>
                    <p className="text-xs text-muted-foreground mt-1">{plan?.per}</p>
                  </div>
                )}
              </div>

              <Link
                href="/dashboard"
                className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 mb-6 ${plan?.ctaStyle}`}
              >
                {plan?.cta}
              </Link>

              <div className="space-y-2.5 flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Included</p>
                {plan?.features?.map((feature) => (
                  <div key={`feat-${plan?.id}-${feature}`} className="flex items-start gap-2.5">
                    <Check size={14} className="text-positive shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {plan?.missing?.length > 0 && (
                  <>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-4 mb-2">Not included</p>
                    {plan?.missing?.map((m) => (
                      <div key={`missing-${plan?.id}-${m}`} className="flex items-start gap-2.5 opacity-40">
                        <span className="text-sm text-muted-foreground mt-0.5">—</span>
                        <span className="text-sm text-muted-foreground">{m}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}