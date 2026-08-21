'use client';

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
  programS:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '24px',  fontWeight: 600, lineHeight: '50px' },
  programB:{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '18px',  fontWeight: 400, lineHeight: '50px' },
  ctaH:    { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '32px',  fontWeight: 700, lineHeight: '50px' },
  ctaB:    { fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '18px',  fontWeight: 400, lineHeight: '50px' },
};

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Trophy,
  Users,
} from 'lucide-react';
import { Counter } from '@/app/components/site/Counter';
import { FadeUp } from '@/app/components/site/FadeUp';

const headingFont = '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';

const TOP_STATS = [
  { label: 'UN SDGs', value: '17' },
  { label: 'Free courses', value: '12+' },
  { label: 'Impact', value: '∞' },
];

const PATHWAY_STEPS = [
  {
    title: 'Learn the SDGs',
    description: 'Explore 17 goals to understand real-world challenges and how global action creates a better future for all.',
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#0fae83" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 40 Q28 32 46 40" />
        <path d="M10 40 Q28 48 46 40" />
        <path d="M10 16 Q28 8 46 16 L46 40 Q28 32 10 40 Z" />
        <line x1="28" y1="8" x2="28" y2="48" />
        <line x1="28" y1="48" x2="24" y2="44" />
      </svg>
    ),
  },
  {
    title: 'Enroll in UN Course',
    description: 'Access bite-sized lessons, real-life examples, and quizzes to build your knowledge and skills with ease.',
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#0fae83" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="40" height="26" rx="3" />
        <line x1="20" y1="40" x2="20" y2="46" />
        <line x1="36" y1="40" x2="36" y2="46" />
        <line x1="14" y1="46" x2="42" y2="46" />
        <circle cx="28" cy="27" r="6" />
        <polygon points="25,24 25,30 33,27" fill="#0fae83" stroke="none" />
        <path d="M36 10 l4 4 -12 4 -4-4z" />
      </svg>
    ),
  },
  {
    title: 'Get Certified',
    description: 'Complete the course and earn your UN-recognized certificate to showcase your impact and stand out.',
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#0fae83" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="10" width="30" height="36" rx="2" />
        <line x1="14" y1="20" x2="32" y2="20" />
        <line x1="14" y1="26" x2="28" y2="26" />
        <line x1="14" y1="32" x2="24" y2="32" />
        <path d="M22 38 l4 6 4-6" />
        <circle cx="40" cy="38" r="8" />
        <circle cx="40" cy="38" r="4" />
        <path d="M34 46 l6-4 6 4 v6 l-6-3-6 3z" />
      </svg>
    ),
  },
];

const IMPACT_METRICS = [
  { label: 'Learners', value: '10,000+', icon: Users },
  { label: 'Countries', value: '190+', icon: Globe2 },
  { label: 'SDG Tracks', value: '17', icon: Trophy },
  { label: 'Verified Courses', value: '100%', icon: CheckCircle2 },
];

const FORM_FEATURES = [
  'Instant access to the introductory SDG lesson',
  '12+ free official UN course pathway',
  'Certificate upload & verification',
];

export default function SustainabilityEducationPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [organization, setOrganization] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !country.trim() || !organization.trim()) {
      setErrorMessage('Please fill out all fields before continuing.');
      return;
    }
    router.push('/projects/sustainability-education/lesson');
  }

  return (
    <div className="bg-[#f0f9ff] text-slate-950">
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="absolute inset-x-0 top-0 h-48 bg-[#f0f9ff]" />
        <div className="mx-auto max-w-365 px-5 lg:px-8 relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeUp>
              <div className="max-w-2xl">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                ← Back to Projects
              </Link>
                <p style={{ ...T.label, color: '#0fae83' }}>PROJECT 02 / EDUCATION</p>
                <h1 className="mt-4 tracking-tight text-slate-950" style={T.title}>
                  Sustainable <span className="text-[#0fae83]">Education</span> Program
                </h1>
                <p className="mt-6 max-w-xl" style={{ ...T.subtitle, color: '#475569' }}>
                  A free global learning journey to master the 17 UN Sustainable Development Goals through curated video lessons, official UN internship courses, and verifiable certification.
                </p>

                <div className="mt-10">
                  <a
                    href="#start"
                    className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#0fae83] to-[#1f80ff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:from-[#0d9d76] hover:to-[#1a72e6]"
                  >
                    Start Learning Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                  {TOP_STATS.map((stat) => {
                    const match = stat.value.match(/^([\d.]+)([A-Za-z+∞]*)$/);
                    const num = match ? parseFloat(match[1]) : 0;
                    const suffix = match ? match[2] : stat.value;
                    const isSymbol = !match;
                    return (
                      <div key={stat.label} className="text-center">
                        <p style={{ ...T.impactN, color: '#0f172a' }}>
                          {isSymbol ? stat.value : <Counter to={num} suffix={suffix} />}
                        </p>
                        <p className="mt-3" style={{ ...T.impactL, color: '#64748b' }}>{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeUp>

            <FadeUp>
              <div className="relative mx-auto w-full max-w-2xl">
                <div className="rounded-[32px] border border-slate-200 bg-white p-1 shadow-2xl shadow-slate-400/10">
                  <div className="overflow-hidden rounded-[30px]">
                    <Image
                      src="/id.jpg"
                      alt="Student reading a book in a field"
                      width={1080}
                      height={720}
                      className="h-120 w-full object-cover"
                    />
                  </div>

                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-365 px-5 pb-24 lg:px-8">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mt-4" style={{ ...T.overviewH, color: '#0f172a' }}>
              Three simple steps take you from curiosity to a UN-recognized certification pathway.
            </h2>
          </div>
        </FadeUp>

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          {/* dashed connectors */}
          <div className="absolute hidden md:block" style={{ left: 'calc(33.33%)', top: '38%', width: 'calc(33.33% - 16px)', borderTop: '2px dashed #6ee7b7' }}>
            <span className="absolute -left-2 -top-[5px] h-3 w-3 rounded-full bg-[#0fae83]" />
            <span className="absolute -right-2 -top-[5px] h-3 w-3 rounded-full bg-[#0fae83]" />
          </div>
          <div className="absolute hidden md:block" style={{ left: 'calc(66.66%)', top: '38%', width: 'calc(33.33% - 16px)', borderTop: '2px dashed #6ee7b7' }}>
            <span className="absolute -left-2 -top-[5px] h-3 w-3 rounded-full bg-[#0fae83]" />
            <span className="absolute -right-2 -top-[5px] h-3 w-3 rounded-full bg-[#0fae83]" />
          </div>

          {PATHWAY_STEPS.map((step, idx) => (
            <FadeUp key={step.title} delay={idx * 80}>
              <div className="relative overflow-hidden rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm">
                <span className="absolute right-5 top-5 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#0fae83' }}>
                  STEP {idx + 1}
                </span>
                <div className="flex justify-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full" style={{ background: '#e6fbf6' }}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="mt-8 text-center" style={{ ...T.programS, color: '#0f172a' }}>{step.title}</h3>
                <p className="mt-4 text-center" style={{ ...T.programB, color: '#64748b' }}>{step.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-linear-to-r from-[#0d9488] via-[#059669] to-[#2563eb] py-16 text-white">
        <div className="mx-auto max-w-365 px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            {IMPACT_METRICS.map((metric) => {
              const match = metric.value.match(/^([\d.]+)([A-Za-z+%]*)$/);
              const num = match ? parseFloat(match[1]) : 0;
              const suffix = match ? match[2] : '';
              return (
                <div key={metric.label} className="rounded-[28px] bg-white/10 px-6 py-8 text-center shadow-xl shadow-slate-950/10">
                  <p style={T.impactN}><Counter to={num} suffix={suffix} /></p>
                  <p className="mt-2" style={{ ...T.impactL, color: 'rgba(255,255,255,0.8)' }}>{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="start" className="mx-auto max-w-365 px-5 py-24 lg:px-8">
        <FadeUp>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                New Registration
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Begin your SDG journey today.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Register once and unlock the full learning path, SDG video lessons, official UN internship courses, and certificate verification.
              </p>

              <ul className="mt-8 space-y-4">
                {FORM_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <p className="text-sm leading-7 text-slate-600">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border border-[#0fae83]/20 bg-white p-10 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.15)]">
              {submitted ? (
                <div className="rounded-[28px] bg-[#ECFDF5] p-10 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#047857]" />
                  <h3 className="mt-6 text-2xl font-semibold text-slate-950">You’re registered!</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    We have received your details. Our team will contact you with the next steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  ) : null}
                  <div className="space-y-5">
                    <label className="block text-sm font-semibold text-slate-900">
                      Full Name
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                        placeholder="Jane Doe"
                        required
                      />
                    </label>
                    <label className="block text-sm font-semibold text-slate-900">
                      Email Address
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                        placeholder="jane@example.org"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-900">
                      Phone
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                        placeholder="+1 555 123 4567"
                        required
                      />
                    </label>
                    <label className="block text-sm font-semibold text-slate-900">
                      Country
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                        placeholder="Kenya"
                        required
                      />
                    </label>
                  </div>

                  <label className="block text-sm font-semibold text-slate-900">
                    Institution / Organization
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                      placeholder="University of Nairobi"
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-[#0fae83] to-[#1f80ff] px-6 py-3 text-base font-semibold text-white shadow-[0_20px_35px_-18px_rgba(15,23,42,0.4)] transition duration-200 hover:shadow-[0_24px_40px_-18px_rgba(15,23,42,0.45)]"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    By registering you agree to receive course updates.
                  </p>
                </form>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/projects/sustainability-education/courses"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0fae83] to-[#1f80ff] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/15 transition hover:opacity-95"
            >
              Get Verified
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
