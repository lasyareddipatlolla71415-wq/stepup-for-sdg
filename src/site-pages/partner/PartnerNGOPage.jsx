"use client";

import React, { useEffect } from 'react';
import PartnerPageShell from '../../components/contact/PartnerPageShell';
import NGOFormSection from '../../components/contact/NGOFormSection';

export default function PartnerNGOPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PartnerPageShell themeKey="ngos">
      <NGOFormSection />
    </PartnerPageShell>
  );
}
