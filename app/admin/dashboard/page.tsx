'use client'

import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Tooltip, Filler
} from 'chart.js'
import { useDashboardTheme } from './ThemeContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DIRECTORY } from '@/app/components/partners/partnersData'
import { getAdminStats, getContactMessages, getPartnershipSubmissions, getDonations, getVolunteerSubmissions, getFellowshipListings, getWaterConservationRegistrations, getSdgEducationRegistrations, getSustainabilityRegistrations, getCleanCommunityRegistrations, getSiteStats, updateSiteStats, type AdminStats, type DonationRecord, type ContactMessage, type PartnershipSubmission, type SiteStats } from '@/app/lib/adminStore'
import { usePartners } from './PartnersContext'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Filler)

export default function DashboardPage() {
  const { dark } = useDashboardTheme()
  const router = useRouter()
  const { partners } = usePartners()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [donations, setDonations] = useState<DonationRecord[]>([])
  const [recentActivity, setRecentActivity] = useState<{ tag: string; title: string; desc: string; time: string; tagColor: string; tagBg: string }[]>([])
  const [projectCounts, setProjectCounts] = useState({ volunteers: 0, fellowship: 0, waterConservation: 0, sdgEducation: 0, sustainability: 0, cleanCommunity: 0 })
  const [siteStats, setSiteStats] = useState<SiteStats | null>(null)
  const [editingSiteStats, setEditingSiteStats] = useState(false)
  const [siteStatsForm, setSiteStatsForm] = useState<SiteStats | null>(null)

  useEffect(() => {
    const load = () => {
      const s = getAdminStats()
      const unread = getContactMessages().filter(m => m.unread).length
      const partnerSubs = getPartnershipSubmissions()
      const pending = unread + partnerSubs.length
      setStats({ ...s, pendingRequests: pending })

      const allDonations = getDonations()
      setDonations(allDonations)

      const volunteers = getVolunteerSubmissions()
      const fellowship = getFellowshipListings()
      const waterConservation = getWaterConservationRegistrations()
      const sdgEducation = getSdgEducationRegistrations()
      const sustainability = getSustainabilityRegistrations()
      const cleanCommunity = getCleanCommunityRegistrations()
      setProjectCounts({ volunteers: volunteers.length, fellowship: fellowship.length, waterConservation: waterConservation.length, sdgEducation: sdgEducation.length, sustainability: sustainability.length, cleanCommunity: cleanCommunity.length })

      // Build recent activity from real data
      const activity: { tag: string; title: string; desc: string; time: string; tagColor: string; tagBg: string }[] = []
      const contacts = getContactMessages().slice(0, 2)
      contacts.forEach((m: ContactMessage) => {
        activity.push({ tag: m.tag, title: m.subject, desc: `${m.from} — ${m.body.slice(0, 60)}…`, time: m.time || m.date, tagColor: '#3b6ef6', tagBg: 'rgba(59,110,246,.1)' })
      })
      partnerSubs.slice(0, 2).forEach((p: PartnershipSubmission) => {
        activity.push({ tag: 'Partner', title: 'New Partnership Request', desc: `${p.organization} (${p.type}) — ${p.message.slice(0, 60)}…`, time: p.submittedAt, tagColor: '#06b6d4', tagBg: 'rgba(6,182,212,.1)' })
      })
      setRecentActivity(activity.slice(0, 4))

      const ss = getSiteStats()
      setSiteStats(ss)
      if (!editingSiteStats) setSiteStatsForm(ss)
    }
    load()
    const interval = setInterval(load, 2000)
    return () => clearInterval(interval)
  }, [])

  function saveSiteStats() {
    if (!siteStatsForm) return
    updateSiteStats(siteStatsForm)
    setSiteStats(siteStatsForm)
    setEditingSiteStats(false)
  }

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
    green:  '#10b981',
    red:    '#ef4444',
    shadow: dark ? '0 2px 12px rgba(0,0,0,.4)' : '0 1px 6px rgba(17,24,39,.07)',
  }

  const card = {
    background: dark ? 'rgba(26,29,39,0.72)' : 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${c.border}`,
    borderRadius: 14,
    boxShadow: c.shadow,
  }

  return (
    <>
    <main style={{ flex: 1, padding: '24px 28px 40px', display: 'flex', flexDirection: 'column', gap: 18, overflowX: 'hidden', background: dark ? '#0f1117' : '#f5f6fa', minHeight: '100vh' }}>

      {/* Banner */}
      <div style={{ background: 'linear-gradient(120deg,#1e3a8a 0%,#2563eb 55%,#0ea5e9 100%)', borderRadius: 14, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(37,99,235,.3)' }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{stats ? `${stats.pendingRequests} applications & reviews pending your approval` : 'Loading…'}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>Review partner requests and project submissions before the deadline.</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
        </div>
      </div>

      {/* SDG Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {[
          { label: 'Total Partners',       value: stats ? stats.totalPartners.toLocaleString() : '…', change: '+12% this month', up: true,  color: '#3b6ef6' },
          { label: 'Total Projects',        value: stats ? stats.totalProjects.toLocaleString() : '…', change: '+6% this month',  up: true,  color: '#8b5cf6' },
          { label: 'Total SDGs',            value: '17/17', change: 'All active',      up: null,  color: '#10b981' },
           { label: 'Total Events',          value: stats ? stats.totalEvents.toLocaleString() : '…', change: '+18% this month', up: true,  color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="card-hover fade-up" style={{ ...card, padding: '20px', animationDelay: `${i * .06}s`, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '14px 14px 0 0' }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: c.textPrimary, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: s.up === true ? c.green : s.up === false ? c.red : c.textMuted }}>
              {s.up === true ? '↑ ' : ''}{s.change}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          { label: 'Student Contributions', value: stats ? stats.studentContributions.toLocaleString() : '…', change: '+24% this month',  up: true,  color: '#06b6d4' },
          { label: 'Pending Requests',       value: stats ? String(stats.pendingRequests) : '…',    change: 'Action required',  up: null,  color: '#ef4444' },
          { label: 'Active Campaigns',       value: stats ? String(stats.activeCampaigns) : '…',    change: '+3 this week',     up: true,  color: '#10b981' },
        ].map((s, i) => (
          <div key={i} className="card-hover fade-up" style={{ ...card, padding: '20px', animationDelay: `${i * .06}s`, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '14px 14px 0 0' }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: c.textPrimary, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: s.up === true ? c.green : s.up === false ? c.red : c.textMuted }}>
              {s.up === true ? '↑ ' : ''}{s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {[
          { label: 'Total Students',    value: stats ? stats.totalStudents.toLocaleString() : '…', change: '+12% this month', up: true,  color: '#3b6ef6' },
          { label: 'Schools Supported', value: stats ? String(stats.schoolsSupported) : '…',    change: '+5 new schools',  up: true,  color: '#8b5cf6' },
          { label: 'Projects Completed', value: String(projectCounts.volunteers + projectCounts.fellowship + projectCounts.waterConservation), change: 'From submissions', up: null, color: '#f59e0b' },
          { label: 'Active Partners',   value: String(partners.length), change: '+3 this week', up: true, color: '#10b981' },
        ].map((s, i) => (
          <div key={i} className="card-hover fade-up" style={{ ...card, padding: '20px', animationDelay: `${i * .06}s`, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '14px 14px 0 0' }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: c.textPrimary, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: s.up === true ? c.green : s.up === false ? c.red : c.textMuted }}>
              {s.up === true ? '↑ ' : ''}{s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Partner Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          {
            title: 'Companies',
            desc: 'Channel CSR funding into transparent, measurable education programs and track impact in real time.',
            count: 25, active: 20, pending: 5,
            gradient: 'linear-gradient(135deg,#155DFC,#00C2FF)',
            glow: 'rgba(21,93,252,.18)', color: '#155DFC',
          },
          {
            title: 'Schools / Universities / Colleges',
            desc: 'Join our network to access resources, infrastructure support and quality learning programs.',
            count: 420, active: 390, pending: 30,
            gradient: 'linear-gradient(135deg,#00A8A8,#00B050)',
            glow: 'rgba(0,168,168,.18)', color: '#00A8A8',
          },
          {
            title: 'NGOs',
            desc: 'Collaborate on the ground to uplift communities and deliver lasting, sustainable social change.',
            count: 87, active: 74, pending: 13,
            gradient: 'linear-gradient(135deg,#FF7A00,#FFB070)',
            glow: 'rgba(255,122,0,.18)', color: '#FF7A00',
          },
        ].map((p, i) => (
          <div key={i} className="card-hover fade-up" style={{ ...card, padding: '22px', animationDelay: `${i * .06}s`, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.gradient, borderRadius: '14px 14px 0 0' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: p.color, lineHeight: 1 }}>{p.count}</span>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: c.textPrimary, marginBottom: 6 }}>{p.title}</div>
            <div style={{ fontSize: 11.5, color: c.textSecond, lineHeight: 1.5, marginBottom: 16 }}>{p.desc}</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>{p.active}</div>
                <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2 }}>Active</div>
              </div>
              <div style={{ flex: 1, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f59e0b' }}>{p.pending}</div>
                <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2 }}>Pending</div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card-hover" style={card}>
          <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Recent Activity</div>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: c.accentText, cursor: 'pointer' }}>View all</span>
          </div>
          <div style={{ padding: '4px 0' }}>
            {(recentActivity.length > 0 ? recentActivity : [
              { tag: 'Partner',   title: 'New partner application',    desc: 'GreenEarth NGO submitted a request.',    time: '2h ago',    tagColor: '#3b6ef6', tagBg: 'rgba(59,110,246,.1)' },
              { tag: 'School',    title: 'New School Enrolled',         desc: 'Bright Futures Academy joined SDG 4.',   time: '5h ago',    tagColor: '#06b6d4', tagBg: 'rgba(6,182,212,.1)' },
              { tag: 'Milestone', title: 'Project Milestone Reached',   desc: 'Water Access Project reached 100%.',     time: 'Yesterday', tagColor: '#10b981', tagBg: 'rgba(16,185,129,.1)' },
              { tag: 'Report',    title: 'Report Submitted',            desc: 'EcoSolutions uploaded Q3 impact report.', time: '2d ago',   tagColor: '#f59e0b', tagBg: 'rgba(245,158,11,.1)' },
            ]).map((a, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '13px 22px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: a.tagColor, background: a.tagBg, borderRadius: 5, padding: '3px 7px', letterSpacing: '.4px', textTransform: 'uppercase', height: 'fit-content', marginTop: 1, flexShrink: 0 }}>{a.tag}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: c.textPrimary, lineHeight: 1.3 }}>{a.title}</div>
                  <div style={{ fontSize: 11.5, color: c.textSecond, marginTop: 2 }}>{a.desc}</div>
                  <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 4 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Donations + Project Registrations Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Total Funds Raised + Recent Donations */}
        <div className="card-hover" style={card}>
          <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Funds Raised</div>
              <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>Total donations received</div>
            </div>
            <span onClick={() => router.push('/admin/dashboard/donations')} style={{ fontSize: 11.5, fontWeight: 600, color: c.accentText, cursor: 'pointer' }}>View all ›</span>
          </div>
          <div style={{ padding: '16px 22px' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: c.green, marginBottom: 4 }}>
              ₹{donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginBottom: 16 }}>{donations.length} donation{donations.length !== 1 ? 's' : ''} total</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {donations.slice(0, 3).map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 8 }}>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: c.textPrimary }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: c.textMuted }}>{d.method} · {new Date(d.donatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.green }}>₹{d.amount.toLocaleString('en-IN')}</div>
                </div>
              ))}
              {donations.length === 0 && <div style={{ fontSize: 12, color: c.textMuted, textAlign: 'center', padding: '12px 0' }}>No donations yet</div>}
            </div>
          </div>
        </div>

        {/* Per-Project Registrations */}
        <div className="card-hover" style={card}>
          <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Project Registrations</div>
              <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>Submissions per active project</div>
            </div>
            <span onClick={() => router.push('/admin/dashboard/submissions')} style={{ fontSize: 11.5, fontWeight: 600, color: c.accentText, cursor: 'pointer' }}>View all ›</span>
          </div>
          <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Volunteer Applications',    count: projectCounts.volunteers,      color: '#3b6ef6' },
              { label: 'Fellowship Listings',        count: projectCounts.fellowship,      color: '#a21942' },
              { label: 'Water Conservation',         count: projectCounts.waterConservation, color: '#06b6d4' },
              { label: 'SDG Education',              count: projectCounts.sdgEducation,    color: '#c5192d' },
              { label: 'Sustainability Education',   count: projectCounts.sustainability,  color: '#0fae83' },
              { label: 'Clean Community',            count: projectCounts.cleanCommunity,  color: '#3f7e44' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{p.label}</span>
                </div>
                <span style={{ fontSize: 20, fontWeight: 800, color: p.color }}>{p.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Student Growth */}
        <div className="card-hover" style={card}>
          <div style={{ padding: '20px 22px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Student Growth</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3, marginBottom: 16 }}>Monthly trend — last 6 months</div>
            <div style={{ height: 120 }}>
              <Line
                data={{
                  labels: ['Jan','Feb','Mar','Apr','May','Jun'],
                  datasets: [{
                    data: [3000,3200,4000,5500,8500,12450],
                    borderColor: c.accent,
                    backgroundColor: (ctx: any) => {
                      const g = ctx.chart.ctx.createLinearGradient(0,0,0,120)
                      g.addColorStop(0, 'rgba(59,110,246,.15)')
                      g.addColorStop(1, 'rgba(59,110,246,0)')
                      return g
                    },
                    fill: true, tension: .4, pointRadius: 3, pointBackgroundColor: c.accent, borderWidth: 2,
                  }]
                }}
                options={{
                  responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { y: { display: false }, x: { grid: { display: false }, ticks: { font: { size: 9.5 }, color: c.textMuted } } },
                }}
              />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.green, marginTop: 12 }}>↗ 24.5% overall increase</div>
          </div>
        </div>

        {/* Partner Ecosystem */}
        <div className="card-hover" style={card}>
          <div style={{ padding: '20px 22px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Partner Ecosystem</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3, marginBottom: 16 }}>Distribution by type</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 96, height: 96, position: 'relative', flexShrink: 0 }}>
                <Doughnut
                  data={{ labels: ['Schools','NGOs','Companies'], datasets: [{ data: [45,35,20], backgroundColor: [c.accent,'#06b6d4','#8b5cf6'], borderWidth: 0, hoverOffset: 4 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { display: false } } }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: c.textPrimary, lineHeight: 1 }}>56</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: c.textMuted, letterSpacing: '.5px', marginTop: 2 }}>TOTAL</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Schools','45%',c.accent],['NGOs','35%','#06b6d4'],['Companies','20%','#8b5cf6']].map(([lbl,pct,col],i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: col }} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: c.textPrimary }}>{lbl}</span>
                      </div>
                      <span style={{ fontSize: 11.5, color: c.textMuted }}>{pct}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 4, background: c.surfaceAlt, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: pct, background: col, borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Partners Overview */}
      <div className="card-hover" style={card}>
        <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Partners Overview</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>All verified partner organisations and their impact data</div>
          </div>
          <span onClick={() => router.push('/admin/dashboard/partners')} style={{ fontSize: 12, fontWeight: 600, color: c.accentText, cursor: 'pointer', whiteSpace: 'nowrap' }}>Manage Partners ›</span>
        </div>

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 0.8fr 0.8fr 1fr 2.2fr 1.4fr', gap: 8, padding: '10px 22px', borderBottom: `1px solid ${c.border}`, background: c.surfaceAlt }}>
          {['Organisation', 'Type', 'Location', 'Since', 'Key Stats', 'SDGs'].map((h, i) => (
            <div key={i} style={{ fontSize: 10.5, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{h}</div>
          ))}
        </div>

        {DIRECTORY.map((org, i) => {
          const typeColors: Record<string, { text: string; bg: string }> = {
            Company:    { text: '#ef4444', bg: 'rgba(239,68,68,.1)'  },
            NGO:        { text: '#06b6d4', bg: 'rgba(6,182,212,.1)'  },
            School:     { text: '#10b981', bg: 'rgba(16,185,129,.1)' },
            University: { text: '#8b5cf6', bg: 'rgba(139,92,246,.1)' },
          }
          const tc = typeColors[org.type] ?? { text: c.textSecond, bg: c.surfaceAlt }
          const tierColor: Record<string, string> = { Gold: '#f59e0b', Silver: '#94a3b8' }

          const DETAIL_STATS: Record<string, { label: string; value: string }[]> = {
            'greenearth-initiative': [{ label: 'Projects', value: '12' }, { label: 'Beneficiaries', value: '840' }, { label: 'Partners', value: '6' }],
            'hope-ngo':              [{ label: 'Projects', value: '8'  }, { label: 'Beneficiaries', value: '1200' }, { label: 'Cities', value: '3' }],
            'techcorp-india':        [{ label: 'Contributed', value: 'Rs50L' }, { label: 'Students', value: '620' }, { label: 'Workshops', value: '8' }],
            'ecovolt-energy':        [{ label: 'Contributed', value: 'Rs20L' }, { label: 'Students', value: '310' }, { label: 'Schools', value: '6' }],
            'infrabuild-corp':       [{ label: 'Contributed', value: 'Rs30L' }, { label: 'Students', value: '900' }, { label: 'Schools', value: '4' }],
            'delhi-public-school':   [{ label: 'SDGs', value: '2' }, { label: 'Since', value: '2023' }, { label: 'Status', value: 'Active' }],
            'iit-hyderabad':         [{ label: 'SDGs', value: '3' }, { label: 'Since', value: '2023' }, { label: 'Status', value: 'Active' }],
            'bright-futures-academy':[{ label: 'SDGs', value: '2' }, { label: 'Since', value: '2024' }, { label: 'Status', value: 'Active' }],
            'woxsen-university':     [{ label: 'SDGs', value: '2' }, { label: 'Since', value: '2025' }, { label: 'Status', value: 'Active' }],
          }
          const stats = DETAIL_STATS[org.id] ?? []

          return (
            <div key={org.id} style={{ display: 'grid', gridTemplateColumns: '1.8fr 0.8fr 0.8fr 1fr 2.2fr 1.4fr', gap: 8, padding: '14px 22px', borderBottom: i < DIRECTORY.length - 1 ? `1px solid ${c.border}` : 'none', alignItems: 'center' }}>
              {/* Name + tier + verified */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>{org.name}</span>
                  {org.tier && <span style={{ fontSize: 9.5, fontWeight: 700, color: tierColor[org.tier], background: `${tierColor[org.tier]}20`, border: `1px solid ${tierColor[org.tier]}50`, borderRadius: 5, padding: '2px 7px' }}>★ {org.tier}</span>}
                </div>
                {org.verified && <span style={{ fontSize: 10.5, color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Verified
                </span>}
                <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 2 }}>{org.activity}</div>
              </div>
              {/* Type */}
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: tc.text, background: tc.bg, borderRadius: 6, padding: '3px 8px', width: 'fit-content' }}>{org.type}</span>
              {/* Location */}
              <span style={{ fontSize: 12, color: c.textSecond }}>{org.location}</span>
              {/* Since */}
              <span style={{ fontSize: 12, color: c.textSecond }}>{org.since}</span>
              {/* Key Stats */}
              <div style={{ display: 'flex', gap: 6 }}>
                {stats.map((s, j) => (
                  <div key={j} style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 8, padding: '5px 10px', textAlign: 'center', minWidth: 56 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: tc.text, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 9.5, color: c.textMuted, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {/* SDGs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {org.sdgs.map(s => (
                  <span key={s} style={{ fontSize: 9.5, fontWeight: 600, color: c.textSecond, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 4, padding: '2px 7px' }}>SDG {s}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>



      </main>


    </>
  )
}
