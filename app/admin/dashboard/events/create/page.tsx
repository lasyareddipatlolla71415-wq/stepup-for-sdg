'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboardTheme } from '../../ThemeContext'

const SDG_OPTIONS = [
  { label: 'SDG 1 – No Poverty', color: '#E5243B' },
  { label: 'SDG 2 – Zero Hunger', color: '#DDA63A' },
  { label: 'SDG 3 – Good Health', color: '#4C9F38' },
  { label: 'SDG 4 – Quality Education', color: '#C5192D' },
  { label: 'SDG 5 – Gender Equality', color: '#FF3A21' },
  { label: 'SDG 6 – Clean Water', color: '#26BDE2' },
  { label: 'SDG 7 – Affordable Energy', color: '#FCC30B' },
  { label: 'SDG 8 – Decent Work', color: '#A21942' },
  { label: 'SDG 9 – Industry & Innovation', color: '#FD6925' },
  { label: 'SDG 10 – Reduced Inequalities', color: '#DD1367' },
  { label: 'SDG 11 – Sustainable Cities', color: '#FD9D24' },
  { label: 'SDG 12 – Responsible Consumption', color: '#BF8B2E' },
  { label: 'SDG 13 – Climate Action', color: '#3F7E44' },
  { label: 'SDG 14 – Life Below Water', color: '#0A97D9' },
  { label: 'SDG 15 – Life on Land', color: '#56C02B' },
  { label: 'SDG 16 – Peace & Justice', color: '#00689D' },
  { label: 'SDG 17 – Partnerships', color: '#19486A' },
]

const EMPTY_FORM = {
  title: '', sdgTag: SDG_OPTIONS[0].label, date: '', time: '',
  venue: '', type: 'offline' as 'online' | 'offline', description: '',
  ticketName: '', ticketPrice: '', coordinatorName: '', coordinatorEmail: '', coordinatorPhone: '',
}

export default function CreateEventPage() {
  const { dark } = useDashboardTheme()
  const router = useRouter()
  const [form, setForm] = useState({ ...EMPTY_FORM })

  const set = (k: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#e8eaf0',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textMuted:   dark ? '#4a5168' : '#9ca3af',
  }

  const inputStyle: React.CSSProperties = {
    background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 7,
    padding: '9px 12px', color: c.textPrimary, fontSize: 14, outline: 'none',
    fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
  }

  const Field = ({ label, children, span2 = false }: { label: string; children: React.ReactNode; span2?: boolean }) => (
    <div style={{ gridColumn: span2 ? 'span 2' : undefined, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>
      {children}
    </div>
  )

  function handleSubmit() {
    if (!form.title || !form.date || !form.venue || !form.coordinatorName) {
      alert('Please fill all required (*) fields.')
      return
    }
    const pending = JSON.parse(localStorage.getItem('sdg_pending_events') || '[]')
    pending.unshift({ id: String(Date.now()), submittedAt: new Date().toISOString(), form })
    localStorage.setItem('sdg_pending_events', JSON.stringify(pending))
    router.push('/admin/dashboard/events')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
    }}>
      {/* overlay */}
      <div style={{ position: 'absolute', inset: 0, background: dark ? 'rgba(10,12,20,0.82)' : 'rgba(15,25,60,0.68)', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '28px' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <button onClick={() => router.back()} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, padding: '7px 14px', fontSize: 13, color: c.textPrimary, cursor: 'pointer' }}>
          ← Back
        </button>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Create New Event</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Fill in the details below to add a new SDG event</div>
        </div>
      </div>

      {/* Form card */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden', maxWidth: 720 }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Event Details</div>
        </div>

        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Event Title *" span2>
            <input value={form.title} onChange={set('title')} placeholder="e.g. Climate Action Summit 2025" style={inputStyle} />
          </Field>

          <Field label="SDG Focus *">
            <select value={form.sdgTag} onChange={set('sdgTag')} style={inputStyle}>
              {SDG_OPTIONS.map(s => <option key={s.label}>{s.label}</option>)}
            </select>
          </Field>

          <Field label="Event Type">
            <select value={form.type} onChange={set('type')} style={inputStyle}>
              <option value="offline">Offline</option>
              <option value="online">Online</option>
            </select>
          </Field>

          <Field label="Date *">
            <input type="date" value={form.date} onChange={set('date')} style={inputStyle} />
          </Field>

          <Field label="Time *">
            <input type="time" value={form.time} onChange={set('time')} style={inputStyle} />
          </Field>

          <Field label="Venue *" span2>
            <input value={form.venue} onChange={set('venue')} placeholder="e.g. HICC, Hyderabad" style={inputStyle} />
          </Field>

          <Field label="Description" span2>
            <textarea rows={3} value={form.description} onChange={set('description')} placeholder="What is this event about?" style={{ ...inputStyle, resize: 'vertical' }} />
          </Field>

          <div style={{ gridColumn: 'span 2', fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', paddingTop: 4, borderBottom: `1px solid ${c.border}`, paddingBottom: 6 }}>Ticket</div>

          <Field label="Ticket Name">
            <input value={form.ticketName} onChange={set('ticketName')} placeholder="e.g. General Admission" style={inputStyle} />
          </Field>

          <Field label="Price (₹)">
            <input type="number" value={form.ticketPrice} onChange={set('ticketPrice')} placeholder="0 for free" style={inputStyle} />
          </Field>

          <div style={{ gridColumn: 'span 2', fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', paddingTop: 4, borderBottom: `1px solid ${c.border}`, paddingBottom: 6 }}>Coordinator</div>

          <Field label="Full Name *" span2>
            <input value={form.coordinatorName} onChange={set('coordinatorName')} placeholder="Coordinator's name" style={inputStyle} />
          </Field>

          <Field label="Email *">
            <input type="email" value={form.coordinatorEmail} onChange={set('coordinatorEmail')} placeholder="coordinator@org.com" style={inputStyle} />
          </Field>

          <Field label="Phone">
            <input value={form.coordinatorPhone} onChange={set('coordinatorPhone')} placeholder="+91 98765 43210" style={inputStyle} />
          </Field>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 24px', borderTop: `1px solid ${c.border}`, background: c.surfaceAlt }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: `1px solid ${c.border}`, color: c.textPrimary, borderRadius: 8, padding: '9px 20px', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Create Event
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
