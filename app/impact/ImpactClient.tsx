"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  BriefcaseBusiness,
  Droplets,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Leaf,
  Recycle,
  School,
  Sparkles,
  Star,
  Trash2,
  Trees,
  Users,
  type LucideIcon,
} from "lucide-react";

const manropeFont =
  '"Manrope", sans-serif';

const displayFont =
  '"Ruluko", "Cormorant Garamond", serif';

type ImpactMetric = {
  icon: string;
  value: string;
  label: string;
};

type ImpactSection = {
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  metrics: ImpactMetric[];
};

function MetricCard({
  metric,
  animate,
}: {
  metric: ImpactMetric;
  animate?: boolean;
}) {
  const IconName = metric.icon;

  const iconsMap: Record<string, LucideIcon> = {
    Award,
    Briefcase,
    BriefcaseBusiness,
    Droplets,
    GraduationCap,
    Handshake,
    HeartHandshake,
    Leaf,
    Recycle,
    School,
    Sparkles,
    Star,
    Trash2,
    Trees,
    Users,
  };

  const Icon = (iconsMap[IconName] ?? Users) as LucideIcon;

  const [display, setDisplay] = useState(metric.value);
  const hasAnimated = useRef(false);

  // Extract numeric portion and suffix
  const match = metric.value.match(/[0-9,\.]+/);
  const numericPart = match ? match[0] : null;
  const rawNumber = numericPart ? numericPart.replace(/,/g, "") : null;
  const target = rawNumber ? parseFloat(rawNumber) : 0;
  const suffix = numericPart ? metric.value.slice(numericPart.length) : "";
  const formatter = new Intl.NumberFormat("en-US");

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    if (!rawNumber) return;

    const duration = 1400;
    let start: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    function step(ts: number) {
      if (!start) start = ts;

      const progress = Math.min((ts - start) / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.floor(eased * target);

      setDisplay(formatter.format(current) + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        hasAnimated.current = true;
        setDisplay(formatter.format(Math.round(target)) + suffix);
      }
    }

    requestAnimationFrame(step);
  }, [animate, rawNumber, target, suffix]);

  return (
    <div
      className="rounded-2xl p-6 transition-transform duration-700 overflow-hidden min-w-0"
      style={{
        background: "#ffffff",
        boxShadow: "0 4px 20px -8px rgba(0, 0, 0, 0.12)",
        minHeight: "100px",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full shrink-0"
          style={{
            background: "var(--electric)",
            color: "#ffffff",
          }}
        >
          <Icon className="h-6 w-6" strokeWidth={2.1} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Statistics Number */}
          <div
            className="font-extrabold truncate"
            style={{
              fontSize: "clamp(20px, 3vw, 40px)",
              lineHeight: "1.2",
              color: "var(--foreground)",
              fontFamily: manropeFont,
            }}
          >
            {display}
          </div>

          {/* Statistics Label */}
          <p
            className="mt-2 font-medium text-[14px] leading-[22px] truncate"
            style={{
              color: "var(--muted-text)",
              fontFamily: manropeFont,
            }}
          >
            {metric.label}
          </p>
        </div>
      </div>
    </div>
  );
}

function ImpactBlock({
  section,
  reverse,
}: {
  section: ImpactSection;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const imgRef = useRef<HTMLDivElement | null>(null);
  const [imageInView, setImageInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setImageInView(true), 120);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`py-8 md:py-12 transition-all duration-700 ${
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
    >
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 ${
          reverse ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        {/* IMAGE */}
        <div className="w-full">
          <div
            ref={imgRef}
            className={`relative h-[420px] w-full overflow-hidden rounded-[32px] transition-all duration-700 ${
              imageInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{
              background: "#fff",
              boxShadow: "0 25px 60px rgba(0,0,0,0.14)",
            }}
          >
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              sizes="(max-width:1024px)100vw,50vw"
              className="rounded-[32px]"
              style={{
                objectFit: "cover",
                objectPosition:
                  section.title === "Career Exposure"
                    ? "center center"
                    : section.imagePosition || "center",
              }}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4">
            {/* Project Number */}
            <span
              className="font-medium text-[12px] leading-[18px]"
              style={{
                color: "var(--gold)",
                fontFamily: manropeFont,
              }}
            >
              {section.number}
            </span>

            <span
              className="h-px w-20"
              style={{
                background: "var(--gold)",
              }}
            />
          </div>

          {/* Section Heading H2 */}
          <h2
            className="mt-4 font-bold text-[48px] leading-[60px]"
            style={{
              color: "var(--foreground)",
              fontFamily: manropeFont,
            }}
          >
            {section.title}
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {section.metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                animate={inView}
              />
            ))}
          </div>

          {/* Secondary Button */}
          <div className="mt-7">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3 transition hover:-translate-y-1"
              style={{
                background: "#ffffff",
                borderColor: "var(--gold)",
                color: "var(--gold)",
                fontFamily: manropeFont,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              See More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ImpactClient({
  sections,
  heroImage,
}: {
  sections: ImpactSection[];
  heroImage: string;
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--background) 92%, var(--electric) 8%) 0%, var(--background) 100%)",
        color: "var(--foreground)",
        fontFamily: manropeFont,
      }}
    >
      {/* Hero */}
      <section
        className="relative isolate h-screen overflow-hidden text-white"
        style={{ background: "var(--navy)" }}
      >
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Students in a classroom on the StepUp for SDG impact page"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 72% 42%, rgba(21,93,252,.1), transparent 22%), linear-gradient(90deg, rgba(5,11,24,.96) 0%, rgba(5,11,24,.9) 34%, rgba(16,29,51,.54) 58%, rgba(16,29,51,.12) 100%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(5,11,24,1) 0%, rgba(5,11,24,.5) 48%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto flex h-full max-w-[1380px] items-center px-6">
          <div className="max-w-3xl">
            {/* Label */}
            <p
              className="font-medium text-[12px] uppercase leading-[18px] tracking-[0.2em]"
              style={{
                color: "var(--gold)",
                fontFamily: manropeFont,
              }}
            >
              Our Impact
            </p>

            {/* Hero Title */}
            <h1
              className="mt-5 font-extrabold text-[72px] leading-[84px]"
              style={{
                fontFamily: manropeFont,
              }}
            >
              Every Step We Take,
              <br />
              Moves a{" "}
              <span style={{ color: "var(--gold)" }}>
                Life Forward
              </span>
            </h1>

            {/* Hero Description / Body Large */}
            <p
              className="mt-5 max-w-2xl font-normal text-[20px] leading-[34px] text-white/80"
              style={{
                fontFamily: manropeFont,
              }}
            >
              Beyond the numbers, this is where real change shows up in
              classrooms, communities, and countless acts of possibility for a
              better tomorrow.
            </p>

            {/* Primary Button */}
            <div className="mt-8">
              <Link
                href="/work-with-us"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-white transition hover:brightness-110"
                style={{
                  background: "var(--cta)",
                  fontFamily: manropeFont,
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                }}
              >
                Work With Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="impact-programs">
        <div className="mx-auto max-w-[1380px] px-6 py-14">
          {sections.map((section, index) => (
            <ImpactBlock
              key={section.number}
              section={section}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}