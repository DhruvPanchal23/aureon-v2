'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DeptChartInner = dynamic(() => import('./DeptChartInner'), { ssr: false });

export default function DepartmentPerformanceChart() {
  return <DeptChartInner />;
}