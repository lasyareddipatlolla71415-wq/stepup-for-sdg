'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const GREEN = '#3F7E44';
const GREEN_LIGHT = '#dcfce7';

export default function CleanCommunityRegisterPage() {
  const [form, setForm] = useState({
    orgName: '', orgType: '', contactName: '', email: '', phone: '',
    city: '', state: '', size: '', sdgFocus: '', message: '',
  });
  const [done, setDone] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.orgName && form.email && form.contactName) setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center px-5">
        <div className="max-w-md w-full rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white" style={{ background: GREEN }}>✓</span>
          <h2 className="mt-6 text-2xl font-bold text-slate-950">Registration submitted!</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Thank you for joining the Clean Community Initiative. Our team will send your free toolkit within 1 week.
          </p>
          <Link
            href="/projects/clean-community"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: GREEN }}
          >
            Back to Initiative
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto max-w-2xl px-5 py-16 md:px-8">

        <Link
          href="/projects/clean-community"
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-70 mb-10"
          style={{ color: GREEN }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Clean Community Initiative
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: GREEN_LIGHT, color: GREEN }}>
            Register
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">Join the Clean Community Initiative</h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Register your school, college, NGO or resident group to receive a free clean-drive toolkit and get listed on our impact map.
          </p>
        </div>

        {/* What you get */}
        <div className="mb-8 rounded-[24px] border p-6" style={{ borderColor: '#bbf7d0', background: GREEN_LIGHT }}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: GREEN }}>What you receive</p>
          <ul className="space-y-2">
            {[
              'Free waste segregation & clean-drive toolkit',
              'Certificate of participation for every volunteer',
              'Feature on the StepUp community impact map',
              'Dedicated StepUp coordinator support',
            ].map(b => (
              <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: GREEN }} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-5 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Organisation / School Name *</label>
              <input required value={form.orgName} onChange={e => set('orgName', e.target.value)}
                placeholder="e.g. Bright Futures Academy"
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900 transition" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Organisation Type *</label>
              <select required value={form.orgType} onChange={e => set('orgType', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none focus:border-slate-900 transition text-slate-700">
                <option value="">Select type</option>
                {['School', 'College / University', 'NGO', 'Resident Group', 'Company / CSR', 'Other'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Group Size</label>
              <select value={form.size} onChange={e => set('size', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none focus:border-slate-900 transition text-slate-700">
                <option value="">Select size</option>
                {['1–20 people', '21–50 people', '51–100 people', '100+ people'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Contact Person *</label>
              <input required value={form.contactName} onChange={e => set('contactName', e.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900 transition" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Email *</label>
              <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                placeholder="you@organisation.org"
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900 transition" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900 transition" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">City</label>
              <input value={form.city} onChange={e => set('city', e.target.value)}
                placeholder="e.g. Hyderabad"
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900 transition" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">State</label>
              <input value={form.state} onChange={e => set('state', e.target.value)}
                placeholder="e.g. Telangana"
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900 transition" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">SDG Focus Area</label>
              <select value={form.sdgFocus} onChange={e => set('sdgFocus', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none focus:border-slate-900 transition text-slate-700">
                <option value="">Select SDG</option>
                {['SDG 13 – Climate Action', 'SDG 15 – Life on Land', 'SDG 11 – Sustainable Cities', 'SDG 12 – Responsible Consumption', 'Both SDG 13 & 15'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Tell us about your community</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)}
                placeholder="What kind of clean drive are you planning? Any specific goals or challenges?"
                className="w-full resize-none rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900 transition" />
            </div>
          </div>

          <button type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: GREEN }}
          >
            Submit Registration <ArrowRight className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
