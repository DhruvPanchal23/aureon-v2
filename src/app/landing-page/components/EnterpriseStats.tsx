import React from 'react';

const stats = [
  { id: 'stat-orgs', value: '2,400+', label: 'Organizations worldwide', sub: 'Across 47 countries' },
  { id: 'stat-users', value: '1.2M+', label: 'Active users daily', sub: 'From 50 to 50,000 employees' },
  { id: 'stat-automation', value: '$840M+', label: 'Payroll processed monthly', sub: 'With 99.98% accuracy' },
  { id: 'stat-uptime', value: '99.97%', label: 'Platform uptime SLA', sub: 'Globally distributed infrastructure' },
  { id: 'stat-nps', value: '72 NPS', label: 'Customer satisfaction', sub: 'Enterprise segment average' },
];

export default function EnterpriseStats() {
  return (
    <section className="relative py-20 border-y border-border overflow-hidden">
      <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {stats?.map((stat) => (
            <div key={stat?.id} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold gradient-text tabular-nums">{stat?.value}</p>
              <p className="text-sm font-medium text-foreground mt-2">{stat?.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat?.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}