import React from 'react';
import { Shield, Lock, Eye, Server, Globe, FileCheck } from 'lucide-react';

const securityItems = [
  { id: 'sec-soc2', icon: Shield, title: 'SOC 2 Type II', desc: 'Independently audited security controls verified annually' },
  { id: 'sec-gdpr', icon: Globe, title: 'GDPR Compliant', desc: 'Full data privacy compliance for EU operations' },
  { id: 'sec-encrypt', icon: Lock, title: 'AES-256 Encryption', desc: 'All data encrypted at rest and in transit' },
  { id: 'sec-rbac', icon: Eye, title: 'Granular RBAC', desc: '9 built-in roles with custom permission sets' },
  { id: 'sec-infra', icon: Server, title: 'Multi-Region Infrastructure', desc: 'AWS deployment across 6 global regions' },
  { id: 'sec-audit', icon: FileCheck, title: 'Complete Audit Trails', desc: 'Every action logged with actor, timestamp, and context' },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-4">
            <Shield size={12} className="text-positive" />
            <span className="text-xs font-medium text-positive">Enterprise Security</span>
          </div>
          <h2 className="text-hero-lg font-bold text-foreground mb-4">
            Built for enterprise security.
            <br />
            <span className="gradient-text">Trusted by compliance teams.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Aureon meets the strictest enterprise security requirements — from Fortune 500 procurement to regulated industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {securityItems?.map((item) => {
            const IconComp = item?.icon;
            return (
              <div key={item?.id} className="glass-card rounded-xl p-5 card-hover cursor-default">
                <div className="w-9 h-9 rounded-lg bg-positive/10 flex items-center justify-center text-positive mb-4">
                  <IconComp size={18} />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1.5">{item?.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item?.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Compliance badges row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {['SOC 2', 'GDPR', 'HIPAA Ready', 'ISO 27001', 'CCPA', 'PCI DSS']?.map((badge) => (
            <div key={`badge-${badge}`} className="glass-card rounded-lg px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}