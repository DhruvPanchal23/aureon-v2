'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Product', href: '#features', hasDropdown: true },
  { label: 'AI Platform', href: '#ai', hasDropdown: false },
  { label: 'Workflows', href: '#workflows', hasDropdown: false },
  { label: 'Pricing', href: '#pricing', hasDropdown: false },
  { label: 'Enterprise', href: '#security', hasDropdown: false },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-card/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-semibold text-lg text-foreground tracking-tight">Aureon</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks?.map((link) => (
            <a
              key={`nav-${link?.label}`}
              href={link?.href}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
            >
              {link?.label}
              {link?.hasDropdown && <ChevronDown size={12} />}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all neon-glow"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border px-6 py-4 space-y-2 animate-fade-in">
          {navLinks?.map((link) => (
            <a
              key={`mobile-nav-${link?.label}`}
              href={link?.href}
              className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link?.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link href="/dashboard" className="block text-center px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Link href="/dashboard" className="block text-center px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium">
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}