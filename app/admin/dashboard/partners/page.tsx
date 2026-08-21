'use client'

import { useState, useMemo } from 'react'
import { useDashboardTheme } from '../ThemeContext'
import { DIRECTORY, type PartnerOrg } from '@/app/components/partners/partnersData'

const FILTERS = ['All', 'NGOs', 'Companies'] as const
type Filter = typeof FILTERS[number]

const FILTER_MAP: Record<Exclude<Filter, 'All'>, string> = { NGOs: 'NGO', Companies: 'Company' }

const TYPE_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  NGO:     { bg: 'rgba(6,182,212,.12)',  text: '#06b6d4', border: 'rgba(6,182,212,.3)'  },
  Company: { bg: 'rgba(239,68,68,.12)',  text: '#ef4444', border: 'rgba(239,68,68,.3)'  },
}
const TIER_COLOR: Record<string, string> = { Gold: '#f59e0b', Silver: '#94a3b8' }

// Extended detail data keyed by org id
const DETAIL: Record<string, {
  story: string
  stats: { label: string; value: string }[]
  journey?: { title: string; amount: string; status: 'Completed' | 'Ongoing' }[]
}> = {
  'greenearth-initiative': {
    story: 'Co-designed a tree-cover restoration curriculum now used across 6 partner schools.',
    stats: [
      { label: 'Projects',      value: '12'  },
      { label: 'Cities',        value: '4'   },
      { label: 'SDG Goals',     value: '5'   },
      { label: 'Beneficiaries', value: '840' },
      { label: 'Years active',  value: '3'   },
      { label: 'Partners',      value: '6'   },
    ],
  },
  'hope-ngo': {
    story: 'Delivered community outreach programs across 3 cities, reaching 1,200+ low-income families.',
    stats: [
      { label: 'Projects',      value: '8'    },
      { label: 'Cities',        value: '3'    },
      { label: 'SDG Goals',     value: '3'    },
      { label: 'Beneficiaries', value: '1200' },
      { label: 'Years active',  value: '2'    },
      { label: 'Partners',      value: '4'    },
    ],
  },
  'techcorp-india': {
    story: 'A Rs50L CSR commitment turned into 3 audited programs reaching 620 students.',
    stats: [
      { label: 'Total contributed', value: 'Rs50L' },
      { label: 'Funds utilized',    value: 'Rs38L' },
      { label: 'Remaining',         value: 'Rs12L' },
      { label: 'Students reached',  value: '620'   },
      { label: 'Schools helped',    value: '12'    },
      { label: 'Workshops done',    value: '8'     },
    ],
    journey: [
      { title: 'SDG Workshop — Hyderabad', amount: 'Rs15L', status: 'Completed' },
      { title: 'AI Bootcamp for Schools',  amount: 'Rs12L', status: 'Ongoing'   },
      { title: 'Climate Action Camp',      amount: 'Rs11L', status: 'Completed' },
    ],
  },
  'ecovolt-energy': {
    story: 'Rs20L invested in green campus programs across 6 schools, cutting energy use by 30%.',
    stats: [
      { label: 'Total contributed', value: 'Rs20L' },
      { label: 'Funds utilized',    value: 'Rs14L' },
      { label: 'Remaining',         value: 'Rs6L'  },
      { label: 'Students reached',  value: '310'   },
      { label: 'Schools helped',    value: '6'     },
      { label: 'Workshops done',    value: '4'     },
    ],
    journey: [
      { title: 'Solar Lab Setup — Chennai',   amount: 'Rs8L', status: 'Completed' },
      { title: 'Green Campus Drive',          amount: 'Rs6L', status: 'Ongoing'   },
    ],
  },
  'infrabuild-corp': {
    story: 'Rs30L channelled into rebuilding 4 school facilities, benefiting 900+ students.',
    stats: [
      { label: 'Total contributed', value: 'Rs30L' },
      { label: 'Funds utilized',    value: 'Rs22L' },
      { label: 'Remaining',         value: 'Rs8L'  },
      { label: 'Students reached',  value: '900'   },
      { label: 'Schools helped',    value: '4'     },
      { label: 'Workshops done',    value: '5'     },
    ],
    journey: [
      { title: 'School Rebuild — Mumbai',    amount: 'Rs12L', status: 'Completed' },
      { title: 'Infrastructure Workshop',    amount: 'Rs10L', status: 'Completed' },
    ],
  },
}

function Modal({ org, onClose, onEdit, onDelete, c }: { org: PartnerOrg; onClose: () => void; onEdit: () => void; onDelete: () => void; c: Record<string, string> }) {
  const detail = DETAIL[org.id]
  const tc = TYPE_COLOR[org.type]
  const isCompany = org.type === 'Company'
  const statColor = isCompany ? 'rgba(239,68,68,.08)' : 'rgba(6,182,212,.08)'
  const statBorder = isCompany ? 'rgba(239,68,68,.2)' : 'rgba(6,182,212,.2)'
  const statText   = isCompany ? '#ef4444' : '#06b6d4'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div style={{ background: c.surface, borderRadius: 20, width: 420, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,.3)', border: `1px solid ${c.border}` }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: '20px 20px 14px', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: c.textPrimary }}>{org.name}</div>
              <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {org.location} · Since {org.since}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: tc.text, background: tc.bg, border: `1px solid ${tc.border}`, borderRadius: 6, padding: '3px 9px' }}>{org.type}</span>
                {org.tier && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: TIER_COLOR[org.tier], background: `${TIER_COLOR[org.tier]}20`, border: `1px solid ${TIER_COLOR[org.tier]}50`, borderRadius: 6, padding: '3px 9px' }}>★ {org.tier}</span>
                )}
              </div>
            </div>
            <button onClick={onClose} style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: 14, color: c.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</button>
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Story */}
          {detail && (
            <div style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>The Story So Far</div>
              <div style={{ fontSize: 13, color: c.textPrimary, lineHeight: 1.6 }}>
                {detail.story.split(/(Rs\d+\w*|\d[\d,]*\+?\s*(?:students|schools|programs|families|cities|partner schools))/gi).map((part, i) =>
                  /Rs\d|\d[\d,]*\+?\s*(?:students|schools|programs|families|cities|partner schools)/i.test(part)
                    ? <span key={i} style={{ color: statText, fontWeight: 700 }}>{part}</span>
                    : part
                )}
              </div>
            </div>
          )}

          {/* Verified banner */}
          <div style={{ background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Verified Partner
            </span>
            <span style={{ fontSize: 11, color: '#10b981', fontWeight: 500 }}>Audited · Impact verified</span>
          </div>

          {/* Stats grid */}
          {detail && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {detail.stats.map((s, i) => (
                <div key={i} style={{ background: statColor, border: `1px solid ${statBorder}`, borderRadius: 10, padding: '12px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: statText, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Funding Journey (companies only) */}
          {detail?.journey && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Funding Journey</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {detail.journey.map((j, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: i < detail.journey!.length - 1 ? 14 : 0, position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: j.status === 'Completed' ? '#ef4444' : c.border, border: `2px solid ${j.status === 'Completed' ? '#ef4444' : c.textMuted}`, marginTop: 3 }} />
                      {i < detail.journey!.length - 1 && <div style={{ width: 1, flex: 1, background: c.border, marginTop: 4, minHeight: 24 }} />}
                    </div>
                    <div style={{ flex: 1, borderBottom: i < detail.journey!.length - 1 ? `1px solid ${c.border}` : 'none', paddingBottom: i < detail.journey!.length - 1 ? 14 : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>{j.title}</div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#ef4444' }}>{j.amount}</div>
                      </div>
                      <div style={{ fontSize: 11, color: c.textMuted, marginTop: 3, display: 'flex', gap: 8 }}>
                        <span>{j.status}</span>
                        {j.status === 'Completed' && <span style={{ color: '#10b981' }}>✓ Verified</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SDGs + description */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
              {org.sdgs.map(s => (
                <span key={s} style={{ fontSize: 10, fontWeight: 600, color: c.textSecond, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 5, padding: '3px 8px' }}>SDG {s}</span>
              ))}
            </div>
            <div style={{ fontSize: 12.5, color: c.textSecond, lineHeight: 1.6 }}>{org.description}</div>
          </div>

          {/* Recent activity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: c.textMuted, borderTop: `1px solid ${c.border}`, paddingTop: 12 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', flexShrink: 0 }} />
            {org.activity}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button onClick={onEdit} style={{ flex: 1, padding: '10px', borderRadius: 10, border: `1px solid ${c.accent}40`, background: c.accentLight, color: c.accentText, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button onClick={onDelete} style={{ flex: 1, padding: '10px', borderRadius: 10, border: '1px solid rgba(239,68,68,.3)', background: 'rgba(239,68,68,.08)', color: '#ef4444', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PartnersPage() {
  const { dark } = useDashboardTheme()
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<PartnerOrg | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<PartnerOrg | null>(null)
  const [editTarget, setEditTarget] = useState<PartnerOrg | null>(null)
  const [editForm, setEditForm] = useState<Partial<PartnerOrg>>({})
  const [view, setView] = useState<'grid' | 'table'>('grid')

  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#e8eaf0',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textSecond:  dark ? '#8891aa' : '#6b7280',
    textMuted:   dark ? '#4a5168' : '#9ca3af',
    accent:      '#3b6ef6',
    accentLight: dark ? 'rgba(59,110,246,.18)' : 'rgba(59,110,246,.08)',
    accentText:  dark ? '#7aa3fb' : '#2563eb',
    green:       '#10b981',
    shadow:      dark ? '0 2px 12px rgba(0,0,0,.4)' : '0 1px 6px rgba(17,24,39,.07)',
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return DIRECTORY.filter(o => {
      if (o.type !== 'NGO' && o.type !== 'Company') return false
      if (filter !== 'All' && o.type !== FILTER_MAP[filter as Exclude<Filter, 'All'>]) return false
      if (q && !o.name.toLowerCase().includes(q) && !o.location.toLowerCase().includes(q)) return false
      return true
    })
  }, [filter, query])

  const ngoCount     = DIRECTORY.filter(o => o.type === 'NGO').length
  const companyCount = DIRECTORY.filter(o => o.type === 'Company').length

  return (
    <>
      {selected && <Modal org={selected} onClose={() => setSelected(null)} onEdit={() => { setEditTarget(selected); setEditForm({ name: selected.name, location: selected.location, tier: selected.tier, since: selected.since, funding: selected.funding }); setSelected(null) }} onDelete={() => { setDeleteTarget(selected); setSelected(null) }} c={c} />}

      {/* Edit modal */}
      {editTarget && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => setEditTarget(null)}>
          <div style={{ background: c.surface, borderRadius: 18, width: 420, padding: '24px', boxShadow: '0 24px 60px rgba(0,0,0,.35)', border: `1px solid ${c.border}` }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: c.textPrimary }}>Edit Partner</div>
              <button onClick={() => setEditTarget(null)} style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: 14, color: c.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {([
                { label: 'Organisation Name', key: 'name',     type: 'text'   },
                { label: 'Location / City',   key: 'location', type: 'text'   },
                { label: 'Since (Year)',       key: 'since',    type: 'number' },
                { label: 'Funding (e.g. Rs50L)', key: 'funding', type: 'text' },
              ] as { label: string; key: keyof PartnerOrg; type: string }[]).map(field => (
                <div key={field.key}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{field.label}</div>
                  <input
                    type={field.type}
                    value={(editForm[field.key] as string | number) ?? ''}
                    onChange={e => setEditForm(f => ({ ...f, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Tier</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['Gold', 'Silver', 'None'] as const).map(t => (
                    <button key={t} onClick={() => setEditForm(f => ({ ...f, tier: t === 'None' ? null : t }))}
                      style={{ flex: 1, padding: '8px', borderRadius: 9, border: `1px solid ${editForm.tier === (t === 'None' ? null : t) ? TIER_COLOR[t] ?? c.accent : c.border}`, background: editForm.tier === (t === 'None' ? null : t) ? `${TIER_COLOR[t] ?? c.accent}20` : c.surfaceAlt, color: TIER_COLOR[t] ?? c.textSecond, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <button onClick={() => setEditTarget(null)} style={{ flex: 1, padding: '10px', borderRadius: 10, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textSecond, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { alert(`Saved: ${editForm.name}`); setEditTarget(null) }} style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: c.accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => setDeleteTarget(null)}>
          <div style={{ background: c.surface, borderRadius: 16, width: 360, padding: '28px 24px', boxShadow: '0 24px 60px rgba(0,0,0,.35)', border: `1px solid ${c.border}` }}
            onClick={e => e.stopPropagation()}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: c.textPrimary, textAlign: 'center', marginBottom: 8 }}>Delete Partner?</div>
            <div style={{ fontSize: 13, color: c.textSecond, textAlign: 'center', lineHeight: 1.6, marginBottom: 24 }}>
              Are you sure you want to remove <strong style={{ color: c.textPrimary }}>{deleteTarget.name}</strong> from the network? This action cannot be undone.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setDeleteTarget(null)} style={{ flex: 1, padding: '10px', borderRadius: 10, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textSecond, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setDeleteTarget(null); alert(`${deleteTarget.name} deleted`) }} style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: '#ef4444', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

      <main style={{ flex: 1, padding: '24px 28px 40px', display: 'flex', flexDirection: 'column', gap: 20, background: dark ? '#0f1117' : '#f5f6fa', minHeight: '100vh' }}>

        {/* Header */}
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: c.textPrimary }}>NGOs & Companies</div>
          <div style={{ fontSize: 12.5, color: c.textMuted, marginTop: 4 }}>Verified partner organisations · click any card to view full details</div>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {[
            { label: 'Total Partners', value: ngoCount + companyCount, color: '#3b6ef6' },
            { label: 'NGOs',           value: ngoCount,                color: '#06b6d4' },
            { label: 'Companies',      value: companyCount,            color: '#ef4444' },
          ].map((s, i) => (
            <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadow, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '14px 14px 0 0' }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: c.textPrimary, lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: '8px 14px', flex: '1 1 220px', maxWidth: 320 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or city..."
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: c.textSecond, width: '100%', fontFamily: 'inherit' }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '7px 18px', borderRadius: 20, fontSize: 12.5, fontWeight: 600, cursor: 'pointer', border: 'none',
                background: filter === f ? c.accent : c.surface,
                color:      filter === f ? '#fff'    : c.textSecond,
                boxShadow:  filter === f ? `0 2px 8px ${c.accent}40` : c.shadow,
                transition: 'all .15s',
              }}>{f}</button>
            ))}
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', gap: 4, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 4, marginLeft: 'auto' }}>
            {(['grid', 'table'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '6px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: view === v ? c.accent : 'transparent', color: view === v ? '#fff' : c.textMuted, transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 5 }}>
                {v === 'grid'
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                  : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                }
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {results.map(org => {
            const tc = TYPE_COLOR[org.type]
            return (
              <div key={org.id} onClick={() => setSelected(org)}
                style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, boxShadow: c.shadow, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform .15s, box-shadow .15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(17,24,39,.13)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = c.shadow }}>

                {/* Image header */}
                <div style={{ height: 110, position: 'relative', overflow: 'hidden', background: tc.bg }}>
                  <img src={org.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${c.surface} 0%, transparent 60%)` }} />
                  <span style={{ position: 'absolute', bottom: 10, left: 14, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: tc.text, background: tc.bg, border: `1px solid ${tc.border}`, borderRadius: 6, padding: '3px 9px' }}>{org.type}</span>
                  {org.tier && (
                    <span style={{ position: 'absolute', top: 10, right: 12, fontSize: 10, fontWeight: 700, color: TIER_COLOR[org.tier], background: `${TIER_COLOR[org.tier]}20`, border: `1px solid ${TIER_COLOR[org.tier]}50`, borderRadius: 20, padding: '3px 10px' }}>★ {org.tier}</span>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: c.textPrimary }}>{org.name}</div>
                      <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {org.location}
                      </div>
                    </div>
                    {org.funding && <span style={{ fontSize: 13, fontWeight: 700, color: c.accentText }}>{org.funding}</span>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11.5 }}>
                    {org.verified && (
                      <span style={{ color: c.green, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        Verified
                      </span>
                    )}
                    <span style={{ color: c.textMuted }}>Since {org.since}</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {org.sdgs.map(s => (
                      <span key={s} style={{ fontSize: 10, fontWeight: 600, color: c.textSecond, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 5, padding: '3px 8px' }}>SDG {s}</span>
                    ))}
                  </div>

                  <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 8, marginTop: 'auto', fontSize: 11, color: c.textMuted, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.green, flexShrink: 0, display: 'inline-block' }} />
                    {org.activity}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    <button onClick={e => { e.stopPropagation(); setSelected(org) }} style={{ flex: 1, padding: '6px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textSecond, fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>View</button>
                    <button onClick={e => { e.stopPropagation(); setEditTarget(org); setEditForm({ name: org.name, location: org.location, tier: org.tier, since: org.since, funding: org.funding }) }} style={{ flex: 1, padding: '6px', borderRadius: 8, border: `1px solid ${c.accent}40`, background: c.accentLight, color: c.accentText, fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                    <button onClick={e => { e.stopPropagation(); setDeleteTarget(org) }} style={{ flex: 1, padding: '6px', borderRadius: 8, border: '1px solid rgba(239,68,68,.3)', background: 'rgba(239,68,68,.08)', color: '#ef4444', fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        )}

        {/* Table view */}
        {view === 'table' && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadow, overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.2fr 1.5fr', gap: 8, padding: '11px 20px', background: c.surfaceAlt, borderBottom: `1px solid ${c.border}` }}>
              {['Organisation', 'Type', 'Location', 'Since', 'SDGs', 'Actions'].map((h, i) => (
                <div key={i} style={{ fontSize: 10.5, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', textAlign: i === 5 ? 'right' : 'left' }}>{h}</div>
              ))}
            </div>
            {results.map((org, i) => {
              const tc = TYPE_COLOR[org.type]
              return (
                <div key={org.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.2fr 1.5fr', gap: 8, padding: '13px 20px', borderBottom: i < results.length - 1 ? `1px solid ${c.border}` : 'none', alignItems: 'center' }}>
                  {/* Name */}
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: c.textPrimary }}>{org.name}</div>
                    {org.funding && <div style={{ fontSize: 11, color: c.accentText, fontWeight: 600, marginTop: 2 }}>{org.funding}</div>}
                  </div>
                  {/* Type */}
                  <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: tc.text, background: tc.bg, border: `1px solid ${tc.border}`, borderRadius: 6, padding: '3px 9px', width: 'fit-content' }}>{org.type}</span>
                  {/* Location */}
                  <div style={{ fontSize: 12.5, color: c.textSecond, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {org.location}
                  </div>
                  {/* Since */}
                  <div style={{ fontSize: 12.5, color: c.textSecond }}>{org.since}</div>
                  {/* SDGs */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {org.sdgs.map(s => (
                      <span key={s} style={{ fontSize: 9.5, fontWeight: 600, color: c.textSecond, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 4, padding: '2px 6px' }}>SDG {s}</span>
                    ))}
                  </div>
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <button onClick={() => setSelected(org)} style={{ padding: '5px 12px', borderRadius: 7, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textSecond, fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>View</button>
                    <button onClick={() => { setEditTarget(org); setEditForm({ name: org.name, location: org.location, tier: org.tier, since: org.since, funding: org.funding }) }} style={{ padding: '5px 12px', borderRadius: 7, border: `1px solid ${c.accent}40`, background: c.accentLight, color: c.accentText, fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => setDeleteTarget(org)} style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid rgba(239,68,68,.3)', background: 'rgba(239,68,68,.08)', color: '#ef4444', fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {results.length === 0 && (
          <div style={{ textAlign: 'center', color: c.textMuted, fontSize: 13, padding: '40px 0' }}>No partners match your search.</div>
        )}
      </main>
    </>
  )
}
