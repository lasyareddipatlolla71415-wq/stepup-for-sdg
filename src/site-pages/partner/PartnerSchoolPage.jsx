"use client";

import React, { useEffect } from 'react';
import PartnerPageShell from '../../components/contact/PartnerPageShell';
import SchoolFormSection from '../../components/contact/SchoolFormSection';

export default function PartnerSchoolPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PartnerPageShell themeKey="schools">
      <SchoolFormSection />
    </PartnerPageShell>
  );
}
