'use client'

import { useEffect, useState } from 'react'
import { useDashboardTheme } from '../ThemeContext'
import {
  getVolunteerSubmissions, getFellowshipListings, getWaterConservationRegistrations,
  getPartnershipSubmissions,
} from '@/app/lib/adminStore'

type Project = {
  id: string
  name: string
  description: string
  sdgs: number[]
  icon: string
  color: string
  registrationKey: 'volunteers' | 'fellowship' | 'water' | 'partnerships' | 'none'
  href: string
  includes: string[]
}

const PROJECTS: Project[] = [
  {
    id: 'sdg-education',
    name: 'SDG Education for Students',
    description: 'Empowering students with knowledge about the 17 Sustainable Development Goals through structured curriculum and workshops.',
    sdgs: [4, 17],
    icon: '📚',
    color: '#3b6ef6',
    registrationKey: 'volunteers',
    href: '/projects/sdg-education',
    includes: ['SDG curriculum modules', 'Student workshops', 'Teacher training', 'Impact assessments'],
  },
  {
    id: 'sustainability-education',
    name: 'Sustainability Education Program',
    description: 'A comprehensive program teaching sustainability practices to schools and colleges across India.',
    sdgs: [4, 13, 15],
    icon: '🌱',
    color: '#10b981',
    registrationKey: 'partnerships',
    href: '/projects/sustainability-education',
    includes: ['School partnerships', 'Sustainability audits', 'Green campus initiatives', 'Annual reports'],
  },
  {
    id: 'fellowship',
    name: 'Fellowship Program',
    description: 'Connecting passionate individuals with NGOs and social enterprises for meaningful fellowship opportunities.',
    sdgs: [8, 10, 17],
    icon: '🎓',
    color: '#8b5cf6',
    registrationKey: 'fellowship',
    href: '/projects/fellowship',
    includes: ['Fellowship listings', 'Mentorship matching', 'Impact tracking', 'Certification'],
  },
  {
    id: 'water-conservation',
    name: 'Water Conservation Program',
    description: 'Community-driven water conservation initiatives targeting SDG 6 — Clean Water and Sanitation.',
    sdgs: [6, 3, 11],
    icon: '💧',
    color: '#06b6d4',
    registrationKey: 'water',
    href: '/projects/water-conservation',
    includes: ['Site registrations', 'Water audits', 'Community training', 'Progress monitoring'],
  },
  {
    id: 'clean-community',
    name: 'Clean Community Initiative',
    description: 'Mobilising youth and communities to drive cleanliness, waste management, and sustainable living.',
    sdgs: [11, 12, 13],
    icon: '♻️',
    color: '#f59e0b',
    registrationKey: 'none',
    href: '/projects/clean-community',
    includes: ['Community drives', 'Waste audits', 'Youth mobilisation', 'Partner NGOs'],
  },
]

export default function ProjectsPage() {
  const { dark } = useDashboardTheme()
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>(PROJECTS)
  const [editForm, setEditForm] = useState<Partial<Project>>({})

  useEffect(() => {
    const volunteers    = getVolunteerSubmissions().length
    const fellowship    = getFellowshipListings().length
    const water         = getWaterConservationRegistrations().length
    const partnerships  = getPartnershipSubmissions().length
    setCounts({ volunteers, fellowship, water, partnerships, none: 0 })
  }, [])

  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#e8eaf0',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textMuted:   dark ? '#4a5168' : '#9ca3af',
    textSecond:  dark ? '#8891aa' : '#6b7280',
    shadow:      dark ? '0 2px 12px rgba(0,0,0,.4)' : '0 1px 6px rgba(17,24,39,.07)',
  }

  const card = {
    background: c.surface,
    border: `1px solid ${c.border}`,
    borderRadius: 14,
    boxShadow: c.shadow,
  }

  const openEdit = (p: Project) => {
    setEditProject(p)
    setEditForm({ name: p.name, description: p.description })
  }

  const saveEdit = () => {
    if (!editProject) return
    setProjects(prev => prev.map(p => p.id === editProject.id ? { ...p, ...editForm } : p))
    setEditProject(null)
  }

  const totalRegistrations = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <div style={{ padding: '28px', background: c.bg, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary }}>Projects Management</div>
          <div style={{ fontSize: 12, color: c.textMuted, marginTop: 3 }}>
            Manage all 5 active projects and view registration counts
          </div>
        </div>
        <div style={{ background: `rgba(59,110,246,.1)`, border: `1px solid rgba(59,110,246,.2)`, borderRadius: 10, padding: '10px 18px', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#3b6ef6' }}>{totalRegistrations}</div>
          <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>Total Registrations</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }}>
        {projects.map(p => {
          const regCount = counts[p.registrationKey] ?? 0
          return (
            <div key={p.id} style={{ ...card, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.color }} />
              <div style={{ padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 28 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: c.textPrimary, lineHeight: 1.3 }}>{p.name}</div>
                      <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
                        {p.sdgs.map(s => (
                          <span key={s} style={{ fontSize: 9.5, fontWeight: 600, color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}30`, borderRadius: 4, padding: '1px 6px' }}>SDG {s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: p.color, lineHeight: 1 }}>{regCount}</div>
                    <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2 }}>registrations</div>
                  </div>
                </div>

                <div style={{ fontSize: 12.5, color: c.textSecond, lineHeight: 1.6, marginBottom: 14 }}>{p.description}</div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Includes</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.includes.map((item, i) => (
                      <span key={i} style={{ fontSize: 11, color: c.textSecond, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 6, padding: '3px 9px' }}>{item}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, paddingTop: 14, borderTop: `1px solid ${c.border}` }}>
                  <button onClick={() => openEdit(p)} style={{ flex: 1, padding: '8px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    ✏️ Edit Details
                  </button>
                  <a href={p.href} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '8px', borderRadius: 8, border: `1px solid ${p.color}40`, background: `${p.color}10`, color: p.color, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    🔗 View Public Page
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Modal */}
      {editProject && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setEditProject(null)}>
          <div style={{ ...card, width: 480, padding: '28px', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary, marginBottom: 20 }}>Edit Project — {editProject.name}</div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: c.textMuted, display: 'block', marginBottom: 6 }}>Project Name</label>
              <input
                value={editForm.name ?? ''}
                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: c.textMuted, display: 'block', marginBottom: 6 }}>Description</label>
              <textarea
                value={editForm.description ?? ''}
                onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={saveEdit} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#3b6ef6', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Save Changes</button>
              <button onClick={() => setEditProject(null)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
