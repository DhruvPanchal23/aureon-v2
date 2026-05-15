'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import CommandPalette from './CommandPalette';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

export default function AppLayout({ children, currentPath }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPath={currentPath}
      />
      <div
        className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300 ease-in-out"
      >
        <Topbar onCommandOpen={() => setCommandOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}