'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="mb-6">
          <Link
            href="/projects/sustainability-education"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to program
          </Link>
        </div>
        <div className="mb-12 flex flex-col gap-4">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700">
            Official UN Learning
          </span>
          <div>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              UN SDG Internship Programs
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Patlolla, unlock free, certified courses on the UN Sustainable Development Goals — delivered by UN CC:Learn, UNITAR, and UN Women.
            </p>
          </div>
        </div>

        <div className="rounded-[32px] bg-gradient-to-r from-emerald-500 to-sky-600 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)]">
          <div className="flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-200/80">Ready to verify?</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Earned your certificate? Get it verified.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-100/90">
                Upload your UN course certificate and earn the “Verified UN Certificate” badge on your profile after admin review.
              </p>
            </div>

            <Link href="/projects/sustainability-education/verify" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/10 transition hover:bg-slate-100">
              Verify Certificate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
