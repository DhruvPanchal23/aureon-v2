import React from 'react';
import LandingNav from './components/LandingNav';
import HeroSection from './components/HeroSection';
import EnterpriseStats from './components/EnterpriseStats';
import FeaturesSection from './components/FeaturesSection';
import AICapabilitiesSection from './components/AICapabilitiesSection';
import WorkflowSection from './components/WorkflowSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import SecuritySection from './components/SecuritySection';
import CTASection from './components/CTASection';
import LandingFooter from './components/LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <EnterpriseStats />
      <FeaturesSection />
      <AICapabilitiesSection />
      <WorkflowSection />
      <TestimonialsSection />
      <PricingSection />
      <SecuritySection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}