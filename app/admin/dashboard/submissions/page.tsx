'use client'

import { useEffect, useState } from 'react'
import { useDashboardTheme } from '../ThemeContext'
import {
  getVolunteerSubmissions, getPartnershipSubmissions, getFellowshipListings, getWaterConservationRegistrations,
  updateVolunteerStatus, updatePartnershipStatus, updateFellowshipStatus, updateWaterConservationStatus,
  type VolunteerSubmission, type PartnershipSubmission, type FellowshipListing, type WaterConservationRegistration, type SubmissionStatus,
} from '@/app/lib/adminStore'

type Tab = 'volunteers' | 'ngo' | 'csr' | 'school' | 'fellowship' | 'water'

const TABS: { key: Tab; label: string; color: string }[] = [
  { key: 'volunteers', label: 'Volunteers',          color: '#22c55e' },
  { key: 'ngo',        label: 'NGO Partners',        color: '#3b82f6' },
  { key: 'csr',        label: 'Corporate CSR',       color: '#155DFC' },
  { key: 'school',     label: 'Schools',             color: '#00A8A8' },
  { key: 'fellowship', label: 'Fellowship Listings', color: '#a21942' },
  { key: 'water',      label: 'Water Conservation',  color: '#0369a1' },
]

const STATUS_COLORS: Record<SubmissionStatus, { text: string; bg: string; border: string }> = {
  pending:  { text: '#f59e0b', bg: 'rgba(245,158,11,.1)',  border: 'rgba(245,158,11,.3)'  },
  approved: { text: '#10b981', bg: 'rgba(16,185,129,.1)',  border: 'rgba(16,185,129,.3)'  },
  rejected: { text: '#ef4444', bg: 'rgba(239,68,68,.1)',   border: 'rgba(239,68,68,.3)'   },
}

export default function SubmissionsPage() {
  const { dark } = useDashboardTheme()
  const [tab, setTab] = useState<Tab>('volunteers')
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([])
  const [partnerships, setPartnerships] = useState<PartnershipSubmission[]>([])
  const [fellowships, setFellowships] = useState<FellowshipListing[]>([])
  const [waterRegs, setWaterRegs] = useState<WaterConservationRegistration[]>([])
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all')

  const reload = () => {
    setVolunteers(getVolunteerSubmissions())
    setPartnerships(getPartnershipSubmissions())
    setFellowships(getFellowshipListings())
    setWaterRegs(getWaterConservationRegistrations())
  }

  useEffect(() => { reload() }, [])

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
    water:      waterRegs.length,
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

  function StatusBadge({ status }: { status: SubmissionStatus }) {
    const s = STATUS_COLORS[status]
    return (
      <span style={{ fontSize: 10.5, fontWeight: 700, color: s.text, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 6, padding: '2px 8px', textTransform: 'capitalize' }}>
        {status}
      </span>
    )
  }

  function ActionButtons({ id, status, onApprove, onReject }: { id: number; status: SubmissionStatus; onApprove: (id: number) => void; onReject: (id: number) => void }) {
    return (
      <div style={{ display: 'flex', gap: 6 }}>
        <button
          disabled={status === 'approved'}
          onClick={() => onApprove(id)}
          style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', cursor: status === 'approved' ? 'default' : 'pointer', background: status === 'approved' ? 'rgba(16,185,129,.08)' : 'rgba(16,185,129,.15)', color: status === 'approved' ? '#6b7280' : '#10b981', opacity: status === 'approved' ? 0.5 : 1 }}
        >✓ Approve</button>
        <button
          disabled={status === 'rejected'}
          onClick={() => onReject(id)}
          style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', cursor: status === 'rejected' ? 'default' : 'pointer', background: status === 'rejected' ? 'rgba(239,68,68,.08)' : 'rgba(239,68,68,.15)', color: status === 'rejected' ? '#6b7280' : '#ef4444', opacity: status === 'rejected' ? 0.5 : 1 }}
        >✕ Reject</button>
      </div>
    )
  }

  function Empty() {
    return (
      <tr>
        <td colSpan={12} style={{ ...cell, textAlign: 'center', padding: '48px', color: c.textMuted }}>
          No submissions yet.
        </td>
      </tr>
    )
  }

  function filterByStatus<T extends { status: SubmissionStatus }>(list: T[]): T[] {
    return statusFilter === 'all' ? list : list.filter(i => i.status === statusFilter)
  }

  // Handlers
  const approveVolunteer = (id: number) => { updateVolunteerStatus(id, 'approved'); reload() }
  const rejectVolunteer  = (id: number) => { updateVolunteerStatus(id, 'rejected'); reload() }
  const approvePartnership = (id: number) => { updatePartnershipStatus(id, 'approved'); reload() }
  const rejectPartnership  = (id: number) => { updatePartnershipStatus(id, 'rejected'); reload() }
  const approveFellowship = (id: number) => { updateFellowshipStatus(id, 'approved'); reload() }
  const rejectFellowship  = (id: number) => { updateFellowshipStatus(id, 'rejected'); reload() }
  const approveWater = (id: number) => { updateWaterConservationStatus(id, 'approved'); reload() }
  const rejectWater  = (id: number) => { updateWaterConservationStatus(id, 'rejected'); reload() }

  return (
    <div style={{ padding: '28px', background: c.bg, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary }}>Form Submissions</div>
        <div style={{ fontSize: 12, color: c.textMuted, marginTop: 3 }}>
          Review, approve or reject all public form submissions
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

      {/* Tabs + Status Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 4, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: 4, width: 'fit-content' }}>
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

        {/* Status filter */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(['all', 'pending', 'approved', 'rejected'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{
              padding: '6px 14px', borderRadius: 7, border: `1px solid ${statusFilter === s ? activeColor : c.border}`,
              background: statusFilter === s ? `${activeColor}18` : c.surface,
              color: statusFilter === s ? activeColor : c.textMuted,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize',
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'auto' }}>

        {/* Volunteers */}
        {tab === 'volunteers' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Phone', 'City', 'Skills', 'Availability', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterByStatus(volunteers).length === 0 ? <Empty /> : filterByStatus(volunteers).map(v => (
                <tr key={v.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{v.fullName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{v.email}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{v.phone}</td>
                  <td style={cell}>{v.city}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{v.skills}</td>
                  <td style={cell}>
                    <span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                      {v.availability}
                    </span>
                  </td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{v.submittedAt}</td>
                  <td style={cell}><StatusBadge status={v.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={v.id} status={v.status ?? 'pending'} onApprove={approveVolunteer} onReject={rejectVolunteer} /></td>
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
                {['Contact', 'Organization', 'Email', 'Message', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterByStatus(ngo).length === 0 ? <Empty /> : filterByStatus(ngo).map(p => (
                <tr key={p.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{p.fullName}</td>
                  <td style={cell}>{p.organization}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{p.email}</td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.message}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{p.submittedAt}</td>
                  <td style={cell}><StatusBadge status={p.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={p.id} status={p.status ?? 'pending'} onApprove={approvePartnership} onReject={rejectPartnership} /></td>
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
                {['Contact', 'Company', 'Email', 'Details', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterByStatus(csr).length === 0 ? <Empty /> : filterByStatus(csr).map(p => (
                <tr key={p.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{p.fullName}</td>
                  <td style={cell}>{p.organization}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{p.email}</td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.message}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{p.submittedAt}</td>
                  <td style={cell}><StatusBadge status={p.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={p.id} status={p.status ?? 'pending'} onApprove={approvePartnership} onReject={rejectPartnership} /></td>
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
                {['Contact', 'Institution', 'Email', 'Details', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterByStatus(schools).length === 0 ? <Empty /> : filterByStatus(schools).map(p => (
                <tr key={p.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{p.fullName}</td>
                  <td style={cell}>{p.organization}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{p.email}</td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.message}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{p.submittedAt}</td>
                  <td style={cell}><StatusBadge status={p.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={p.id} status={p.status ?? 'pending'} onApprove={approvePartnership} onReject={rejectPartnership} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Fellowship */}
        {tab === 'fellowship' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Organization', 'Contact', 'Email', 'Role', 'Type', 'Location', 'Duration', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterByStatus(fellowships).length === 0 ? <Empty /> : filterByStatus(fellowships).map(f => (
                <tr key={f.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{f.orgName}</td>
                  <td style={cell}>{f.contact}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{f.email}</td>
                  <td style={{ ...cell, fontWeight: 600 }}>{f.role}</td>
                  <td style={cell}>
                    <span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{f.type}</span>
                  </td>
                  <td style={{ ...cell, color: c.textSecond }}>{f.location}</td>
                  <td style={cell}>{f.duration}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{f.submittedAt}</td>
                  <td style={cell}><StatusBadge status={f.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={f.id} status={f.status ?? 'pending'} onApprove={approveFellowship} onReject={rejectFellowship} /></td>
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
                {['Name', 'Email', 'City', 'Role', 'Site', 'Type', 'Participants', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} style={head}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterByStatus(waterRegs).length === 0 ? <Empty /> : filterByStatus(waterRegs).map(r => (
                <tr key={r.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.fullName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.email}</td>
                  <td style={cell}>{r.city}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.role}</td>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.siteName}</td>
                  <td style={cell}>
                    <span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{r.siteType}</span>
                  </td>
                  <td style={cell}>{r.participants}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{r.submittedAt}</td>
                  <td style={cell}><StatusBadge status={r.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={r.id} status={r.status ?? 'pending'} onApprove={approveWater} onReject={rejectWater} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
