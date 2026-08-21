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
import { ArrowRight, CheckCircle2, Leaf, Globe2, MapPin, Users, Calendar, Recycle } from 'lucide-react';
import { Counter } from '@/app/components/site/Counter';
import { FadeUp } from '@/app/components/site/FadeUp';

const GREEN = '#3F7E44';
const GREEN_LIGHT = '#dcfce7';

const STEPS = [
  { step: '01', title: 'Register Your Community', desc: 'Sign up your school, neighbourhood or organisation. We assign a StepUp coordinator to guide your team through the process.' },
  { step: '02', title: 'Plan Your Clean Drive', desc: 'We provide a full toolkit — waste segregation guides, volunteer coordination sheets, and safety checklists — so your drive runs smoothly.' },
  { step: '03', title: 'Execute & Report Impact', desc: 'Carry out the drive, collect waste data, and submit your impact report. Receive a certificate and feature on our impact map.' },
];

const BENEFITS = [
  'Certificate of participation for every volunteer',
  'Free waste segregation and clean-drive toolkit',
  'Feature on the StepUp community impact map',
];

const STATS = [
  { icon: Recycle, value: '48T+',  label: 'Waste collected' },
  { icon: Users,   value: '200+',  label: 'Communities reached' },
  { icon: Globe2,  value: '18+',   label: 'Cities covered' },
  { icon: Leaf,    value: '5K+',   label: 'Volunteers mobilised' },
];

const EVENTS = [
  {
    id: 'clean-drive-hyd',
    title: 'Hyderabad City Clean Drive',
    organizer: 'StepUp × GreenEarth Initiative',
    type: 'CLEAN DRIVE',
    open: true,
    location: 'Hyderabad, Telangana',
    date: '3 Aug 2025',
    spots: '150 spots left',
    tag: 'Open to all',
  },
  {
    id: 'waste-segregation-workshop',
    title: 'Waste Segregation Workshop',
    organizer: 'JalJeevan Trust',
    type: 'WORKSHOP',
    open: true,
    location: 'Jaipur, Rajasthan',
    date: '17 Aug 2025',
    spots: '60 spots left',
    tag: 'Certificate',
  },
  {
    id: 'zero-waste-school-challenge',
    title: 'Zero Waste School Challenge',
    organizer: 'StepUp SDG',
    type: 'CHALLENGE',
    open: true,
    location: 'Pan India · Online',
    date: '1 Sep 2025',
    spots: '100 schools left',
    tag: 'Schools',
  },
  {
    id: 'plastic-free-beach-drive',
    title: 'Plastic-Free Beach Clean-Up',
    organizer: 'Blue Horizon Network',
    type: 'VOLUNTEER',
    open: true,
    location: 'Visakhapatnam, AP',
    date: '13 Sep 2025',
    spots: '80 spots left',
    tag: 'Volunteer',
  },
  {
    id: 'community-composting-camp',
    title: 'Community Composting Camp',
    organizer: 'GreenCivil Solutions',
    type: 'CAMP',
    open: true,
    location: 'Pune, Maharashtra',
    date: '21 Sep 2025',
    spots: '40 spots left',
    tag: 'Hands-on',
  },
  {
    id: 'sdg13-awareness-march',
    title: 'SDG 13 & 15 Awareness March',
    organizer: 'Hope NGO',
    type: 'COMMUNITY',
    open: true,
    location: 'New Delhi, India',
    date: '2 Oct 2025',
    spots: '300 spots left',
    tag: 'Prize pool',
  },
];

const BLOGS = [
  {
    id: 'how-to-organise-clean-drive',
    tag: 'How-To Guide',
    title: 'How to Organise a Community Clean Drive in 6 Steps',
    excerpt: 'From picking a site to submitting your impact report — a practical playbook for students and community leaders running their first clean drive.',
    author: 'Sneha Rao',
    date: 'Jul 5, 2025',
    readTime: '4 min read',
  },
  {
    id: 'waste-management-sdg13-15',
    tag: 'SDG 13 & 15',
    title: 'Why Waste Management is Central to SDG 13 and SDG 15',
    excerpt: 'Plastic pollution, landfill emissions, and biodiversity loss are deeply connected. Here is how tackling waste directly advances two of the most urgent global goals.',
    author: 'Arjun Sharma',
    date: 'Jun 20, 2025',
    readTime: '6 min read',
  },
  {
    id: 'student-clean-campaigns',
    tag: 'Impact Stories',
    title: 'Student-Led Clean Campaigns That Made a Real Difference',
    excerpt: 'Three schools. Three cities. Three campaigns that collected over 2 tonnes of waste and inspired entire neighbourhoods to change their habits.',
    author: 'Priya Reddy',
    date: 'Jun 8, 2025',
    readTime: '5 min read',
  },
];

export default function CleanCommunityPage() {
  return (
    <div className="bg-[#f0fdf4] text-slate-950">

      {/* Hero */}
      <section className="bg-[#f0fdf4]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <FadeUp>
            <div className="max-w-2xl">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                ← Back to Projects
              </Link>
              <h1 className="mt-6 tracking-tight text-slate-950" style={T.title}>
                Clean Community <span style={{ color: GREEN }}>Initiative</span>
              </h1>
              <p className="mt-6 max-w-xl" style={{ ...T.subtitle, color: '#475569' }}>
                Community cleanliness campaigns encouraging environmental responsibility, waste reduction, and sustainable living across India.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/projects/clean-community/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  style={{ background: GREEN }}
                >
                  Join the Initiative <ArrowRight className="h-4 w-4" />
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
              <div className="absolute -inset-3 rounded-[48px] border border-[#bbf7d0]/60" />
              <div className="absolute -inset-6 rounded-[56px] border border-[#bbf7d0]/30" />
              <div className="relative overflow-hidden rounded-[40px] border border-[#bbf7d0] bg-white shadow-[0_40px_100px_-40px_rgba(63,126,68,0.22)]">
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop"
                    alt="Clean Community Initiative"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN }}>How it works</p>
            <h2 className="mt-3" style={{ ...T.overviewH, color: '#0f172a' }}>Three steps to a cleaner community.</h2>
          </div>
        </FadeUp>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ step, title, desc }, i) => (
            <FadeUp key={step} delay={i * 80}>
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  STEP {step}
                </span>
                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: GREEN_LIGHT }}>
                  <Leaf className="h-5 w-5" style={{ color: GREEN }} />
                </div>
                <h3 className="mt-5" style={{ ...T.programS, color: '#0f172a' }}>{title}</h3>
                <p className="mt-3" style={{ ...T.programB, color: '#475569' }}>{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Impact banner */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #4ade80 100%)` }}>
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

      {/* Events */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <FadeUp>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN }}>Get involved</p>
              <h2 className="mt-2" style={{ ...T.impactH, color: '#0f172a' }}>Upcoming events.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-500">Clean drives, workshops, challenges and marches — join and make a community impact.</p>
          </div>
        </FadeUp>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {EVENTS.map((ev, i) => (
            <FadeUp key={ev.id} delay={i * 60}>
              <article className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white" style={{ background: GREEN }}>
                    {ev.title.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: GREEN_LIGHT, color: GREEN }}>
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
                  <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-slate-500">{ev.tag}</span>
                </div>
                <div className="mt-4">
                  <Link
                    href="/projects/clean-community/register"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ background: GREEN }}
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
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN }}>From the field</p>
              <h2 className="mt-2" style={{ ...T.impactH, color: '#0f172a' }}>Latest articles.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-500">Guides, stories and insights on community cleanliness and SDG 13 & 15.</p>
          </div>
        </FadeUp>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BLOGS.map((b, i) => (
            <FadeUp key={b.id} delay={i * 70}>
              <article className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${GREEN} 0%, #4ade80 100%)` }} />
                <div className="flex flex-1 flex-col p-6">
                  <span className="self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: GREEN_LIGHT, color: GREEN }}>
                    {b.tag}
                  </span>
                  <h3 className="mt-4" style={{ ...T.timelineH, color: '#0f172a' }}>{b.title}</h3>
                  <p className="mt-3 flex-1" style={{ ...T.timelineT, color: '#64748b' }}>{b.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-950">{b.author}</p>
                      <p className="text-[11px] text-slate-400">{b.date} · {b.readTime}</p>
                    </div>
                    <Link
                      href={`/projects/clean-community/blog/${b.id}`}
                      className="text-sm font-semibold transition hover:opacity-70"
                      style={{ color: GREEN }}
                    >
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
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN }}>What you get</p>
              <h2 className="mt-3" style={{ ...T.ctaH, color: '#0f172a' }}>Benefits of joining.</h2>
              <ul className="mt-8 space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: GREEN_LIGHT }}>
                      <CheckCircle2 className="h-4 w-4" style={{ color: GREEN }} />
                    </span>
                    <p className="text-sm leading-7 text-slate-600">{b}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border bg-white p-10 shadow-sm" style={{ borderColor: '#bbf7d0' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: GREEN }}>Get involved</p>
              <h3 className="mt-3" style={{ ...T.ctaH, color: '#0f172a' }}>Ready to clean up your community?</h3>
              <p className="mt-3" style={{ ...T.ctaB, color: '#475569' }}>
                Register your school, neighbourhood or organisation to receive a free clean-drive toolkit and join India's growing network of sustainability champions.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { label: 'Who can join', value: 'Schools, colleges, NGOs, resident groups' },
                  { label: 'SDGs aligned', value: 'SDG 13 · SDG 15' },
                  { label: 'Timeline',     value: 'Toolkit delivered within 1 week' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                    <p className="text-right text-sm font-semibold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/projects/clean-community/register"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: GREEN }}
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
