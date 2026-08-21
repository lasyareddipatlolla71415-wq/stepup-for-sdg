'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type PartnershipSubmission = {
  id: number
  fullName: string
  organization: string
  email: string
  type: string
  message: string
  submittedAt: string
}

type CtxType = {
  submissions: PartnershipSubmission[]
  addSubmission: (s: Omit<PartnershipSubmission, 'id' | 'submittedAt'>) => void
}

const PartnershipFormContext = createContext<CtxType>({
  submissions: [],
  addSubmission: () => {},
})

const seed: PartnershipSubmission[] = [
  { id: 1, fullName: 'Maria Rodriguez', organization: 'Sunrise Cooperative', email: 'maria@sunrise.org', type: 'NGO', message: 'We want to collaborate on SDG 2 — Zero Hunger initiatives in rural communities.', submittedAt: '2024-09-21' },
  { id: 2, fullName: 'Daniel Park', organization: 'OceanGuard Initiative', email: 'daniel@oceanguard.org', type: 'NGO', message: 'Interested in partnering on Life Below Water programs.', submittedAt: '2024-09-18' },
  { id: 3, fullName: 'Aisha Bello', organization: 'Lagos Youth Lab', email: 'aisha@lagosyouth.org', type: 'NGO', message: 'We run quality education programs for youth in Lagos and would love to align with SDG 4.', submittedAt: '2024-09-12' },
]

export function PartnershipFormProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] = useState<PartnershipSubmission[]>(seed)

  const addSubmission = (s: Omit<PartnershipSubmission, 'id' | 'submittedAt'>) => {
    setSubmissions(prev => [...prev, {
      ...s,
      id: Date.now(),
      submittedAt: new Date().toISOString().split('T')[0],
    }])
  }

  return (
    <PartnershipFormContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </PartnershipFormContext.Provider>
  )
}

export const usePartnershipForms = () => useContext(PartnershipFormContext)
