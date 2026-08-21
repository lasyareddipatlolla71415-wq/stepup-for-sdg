"use client";

import React, { useEffect } from 'react';
import PartnerPageShell from '../../components/contact/PartnerPageShell';
import VolunteerFormSection from '../../components/contact/VolunteerFormSection';

export default function PartnerVolunteerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PartnerPageShell themeKey="volunteers">
      <VolunteerFormSection />
    </PartnerPageShell>
  );
}
