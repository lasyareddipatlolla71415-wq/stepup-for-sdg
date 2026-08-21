'use client'

import { useEffect, useState } from 'react'
import { getDonations, type DonationRecord } from '@/app/lib/adminStore'
import { useDashboardTheme } from '../ThemeContext'

export default function DonationsPage() {
  const { dark } = useDashboardTheme()
  const [donations, setDonations] = useState<DonationRecord[]>([])
  const [showExportMenu, setShowExportMenu] = useState(false)

  useEffect(() => {
    setDonations(getDonations())
    const interval = setInterval(() => setDonations(getDonations()), 2000)
    return () => clearInterval(interval)
  }, [])

  const c = {
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#e8eaf0',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textSecond:  dark ? '#8891aa' : '#6b7280',
    textMuted:   dark ? '#4a5168' : '#9ca3af',
    green:       '#10b981',
    shadow:      dark ? '0 2px 12px rgba(0,0,0,.4)' : '0 1px 6px rgba(17,24,39,.07)',
  }

  const card = { background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadow }

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)
  const methodLabel: Record<string, string> = { upi: 'UPI', card: 'Card', netbanking: 'Net Banking' }

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const monthlyTotals = MONTHS.map((_, mi) =>
    donations.filter(d => new Date(d.donatedAt).getMonth() === mi).reduce((s, d) => s + d.amount, 0)
  )
  const maxMonthly = Math.max(...monthlyTotals, 1)

  const downloadCSV = (rows: string[][], filename: string) => {
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  const handleExport = () => {
    const rows = [
      ['Name', 'Email', 'Phone', 'Amount (₹)', 'Method', 'Message', 'Date'],
      ...donations.map(d => [d.name, d.email, d.phone, String(d.amount), d.method, d.message, new Date(d.donatedAt).toLocaleString('en-IN')]),
    ]
    downloadCSV(rows, 'donations_all.csv')
  }

  const handleExportMonthly = (monthIndex: number) => {
    const filtered = donations.filter(d => new Date(d.donatedAt).getMonth() === monthIndex)
    const rows = [
      ['Name', 'Email', 'Phone', 'Amount (₹)', 'Method', 'Message', 'Date'],
      ...filtered.map(d => [d.name, d.email, d.phone, String(d.amount), d.method, d.message, new Date(d.donatedAt).toLocaleString('en-IN')]),
    ]
    downloadCSV(rows, `donations_${MONTHS[monthIndex]}.csv`)
    setShowExportMenu(false)
  }

  return (
    <main style={{ padding: '24px 28px 40px', display: 'flex', flexDirection: 'column', gap: 18, background: dark ? '#0f1117' : '#f5f6fa', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: c.textPrimary }}>Funds Tracker</div>
          <div style={{ fontSize: 12, color: c.textMuted, marginTop: 3 }}>All funds submitted via the Funds page</div>
        </div>
        <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
          <button onClick={handleExport} style={{ fontSize: 12.5, fontWeight: 600, color: c.green, background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.25)', borderRadius: 9, padding: '8px 18px', cursor: 'pointer' }}>
            ↓ Export All
          </button>
          <button onClick={() => setShowExportMenu(v => !v)} style={{ fontSize: 12.5, fontWeight: 600, color: '#3b6ef6', background: 'rgba(59,110,246,.1)', border: '1px solid rgba(59,110,246,.25)', borderRadius: 9, padding: '8px 18px', cursor: 'pointer' }}>
            ↓ Export Monthly ▾
          </button>
          {showExportMenu && (
            <div style={{ position: 'absolute', top: '110%', right: 0, zIndex: 100, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, boxShadow: c.shadow, minWidth: 160, overflow: 'hidden' }}>
              {MONTHS.map((m, i) => (
                <button key={m} onClick={() => handleExportMonthly(i)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '9px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: c.textPrimary, borderBottom: i < 11 ? `1px solid ${c.border}` : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = dark ? 'rgba(255,255,255,.05)' : '#f1f5f9')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                  <span>{m}</span>
                  <span style={{ fontSize: 11, color: c.textMuted }}>₹{monthlyTotals[i].toLocaleString('en-IN')}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {[
          { label: 'Total Donations',   value: donations.length,                                color: '#3b6ef6' },
          { label: 'Total Amount',      value: `₹${totalAmount.toLocaleString('en-IN')}`,       color: '#10b981' },
          { label: 'Avg. Donation',     value: donations.length ? `₹${Math.round(totalAmount / donations.length).toLocaleString('en-IN')}` : '₹0', color: '#f59e0b' },
          { label: `This Month (${MONTHS[new Date().getMonth()]})`, value: `₹${monthlyTotals[new Date().getMonth()].toLocaleString('en-IN')}`, color: '#e879f9' },
        ].map((s, i) => (
          <div key={i} style={{ ...card, padding: '20px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '14px 14px 0 0' }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Monthly Chart */}
      <div style={card}>
        <div style={{ padding: '16px 22px', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Monthly Donations</div>
          <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>Total funds received per month</div>
        </div>
        <div style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
            {MONTHS.map((m, i) => {
              const h = monthlyTotals[i]
              const barH = Math.max((h / maxMonthly) * 96, h > 0 ? 6 : 2)
              const isCurrentMonth = i === new Date().getMonth()
              return (
                <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  {h > 0 && (
                    <span style={{ fontSize: 8, fontWeight: 700, color: c.textMuted, whiteSpace: 'nowrap' }}>
                      ₹{h >= 1000 ? `${(h/1000).toFixed(1)}k` : h}
                    </span>
                  )}
                  <div style={{ width: '100%', borderRadius: '3px 3px 0 0', height: barH, background: isCurrentMonth ? '#10b981' : h > 0 ? '#3b6ef6' : c.border, transition: 'height 0.3s' }} />
                  <span style={{ fontSize: 9, color: isCurrentMonth ? '#10b981' : c.textMuted, fontWeight: isCurrentMonth ? 700 : 400 }}>{m}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={card}>
        <div style={{ padding: '16px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>All Donations</div>
          <span style={{ fontSize: 11.5, color: c.textMuted }}>{donations.length} record{donations.length !== 1 ? 's' : ''}</span>
        </div>

        {donations.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center', color: c.textMuted }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>💳</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.textSecond, marginBottom: 4 }}>No donations yet</div>
            <div style={{ fontSize: 12 }}>Donations submitted on the Funds page will appear here.</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: c.surfaceAlt }}>
                  {['Donor', 'Email', 'Phone', 'Amount', 'Method', 'Message', 'Date'].map((h, i) => (
                    <th key={i} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10.5, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: `1px solid ${c.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {donations.map((d, i) => (
                  <tr key={d.id} style={{ borderBottom: i < donations.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                    <td style={{ padding: '13px 16px', fontWeight: 600, color: c.textPrimary }}>{d.name}</td>
                    <td style={{ padding: '13px 16px', color: c.textSecond }}>{d.email}</td>
                    <td style={{ padding: '13px 16px', color: c.textSecond }}>{d.phone}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 700, color: c.green }}>₹{d.amount.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#3b6ef6', background: 'rgba(59,110,246,.1)', border: '1px solid rgba(59,110,246,.2)', borderRadius: 5, padding: '2px 8px' }}>
                        {methodLabel[d.method] ?? d.method}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', color: c.textSecond, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.message || '—'}</td>
                    <td style={{ padding: '13px 16px', color: c.textMuted, whiteSpace: 'nowrap' }}>{new Date(d.donatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </main>
  )
}
