'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function LessonPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <div className="mb-16 flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
                <Play className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Lesson 1 of 1</p>
                <p className="mt-1 text-xs text-slate-400">Welcome, Patlolla</p>
              </div>
            </div>
            <div className="self-start rounded-full bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-300 sm:self-auto">
              Introductory Lesson
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              The UN Sustainable Development Goals Explained
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              Watch this short introduction. The Next button will unlock automatically when the lesson is complete.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.7)]">
          <div className="aspect-video bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/0XTBYMfZyrM?rel=0&modestbranding=1&playsinline=1"
              title="SDG lesson"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.7)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-300">🎉 Great work! You’re ready to explore UN internship courses.</p>
            </div>
            <div>
              <a href="https://www.unsdglearn.org/courses/sustainable-lifestyles/?utm_source=chatgpt.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_35px_-18px_rgba(15,23,42,0.4)] transition duration-200 hover:shadow-[0_24px_40px_-18px_rgba(15,23,42,0.45)]">
                Next: Explore UN Courses
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-slate-500">
          <p>Welcome, Patlolla.</p>
        </div>
      </div>
    </div>
  );
}
