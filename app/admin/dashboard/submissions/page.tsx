'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDashboardTheme } from '../ThemeContext'
import {
  getVolunteerSubmissions, getPartnershipSubmissions, getFellowshipListings, getWaterConservationRegistrations,
  getSdgEducationRegistrations, getSustainabilityRegistrations, getCleanCommunityRegistrations, getCertificateSubmissions,
  updateVolunteerStatus, updatePartnershipStatus, updateFellowshipStatus, updateWaterConservationStatus,
  updateSdgEducationStatus, updateSustainabilityStatus, updateCleanCommunityStatus, updateCertificateStatus,
  type VolunteerSubmission, type PartnershipSubmission, type FellowshipListing,
  type WaterConservationRegistration, type SdgEducationRegistration,
  type SustainabilityRegistration, type CleanCommunityRegistration, type CertificateSubmission, type SubmissionStatus,
} from '@/app/lib/adminStore'

type Tab = 'volunteers' | 'ngo' | 'csr' | 'school' | 'fellowship' | 'water' | 'sdgEducation' | 'sustainability' | 'cleanCommunity' | 'certificates'

const TABS: { key: Tab; label: string; color: string }[] = [
  { key: 'volunteers',      label: 'Volunteers',           color: '#22c55e' },
  { key: 'ngo',             label: 'NGO Partners',         color: '#3b82f6' },
  { key: 'csr',             label: 'Corporate CSR',        color: '#155DFC' },
  { key: 'school',          label: 'Schools',              color: '#00A8A8' },
  { key: 'fellowship',      label: 'Fellowship',           color: '#a21942' },
  { key: 'water',           label: 'Water Conservation',   color: '#0369a1' },
  { key: 'sdgEducation',    label: 'SDG Education',        color: '#c5192d' },
  { key: 'sustainability',  label: 'Sustainability Edu',   color: '#0fae83' },
  { key: 'cleanCommunity',  label: 'Clean Community',      color: '#3f7e44' },
  { key: 'certificates',    label: 'Certificates',          color: '#7c3aed' },
]

const STATUS_COLORS: Record<SubmissionStatus, { text: string; bg: string; border: string }> = {
  pending:  { text: '#f59e0b', bg: 'rgba(245,158,11,.1)',  border: 'rgba(245,158,11,.3)'  },
  approved: { text: '#10b981', bg: 'rgba(16,185,129,.1)',  border: 'rgba(16,185,129,.3)'  },
  rejected: { text: '#ef4444', bg: 'rgba(239,68,68,.1)',   border: 'rgba(239,68,68,.3)'   },
}

function SubmissionsInner() {
  const { dark } = useDashboardTheme()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>(() => (searchParams.get('tab') as Tab) ?? 'volunteers')
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([])
  const [partnerships, setPartnerships] = useState<PartnershipSubmission[]>([])
  const [fellowships, setFellowships] = useState<FellowshipListing[]>([])
  const [waterRegs, setWaterRegs] = useState<WaterConservationRegistration[]>([])
  const [sdgEduRegs, setSdgEduRegs] = useState<SdgEducationRegistration[]>([])
  const [sustainRegs, setSustainRegs] = useState<SustainabilityRegistration[]>([])
  const [cleanRegs, setCleanRegs] = useState<CleanCommunityRegistration[]>([])
  const [certRegs, setCertRegs] = useState<CertificateSubmission[]>([])
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all')

  const reload = () => {
    setVolunteers(getVolunteerSubmissions())
    setPartnerships(getPartnershipSubmissions())
    setFellowships(getFellowshipListings())
    setWaterRegs(getWaterConservationRegistrations())
    setSdgEduRegs(getSdgEducationRegistrations())
    setSustainRegs(getSustainabilityRegistrations())
    setCleanRegs(getCleanCommunityRegistrations())
    setCertRegs(getCertificateSubmissions())
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
    volunteers:     volunteers.length,
    ngo:            ngo.length,
    csr:            csr.length,
    school:         schools.length,
    fellowship:     fellowships.length,
    water:          waterRegs.length,
    sdgEducation:   sdgEduRegs.length,
    sustainability: sustainRegs.length,
    cleanCommunity: cleanRegs.length,
    certificates:   certRegs.length,
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
    const s = STATUS_COLORS[status ?? 'pending']
    return (
      <span style={{ fontSize: 10.5, fontWeight: 700, color: s.text, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 6, padding: '2px 8px', textTransform: 'capitalize' }}>
        {status ?? 'pending'}
      </span>
    )
  }

  function ActionButtons({ id, status, onApprove, onReject }: { id: number; status: SubmissionStatus; onApprove: (id: number) => void; onReject: (id: number) => void }) {
    const s = status ?? 'pending'
    return (
      <div style={{ display: 'flex', gap: 6 }}>
        <button disabled={s === 'approved'} onClick={() => onApprove(id)}
          style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', cursor: s === 'approved' ? 'default' : 'pointer', background: s === 'approved' ? 'rgba(16,185,129,.08)' : 'rgba(16,185,129,.15)', color: s === 'approved' ? '#6b7280' : '#10b981', opacity: s === 'approved' ? 0.5 : 1 }}>
          ✓ Approve
        </button>
        <button disabled={s === 'rejected'} onClick={() => onReject(id)}
          style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', cursor: s === 'rejected' ? 'default' : 'pointer', background: s === 'rejected' ? 'rgba(239,68,68,.08)' : 'rgba(239,68,68,.15)', color: s === 'rejected' ? '#6b7280' : '#ef4444', opacity: s === 'rejected' ? 0.5 : 1 }}>
          ✕ Reject
        </button>
      </div>
    )
  }

  function Empty() {
    return (
      <tr><td colSpan={12} style={{ ...cell, textAlign: 'center', padding: '48px', color: c.textMuted }}>No submissions yet.</td></tr>
    )
  }

  function filterByStatus<T extends { status?: SubmissionStatus }>(list: T[]): T[] {
    return statusFilter === 'all' ? list : list.filter(i => (i.status ?? 'pending') === statusFilter)
  }

  const approveVol = (id: number) => { updateVolunteerStatus(id, 'approved'); reload() }
  const rejectVol  = (id: number) => { updateVolunteerStatus(id, 'rejected'); reload() }
  const approvePart = (id: number) => { updatePartnershipStatus(id, 'approved'); reload() }
  const rejectPart  = (id: number) => { updatePartnershipStatus(id, 'rejected'); reload() }
  const approveFel = (id: number) => { updateFellowshipStatus(id, 'approved'); reload() }
  const rejectFel  = (id: number) => { updateFellowshipStatus(id, 'rejected'); reload() }
  const approveWat = (id: number) => { updateWaterConservationStatus(id, 'approved'); reload() }
  const rejectWat  = (id: number) => { updateWaterConservationStatus(id, 'rejected'); reload() }
  const approveSdg = (id: number) => { updateSdgEducationStatus(id, 'approved'); reload() }
  const rejectSdg  = (id: number) => { updateSdgEducationStatus(id, 'rejected'); reload() }
  const approveSus = (id: number) => { updateSustainabilityStatus(id, 'approved'); reload() }
  const rejectSus  = (id: number) => { updateSustainabilityStatus(id, 'rejected'); reload() }
  const approveCln  = (id: number) => { updateCleanCommunityStatus(id, 'approved'); reload() }
  const rejectCln   = (id: number) => { updateCleanCommunityStatus(id, 'rejected'); reload() }
  const approveCert = (id: number) => { updateCertificateStatus(id, 'approved'); reload() }
  const rejectCert  = (id: number) => { updateCertificateStatus(id, 'rejected'); reload() }

  return (
    <div style={{ padding: '28px', background: c.bg, minHeight: '100vh' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary }}>Form Submissions</div>
        <div style={{ fontSize: 12, color: c.textMuted, marginTop: 3 }}>Review, approve or reject all public form submissions across all 5 projects</div>
      </div>

      {/* Summary cards — 3 rows of 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9,1fr)', gap: 10, marginBottom: 24 }}>
        {TABS.map(t => (
          <div key={t.key} onClick={() => setTab(t.key)} style={{
            background: c.surface,
            borderTop: `3px solid ${t.color}`,
            border: `1px solid ${tab === t.key ? t.color : c.border}`,
            borderRadius: 12, padding: '12px 14px', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.color, lineHeight: 1 }}>{counts[t.key]}</div>
            <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 4, fontWeight: 500, lineHeight: 1.3 }}>{t.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 4, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: 4, flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '6px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
              background: tab === t.key ? t.color : 'transparent',
              color: tab === t.key ? '#fff' : c.textMuted,
            }}>
              {t.label}
              {counts[t.key] > 0 && (
                <span style={{ marginLeft: 5, background: tab === t.key ? 'rgba(255,255,255,.25)' : c.border, borderRadius: 20, fontSize: 10, fontWeight: 700, padding: '1px 5px', color: tab === t.key ? '#fff' : c.textSecond }}>
                  {counts[t.key]}
                </span>
              )}
            </button>
          ))}
        </div>
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

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'auto' }}>

        {/* Volunteers */}
        {tab === 'volunteers' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Name','Email','Phone','City','Skills','Availability','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(volunteers).length === 0 ? <Empty /> : filterByStatus(volunteers).map(v => (
                <tr key={v.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{v.fullName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{v.email}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{v.phone}</td>
                  <td style={cell}>{v.city}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{v.skills}</td>
                  <td style={cell}><span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{v.availability}</span></td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{v.submittedAt}</td>
                  <td style={cell}><StatusBadge status={v.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={v.id} status={v.status ?? 'pending'} onApprove={approveVol} onReject={rejectVol} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* NGO */}
        {tab === 'ngo' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Contact','Organization','Email','Message','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(ngo).length === 0 ? <Empty /> : filterByStatus(ngo).map(p => (
                <tr key={p.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{p.fullName}</td>
                  <td style={cell}>{p.organization}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{p.email}</td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.message}</td>
                  <td style={{ ...cell, color: c.textMuted }}>{p.submittedAt}</td>
                  <td style={cell}><StatusBadge status={p.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={p.id} status={p.status ?? 'pending'} onApprove={approvePart} onReject={rejectPart} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* CSR */}
        {tab === 'csr' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Contact','Company','Email','Details','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(csr).length === 0 ? <Empty /> : filterByStatus(csr).map(p => (
                <tr key={p.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{p.fullName}</td>
                  <td style={cell}>{p.organization}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{p.email}</td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.message}</td>
                  <td style={{ ...cell, color: c.textMuted }}>{p.submittedAt}</td>
                  <td style={cell}><StatusBadge status={p.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={p.id} status={p.status ?? 'pending'} onApprove={approvePart} onReject={rejectPart} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Schools */}
        {tab === 'school' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Contact','Institution','Email','Details','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(schools).length === 0 ? <Empty /> : filterByStatus(schools).map(p => (
                <tr key={p.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{p.fullName}</td>
                  <td style={cell}>{p.organization}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{p.email}</td>
                  <td style={{ ...cell, color: c.textSecond, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.message}</td>
                  <td style={{ ...cell, color: c.textMuted }}>{p.submittedAt}</td>
                  <td style={cell}><StatusBadge status={p.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={p.id} status={p.status ?? 'pending'} onApprove={approvePart} onReject={rejectPart} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Fellowship */}
        {tab === 'fellowship' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Organization','Contact','Email','Role','Type','Location','Duration','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(fellowships).length === 0 ? <Empty /> : filterByStatus(fellowships).map(f => (
                <tr key={f.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{f.orgName}</td>
                  <td style={cell}>{f.contact}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{f.email}</td>
                  <td style={{ ...cell, fontWeight: 600 }}>{f.role}</td>
                  <td style={cell}><span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{f.type}</span></td>
                  <td style={{ ...cell, color: c.textSecond }}>{f.location}</td>
                  <td style={cell}>{f.duration}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{f.submittedAt}</td>
                  <td style={cell}><StatusBadge status={f.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={f.id} status={f.status ?? 'pending'} onApprove={approveFel} onReject={rejectFel} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Water Conservation */}
        {tab === 'water' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Name','Email','City','Role','Site','Type','Participants','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(waterRegs).length === 0 ? <Empty /> : filterByStatus(waterRegs).map(r => (
                <tr key={r.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.fullName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.email}</td>
                  <td style={cell}>{r.city}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.role}</td>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.siteName}</td>
                  <td style={cell}><span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{r.siteType}</span></td>
                  <td style={cell}>{r.participants}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{r.submittedAt}</td>
                  <td style={cell}><StatusBadge status={r.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={r.id} status={r.status ?? 'pending'} onApprove={approveWat} onReject={rejectWat} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* SDG Education */}
        {tab === 'sdgEducation' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['School','Type','Contact','Email','Phone','City','State','Students','Grade','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(sdgEduRegs).length === 0 ? <Empty /> : filterByStatus(sdgEduRegs).map(r => (
                <tr key={r.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.schoolName}</td>
                  <td style={cell}><span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{r.schoolType}</span></td>
                  <td style={cell}>{r.contactName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.email}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.phone}</td>
                  <td style={cell}>{r.city}</td>
                  <td style={cell}>{r.state}</td>
                  <td style={cell}>{r.studentCount}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.grade}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{r.submittedAt}</td>
                  <td style={cell}><StatusBadge status={r.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={r.id} status={r.status ?? 'pending'} onApprove={approveSdg} onReject={rejectSdg} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Sustainability Education */}
        {tab === 'sustainability' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Full Name','Email','Phone','Country','Organization','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(sustainRegs).length === 0 ? <Empty /> : filterByStatus(sustainRegs).map(r => (
                <tr key={r.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.fullName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.email}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.phone}</td>
                  <td style={cell}>{r.country}</td>
                  <td style={cell}>{r.organization}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{r.submittedAt}</td>
                  <td style={cell}><StatusBadge status={r.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={r.id} status={r.status ?? 'pending'} onApprove={approveSus} onReject={rejectSus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Clean Community */}
        {tab === 'cleanCommunity' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Organisation','Type','Contact','Email','City','State','Size','SDG Focus','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(cleanRegs).length === 0 ? <Empty /> : filterByStatus(cleanRegs).map(r => (
                <tr key={r.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.orgName}</td>
                  <td style={cell}><span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{r.orgType}</span></td>
                  <td style={cell}>{r.contactName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.email}</td>
                  <td style={cell}>{r.city}</td>
                  <td style={cell}>{r.state}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.size}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.sdgFocus}</td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{r.submittedAt}</td>
                  <td style={cell}><StatusBadge status={r.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={r.id} status={r.status ?? 'pending'} onApprove={approveCln} onReject={rejectCln} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Certificates */}
        {tab === 'certificates' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Full Name','Email','Course','File','Submitted','Status','Actions'].map(h => <th key={h} style={head}>{h}</th>)}</tr></thead>
            <tbody>
              {filterByStatus(certRegs).length === 0 ? <Empty /> : filterByStatus(certRegs).map(r => (
                <tr key={r.id}>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.fullName}</td>
                  <td style={{ ...cell, color: c.textSecond }}>{r.email}</td>
                  <td style={cell}><span style={{ background: `${activeColor}18`, color: activeColor, border: `1px solid ${activeColor}40`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{r.course}</span></td>
                  <td style={cell}>
                    {r.fileDataUrl ? (
                      <a href={r.fileDataUrl} download={r.fileName} style={{ color: activeColor, fontWeight: 600, fontSize: 12, textDecoration: 'underline' }}>{r.fileName}</a>
                    ) : (
                      <span style={{ color: c.textMuted, fontSize: 12 }}>{r.fileName}</span>
                    )}
                  </td>
                  <td style={{ ...cell, color: c.textMuted, whiteSpace: 'nowrap' }}>{r.submittedAt}</td>
                  <td style={cell}><StatusBadge status={r.status ?? 'pending'} /></td>
                  <td style={cell}><ActionButtons id={r.id} status={r.status ?? 'pending'} onApprove={approveCert} onReject={rejectCert} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default function SubmissionsPage() {
  return <Suspense><SubmissionsInner /></Suspense>
}
