'use client'

import { useEffect, useState } from 'react'
import { useDashboardTheme } from '../ThemeContext'
import {
  getVolunteerSubmissions, getPartnershipSubmissions, getEventRequests, getFellowshipListings, getWaterConservationRegistrations,
  type VolunteerSubmission, type PartnershipSubmission, type EventRequest, type FellowshipListing, type WaterConservationRegistration,
} from '@/app/lib/adminStore'

type Tab = 'volunteers' | 'ngo' | 'csr' | 'school' | 'fellowship' | 'water'

const TABS: { key: Tab; label: string; color: string }[] = [
  { key: 'volunteers', label: 'Volunteers',      color: '#22c55e' },
  { key: 'ngo',        label: 'NGO Partners',    color: '#3b82f6' },
  { key: 'csr',        label: 'Corporate CSR',   color: '#155DFC' },
  { key: 'school',     label: 'Schools',         color: '#00A8A8' },
  { key: 'fellowship', label: 'Fellowship Listings', color: '#a21942' },
  { key: 'water',      label: 'Water Conservation', color: '#0369a1' },
]

export default function SubmissionsPage() {
  const { dark } = useDashboardTheme()
  const [tab, setTab] = useState<Tab>('volunteers')
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([])
  const [partnerships, setPartnerships] = useState<PartnershipSubmission[]>([])
  const [eventReqs, setEventReqs] = useState<EventRequest[]>([])
  const [fellowships, setFellowships] = useState<FellowshipListing[]>([])
  const [waterRegs, setWaterRegs] = useState<WaterConservationRegistration[]>([])

  useEffect(() => {
    setVolunteers(getVolunteerSubmissions())
    setPartnerships(getPartnershipSubmissions())
    setEventReqs(getEventRequests())
    setFellowships(getFellowshipListings())
    setWaterRegs(getWaterConservationRegistrations())
  }, [])

  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#e8eaf0',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textMuted:   dark ? '#4a5168' : '#9ca3af',
    textSecond:  dark ? '#8891aa' : '#6b7280',
  }

  const ngo     = partnerships.filter(p => p.type === 'NGO')
  const csr     = partnerships.filter(p => p.type === 'COMPANY')
  const schools = partnerships.filter(p => p.type === 'SCHOOL')

  const counts: Record<Tab, number> = {
    volunteers: volunteers.length,
    ngo:        ngo.length,
    csr:        csr.length,
    school:     schools.length,
    fellowship: fellowships.length,
    water: waterRegs.length,
  }

  const activeColor = TABS.find(t => t.key === tab)!.color

  const cell: React.CSSProperties = {
    padding: '11px 14px', borderBottom: `1px solid ${c.border}`,
    fontSize: 13, color: c.textPrimary, verticalAlign: 'middle',
  }
  const head: React.CSSProperties = {
    padding: '10px 14px', fontSize: 11, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.05em',
    color: c.textMuted, background: c.surfaceAlt,
    borderBottom: `1px solid ${c.border}`, whiteSpace: 'nowrap',
  }

  function Empty() {
    return (
      <tr>
        <td colSpan={10} style={{ ...cell, textAlign: 'center', padding: '48px', color: c.textMuted }}>
          No submissions yet.
        </td>
      </tr>
    )
  }

  return (
    <div style={{ padding: '28px', background: c.bg, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary }}>Form Submissions</div>
        <div style={{ fontSize: 12, color: c.textMuted, marginTop: 3 }}>
          All public form submissions — Volunteers, NGO Partners, Corporate CSR, Schools, Fellowship Listings
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 14, marginBottom: 24 }}>
        {TABS.map(t => (
          <div key={t.key} onClick={() => setTab(t.key)} style={{
            background: c.surface,
            borderLeft: `1px solid ${tab === t.key ? t.color : c.border}`,
            borderRight: `1px solid ${tab === t.key ? t.color : c.border}`,
            borderBottom: `1px solid ${tab === t.key ? t.color : c.border}`,
            borderTop: `3px solid ${t.color}`,
            borderRadius: 12, padding: '16px 20px', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: t.color, lineHeight: 1 }}>{counts[t.key]}</div>
            <div style={{ fontSize: 12, color: c.textMuted, marginTop: 4, fontWeight: 500 }}>{t.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: '7px 18px', borderRadius: 7, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
            background: tab === t.key ? t.color : 'transparent',
            color: tab === t.key ? '#fff' : c.textMuted,
            transition: 'all .15s',
          }}>
            {t.label}
            {counts[t.key] > 0 && (
              <span style={{ marginLeft: 6, background: tab === t.key ? 'rgba(255,255,255,.25)' : c.border, borderRadius: 20, fontSize: 10, fontWeight: 700, padding: '1px 6px', color: tab === t.key ? '#fff' : c.textSecond }}>
                {counts[t.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden' }}>

        {/* Volunteers */}
        {tab === 'volunteers' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Phone', 'City', 'Skills', 'Availability', 'Motivation', 'Submitted'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {volunteers.length === 0 ? <Empty /> : volunteers.map(v => (
                <tr key={v.id} style={{ background: 'transparent' }}>
                  <td style={{ ...cell, fontWeight: 600 }}>{v.fullName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{v.email}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{v.phone}</td>
                  <td style={{ ...cell }}>{v.city}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{v.skills}</td>
                  <td style={{ ...cell }}>
                    <span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                      {v.availability}
                    </span>
                  </td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.motivation}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{v.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* NGO */}
        {tab === 'ngo' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Contact', 'Organization', 'Email', 'Type', 'Message', 'Submitted'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ngo.length === 0 ? <Empty /> : ngo.map(p => (
                <tr key={p.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{p.fullName}</td>
                  <td style={{ ...cell }}>{p.organization}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{p.email}</td>
                  <td style={{ ...cell }}>
                    <span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>NGO</span>
                  </td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.message}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{p.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* CSR */}
        {tab === 'csr' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Contact', 'Company', 'Email', 'Type', 'Details', 'Submitted'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csr.length === 0 ? <Empty /> : csr.map(p => (
                <tr key={p.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{p.fullName}</td>
                  <td style={{ ...cell }}>{p.organization}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{p.email}</td>
                  <td style={{ ...cell }}>
                    <span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>COMPANY</span>
                  </td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.message}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{p.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Schools */}
        {tab === 'school' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Contact', 'Institution', 'Email', 'Type', 'Details', 'Submitted'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schools.length === 0 ? <Empty /> : schools.map(p => (
                <tr key={p.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{p.fullName}</td>
                  <td style={{ ...cell }}>{p.organization}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{p.email}</td>
                  <td style={{ ...cell }}>
                    <span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>SCHOOL</span>
                  </td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.message}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{p.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Water Conservation */}
        {tab === 'water' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Phone', 'City', 'Role', 'Site', 'Type', 'Location', 'Water Source', 'Beneficiaries', 'Submitted'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {waterRegs.length === 0 ? <Empty /> : waterRegs.map(r => (
                <tr key={r.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.fullName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.email}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.phone}</td>
                  <td style={{ ...cell }}>{r.city}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.role}</td>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.siteName}</td>
                  <td style={{ ...cell }}>
                    <span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                      {r.siteType}
                    </span>
                  </td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.siteLocation}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.waterSource}</td>
                  <td style={{ ...cell }}>{r.participants}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{r.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Fellowship Listings */}
        {tab === 'fellowship' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Organization', 'Contact', 'Email', 'Role', 'Type', 'Location', 'Duration', 'Compensation', 'Submitted'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fellowships.length === 0 ? <Empty /> : fellowships.map(f => (
                <tr key={f.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{f.orgName}</td>
                  <td style={{ ...cell }}>{f.contact}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{f.email}</td>
                  <td style={{ ...cell, fontWeight: 600 }}>{f.role}</td>
                  <td style={{ ...cell }}>
                    <span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                      {f.type}
                    </span>
                  </td>
                  <td style={{ ...cell, color: c.textSecond }}>{f.location}</td>
                  <td style={{ ...cell }}>{f.duration}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{f.compensation}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{f.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
