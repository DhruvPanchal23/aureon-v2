import React from 'react';
import { Sparkles, Brain, Zap, FileText, Bell, Search, MessageSquare } from 'lucide-react';

const aiCapabilities = [
  { id: 'ai-insights', icon: Brain, title: 'Operational Intelligence', desc: 'AI continuously monitors your org data and surfaces anomalies, risks, and opportunities before they become problems.' },
  { id: 'ai-automation', icon: Zap, title: 'Smart Automation', desc: 'Natural language workflow creation. Describe a process in plain English — Aureon builds and deploys the automation.' },
  { id: 'ai-reports', icon: FileText, title: 'AI-Generated Reports', desc: 'Executive-ready reports written by AI — summarizing performance, risks, and recommendations in narrative form.' },
  { id: 'ai-alerts', icon: Bell, title: 'Predictive Alerts', desc: 'Get notified before SLA breaches, payroll errors, or attendance anomalies occur — not after.' },
  { id: 'ai-search', icon: Search, title: 'Natural Language Search', desc: 'Ask "Show me all employees in Singapore who haven\'t submitted timesheets this week" and get instant results.' },
  { id: 'ai-copilot', icon: MessageSquare, title: 'AI Copilot', desc: 'An always-available assistant that answers questions, drafts documents, explains decisions, and guides workflows.' },
];

export default function AICapabilitiesSection() {
  return (
    <section id="ai" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blob-accent opacity-15" />
        <div className="absolute inset-0 grid-dots opacity-20" />
      </div>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-6">
              <Sparkles size={12} className="text-accent" />
              <span className="text-xs font-medium text-accent">AI-First Architecture</span>
            </div>
            <h2 className="text-hero-lg font-bold text-foreground mb-6">
              Not AI as a feature.
              <br />
              <span className="gradient-text">AI as the foundation.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Aureon was built from day one with AI woven into every layer. Not a chatbot bolted onto a legacy ERP — 
              a genuine intelligence layer that understands your organization's unique data, patterns, and goals.
            </p>
            <div className="space-y-3">
              {[
                'Trained on 10M+ enterprise data points',
                'Org-specific model fine-tuning',
                'SOC 2 Type II compliant AI processing',
                'On-premise AI deployment available',
              ]?.map((item) => (
                <div key={`ai-bullet-${item}`} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: capability cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiCapabilities?.map((cap) => {
              const IconComp = cap?.icon;
              return (
                <div key={cap?.id} className="glass-card rounded-xl p-4 card-hover cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-3">
                    <IconComp size={16} />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">{cap?.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cap?.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}