'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const OrgPulseChartInner = dynamic(() => import('./OrgPulseChartInner'), { ssr: false });

export default function OrgPulseChart() {
  return <OrgPulseChartInner />;
}