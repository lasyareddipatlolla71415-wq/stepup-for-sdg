'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addWaterConservationRegistration } from '@/app/lib/adminStore';

const STEPS = ['About you', 'Your site', 'Your commitment', 'Review'];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  role: string;
  siteName: string;
  siteType: string;
  siteLocation: string;
  waterSource: string;
  participants: string;
  motivation: string;
  available: boolean;
};

const INITIAL: FormData = {
  fullName: '', email: '', phone: '', city: '', role: '',
  siteName: '', siteType: '', siteLocation: '', waterSource: '', participants: '',
  motivation: '', available: false,
};

const BLUE = '#0369a1';

export default function WaterConservationRegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormData, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit() {
    addWaterConservationRegistration({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      role: form.role,
      siteName: form.siteName,
      siteType: form.siteType,
      siteLocation: form.siteLocation,
      waterSource: form.waterSource,
      participants: form.participants,
      motivation: form.motivation,
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f5f6fa] px-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white" style={{ background: BLUE }}>✓</div>
        <h2 className="mt-6 text-3xl font-bold text-slate-950">Registration submitted!</h2>
        <p className="mt-3 text-slate-600">Our team will reach out within 48 hours to schedule your site assessment.</p>
        <Link href="/projects/water-conservation" className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: BLUE }}>
          ← Back to program
        </Link>
      </div>
    );
  }

  const inputCls = 'mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-900';

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">

        <Link href="/projects/water-conservation" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900">
          <span>←</span> Back to program
        </Link>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>Water Conservation Program</p>
          <h1 className="mt-3 font-serif text-5xl font-bold text-slate-950 sm:text-6xl">Register your site.</h1>
          <p className="mt-3 text-sm text-slate-500">Takes under 5 minutes. We'll follow up with a free site assessment.</p>
        </div>

        {/* Stepper */}
        <div className="mt-8 flex items-start border-b border-slate-200">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col pb-0">
              <div className="flex items-center gap-2 pb-3">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${i <= step ? 'text-white' : 'border-2 border-slate-300 bg-white text-slate-400'}`}
                  style={i <= step ? { background: BLUE } : {}}>
                  {i + 1}
                </div>
                <span className={`text-xs font-medium ${i <= step ? 'text-slate-950' : 'text-slate-400'}`}>{label}</span>
              </div>
              <div className="h-[2.5px] rounded-full" style={{ background: i <= step ? BLUE : 'transparent' }} />
            </div>
          ))}
        </div>

        <div className="mt-8">

          {/* Step 1 — About you */}
          {step === 0 && (
            <div>
              <p className="text-sm font-semibold" style={{ color: '#c2410c' }}>01</p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-slate-950">Tell us about yourself</h2>
              <p className="mt-2 text-sm text-slate-500">Who is registering this site?</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Full name</label>
                  <input value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Your full name" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Email</label>
                  <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Phone</label>
                  <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 00000 00000" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">City</label>
                  <input value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Where are you based?" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Your role</label>
                  <select value={form.role} onChange={(e) => set('role', e.target.value)} className={inputCls}>
                    <option value="">Select your role</option>
                    <option>School Principal / Administrator</option>
                    <option>Teacher</option>
                    <option>NGO Representative</option>
                    <option>Community Leader</option>
                    <option>Government Official</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Your site */}
          {step === 1 && (
            <div>
              <p className="text-sm font-semibold" style={{ color: '#c2410c' }}>02</p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-slate-950">About your site</h2>
              <p className="mt-2 text-sm text-slate-500">Help us understand where the system will be installed.</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">School / Community name</label>
                  <input value={form.siteName} onChange={(e) => set('siteName', e.target.value)} placeholder="e.g. Greenfield Public School" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Site type</label>
                  <select value={form.siteType} onChange={(e) => set('siteType', e.target.value)} className={inputCls}>
                    <option value="">Select type</option>
                    <option>School</option>
                    <option>College</option>
                    <option>Community Centre</option>
                    <option>NGO Facility</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Site location</label>
                  <input value={form.siteLocation} onChange={(e) => set('siteLocation', e.target.value)} placeholder="District, State" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Current water source</label>
                  <select value={form.waterSource} onChange={(e) => set('waterSource', e.target.value)} className={inputCls}>
                    <option value="">Select source</option>
                    <option>Municipal supply</option>
                    <option>Borewell / Groundwater</option>
                    <option>Tanker water</option>
                    <option>River / Pond</option>
                    <option>No reliable source</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Estimated beneficiaries</label>
                  <input value={form.participants} onChange={(e) => set('participants', e.target.value)} placeholder="e.g. 500 students" className={inputCls} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Your commitment */}
          {step === 2 && (
            <div>
              <p className="text-sm font-semibold" style={{ color: '#c2410c' }}>03</p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-slate-950">Your commitment</h2>
              <p className="mt-2 text-sm text-slate-500">Tell us why this matters to you.</p>
              <div className="mt-8 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Why do you want to join this program?</label>
                  <textarea rows={4} value={form.motivation} onChange={(e) => set('motivation', e.target.value)} placeholder="Share your motivation and the water challenges your site faces..." className={`${inputCls} resize-none`} />
                </div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={form.available} onChange={(e) => set('available', e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#0369a1]" />
                  <span className="text-sm leading-6 text-slate-600">
                    I confirm that I am authorized to register this site and am available for a 15-minute assessment call within the next 2 weeks.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4 — Review */}
          {step === 3 && (
            <div>
              <div className="flex items-baseline gap-4">
                <p className="text-sm font-semibold" style={{ color: '#c2410c' }}>04</p>
                <div>
                  <h2 className="font-serif text-3xl font-bold text-slate-950">Review your registration</h2>
                  <p className="mt-1 text-sm text-slate-500">Give everything one final look before sending.</p>
                </div>
              </div>
              <div className="mt-8 border border-slate-200 bg-white">
                {[
                  { label: 'REGISTRANT', value: [form.fullName, form.role].filter(Boolean).join(' · ') || 'Not added yet' },
                  { label: 'CONTACT', value: [form.email, form.phone, form.city].filter(Boolean).join(' · ') || 'Not added yet' },
                  { label: 'SITE', value: [form.siteName, form.siteType, form.siteLocation].filter(Boolean).join(' · ') || 'Not added yet' },
                  { label: 'WATER SOURCE', value: [form.waterSource, form.participants && `${form.participants} beneficiaries`].filter(Boolean).join(' · ') || 'Not added yet' },
                  { label: 'MOTIVATION', value: form.motivation || 'Not added yet' },
                ].map(({ label, value }, i, arr) => (
                  <div key={label} className={`px-6 py-5 ${i < arr.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-end gap-3">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)} className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: BLUE }}>
                Continue <span>›</span>
              </button>
            ) : (
              <button onClick={handleSubmit} className="inline-flex items-center gap-2 rounded-full bg-[#c2410c] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#9a3412]">
                Submit registration <span>↗</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
