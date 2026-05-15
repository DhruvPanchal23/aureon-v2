'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SystemHealthInner = dynamic(() => import('./SystemHealthInner'), { ssr: false });

export default function SystemHealthPanel() {
  return <SystemHealthInner />;
}