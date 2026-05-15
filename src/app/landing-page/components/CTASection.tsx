import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blob-primary opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blob-accent opacity-20" />
        <div className="absolute inset-0 grid-dots opacity-30" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="relative glass-card-elevated rounded-3xl p-12 lg:p-20 text-center neon-glow-violet overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none rounded-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 mb-6">
              <Sparkles size={12} className="text-primary" />
              <span className="text-xs font-medium text-primary">14-day free trial · No credit card required</span>
            </div>

            <h2 className="text-hero-lg font-bold text-foreground mb-6">
              Ready to transform how
              <br />
              <span className="gradient-text">your organization operates?</span>
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg leading-relaxed">
              Join 2,400+ organizations that have unified their operations on Aureon. 
              Implementation takes days, not months.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-white font-semibold text-base hover:opacity-90 active:scale-95 transition-all neon-glow"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-8 py-4 rounded-xl glass-card text-foreground font-medium text-base hover:border-primary/30 transition-all"
              >
                Schedule a Demo
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-8">
              Average setup time: 3 weeks · Dedicated onboarding specialist included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}