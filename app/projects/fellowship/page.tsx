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

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, BadgeCheck, Briefcase, CalendarDays, CheckCircle2, Clock, MapPin, Search, Sparkles, Users, X } from 'lucide-react';

const BENEFITS = [
  { icon: BadgeCheck, text: 'A named fellowship credential added to your StepUp profile' },
  { icon: Briefcase, text: 'Direct access to internship listings from StepUp partner organizations' },
  { icon: Users, text: 'Mentorship check-ins with the StepUp program team' },
  { icon: Sparkles, text: 'Priority invitations to StepUp events and workshops' },
];

const ELIGIBILITY = [
  { icon: Award, text: 'Hold at least one active StepUp course certificate' },
  { icon: CheckCircle2, text: 'Submit a short statement of interest' },
  { icon: CalendarDays, text: 'Be available for a 15-minute intro call' },
];

const OPPORTUNITIES = [
  { id: 'ocean-stewardship', title: 'Ocean Stewardship Fellowship', organization: 'Blue Horizon Network', category: 'FELLOWSHIP', verified: false, location: 'International · Remote', duration: '3–6 months', closes: '9 Apr', compensation: 'Unpaid', domain: 'Ocean & Marine Conservation' },
  { id: 'circular-cities-design', title: 'Circular Cities Design Intern', organization: 'ReLoop Collective', category: 'INTERNSHIP', verified: true, location: 'Bengaluru, India', duration: '3 months', closes: '17 Apr', compensation: 'Paid', domain: 'Circular Economy' },
  { id: 'climate-data-policy', title: 'Climate Data & Policy Fellow', organization: 'Terra Nova Institute', category: 'FELLOWSHIP', verified: true, location: 'Remote · India', duration: '6 months', closes: '28 May', compensation: 'Stipend', domain: 'Climate Change' },
  { id: 'clean-energy-access', title: 'Clean Energy Access Associate', organization: 'Sunrise Commons', category: 'RESEARCH', verified: true, location: 'New Delhi, India', duration: '12 months', closes: '12 Jun', compensation: 'Scholarship', domain: 'Renewable Energy' },
];

function PostFellowshipForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ orgName: '', website: '', contact: '', email: '', role: '', type: 'Fellowship', location: '', duration: '', compensation: '', description: '' });
  const [done, setDone] = useState(false);

  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl overflow-y-auto">
        {/* Drawer header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">For organizations</p>
            <h2 className="mt-0.5 text-xl font-bold text-slate-950">Post a fellowship or internship</h2>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 px-8 py-8 space-y-14">

          {/* How it works */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">How it works</p>
            <h3 className="mt-2" style={{ ...T.ctaH, color: '#0f172a' }}>Three steps to your next opportunity.</h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { step: '01', title: 'Explore listings', desc: 'Browse fellowships, internships, and research roles curated for sustainability impact.' },
                { step: '02', title: 'Apply in minutes', desc: 'Submit a short application — your background, interests, and motivation.' },
                { step: '03', title: 'Start making impact', desc: 'Get matched and start contributing to real projects with organizations that share your values.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="border-t-2 border-[#0f3e1f] pt-5">
                  <p className="text-4xl font-bold text-slate-100">{step}</p>
                  <h4 className="mt-1" style={{ ...T.timelineH, color: '#0f172a' }}>{title}</h4>
                  <p className="mt-2" style={{ ...T.timelineT, color: '#64748b' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits + Eligibility */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">What you get</p>
              <h3 className="mt-2" style={{ ...T.programS, color: '#0f172a' }}>Benefits of the StepUp Fellowship.</h3>
              <ul className="mt-6 space-y-4">
                {BENEFITS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0f3e1f] text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="mt-1 text-xs leading-6 text-slate-600">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Who can apply</p>
              <h3 className="mt-2" style={{ ...T.programS, color: '#0f172a' }}>Eligibility criteria.</h3>
              <ul className="mt-6 space-y-4">
                {ELIGIBILITY.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 border-[#0f3e1f] text-[#0f3e1f]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="mt-1 text-xs leading-6 text-slate-600">{text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-[16px] bg-[#0f3e1f] px-5 py-5 text-white">
                <p className="text-sm font-semibold">Not eligible yet?</p>
                <p className="mt-1 text-xs leading-5 text-emerald-200">Complete a StepUp sustainability course first and earn your certificate — then come back and apply.</p>
                <Link href="/projects/sustainability-education" onClick={onClose} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0f3e1f] transition hover:bg-emerald-50">
                  Explore courses <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Post form */}
          <div>
            <div className="rounded-[20px] border border-slate-200 bg-[#f5f6fa] p-6">
              {done ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f3e1f] text-2xl text-white">✓</span>
                  <h3 className="mt-4 text-xl font-bold text-slate-950">Listing submitted!</h3>
                  <p className="mt-2 text-sm text-slate-500">We'll review and get back to you within 48 hours.</p>
                  <button onClick={onClose} className="mt-6 rounded-full bg-[#0f3e1f] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#164e28]">Close</button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-slate-950">Tell us about your opportunity</h3>
                  <p className="mt-1 text-xs text-slate-500">Takes about 5 minutes. We'll review and publish within 48 hours.</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700">Organization name</label>
                      <input value={form.orgName} onChange={(e) => set('orgName', e.target.value)} placeholder="e.g. Terra Nova Institute" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">Website <span className="font-normal text-slate-400">optional</span></label>
                      <input value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://yourorg.org" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">Contact person</label>
                      <input value={form.contact} onChange={(e) => set('contact', e.target.value)} placeholder="Full name" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700">Contact email</label>
                      <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@organization.org" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">Role title</label>
                      <input value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="e.g. Climate Research Fellow" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">Type</label>
                      <select value={form.type} onChange={(e) => set('type', e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-900">
                        <option>Fellowship</option>
                        <option>Internship</option>
                        <option>Research</option>
                        <option>Volunteer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">Location / Work mode</label>
                      <input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="e.g. Remote · India" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">Duration</label>
                      <input value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="e.g. 3 months" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700">Compensation</label>
                      <input value={form.compensation} onChange={(e) => set('compensation', e.target.value)} placeholder="e.g. Stipend · ₹15,000/mo or Unpaid" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700">Opportunity description</label>
                      <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="What will the fellow/intern do? What impact will they contribute to?" className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                    </div>
                  </div>
                  <button onClick={() => { if (form.orgName && form.email && form.role) setDone(true); }} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f3e1f] py-3.5 text-sm font-semibold text-white transition hover:bg-[#164e28]">
                    Submit listing <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function FellowshipPage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  return (
    <div className="bg-[#fdfcf9] text-slate-950">

      {showModal && <PostFellowshipForm onClose={() => setShowModal(false)} />}

      {/* Hero */}
      <section className="bg-[#fdfcf9] text-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="mt-6 tracking-tight text-slate-950" style={T.title}>
              Build your future. <span className="text-[#14532d]">Create real-world impact.</span>
            </h1>
            <p className="mt-8 max-w-2xl" style={{ ...T.subtitle, color: '#475569' }}>
              Find fellowships, internships, and research opportunities with teams shaping a more sustainable world.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#opportunities" className="inline-flex items-center justify-center rounded-full bg-[#0f3e1f] px-8 py-4 text-sm font-semibold text-white shadow-[0_15px_40px_-25px_rgba(15,23,42,0.3)] transition hover:bg-[#164e28]">
                Explore opportunities
              </a>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center justify-center rounded-full border border-[#0f3e1f] bg-white px-8 py-4 text-sm font-semibold text-[#0f3e1f] transition hover:bg-slate-50"
              >
                Post a fellowship
              </button>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
              {[{ v: '4+', l: 'opportunities' }, { v: '4+', l: 'organizations' }, { v: '4+', l: 'impact domains' }].map(({ v, l }) => (
                <div key={l} className="rounded-[28px] bg-white px-6 py-6 text-center shadow-sm">
                  <p className="text-3xl font-semibold text-slate-950">{v}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-500">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:ml-auto lg:max-w-[52rem] lg:-mr-16">
            <div className="relative overflow-visible rounded-[44px] p-5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] lg:-mr-14">
              <div className="absolute inset-0 rounded-[40px] border border-[#dce8db]" />
              <div className="absolute -top-4 -left-4 h-full w-full rounded-[40px] border border-[#d7e6d9] bg-white/0" />
              <div className="relative overflow-hidden rounded-[34px] border border-[#ebf3ec] bg-white">
                <div className="relative aspect-[5/4] w-full">
                  <Image src="/fellowship.png" alt="Fellowship image" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="mx-auto max-w-7xl px-5 pb-20 md:px-8 bg-[#fdfcf9]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_0.5fr] lg:items-end">
          <h2 className="tracking-tight text-slate-950" style={T.overviewH}>Opportunities with purpose built in.</h2>
          <p className="max-w-xl lg:text-right" style={{ ...T.overviewB, color: '#475569' }}>Every listing is a chance to learn, contribute, and move the needle on the issues that matter.</p>
        </div>

        <div className="mt-10 grid gap-4 xl:grid-cols-[1.75fr_0.9fr_0.9fr_0.9fr]">
          <label className="relative block rounded-[18px] border border-slate-200 bg-white px-4 py-4 shadow-sm focus-within:border-slate-900">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400"><Search className="h-4 w-4" /></span>
            <input type="search" placeholder="Search roles, organizations, or skills" className="w-full rounded-[18px] border-none bg-transparent pl-11 text-sm text-slate-950 outline-none placeholder:text-slate-400" />
          </label>
          <select className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900">
            <option>All domains</option><option>Ocean & Marine</option><option>Climate</option>
          </select>
          <select className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900">
            <option>All types</option><option>Fellowship</option><option>Internship</option><option>Research</option>
          </select>
          <select className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900">
            <option>Closing soon</option><option>Newest</option><option>Verified</option>
          </select>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">4 opportunities</p>
          <p className="text-sm text-slate-500">Curated for your impact journey</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {OPPORTUNITIES.map((o) => (
            <article key={o.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                  {o.title.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100">
                  <span className="text-xs">☆</span>
                </button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">{o.category}</span>
                {o.verified && <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Verified</span>}
              </div>
              <h3 className="mt-4" style={{ ...T.programS, color: '#0f172a' }}>{o.title}</h3>
              <p className="mt-2" style={{ ...T.focusB, color: '#64748b' }}>{o.organization}</p>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" />{o.location}</p>
                <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-400" />{o.duration}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Closes</p>
                  <p className="mt-1 font-semibold text-slate-950">{o.closes}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{o.compensation}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <p>{o.domain}</p>
                <Link href={`/projects/${o.id}`} className="font-semibold text-slate-950 transition hover:text-slate-700">
                  View details <ArrowRight className="ml-1 inline-block h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
