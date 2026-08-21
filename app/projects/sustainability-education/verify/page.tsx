'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Upload, ChevronDown } from 'lucide-react';

const COURSES = [
  'Sustainable Lifestyles',
  'UN SDG Learn Basics',
  'Women Empowerment & Equality',
  'Climate Action Essentials',
];

export default function VerifyPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/projects/sustainability-education/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" />
              Back to courses
            </Link>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Certificate Verification
            </span>
          </div>
          <div className="text-sm text-slate-500">
            Submit your certificate to get the verified badge in your dashboard.
          </div>
        </div>

        <div className="rounded-[26px] border border-emerald-100 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(14,165,233,0.18)]">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Upload your UN course certificate</h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Submit the PDF or image of the certificate you received from the official UN course platform. Our team will review and verify it.
              </p>
            </div>

            <div className="space-y-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-6 shadow-sm shadow-emerald-100">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Which UN course is this certificate for?</label>
                  <div className="relative">
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full appearance-none rounded-3xl border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="">Select the course...</option>
                      {COURSES.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Certificate file (PDF, PNG, or JPG max 5 MB)</label>
                  <label className="group flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-emerald-200 bg-white px-4 text-center transition hover:border-slate-400 hover:bg-slate-50">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition group-hover:bg-emerald-200">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">Click to choose a file or drag & drop</p>
                      <p>PDF, PNG, JPG</p>
                      {fileName ? <p className="text-sm text-slate-500">Selected: {fileName}</p> : null}
                    </div>
                    <input
                      type="file"
                      accept=".pdf,image/png,image/jpeg"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFileName(file.name);
                          setUploaded(false);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-[20px] bg-emerald-100 px-5 py-4 text-sm text-slate-700">
                Certificates are reviewed by an administrator. You will see the result in your dashboard.
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setUploaded(true)}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-sky-600 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={!selectedCourse || !fileName}
                >
                  Verify Certificate
                </button>
                <p className="text-sm text-slate-500">Max file size 5 MB. Accepted formats: PDF, PNG, JPG.</p>
              </div>

              {uploaded ? (
                <div className="rounded-[20px] border border-emerald-200 bg-white px-5 py-4 text-sm text-slate-900 shadow-sm shadow-emerald-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold">Certificate submitted successfully</p>
                      <p className="mt-1 text-sm text-slate-700">Our team will review your certificate and verify it on your dashboard within 24-48 hours.</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
