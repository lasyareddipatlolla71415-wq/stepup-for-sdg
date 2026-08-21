"use client";

import React, { useEffect } from 'react';
import PartnerPageShell from '../../components/contact/PartnerPageShell';
import CSRFormSection from '../../components/contact/CSRFormSection';

export default function PartnerCompanyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PartnerPageShell themeKey="corporate">
      <CSRFormSection />
    </PartnerPageShell>
  );
}
