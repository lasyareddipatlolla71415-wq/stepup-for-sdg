'use client';

import Link from 'next/link';

const MF = 'Manrope, system-ui, sans-serif';
const T = {
  label:   { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '12px',  fontWeight: 600, lineHeight: '18px',  letterSpacing: '0.28em', textTransform: 'uppercase' as const },
  title:   { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '56px',  fontWeight: 800, lineHeight: '64px' },
  subtitle:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '22px',  fontWeight: 400, lineHeight: '34px' },
  overviewH:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '40px', fontWeight: 700, lineHeight: '50px' },
  overviewB:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '50px' },
  focusH:  { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '28px',  fontWeight: 600, lineHeight: '50px' },
  focusB:  { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '16px',  fontWeight: 400, lineHeight: '50px' },
  impactH: { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '40px',  fontWeight: 700, lineHeight: '50px' },
  impactN: { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '48px',  fontWeight: 800, lineHeight: '50px' },
  impactL: { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '16px',  fontWeight: 500, lineHeight: '50px' },
  programH:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '40px',  fontWeight: 700, lineHeight: '50px' },
  programS:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '24px',  fontWeight: 600, lineHeight: '50px' },
  programB:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '18px',  fontWeight: 400, lineHeight: '50px' },
  ctaH:    { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '32px',  fontWeight: 700, lineHeight: '50px' },
  ctaB:    { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '18px',  fontWeight: 400, lineHeight: '50px' },
  cardT:   { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '24px',  fontWeight: 600, lineHeight: '50px' },
  cardB:   { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '16px',  fontWeight: 400, lineHeight: '50px' },
};
import { ArrowRight, CheckCircle2, Users, BookOpen, Award, Globe2, MapPin, Calendar } from 'lucide-react';
import { Counter } from '@/app/components/site/Counter';
import { FadeUp } from '@/app/components/site/FadeUp';

const BLUE = '#155DFC';
const BLUE_LIGHT = '#eff6ff';

const STATS = [
  { icon: Users,        value: '12K+', label: 'Students trained' },
  { icon: BookOpen,     value: '320+', label: 'Workshops held' },
  { icon: Award,        value: '8K+',  label: 'Certifications issued' },
  { icon: Globe2,       value: '142+', label: 'Schools reached' },
];

const INCLUDES = [
  { img: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4da.svg',  title: 'Teaching SDG',               desc: 'Interactive classroom sessions covering all 17 UN Sustainable Development Goals with age-appropriate content.' },
  { img: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4dc.svg',  title: 'SDG Certification',          desc: 'Students who complete the program receive an official StepUp SDG certificate recognised by partner institutions.' },
  { img: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f3eb.svg',  title: 'Schools Outreach',           desc: 'Our team visits schools across India to deliver workshops, training sessions and awareness campaigns.' },
  { img: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f393.svg',  title: 'Educating Students on SDGs', desc: 'Structured curriculum modules aligned with NCERT guidelines, making SDG learning part of everyday schooling.' },
  { img: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9ed.svg',  title: 'Stationery & Compass Box',   desc: 'Every participating student receives a stationery kit and compass box to support their continued learning.' },
  { img: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f331.svg',  title: 'Tree Plantation',            desc: 'Students plant trees as a hands-on climate action activity, connecting classroom learning to real-world impact.' },
];

const STEP_ICONS = [
  // Clipboard with pencil
  <svg key="s1" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="8" width="24" height="32" rx="3"/>
    <path d="M19 8v-2a2 2 0 014 0v2"/>
    <rect x="17" y="8" width="14" height="4" rx="1"/>
    <line x1="17" y1="20" x2="27" y2="20"/>
    <line x1="17" y1="25" x2="25" y2="25"/>
    <line x1="17" y1="30" x2="23" y2="30"/>
    <line x1="29" y1="27" x2="34" y2="22"/>
    <path d="M29 27l-2 5 5-2z"/>
  </svg>,
  // Presentation board with people
  <svg key="s2" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="8" width="36" height="22" rx="2"/>
    <line x1="24" y1="30" x2="24" y2="38"/>
    <line x1="14" y1="38" x2="34" y2="38"/>
    <line x1="12" y1="15" x2="36" y2="15"/>
    <line x1="12" y1="20" x2="30" y2="20"/>
    <circle cx="16" cy="24" r="2"/>
    <circle cx="24" cy="24" r="2"/>
    <circle cx="32" cy="24" r="2"/>
  </svg>,
  // Certificate with ribbon
  <svg key="s3" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="8" width="28" height="22" rx="2"/>
    <line x1="12" y1="16" x2="28" y2="16"/>
    <line x1="12" y1="21" x2="24" y2="21"/>
    <circle cx="34" cy="34" r="8"/>
    <path d="M30 42l4-4 4 4v6l-4-2-4 2z"/>
    <circle cx="34" cy="34" r="4"/>
  </svg>,
];

const STEPS = [
  { step: '01', title: 'Register Your School', desc: 'Sign up your school or institution. Our coordinator will reach out within 48 hours to schedule your first session.' },
  { step: '02', title: 'Attend the Workshop',  desc: 'Our trained educators deliver engaging SDG sessions in your classrooms — interactive, visual and curriculum-aligned.' },
  { step: '03', title: 'Get Certified',         desc: 'Students complete a short assessment and receive their official StepUp SDG certificate, shareable on LinkedIn and resumes.' },
];

const EVENTS = [
  { id: 'sdg-workshop-hyd',      title: 'SDG Awareness Workshop',        organizer: 'StepUp SDG',           type: 'WORKSHOP',   open: true, location: 'Hyderabad, Telangana', date: '9 Aug 2025',  spots: '80 spots left',   tag: 'Certificate' },
  { id: 'school-drive-delhi',    title: 'SDG School Drive — Delhi',      organizer: 'StepUp × Hope NGO',    type: 'SCHOOL DRIVE',open: true, location: 'New Delhi, India',     date: '23 Aug 2025', spots: '200 spots left',  tag: 'Open to all' },
  { id: 'certification-camp',    title: 'SDG Certification Camp 2025',   organizer: 'StepUp SDG',           type: 'CAMP',        open: true, location: 'Bengaluru, India',     date: '6 Sep 2025',  spots: '120 spots left',  tag: 'Certificate' },
  { id: 'youth-changemakers',    title: 'Youth Changemakers Summit',     organizer: 'WaterAid × StepUp',    type: 'SUMMIT',      open: true, location: 'Mumbai, India',        date: '20 Sep 2025', spots: '150 spots left',  tag: 'Prize pool' },
  { id: 'tree-plantation-drive', title: 'Tree Plantation & SDG Drive',   organizer: 'GreenEarth Initiative',type: 'VOLUNTEER',   open: true, location: 'Pune, Maharashtra',    date: '4 Oct 2025',  spots: '100 spots left',  tag: 'Hands-on' },
  { id: 'sdg-quiz-challenge',    title: 'National SDG Quiz Challenge',   organizer: 'StepUp SDG',           type: 'CHALLENGE',   open: true, location: 'Pan India · Online',   date: '18 Oct 2025', spots: '500 spots left',  tag: 'Students' },
];

const BLOGS = [
  { id: 'what-are-17-sdgs',         tag: 'SDG Basics',     title: 'What Are the 17 SDGs and Why Should Every Student Care?',         excerpt: 'A clear, student-friendly breakdown of all 17 UN Sustainable Development Goals — what they mean, why they matter, and how you can take action today.',                                                    author: 'Priya Reddy',  date: 'Jul 18, 2025', readTime: '5 min read' },
  { id: 'sdg-certification-career', tag: 'Career Impact',  title: 'How SDG Certification Changes a Student\'s Career Path',           excerpt: 'Employers and universities are increasingly looking for sustainability awareness. Here is how a StepUp SDG certificate gives students a measurable edge.',                                              author: 'Arjun Sharma', date: 'Jul 2, 2025',  readTime: '6 min read' },
  { id: 'inside-sdg-workshop',      tag: 'Impact Stories', title: 'Inside a StepUp SDG School Workshop — What Really Happens',        excerpt: 'From the moment our educators walk into a classroom to the final certificate handover — a behind-the-scenes look at what makes StepUp workshops so effective.',                                    author: 'Sneha Rao',    date: 'Jun 15, 2025', readTime: '4 min read' },
];

const BENEFITS = [
  'Official StepUp SDG certificate for every student',
  'Free stationery kit and compass box per participant',
  'Tree plantation activity included at no extra cost',
];

export default function SDGEducationPage() {
  return (
    <div className="bg-[#eff6ff] text-slate-950">

      {/* Hero */}
      <section className="bg-[#eff6ff]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <FadeUp>
            <div className="max-w-2xl">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                ← Back to Projects
              </Link>
              <p style={T.label}>PROJECT 01 / EDUCATION</p>
              <h1 className="mt-4 tracking-tight text-slate-950" style={T.title}>
                SDG Education <span style={{ color: BLUE }}>for Students</span>
              </h1>
              <p className="mt-6 max-w-xl" style={{ ...T.subtitle, color: '#475569' }}>
                Empower students with knowledge of the 17 Sustainable Development Goals. Build environmental awareness through engaging classroom activities and real-world learning.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/projects/sdg-education/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  style={{ background: BLUE }}
                >
                  Register Your School <ArrowRight className="h-4 w-4" />
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
                      <p style={{ ...T.impactN, color: '#0f172a' }}>
                        <Counter to={num} suffix={suffix} />
                      </p>
                      <p className="mt-1" style={{ ...T.impactL, color: '#64748b' }}>{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="mx-auto w-full max-w-lg lg:ml-auto">
              <div className="overflow-hidden rounded-[40px] border border-[#bfdbfe] bg-white shadow-[0_40px_100px_-40px_rgba(21,93,252,0.22)]">
                <div style={{ aspectRatio: '4/3' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80"
                    alt="Students learning about SDGs"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* What's Included */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 bg-[#eff6ff]">
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <p style={T.label}>What's included</p>
            <h2 className="mt-3" style={{ ...T.overviewH, color: '#0f172a' }}>Everything your school needs.</h2>
            <p className="mt-4" style={{ ...T.overviewB, color: '#64748b' }}>One program. Six powerful components. Zero compromise on quality.</p>
          </div>
        </FadeUp>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {INCLUDES.map(({ img, title, desc }, i) => (
            <FadeUp key={title} delay={i * 60}>
              <div className="rounded-[20px] border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#eef2ff]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={title} style={{ width: 80, height: 80, objectFit: 'contain' }} />
                </div>
                <h3 className="mt-6" style={{ ...T.programS, color: '#0f172a' }}>{title}</h3>
                <p className="mt-3" style={{ ...T.programB, color: '#64748b' }}>{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[#eff6ff] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-3" style={{ ...T.overviewH, color: '#0f172a' }}>Three steps to SDG-certified students.</h2>
            </div>
          </FadeUp>
          <div className="relative mt-12 grid gap-6 md:grid-cols-3">
            {/* dashed connectors */}
            <div className="absolute hidden md:block" style={{ left: 'calc(33.33% - 8px)', top: '44%', width: 'calc(33.33% + 16px)', borderTop: '2px dashed #93c5fd' }}>
              <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-[#155DFC]" />
            </div>
            <div className="absolute hidden md:block" style={{ left: 'calc(66.66% - 8px)', top: '44%', width: 'calc(33.33% + 16px)', borderTop: '2px dashed #93c5fd' }}>
              <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-[#155DFC]" />
            </div>
            {STEPS.map(({ step, title, desc }, i) => (
              <FadeUp key={step} delay={i * 80}>
                <div className="relative rounded-[20px] border border-slate-100 bg-white p-8 shadow-sm">
                  <span className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: BLUE_LIGHT, color: BLUE }}>
                    STEP {step}
                  </span>
                  <div className="my-6 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: BLUE_LIGHT }}>
                    {STEP_ICONS[i]}
                  </div>
                  <h3 style={{ ...T.programS, color: '#0f172a' }}>{title}</h3>
                  <p className="mt-3" style={{ ...T.programB, color: '#64748b' }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Impact banner */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #3b82f6 50%, #60a5fa 100%)` }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            {STATS.map(({ value, label }) => {
              const match = value.match(/^([\d.]+)([A-Za-z+]*)$/);
              const num = match ? parseFloat(match[1]) : 0;
              const suffix = match ? match[2] : '';
              return (
                <div key={label} className="rounded-[24px] bg-white/10 px-6 py-8 text-center shadow-xl">
                  <p style={T.impactN}><Counter to={num} suffix={suffix} /></p>
                  <p className="mt-2" style={{ ...T.impactL, color: 'rgba(255,255,255,0.8)' }}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 bg-[#eff6ff]">
        <FadeUp>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p style={T.label}>Get involved</p>
              <h2 className="mt-2" style={{ ...T.impactH, color: '#0f172a' }}>Upcoming events.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-500">Workshops, school drives, certification camps and youth summits — join and make an impact.</p>
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
                    <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: BLUE_LIGHT, color: BLUE }}>
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
                    href="/projects/sdg-education/register"
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
      <section className="bg-[#eff6ff] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p style={T.label}>From the classroom</p>
                <h2 className="mt-2" style={{ ...T.impactH, color: '#0f172a' }}>Latest articles.</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-slate-500">Guides, stories and insights on SDG education and student impact.</p>
            </div>
          </FadeUp>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {BLOGS.map((b, i) => (
              <FadeUp key={b.id} delay={i * 70}>
                <article className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-[#f5f6fa] overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${BLUE} 0%, #60a5fa 100%)` }} />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: BLUE_LIGHT, color: BLUE }}>
                      {b.tag}
                    </span>
                    <h3 className="mt-4" style={{ ...T.cardT, color: '#0f172a' }}>{b.title}</h3>
                    <p className="mt-3 flex-1" style={{ ...T.cardB, color: '#64748b' }}>{b.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-950">{b.author}</p>
                        <p className="text-[11px] text-slate-400">{b.date} · {b.readTime}</p>
                      </div>
                      <Link href={`/projects/sdg-education/blog/${b.id}`} className="text-sm font-semibold transition hover:opacity-70" style={{ color: BLUE }}>
                        Read <ArrowRight className="ml-1 inline-block h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Register CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 bg-[#eff6ff]">
        <FadeUp>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p style={T.label}>What you get</p>
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
            <div className="rounded-[32px] border bg-white p-10 shadow-sm" style={{ borderColor: '#bfdbfe' }}>
              <p style={T.label}>Get involved</p>
              <h3 className="mt-3" style={{ ...T.ctaH, color: '#0f172a' }}>Ready to inspire young changemakers?</h3>
              <p className="mt-3" style={{ ...T.ctaB, color: '#475569' }}>
                Register your school to receive a free SDG workshop, stationery kits for students, and official certification — all in one program.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { label: 'Cost',     value: '₹100 per participant' },
                  { label: 'SDGs',     value: 'SDG 4 · SDG 13 · SDG 15' },
                  { label: 'Timeline', value: 'First session within 2 weeks' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                    <p className="text-right text-sm font-semibold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/projects/sdg-education/register"
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
