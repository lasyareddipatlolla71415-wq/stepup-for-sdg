'use client';

const T = {
  label:    { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '12px',  fontWeight: 600, lineHeight: '18px',  letterSpacing: '0.28em', textTransform: 'uppercase' as const },
  title:    { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '56px',  fontWeight: 800, lineHeight: '64px' },
  subtitle: { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '22px',  fontWeight: 400, lineHeight: '34px' },
  overviewH:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '40px',  fontWeight: 700, lineHeight: '50px' },
  overviewB:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '18px',  fontWeight: 400, lineHeight: '50px' },
  focusH:   { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '28px',  fontWeight: 600, lineHeight: '50px' },
  focusB:   { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '16px',  fontWeight: 400, lineHeight: '50px' },
  impactH:  { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '40px',  fontWeight: 700, lineHeight: '50px' },
  impactN:  { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '48px',  fontWeight: 800, lineHeight: '50px' },
  impactL:  { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '16px',  fontWeight: 500, lineHeight: '50px' },
  programH: { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '40px',  fontWeight: 700, lineHeight: '50px' },
  programS: { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '24px',  fontWeight: 600, lineHeight: '50px' },
  programB: { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '18px',  fontWeight: 400, lineHeight: '50px' },
  timelineH:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '24px',  fontWeight: 600, lineHeight: '50px' },
  timelineT:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '16px',  fontWeight: 400, lineHeight: '50px' },
  ctaH:     { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '32px',  fontWeight: 700, lineHeight: '50px' },
  ctaB:     { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '18px',  fontWeight: 400, lineHeight: '50px' },
};

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Droplets, Globe2, MapPin, School, Users, Calendar } from 'lucide-react';
import { Counter } from '@/app/components/site/Counter';
import { FadeUp } from '@/app/components/site/FadeUp';

const BLUE = '#0369a1';
const BLUE_LIGHT = '#e0f2fe';

const STEP_ICONS = [
  <svg key="w1" width="56" height="56" viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="45" fill="#e0f2fe"/>
    <rect x="22" y="36" width="34" height="24" rx="3" fill="none" stroke="#0369a1" strokeWidth="2"/>
    <line x1="26" y1="44" x2="38" y2="44" stroke="#0369a1" strokeWidth="1.5"/>
    <line x1="26" y1="49" x2="34" y2="49" stroke="#0369a1" strokeWidth="1.5"/>
    <line x1="26" y1="54" x2="50" y2="54" stroke="#0369a1" strokeWidth="1.5"/>
    <rect x="28" y="62" width="22" height="3" rx="1" fill="#0369a1"/>
    <line x1="39" y1="60" x2="39" y2="62" stroke="#0369a1" strokeWidth="2"/>
    <circle cx="62" cy="32" r="6" fill="none" stroke="#0369a1" strokeWidth="2"/>
    <path d="M57 44 Q57 38 62 38 Q67 38 67 44" fill="none" stroke="#0369a1" strokeWidth="2"/>
    <circle cx="28" cy="28" r="5" fill="none" stroke="#0369a1" strokeWidth="2"/>
    <path d="M23 38 Q23 33 28 33 Q33 33 33 38" fill="none" stroke="#0369a1" strokeWidth="2"/>
  </svg>,
  <svg key="w2" width="56" height="56" viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="45" fill="#e0f2fe"/>
    <rect x="16" y="26" width="42" height="28" rx="2" fill="none" stroke="#0369a1" strokeWidth="2"/>
    <line x1="16" y1="44" x2="58" y2="44" stroke="#0369a1" strokeWidth="1.5"/>
    <line x1="22" y1="34" x2="42" y2="34" stroke="#0369a1" strokeWidth="1.5"/>
    <line x1="22" y1="39" x2="36" y2="39" stroke="#0369a1" strokeWidth="1.5"/>
    <line x1="37" y1="54" x2="37" y2="60" stroke="#0369a1" strokeWidth="2"/>
    <line x1="26" y1="60" x2="48" y2="60" stroke="#0369a1" strokeWidth="2"/>
    <circle cx="66" cy="34" r="5" fill="none" stroke="#0369a1" strokeWidth="2"/>
    <path d="M61 46 Q61 40 66 40 Q71 40 71 46" fill="none" stroke="#0369a1" strokeWidth="2"/>
    <circle cx="56" cy="60" r="4" fill="none" stroke="#0369a1" strokeWidth="1.5"/>
    <circle cx="66" cy="60" r="4" fill="none" stroke="#0369a1" strokeWidth="1.5"/>
    <circle cx="76" cy="60" r="4" fill="none" stroke="#0369a1" strokeWidth="1.5"/>
  </svg>,
  <svg key="w3" width="56" height="56" viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="45" fill="#e0f2fe"/>
    <rect x="18" y="20" width="36" height="46" rx="3" fill="none" stroke="#0369a1" strokeWidth="2"/>
    <line x1="26" y1="32" x2="46" y2="32" stroke="#0369a1" strokeWidth="1.5"/>
    <line x1="26" y1="38" x2="42" y2="38" stroke="#0369a1" strokeWidth="1.5"/>
    <line x1="26" y1="44" x2="38" y2="44" stroke="#0369a1" strokeWidth="1.5"/>
    <circle cx="60" cy="56" r="12" fill="#0369a1"/>
    <polyline points="54,56 58,61 67,50" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,

  { step: '01', title: 'Site Assessment',    desc: 'Our team evaluates your school or community site for rainwater harvesting potential and water usage patterns.' },
  { step: '02', title: 'System Installation', desc: 'We install rainwater collection systems, storage tanks, and filtration units tailored to your site.' },
  { step: '03', title: 'Monitor & Maintain',  desc: 'Ongoing monitoring, community training, and maintenance support to ensure long-term impact.' },
];

const STEPS = [
  { step: '01', title: 'Site Assessment',    desc: 'Our team evaluates your school or community site for rainwater harvesting potential and water usage patterns.' },
  { step: '02', title: 'System Installation', desc: 'We install rainwater collection systems, storage tanks, and filtration units tailored to your site.' },
  { step: '03', title: 'Monitor & Maintain',  desc: 'Ongoing monitoring, community training, and maintenance support to ensure long-term impact.' },
];

const BENEFITS = [
  'Reduce dependence on municipal water supply',
  'Hands-on SDG 6 learning for students',
  'Quarterly impact reports with water saved data',
];

const EVENTS = [
  {
    id: 'rainwater-drive-hyd',
    title: 'Rainwater Harvesting Drive',
    organizer: 'AquaReach India',
    type: 'WORKSHOP',
    open: true,
    location: 'Hyderabad, Telangana',
    date: '10 Aug 2025',
    spots: '50 spots left',
    tag: 'Hands-on',
  },
  {
    id: 'water-awareness-walk',
    title: 'Clean Water Awareness Walk',
    organizer: 'JalJeevan Trust',
    type: 'COMMUNITY',
    open: true,
    location: 'Jaipur, Rajasthan',
    date: '22 Aug 2025',
    spots: '200 spots left',
    tag: 'Open to all',
  },
  {
    id: 'sdg6-youth-summit',
    title: 'SDG 6 Youth Summit 2025',
    organizer: 'WaterAid South Asia',
    type: 'SUMMIT',
    open: true,
    location: 'New Delhi, India',
    date: '5 Sep 2025',
    spots: '100 spots left',
    tag: 'Certificate',
  },
  {
    id: 'water-hackathon',
    title: 'Water Innovation Hackathon',
    organizer: 'BlueMap Analytics',
    type: 'HACKATHON',
    open: true,
    location: 'Bengaluru, India',
    date: '14 Sep 2025',
    spots: '30 teams left',
    tag: 'Prize pool',
  },
  {
    id: 'school-water-audit',
    title: 'School Water Audit Camp',
    organizer: 'GreenCivil Solutions',
    type: 'CAMP',
    open: true,
    location: 'Chennai, Tamil Nadu',
    date: '20 Sep 2025',
    spots: '40 spots left',
    tag: 'Students',
  },
  {
    id: 'river-cleanup-pune',
    title: 'River Clean-Up & Restoration',
    organizer: 'HydroPolicy Lab',
    type: 'VOLUNTEER',
    open: true,
    location: 'Pune, Maharashtra',
    date: '28 Sep 2025',
    spots: '80 spots left',
    tag: 'Volunteer',
  },
];

const BLOGS = [
  {
    id: 'why-rainwater-harvesting',
    tag: 'Water Conservation',
    title: 'Why Rainwater Harvesting is the Future of Urban Water Security',
    excerpt: 'As cities face growing water stress, rainwater harvesting offers a decentralised, cost-effective solution that every school and community can adopt today.',
    author: 'Priya Reddy',
    date: 'Jul 12, 2025',
    readTime: '5 min read',
  },
  {
    id: 'sdg6-india-progress',
    tag: 'SDG 6',
    title: "India's Progress on SDG 6: Gaps, Gains and What Youth Can Do",
    excerpt: "A deep dive into India's clean water and sanitation targets — where we stand in 2025 and how student-led initiatives are closing the gap.",
    author: 'Arjun Sharma',
    date: 'Jun 28, 2025',
    readTime: '7 min read',
  },
  {
    id: 'school-water-audit-guide',
    tag: 'How-To Guide',
    title: 'How to Conduct a Water Audit at Your School in 5 Simple Steps',
    excerpt: 'A practical, step-by-step guide for students and teachers to measure water usage, identify waste, and build a conservation action plan.',
    author: 'Sneha Rao',
    date: 'Jun 10, 2025',
    readTime: '4 min read',
  },
];

const STATS = [
  { icon: Droplets, value: '2M+', label: 'Litres harvested' },
  { icon: School,   value: '80+', label: 'Schools reached' },
  { icon: Users,    value: '15K+', label: 'Beneficiaries' },
  { icon: Globe2,   value: '12+', label: 'Districts covered' },
];

export default function WaterConservationPage() {
  return (
    <div className="bg-[#f0f9ff] text-slate-950">

      {/* Hero */}
      <section className="bg-[#f0f9ff]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <FadeUp>
            <div className="max-w-2xl">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                ← Back to Projects
              </Link>
              <h1 className="mt-6 tracking-tight text-slate-950" style={T.title}>
                Water Conservation <span style={{ color: BLUE }}>Program</span>
              </h1>
              <p className="mt-6 max-w-xl" style={{ ...T.subtitle, color: '#475569' }}>
                Promoting sustainable water conservation by implementing rainwater harvesting systems in schools and communities across India.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/projects/water-conservation/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  style={{ background: BLUE }}
                >
                  Join the Program <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  How it works
                </a>
              </div>

              <div className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map(({ value, label }) => {
                  const match = value.match(/^([\d.]+)([A-Za-z+]*)$/);
                  const num = match ? parseFloat(match[1]) : 0;
                  const suffix = match ? match[2] : '';
                  return (
                    <div key={label} className="text-center">
                      <p className="text-2xl font-bold text-slate-950">
                        <Counter to={num} suffix={suffix} />
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
              {/* Decorative rings */}
              <div className="absolute -inset-3 rounded-[48px] border border-[#bae6fd]/60" />
              <div className="absolute -inset-6 rounded-[56px] border border-[#bae6fd]/30" />

              {/* Main image card */}
              <div className="relative overflow-hidden rounded-[40px] border border-[#bae6fd] bg-white shadow-[0_40px_100px_-40px_rgba(3,105,161,0.22)]">
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/waterrr.jpeg"
                    alt="Water conservation - rainwater harvesting"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 md:px-8 bg-[#f0f9ff]">
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>How it works</p>
            <h2 className="mt-3" style={{ ...T.overviewH, color: '#0f172a' }}>Three steps to water security.</h2>
          </div>
        </FadeUp>

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          <div className="absolute hidden md:block" style={{ left: 'calc(33.33%)', top: '40%', width: 'calc(33.33% - 16px)', borderTop: '2px dashed #7dd3fc' }}>
            <span className="absolute -left-[5px] -top-[5px] h-3 w-3 rounded-full bg-[#0369a1]" />
            <span className="absolute -right-[5px] -top-[5px] h-3 w-3 rounded-full bg-[#0369a1]" />
          </div>
          <div className="absolute hidden md:block" style={{ left: 'calc(66.66%)', top: '40%', width: 'calc(33.33% - 16px)', borderTop: '2px dashed #7dd3fc' }}>
            <span className="absolute -left-[5px] -top-[5px] h-3 w-3 rounded-full bg-[#0369a1]" />
            <span className="absolute -right-[5px] -top-[5px] h-3 w-3 rounded-full bg-[#0369a1]" />
          </div>
          {STEPS.map(({ step, title, desc }, i) => (
            <FadeUp key={step} delay={i * 80}>
              <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-sm">
                <span className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: BLUE_LIGHT, color: BLUE }}>
                  STEP {step}
                </span>
                <div className="mt-4 flex items-center gap-4">
                  <div className="shrink-0 flex h-24 w-24 items-center justify-center rounded-full" style={{ background: BLUE_LIGHT }}>
                    {STEP_ICONS[i]}
                  </div>
                  <div>
                    <h3 className="" style={{ ...T.programS, color: '#0f172a' }}>{title}</h3>
                  <p className="mt-2" style={{ ...T.programB, color: '#64748b' }}>{desc}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Impact banner */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #0284c7 50%, #0ea5e9 100%)` }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            {STATS.map(({ value, label }) => {
              const match = value.match(/^([\d.]+)([A-Za-z+]*)$/);
              const num = match ? parseFloat(match[1]) : 0;
              const suffix = match ? match[2] : '';
              return (
                <div key={label} className="rounded-[24px] bg-white/10 px-6 py-8 text-center shadow-xl">
                  <p className="text-3xl font-bold"><Counter to={num} suffix={suffix} /></p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/80">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events & Participation */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <FadeUp>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>Get involved</p>
              <h2 className="mt-2" style={{ ...T.impactH, color: '#0f172a' }}>Upcoming events.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-500">Workshops, drives, summits and volunteer events — join and make a water impact.</p>
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {EVENTS.map((ev, i) => (
            <FadeUp key={ev.id} delay={i * 60}>
              <article className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white" style={{ background: BLUE }}>
                    {ev.title.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: '#e0f2fe', color: BLUE }}>
                      {ev.type}
                    </span>
                    {ev.open && (
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />Open
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-5" style={{ ...T.focusH, color: '#0f172a' }}>{ev.title}</h3>
                <p className="mt-1" style={{ ...T.focusB, color: '#64748b' }}>{ev.organizer}</p>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" />{ev.location}</p>
                  <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-400" />{ev.date}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Availability</p>
                    <p className="mt-0.5 font-semibold text-slate-950">{ev.spots}</p>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-[#f5f6fa] px-3 py-1 text-[11px] font-semibold text-slate-500">{ev.tag}</span>
                </div>

                <div className="mt-4">
                  <Link
                    href="/projects/water-conservation/register"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ background: BLUE }}
                  >
                    Participate <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <FadeUp>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>From the field</p>
              <h2 className="mt-2" style={{ ...T.impactH, color: '#0f172a' }}>Latest articles.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-500">Insights, guides and stories on water conservation and SDG 6.</p>
          </div>
        </FadeUp>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BLOGS.map((b, i) => (
            <FadeUp key={b.id} delay={i * 70}>
              <article className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${BLUE} 0%, #0ea5e9 100%)` }} />
                <div className="flex flex-1 flex-col p-6">
                  <span className="self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: '#e0f2fe', color: BLUE }}>
                    {b.tag}
                  </span>
                  <h3 className="mt-4" style={{ ...T.timelineH, color: '#0f172a' }}>{b.title}</h3>
                  <p className="mt-3 flex-1" style={{ ...T.timelineT, color: '#64748b' }}>{b.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-950">{b.author}</p>
                      <p className="text-[11px] text-slate-400">{b.date} · {b.readTime}</p>
                    </div>
                    <Link href={`/projects/water-conservation/blog/${b.id}`} className="text-sm font-semibold transition hover:opacity-70" style={{ color: BLUE }}>
                      Read <ArrowRight className="ml-1 inline-block h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Benefits + Register CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <FadeUp>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>What you get</p>
              <h2 className="mt-3" style={{ ...T.ctaH, color: '#0f172a' }}>Benefits of joining.</h2>
              <ul className="mt-8 space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: BLUE_LIGHT }}>
                      <CheckCircle2 className="h-4 w-4" style={{ color: BLUE }} />
                    </span>
                    <p className="text-sm leading-7 text-slate-600">{b}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border bg-white p-10 shadow-sm" style={{ borderColor: '#bae6fd' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>Get involved</p>
              <h3 className="mt-3" style={{ ...T.ctaH, color: '#0f172a' }}>Ready to make a difference?</h3>
              <p className="mt-3" style={{ ...T.ctaB, color: '#475569' }}>
                Register your school or community to receive a free site assessment and join India's growing network of water-conscious institutions.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { label: 'Who can join', value: 'Schools, colleges, NGOs, community groups' },
                  { label: 'SDGs aligned', value: 'SDG 6 · SDG 13' },
                  { label: 'Timeline', value: 'Assessment within 2 weeks' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                    <p className="text-right text-sm font-semibold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/projects/water-conservation/register"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: BLUE }}
              >
                Register now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
