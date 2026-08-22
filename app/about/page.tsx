"use client";
import Link from "next/link";
import { FadeUp } from "@/app/components/site/FadeUp";
import { useEffect, useRef, useState } from "react";

function CountUp({ to, duration = 1800 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor(p * to));
            if (p < 1) requestAnimationFrame(tick); else setCount(to);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{count}</span>;
}

const metadata = {
  title: "About — StepUp for SDG",
  description: "Purpose-driven partnerships for a better tomorrow.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "linear-gradient(160deg, #f0faf0 0%, #f7fbf7 40%, #fafffe 70%, #ffffff 100%)" }}>
      {/* 1. Hero */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center px-6 py-16">
        {/* soft light blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[rgba(21,93,252,0.07)] blur-[100px]" />
          <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-[rgba(76,159,56,0.08)] blur-[90px]" />
          <div className="absolute -bottom-16 left-1/3 h-72 w-72 rounded-full bg-[rgba(221,166,58,0.08)] blur-[80px]" />
        </div>

        {/* brush stroke accents */}
        <svg aria-hidden="true" className="pointer-events-none absolute top-[18%] right-[28%] w-64 opacity-40" viewBox="0 0 260 40" fill="none">
          <path d="M4 28 Q60 4 130 20 Q200 36 256 12" stroke="#4C9F38" strokeWidth="18" strokeLinecap="round" fill="none"/>
        </svg>
        <svg aria-hidden="true" className="pointer-events-none absolute bottom-[22%] right-[18%] w-48 opacity-35" viewBox="0 0 200 36" fill="none">
          <path d="M4 28 Q60 8 100 20 Q150 32 196 10" stroke="#DDA63A" strokeWidth="14" strokeLinecap="round" fill="none"/>
        </svg>

        <div className="relative mx-auto grid max-w-6xl w-full items-center gap-10 lg:grid-cols-2">

          {/* ── Left: text ── */}
          <FadeUp>
            <span className="inline-block rounded-full border border-[rgba(21,93,252,0.25)] bg-[rgba(21,93,252,0.07)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#155dfc]">
              Non-Profit · Education · SDGs
            </span>

            <h1 className="mt-5 font-display font-bold text-[#0d1b3e]" style={{fontSize:"56px",lineHeight:"68px"}}>
              Purpose-driven{" "}
              <span className="relative inline-block">
                partnerships
                <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8 Q75 2 150 8 Q225 14 298 6" stroke="#4C9F38" strokeWidth="5" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
              <br />for a better tomorrow
            </h1>

            <p className="mt-6 max-w-lg font-normal text-[#4a5980]" style={{fontSize:"20px",lineHeight:"34px"}}>
              Educating students on the UN Sustainable Development Goals, empowering them to adopt sustainable lifestyles, make informed choices, explore meaningful careers, and drive positive change in their families and communities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/work-with-us"
                className="rounded-full bg-[#0d1b3e] px-7 py-3 font-semibold text-white shadow-md transition hover:bg-[#155dfc]" style={{fontSize:"16px",lineHeight:"24px"}}
              >
                Work With Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#0d1b3e] px-7 py-3 font-semibold text-[#0d1b3e] transition hover:bg-[#0d1b3e] hover:text-white" style={{fontSize:"16px",lineHeight:"24px"}}
              >
                Discover <span className="text-base">→</span>
              </Link>
            </div>
          </FadeUp>

          {/* ── Right: image in clipped shape + stat cards ── */}
          <FadeUp delay={150}>
            <div className="relative flex justify-center">

              {/* soft glow behind image */}
              <div
                className="absolute inset-0 m-auto h-[380px] w-[340px] opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle, #4C9F38 0%, #26BDE2 60%, transparent 80%)" }}
              />

              {/* main image clipped into ellipse */}
              <div
                className="relative z-10 h-[420px] w-[340px] overflow-hidden"
                style={{ clipPath: "ellipse(52% 50% at 50% 50%)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                  alt="Children in a classroom learning about SDGs"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* floating stat badge — bottom right */}
              <div className="absolute bottom-4 -right-6 z-20 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-2xl" style={{ background: "linear-gradient(135deg,#155dfc,#00c2ff)" }}>
                <div className="text-left">
                  <p className="font-display font-black text-white" style={{fontSize:"56px",lineHeight:"64px"}}><CountUp to={17} /></p>
                  <p className="font-medium text-white/80 mt-0.5" style={{fontSize:"18px",lineHeight:"28px"}}>UN SDGs<br/>Covered</p>
                </div>
                <span className="text-3xl">🌐</span>
              </div>


            </div>
          </FadeUp>
        </div>
      </section>

      {/* 2. Our Story */}
      <section id="story" className="relative scroll-mt-20 overflow-hidden py-24 px-6">

        <div className="relative mx-auto max-w-6xl">
          {/* heading */}
          <FadeUp>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-10 bg-[#155dfc] opacity-40" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#155dfc]">Who We Are</span>
            </div>
            <h2 className="font-display font-bold text-[#0d1b3e]" style={{fontSize:"48px",lineHeight:"60px"}}>
              Our{" "}
              <span className="relative inline-block">
                Story
                <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 14" fill="none">
                  <path d="M2 10 Q50 2 100 8 Q150 14 198 5" stroke="#4C9F38" strokeWidth="6" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
            </h2>
          </FadeUp>

          {/* 2-col grid */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* LEFT — video */}
            <FadeUp delay={80}>
              <div className="relative group">
                {/* glow ring */}
                <div className="absolute -inset-1 rounded-3xl opacity-30 blur-xl" style={{ background: "linear-gradient(135deg,#155dfc,#4C9F38,#00c2ff)" }} />
                {/* video */}
                <div className="relative overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(13,27,62,0.15)]">
                  <video
                    src="/Sdg.white.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full aspect-video object-cover"
                  />
                  {/* bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[rgba(13,27,62,0.25)] to-transparent" />
                  {/* live badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-semibold text-[#0d1b3e]">Our Journey</span>
                  </div>
                </div>
                {/* floating founded card */}
                <div className="absolute -top-4 -right-4 z-10 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_40px_rgba(13,27,62,0.14)] border border-[rgba(13,27,62,0.06)]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#155dfc]">Est.</p>
                  <p className="font-display text-2xl font-black text-[#0d1b3e]">2019</p>
                  <p className="text-[10px] text-[#4a5980]">Founded</p>
                </div>
              </div>
            </FadeUp>

            {/* RIGHT — text + timeline + pills */}
            <FadeUp delay={160}>
              <div className="flex flex-col gap-7">

                {/* story paragraphs */}
                <div className="space-y-4" style={{fontSize:"18px",lineHeight:"30px"}}>
                  <p className="text-[#0d1b3e] font-semibold" style={{fontSize:"20px",lineHeight:"34px"}}>
                    StepUp for SDG began with a simple conviction: that quality education is the most powerful lever for lasting change.
                  </p>
                  <p className="text-[#4a5980]" style={{fontSize:"18px",lineHeight:"30px"}}>
                    What started as a handful of volunteers supporting local schools has grown into a collaborative platform uniting students, educators, NGOs and companies around a shared mission.
                  </p>
                  <p className="text-[#4a5980]" style={{fontSize:"18px",lineHeight:"30px"}}>
                    Today we connect partners across regions to fund, design and deliver transparent educational initiatives — turning intention into measurable impact for the children who need it most.
                  </p>
                  <p className="text-[#4a5980]" style={{fontSize:"18px",lineHeight:"30px"}}>
                    We believe progress should be visible. Every project we support is tracked, reported, and built to last, so every contribution becomes a real opportunity for a learner.
                  </p>
                </div>


              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <section className="relative px-6 py-20 scroll-mt-20 overflow-hidden">

        <div className="relative mx-auto max-w-6xl">
          {/* heading */}
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block rounded-full border border-[rgba(21,93,252,0.2)] bg-[rgba(21,93,252,0.06)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#155dfc]">
                Who We Are
              </span>
              <h2 className="mt-4 font-display font-bold text-[#0d1b3e]" style={{fontSize:"48px",lineHeight:"60px"}}>
                Vision &amp; Mission
              </h2>
              <div className="mt-3 mx-auto h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg,#155dfc,#00c2ff)" }} />
            </div>
          </FadeUp>

          {/* cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Vision card */}
            <FadeUp>
              <div className="group relative h-full rounded-3xl p-px overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(21,93,252,0.3),rgba(0,194,255,0.15))" }}>
                <div className="relative h-full rounded-3xl bg-white p-8 flex flex-col gap-6">
                  {/* top accent bar */}
                  <div className="h-1 w-12 rounded-full" style={{ background: "linear-gradient(90deg,#155dfc,#00c2ff)" }} />

                  <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#155dfc]">Our Vision</p>
                      <h3 className="mt-1 font-display font-semibold text-[#0d1b3e]" style={{fontSize:"36px",lineHeight:"48px"}}>
                        Empowering Every Learner to Build a Better Tomorrow
                      </h3>
                    </div>

                  <div className="flex flex-col gap-3 text-[#4a5980]" style={{fontSize:"18px",lineHeight:"30px"}}>
                    <p>We envision a future where every child, regardless of geography, income, or background, has equal access to quality education, technology, and opportunities that unlock their full potential.</p>
                    <p>StepUp for SDG aims to create inclusive schools, empowered educators, and connected communities that inspire lifelong learning and sustainable development.</p>
                  </div>

                  {/* quote */}
                  <div className="mt-auto rounded-2xl bg-[#f0f4ff] px-5 py-4 border-l-4 border-[#155dfc]">
                    <p className="font-normal italic text-[#155dfc]" style={{fontSize:"26px",lineHeight:"38px"}}>&ldquo;Education is the foundation for lasting change.&rdquo;</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Mission card */}
            <FadeUp delay={120}>
              <div className="group relative h-full rounded-3xl p-px overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(0,194,255,0.3),rgba(0,208,132,0.2))" }}>
                <div className="relative h-full rounded-3xl bg-white p-8 flex flex-col gap-6">
                  {/* top accent bar */}
                  <div className="h-1 w-12 rounded-full" style={{ background: "linear-gradient(90deg,#00c2ff,#00d084)" }} />

                  <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#00a89a]">Our Mission</p>
                      <h3 className="mt-1 font-display font-semibold text-[#0d1b3e]" style={{fontSize:"36px",lineHeight:"48px"}}>
                        Transforming Partnerships into Measurable Educational Impact
                      </h3>
                    </div>

                  <div className="flex flex-col gap-3 text-[#4a5980]" style={{fontSize:"18px",lineHeight:"30px"}}>
                    <p>Our mission is to connect schools, NGOs, companies, volunteers, and communities through one collaborative platform that enables transparent educational initiatives, innovation, and measurable social impact.</p>
                    <p>Every contribution helps children gain knowledge, confidence, and opportunities for a brighter future.</p>
                  </div>

                  {/* quote */}
                  <div className="mt-auto rounded-2xl bg-[#f0f4ff] px-5 py-4 border-l-4 border-[#00c2ff]">
                    <p className="font-normal italic text-[#00a89a]" style={{fontSize:"26px",lineHeight:"38px"}}>&ldquo;Together we create opportunities that transform lives.&rdquo;</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>


        </div>
      </section>

      {/* 3. Five Pillars */}
      <section id="5p" className="relative px-6 py-20 scroll-mt-20 overflow-hidden">
        {/* decorative leaves top-left */}
        <svg aria-hidden="true" className="pointer-events-none absolute top-4 left-4 w-20 opacity-60" viewBox="0 0 100 100" fill="none">
          <path d="M15 85 Q10 40 55 10 Q80 5 85 15 Q90 25 60 35 Q35 45 25 75 Z" fill="#4C9F38" opacity="0.7"/>
          <path d="M8 92 Q5 55 40 25 Q20 60 18 88 Z" fill="#4C9F38" opacity="0.4"/>
        </svg>
        {/* decorative leaves top-right */}
        <svg aria-hidden="true" className="pointer-events-none absolute top-4 right-4 w-20 opacity-50" viewBox="0 0 100 100" fill="none">
          <path d="M85 85 Q90 40 45 10 Q20 5 15 15 Q10 25 40 35 Q65 45 75 75 Z" fill="#b2dfdb" opacity="0.8"/>
          <path d="M92 92 Q95 55 60 25 Q80 60 82 88 Z" fill="#80cbc4" opacity="0.5"/>
        </svg>

        <div className="relative mx-auto max-w-7xl">
          {/* heading */}
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-[#0d1b3e]" style={{fontSize:"48px",lineHeight:"60px"}}>
                The 5 Pillars<br/>That Build Our Future
              </h2>
              <p className="mt-4 text-[#6b7a99] max-w-sm mx-auto font-normal" style={{fontSize:"18px",lineHeight:"30px"}}>
                The Sustainable Development Goals are built on<br/>5 interconnected pillars.
              </p>
            </div>
          </FadeUp>

          {/* pillar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "PEOPLE",
                color: "#2196f3",
                glow: "rgba(33,150,243,0.18)",
                border: "rgba(33,150,243,0.35)",
                desc: "End poverty and hunger in all forms and ensure dignity and equality.",
                icon: (
                  <svg width="68" height="68" viewBox="0 0 52 52" fill="none">
                    <circle cx="26" cy="16" r="8" fill="#2196f3"/>
                    <ellipse cx="14" cy="13" rx="5.5" ry="5.5" fill="#2196f3" opacity="0.7"/>
                    <ellipse cx="38" cy="13" rx="5.5" ry="5.5" fill="#2196f3" opacity="0.7"/>
                    <path d="M6 40c0-8 6-13 8-13h24c2 0 8 5 8 13" fill="#2196f3"/>
                    <path d="M2 40c0-6 4-10 6-10h8" stroke="#2196f3" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M50 40c0-6-4-10-6-10h-8" stroke="#2196f3" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                title: "PLANET",
                color: "#4caf50",
                glow: "rgba(76,175,80,0.18)",
                border: "rgba(76,175,80,0.35)",
                desc: "Protect the planet's natural resources and climate for future generations.",
                icon: (
                  <svg width="68" height="68" viewBox="0 0 52 52" fill="none">
                    <path d="M26 6 C18 6 10 14 10 26 C10 34 14 40 20 44 C20 44 18 36 22 30 C24 26 28 26 30 22 C32 18 28 12 26 6Z" fill="#4caf50"/>
                    <path d="M26 6 C34 8 42 16 42 26 C42 36 36 44 26 46 C28 40 32 36 32 30 C32 24 28 22 28 18 C28 14 28 10 26 6Z" fill="#81c784"/>
                    <path d="M10 26 C14 22 20 22 24 26 C20 30 14 30 10 26Z" fill="#2e7d32"/>
                  </svg>
                ),
              },
              {
                title: "PROSPERITY",
                color: "#ff9800",
                glow: "rgba(255,152,0,0.18)",
                border: "rgba(255,152,0,0.35)",
                desc: "Ensure prosperous and fulfilling lives in harmony with nature.",
                icon: (
                  <svg width="68" height="68" viewBox="0 0 52 52" fill="none">
                    <rect x="6" y="30" width="8" height="16" rx="2" fill="#ff9800"/>
                    <rect x="18" y="22" width="8" height="24" rx="2" fill="#ff9800"/>
                    <rect x="30" y="14" width="8" height="32" rx="2" fill="#ff9800"/>
                    <rect x="42" y="6" width="8" height="40" rx="2" fill="#ff9800"/>
                  </svg>
                ),
              },
              {
                title: "PEACE",
                color: "#9c27b0",
                glow: "rgba(156,39,176,0.18)",
                border: "rgba(156,39,176,0.35)",
                desc: "Foster peaceful, just and inclusive societies free from fear and violence.",
                icon: (
                  <svg width="68" height="68" viewBox="0 0 52 52" fill="none">
                    <path d="M26 8 C22 6 16 8 14 14 C12 20 16 26 20 28 L26 44 L32 28 C36 26 40 20 38 14 C36 8 30 6 26 8Z" fill="#9c27b0"/>
                    <path d="M26 8 C24 12 22 18 22 26 C22 32 24 38 26 44 C28 38 30 32 30 26 C30 18 28 12 26 8Z" fill="#ce93d8"/>
                  </svg>
                ),
              },
              {
                title: "PARTNERSHIP",
                color: "#e91e8c",
                glow: "rgba(233,30,140,0.18)",
                border: "rgba(233,30,140,0.35)",
                desc: "Strengthen global solidarity through partnerships and collaboration.",
                icon: (
                  <svg width="68" height="68" viewBox="0 0 52 52" fill="none">
                    <path d="M10 30 C10 24 14 20 18 20 C20 20 22 21 24 23 L26 26 L28 23 C30 21 32 20 34 20 C38 20 42 24 42 30 C42 34 40 37 36 40 L26 48 L16 40 C12 37 10 34 10 30Z" fill="#e91e8c"/>
                    <path d="M26 26 L24 23 C22 21 20 20 18 20 C14 20 10 24 10 30 C10 34 12 37 16 40 L26 48" fill="#f48fb1" opacity="0.6"/>
                  </svg>
                ),
              },
            ].map(({ title, color, glow, border, desc, icon }, i) => (
              <FadeUp key={title} delay={i * 80}>
                <div
                  className="flex flex-col rounded-2xl bg-white p-8 gap-5 h-full transition-transform hover:-translate-y-1"
                  style={{
                    border: `2px solid ${border}`,
                    boxShadow: `0 8px 32px ${glow}, 0 2px 8px rgba(0,0,0,0.06)`,
                  }}
                >
                  <div>{icon}</div>
                  <h3 className="font-display font-semibold tracking-widest" style={{color,fontSize:"20px",lineHeight:"30px"}}>{title}</h3>
                  <p className="flex-1 text-[#6b7a99] font-normal" style={{fontSize:"18px",lineHeight:"30px"}}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Team */}
      <section id="team" className="relative px-6 py-24 scroll-mt-20 overflow-hidden">

        <div className="relative mx-auto max-w-6xl">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block rounded-full border border-[rgba(21,93,252,0.2)] bg-[rgba(21,93,252,0.06)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#155dfc]">The People Behind It</span>
              <h2 className="mt-4 font-display font-bold text-[#0d1b3e]" style={{fontSize:"48px",lineHeight:"60px"}}>
                Meet Our{" "}
                <span className="relative inline-block">
                  Team
                  <svg aria-hidden="true" className="absolute -bottom-1 left-0 w-full" viewBox="0 0 120 10" fill="none">
                    <path d="M2 7 Q30 1 60 6 Q90 11 118 4" stroke="#4C9F38" strokeWidth="4" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                name: "Eswar Vardhan",
                role: "Co-Founder & Head of Operations",
                src: "/team/eswar.png",
                linkedin: "https://www.linkedin.com/in/eswarvardhan/",
              },
              {
                name: "Vijay Vedantam",
                role: "Financial & Strategic Advisor",
                src: "/team/vijay.png",
                linkedin: "https://www.linkedin.com/in/vijayvedantam/",
              },
              {
                name: "Pavan Tarak",
                role: "Co-Founder & Head of Execution",
                src: "/team/pavan.png",
                linkedin: "https://www.linkedin.com/in/pavantarak/",
              },
            ].map(({ name, role, src, linkedin }, i) => (
              <FadeUp key={name} delay={i * 100}>
                <div className="flex flex-col items-center text-center px-8 py-10">
                  {/* circular photo */}
                  <div className="h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-5" style={{ outline: "4px solid #d4af37", outlineOffset: "4px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={name} className="h-full w-full object-cover object-top" />
                  </div>
                  <h3 className="font-display font-semibold text-[#0d1b3e]" style={{fontSize:"24px",lineHeight:"34px"}}>{name}</h3>
                  <p className="mt-1 text-[#4a5980] font-normal" style={{fontSize:"16px",lineHeight:"28px"}}>{role}</p>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 font-medium hover:underline" style={{fontSize:"14px",lineHeight:"22px",color:"#d4af37"}}
                  >
                    LinkedIn →
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Join Our Mission CTA */}
      <section id="join" className="px-6 pt-6 pb-16 scroll-mt-20" style={{ background: "transparent" }}>
        <FadeUp>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-10 text-center md:p-14" style={{ background: "linear-gradient(135deg,#0d1b3e 0%,#1a2f6e 60%,#0d1b3e 100%)" }}>
            <h2 className="font-display font-bold text-white" style={{fontSize:"48px",lineHeight:"60px"}}>
              Join Our <span style={{ background: "linear-gradient(90deg,#ff7a00,#ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mission</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#a0aec0] font-normal" style={{fontSize:"18px",lineHeight:"30px"}}>
              Whether you&apos;re a school, NGO, company or volunteer, there&apos;s
              a place for you in building a future where every child has access
              to quality education.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/work-with-us"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition hover:brightness-110" style={{fontSize:"16px",lineHeight:"24px",background:"#ff7a00",boxShadow:"0 0 24px rgba(255,122,0,0.45)"}}
              >
                Work With Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition hover:text-[#00c2ff]" style={{fontSize:"16px",lineHeight:"24px",borderColor:"rgba(255,255,255,0.25)",color:"#ffffff"}}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
