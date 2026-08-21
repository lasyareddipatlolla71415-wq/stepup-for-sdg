'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const BLUE = '#155DFC';
const BLUE_LIGHT = '#eff6ff';

export default function SDGEducationRegisterPage() {
  const [form, setForm] = useState({
    schoolName: '', schoolType: '', contactName: '', email: '', phone: '',
    city: '', state: '', studentCount: '', grade: '', message: '',
  });
  const [done, setDone] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.schoolName && form.email && form.contactName) setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center px-5">
        <div className="max-w-md w-full rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white" style={{ background: BLUE }}>✓</span>
          <h2 className="mt-6 text-2xl font-bold text-slate-950">Registration submitted!</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Thank you for registering! Our coordinator will contact you within 48 hours to schedule your first SDG workshop.
          </p>
          <Link
            href="/projects/sdg-education"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: BLUE }}
          >
            Back to SDG Education
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto max-w-2xl px-5 py-16 md:px-8">

        <Link href="/projects/sdg-education"
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-70 mb-10"
          style={{ color: BLUE }}>
          <ArrowLeft className="h-4 w-4" /> Back to SDG Education
        </Link>

        <div className="mb-10">
          <span className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: BLUE_LIGHT, color: BLUE }}>
            Register
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">Register for SDG Education Program</h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Sign up your school or institution to receive a free SDG workshop, stationery kits, and official certification for your students.
          </p>
        </div>

        {/* What you get */}
        <div className="mb-8 rounded-[24px] border p-6" style={{ borderColor: '#bfdbfe', background: BLUE_LIGHT }}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: BLUE }}>What you receive</p>
          <ul className="space-y-2">
            {[
              'Interactive SDG workshop delivered at your school',
              'Official StepUp SDG certificate for every student',
              'Free stationery kit and compass box per participant',
              'Curriculum-aligned workshop materials',
              'Tree plantation activity included',
            ].map(b => (
              <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: BLUE }} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-5 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">School / Institution Name *</label>
              <input required value={form.schoolName} onChange={e => set('schoolName', e.target.value)}
                placeholder="e.g. Delhi Public School"
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900 transition" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Institution Type *</label>
              <select required value={form.schoolType} onChange={e => set('schoolType', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none focus:border-slate-900 transition text-slate-700">
                <option value="">Select type</option>
                {['Government School', 'Private School', 'College / University', 'NGO', 'Coaching Centre', 'Other'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Number of Students</label>
              <select value={form.studentCount} onChange={e => set('studentCount', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none focus:border-slate-900 transition text-slate-700">
                <option value="">Select range</option>
                {['1–30', '31–60', '61–100', '101–200', '200+'].map(o => <option key={o}>{o}</option>)}
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
                placeholder="you@school.edu"
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
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Grade / Age Group</label>
              <select value={form.grade} onChange={e => set('grade', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none focus:border-slate-900 transition text-slate-700">
                <option value="">Select grade</option>
                {['Grade 1–5 (Primary)', 'Grade 6–8 (Middle)', 'Grade 9–10 (Secondary)', 'Grade 11–12 (Senior)', 'College / University', 'Mixed'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Anything else you'd like us to know?</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)}
                placeholder="Any specific SDG topics, preferred dates, or special requirements..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-[#f8f9fc] px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-900 transition" />
            </div>
          </div>

          <button type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: BLUE }}>
            Submit Registration <ArrowRight className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
