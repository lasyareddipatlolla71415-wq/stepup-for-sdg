'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Award, BadgeCheck, Briefcase, CalendarDays, CheckCircle2, Sparkles, Users } from 'lucide-react';
import { addFellowshipListing } from '@/app/lib/adminStore';

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

export default function PostFellowshipPage() {
  const [form, setForm] = useState({ orgName: '', website: '', contact: '', email: '', role: '', type: 'Fellowship', location: '', duration: '', compensation: '', description: '' });
  const [done, setDone] = useState(false);

  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  if (done) return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#f5f6fa] px-5 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0f3e1f] text-3xl text-white">✓</span>
      <h2 className="mt-6 text-3xl font-bold text-slate-950">Listing submitted!</h2>
      <p className="mt-3 text-sm text-slate-500">We'll review your listing and get back to you within 48 hours.</p>
      <Link href="/projects/fellowship" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0f3e1f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#164e28]">
        ← Back to opportunities
      </Link>
    </div>
  );

  return (
    <div className="bg-[#f5f6fa] text-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">

        {/* Back link — same as detail page */}
        <Link href="/projects/fellowship" className="inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-slate-900">
          <span className="mr-2 text-xl leading-none">←</span> All opportunities
        </Link>

        {/* Header — same structure as detail page */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                FOR ORGANIZATIONS
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                Free to list
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Post a Fellowship or Internship
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              StepUp for SDG · Open to NGOs, social enterprises & CSR partners
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100">
              <span className="text-sm">↗</span>
            </button>
            <a href="#form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c2410c] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9a3412]">
              Submit listing ↗
            </a>
          </div>
        </div>

        {/* Divider + two-column layout — same as detail page */}
        <div className="mt-10 border-t border-slate-200 pt-10">
          <div className="grid gap-10 lg:grid-cols-[1.45fr_0.95fr]">

            {/* Left — main content */}
            <div className="space-y-10">

              <section>
                <h2 className="text-xl font-semibold text-slate-950">About this program</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  Partner with StepUp to connect your organization with motivated, sustainability-focused students and early-career professionals across India. Every listing reaches candidates already trained in SDG frameworks and ready to contribute.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">How it works</h2>
                <div className="mt-4 space-y-3">
                  {[
                    'Submit your listing using the form on this page',
                    'Our team reviews and publishes within 48 hours',
                    'Candidates apply directly through StepUp',
                    'You receive applications and select your fellow or intern',
                  ].map((step) => (
                    <p key={step} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">✓</span>
                      {step}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Benefits for your organization</h2>
                <div className="mt-4 space-y-4">
                  {BENEFITS.map(({ icon: Icon, text }) => (
                    <p key={text} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Icon className="h-3 w-3" />
                      </span>
                      {text}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Candidate eligibility</h2>
                <div className="mt-4 space-y-3">
                  {ELIGIBILITY.map(({ icon: Icon, text }) => (
                    <p key={text} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Icon className="h-3 w-3" />
                      </span>
                      {text}
                    </p>
                  ))}
                </div>
              </section>

              {/* Form — same card style as detail page */}
              <section id="form">
                <h2 className="text-xl font-semibold text-slate-950">Submit your listing</h2>
                <p className="mt-2 text-sm text-slate-500">Takes about 5 minutes. We'll review and publish within 48 hours.</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700">Organization name</label>
                    <input value={form.orgName} onChange={(e) => set('orgName', e.target.value)} placeholder="e.g. Terra Nova Institute" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Website <span className="font-normal text-slate-400">optional</span></label>
                    <input value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://yourorg.org" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Contact person</label>
                    <input value={form.contact} onChange={(e) => set('contact', e.target.value)} placeholder="Full name" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700">Contact email</label>
                    <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@organization.org" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Role title</label>
                    <input value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="e.g. Climate Research Fellow" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Type</label>
                    <select value={form.type} onChange={(e) => set('type', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900">
                      <option>Fellowship</option>
                      <option>Internship</option>
                      <option>Research</option>
                      <option>Volunteer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Location / Work mode</label>
                    <input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="e.g. Remote · India" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Duration</label>
                    <input value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="e.g. 3 months" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700">Compensation</label>
                    <input value={form.compensation} onChange={(e) => set('compensation', e.target.value)} placeholder="e.g. Stipend · ₹15,000/mo or Unpaid" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700">Opportunity description</label>
                    <textarea rows={5} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="What will the fellow/intern do? What impact will they contribute to?" className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900" />
                  </div>
                </div>
                <button
                  onClick={() => { if (form.orgName && form.email && form.role) { addFellowshipListing(form); setDone(true); } }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c2410c] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9a3412]"
                >
                  Submit listing <ArrowRight className="h-4 w-4" />
                </button>
              </section>

            </div>

            {/* Right sidebar — same cards as detail page */}
            <aside className="space-y-6">
              <div className="rounded-[28px] bg-slate-950 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Why StepUp</p>
                <div className="mt-5">
                  <p className="text-4xl font-semibold">Free</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    No cost to list for verified NGOs, social enterprises, and CSR partners.
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Review time</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">Within 48 hours</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Listing types</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">Fellowship · Internship · Research · Volunteer</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Work mode</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">Remote · Hybrid · On-site</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Reach</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">SDG-trained students across India</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Support</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">Dedicated partnerships team</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-emerald-100 bg-emerald-50 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">SDG alignment</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {['SDG 4', 'SDG 8', 'SDG 13', 'SDG 17'].map((sdg) => (
                    <span key={sdg} className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}
