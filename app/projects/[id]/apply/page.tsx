'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const STEPS = ['About you', 'Your interests', 'Your story', 'Review'];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  education: string;
  institution: string;
  interests: string[];
  skills: string[];
  motivation: string;
  experience: string;
};

const INITIAL: FormData = {
  fullName: '', email: '', phone: '', city: '',
  education: '', institution: '',
  interests: [], skills: [], motivation: '', experience: '',
};

const DEFAULT_INTERESTS = [
  'Climate Change', 'Renewable Energy', 'Circular Economy',
  'Biodiversity', 'Water', 'ESG', 'Climate Technology', 'Sustainable Cities',
];

const DEFAULT_SKILLS = [
  'Research', 'Data Analysis', 'Communication',
  'Project Management', 'Policy Research', 'GIS',
];

export default function ApplyPage() {
  const params = useParams();
  const id = params.id as string;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [interestOptions, setInterestOptions] = useState(DEFAULT_INTERESTS);
  const [skillOptions, setSkillOptions] = useState(DEFAULT_SKILLS);
  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggle(field: 'interests' | 'skills', value: string) {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter((s) => s !== value)
        : [...f[field], value],
    }));
  }

  function addCustom(field: 'interests' | 'skills') {
    const val = field === 'interests' ? newInterest.trim() : newSkill.trim();
    if (!val) return;
    if (field === 'interests') {
      if (!interestOptions.includes(val)) setInterestOptions((o) => [...o, val]);
      setForm((f) => ({ ...f, interests: [...f.interests, val] }));
      setNewInterest('');
    } else {
      if (!skillOptions.includes(val)) setSkillOptions((o) => [...o, val]);
      setForm((f) => ({ ...f, skills: [...f.skills, val] }));
      setNewSkill('');
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f5f6fa] px-5 text-center">
        <div className="rounded-full bg-emerald-100 p-5 text-4xl">✓</div>
        <h2 className="mt-6 text-3xl font-bold text-slate-950">Application submitted!</h2>
        <p className="mt-3 text-slate-600">We'll be in touch within 5–7 business days.</p>
        <Link href="/projects/fellowship" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0f3e1f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#164e28]">
          ← Back to opportunities
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">

        {/* Back link */}
        <Link href={`/projects/${id}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900">
          <span>←</span> Back to opportunity
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Your application</p>
          <h1 className="mt-3 font-serif text-5xl font-bold text-slate-950 sm:text-6xl">Make your next move.</h1>
          <p className="mt-3 text-sm text-slate-500">Most applications take under 10 minutes. You can come back anytime.</p>
        </div>

        {/* Stepper */}
        <div className="mt-8 flex items-start border-b border-slate-200">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col pb-0">
              <div className="flex items-center gap-2 pb-3">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  i <= step ? 'bg-[#0f3e1f] text-white' : 'border-2 border-slate-300 bg-white text-slate-400'
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-medium ${
                  i <= step ? 'text-slate-950' : 'text-slate-400'
                }`}>{label}</span>
              </div>
              <div className={`h-[2.5px] rounded-full ${
                i <= step ? 'bg-[#0f3e1f]' : 'bg-transparent'
              }`} />
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="mt-8">

          {/* Step 1 — About you */}
          {step === 0 && (
            <div>
              <p className="text-sm font-semibold text-[#c2410c]">01</p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-slate-950">Tell us about yourself</h2>
              <p className="mt-2 text-sm text-slate-500">A few details help organizations get to <span className="text-emerald-600">know you.</span></p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Full name</label>
                  <input value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Your full name" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Email</label>
                  <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Phone <span className="font-normal text-slate-400">optional</span></label>
                  <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 00000 00000" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">City</label>
                  <input value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Where are you based?" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-900" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Education level</label>
                  <select value={form.education} onChange={(e) => set('education', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none focus:border-slate-900">
                    <option value="">Select your level</option>
                    <option>High School</option>
                    <option>Undergraduate</option>
                    <option>Postgraduate</option>
                    <option>PhD</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Institution</label>
                  <input value={form.institution} onChange={(e) => set('institution', e.target.value)} placeholder="University or organization" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-900" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Your interests */}
          {step === 1 && (
            <div>
              <p className="text-sm font-semibold text-[#c2410c]">02</p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-slate-950">What pulls you forward?</h2>
              <p className="mt-2 text-sm text-slate-500">Choose the topics and <span className="text-emerald-600">skills</span> you want to grow.</p>

              {/* Interests */}
              <div className="mt-8">
                <p className="text-xs font-semibold text-slate-700">Interests</p>
                <p className="mt-1 text-xs text-slate-400">select all that apply</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {interestOptions.map((item) => (
                    <button key={item} type="button" onClick={() => toggle('interests', item)}
                      className={`rounded-md border px-4 py-2 text-sm transition ${
                        form.interests.includes(item)
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}>
                      {item}
                    </button>
                  ))}
                  <div className="flex items-center gap-1">
                    <input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom('interests'))}
                      placeholder="+ Add your own"
                      className="rounded-md border border-dashed border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-500 w-36"
                    />
                    <button type="button" onClick={() => addCustom('interests')} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Add</button>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-8">
                <p className="text-xs font-semibold text-slate-700">Skills</p>
                <p className="mt-1 text-xs text-slate-400">select all that apply</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skillOptions.map((item) => (
                    <button key={item} type="button" onClick={() => toggle('skills', item)}
                      className={`rounded-md border px-4 py-2 text-sm transition ${
                        form.skills.includes(item)
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}>
                      {item}
                    </button>
                  ))}
                  <div className="flex items-center gap-1">
                    <input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom('skills'))}
                      placeholder="+ Add your own"
                      className="rounded-md border border-dashed border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-500 w-36"
                    />
                    <button type="button" onClick={() => addCustom('skills')} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Add</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Your story */}
          {step === 2 && (
            <div>
              <p className="text-sm font-semibold text-[#c2410c]">03</p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-slate-950">Your story</h2>
              <p className="mt-2 text-sm text-slate-500">Help us understand what drives you.</p>
              <div className="mt-8 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Why do you want to apply?</label>
                  <textarea rows={4} value={form.motivation} onChange={(e) => set('motivation', e.target.value)} placeholder="Share your motivation..." className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-900 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Relevant experience <span className="font-normal text-slate-400">optional</span></label>
                  <textarea rows={4} value={form.experience} onChange={(e) => set('experience', e.target.value)} placeholder="Projects, volunteering, coursework..." className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-900 resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Review */}
          {step === 3 && (
            <div>
              <div className="flex items-baseline gap-4">
                <p className="text-sm font-semibold text-[#c2410c]">04</p>
                <div>
                  <h2 className="font-serif text-3xl font-bold text-slate-950">Review your application</h2>
                  <p className="mt-1 text-sm text-slate-500">Give everything one final look before <span className="text-emerald-600">sending.</span></p>
                </div>
              </div>
              <div className="mt-8 border border-slate-200 bg-white">
                {[
                  { label: 'APPLICANT', value: [form.fullName, form.education, form.institution].filter(Boolean).join(' · ') || 'Not added yet' },
                  { label: 'CONTACT', value: [form.email, form.phone, form.city].filter(Boolean).join(' · ') || 'Not added yet' },
                  { label: 'INTERESTS', value: [...form.interests, ...form.skills].join(', ') || 'None selected' },
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
              <button onClick={() => setStep((s) => s + 1)} className="inline-flex items-center gap-2 rounded-full bg-[#0f3e1f] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#164e28]">
                Continue <span>›</span>
              </button>
            ) : (
              <button onClick={() => setSubmitted(true)} className="inline-flex items-center gap-2 rounded-full bg-[#c2410c] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#9a3412]">
                Submit application <span>↗</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
