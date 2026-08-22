"use client";

import React from 'react';
import HeroSection from '../components/hero/HeroSection';
import ThreeWaysSection from '../components/three-ways/ThreeWaysSection';
import IndiaMapSection from '../components/india-map/IndiaMapSection';
import ViksitIndiaSection from '../components/viksit-india/ViksitIndiaSection';
import PartnersMarquee from '../components/partners/PartnersMarquee';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg overflow-x-hidden">
      <HeroSection />
      <ThreeWaysSection />
      <IndiaMapSection />
      <PartnersMarquee />
      <ViksitIndiaSection />
    </div>
  );
}
