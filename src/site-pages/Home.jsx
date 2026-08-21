"use client";

import React from 'react';
import HeroSection from '../components/hero/HeroSection';
import ThreeWaysSection from '../components/three-ways/ThreeWaysSection';
import IndiaMapSection from '../components/india-map/IndiaMapSection';
import ViksitIndiaSection from '../components/viksit-india/ViksitIndiaSection';
import PartnersMarquee from '../components/partners/PartnersMarquee';

// Navigation and footer are provided once by app/components/SiteShell.
// The Home page therefore contains only the Rahini page content.
export default function Home() {
  return (
    <>
      <HeroSection />
      <ThreeWaysSection />
      <IndiaMapSection />
      <PartnersMarquee />
      <ViksitIndiaSection />
    </>
  );
}
