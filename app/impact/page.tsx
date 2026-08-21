import type { Metadata } from "next";
<<<<<<< HEAD
import Image from "next/image";
import Link from "next/link";
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

const headingFont =
  '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';
=======
import ImpactClient from "./ImpactClient";
>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1

const heroImage =
  "/assets/images/WhatsApp%20Image%202026-07-20%20at%209.30.49%20PM.jpeg";

<<<<<<< HEAD
const fourthImage =
  "/assets/images/4.jpeg";

type ImpactMetric = {
  icon: LucideIcon;
=======
const fourthImage = "/assets/images/4.jpeg";

export type ImpactMetric = {
  icon: string;
>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1
  value: string;
  label: string;
};

<<<<<<< HEAD
type ImpactSection = {
=======
export type ImpactSection = {
>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  metrics: ImpactMetric[];
};

const sections: ImpactSection[] = [
  {
    number: "01",
    title: "SDG Education for Students",
<<<<<<< HEAD
    image: "/assets/images/1.jpeg",
    imageAlt: "Students learning about the Sustainable Development Goals in a classroom",
    metrics: [
      { icon: School, value: "150+", label: "Schools Reached" },
      { icon: GraduationCap, value: "18,500+", label: "Students Educated" },
      { icon: Users, value: "320+", label: "SDG Workshops" },
      { icon: Award, value: "12,000+", label: "Certificates Issued" },
    ],
  },
  {
    number: "02",
    title: "Sustainability Education Program",
    image: fourthImage,
    imageAlt: "Students exploring different career paths and industry opportunities",
    metrics: [
      { icon: BriefcaseBusiness, value: "250+", label: "Career Sessions" },
      { icon: Handshake, value: "20+", label: "Industry Experts" },
      { icon: GraduationCap, value: "10,000+", label: "Students Reached" },
      { icon: Sparkles, value: "95%", label: "Positive Feedback" },
    ],
  },
  {
    number: "03",
    title: "Fellowship",
    image: "/sdg/cg.png",
    imageAlt: "Industry experts guiding students toward future careers and innovation",
    metrics: [
      { icon: Briefcase, value: "100+", label: "Fellows Enrolled" },
      { icon: Star, value: "50+", label: "Mentors & Experts" },
      { icon: GraduationCap, value: "5,000+", label: "Students Guided" },
      { icon: Sparkles, value: "90%", label: "Placement Rate" },
    ],
  },
=======
    image: "/assets/images/impact1.jpeg",
    imageAlt:
      "Students learning about the Sustainable Development Goals in a classroom",
    metrics: [
      {
        icon: "School",
        value: "150+",
        label: "Schools Reached",
      },
      {
        icon: "GraduationCap",
        value: "18,500+",
        label: "Students Educated",
      },
      {
        icon: "Users",
        value: "320+",
        label: "SDG Workshops",
      },
      {
        icon: "Award",
        value: "12,000+",
        label: "Certificates Issued",
      },
    ],
  },

  {
    number: "02",
    title: "Sustainability Education Program",
    image: "/assets/images/impact2.png",
    imageAlt:
      "Students exploring different career paths and industry opportunities",
    metrics: [
      {
        icon: "BriefcaseBusiness",
        value: "250+",
        label: "Career Sessions",
      },
      {
        icon: "Handshake",
        value: "20+",
        label: "Industry Experts",
      },
      {
        icon: "GraduationCap",
        value: "10,000+",
        label: "Students Reached",
      },
      {
        icon: "Sparkles",
        value: "95%",
        label: "Positive Feedback",
      },
    ],
  },

  {
    number: "03",
    title: "Fellowship",
    image: "/assets/images/impact3.png",
    imageAlt:
      "Industry experts guiding students toward future careers and innovation",
    metrics: [
      {
        icon: "Briefcase",
        value: "100+",
        label: "Fellows Enrolled",
      },
      {
        icon: "Star",
        value: "50+",
        label: "Mentors & Experts",
      },
      {
        icon: "GraduationCap",
        value: "5,000+",
        label: "Students Guided",
      },
      {
        icon: "Sparkles",
        value: "90%",
        label: "Placement Rate",
      },
    ],
  },

>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1
  {
    number: "04",
    title: "Water Conservation Program",
    image: "/assets/images/2.jpeg",
<<<<<<< HEAD
    imageAlt: "Students gathered around a rainwater harvesting system",
    metrics: [
      { icon: Droplets, value: "125+", label: "Awareness Sessions" },
      { icon: School, value: "60+", label: "Schools Involved" },
      { icon: Recycle, value: "40+", label: "Harvesting Systems" },
      { icon: Users, value: "50,000+", label: "Students Benefited" },
    ],
  },
=======
    imageAlt:
      "Students gathered around a rainwater harvesting system",
    metrics: [
      {
        icon: "Droplets",
        value: "125+",
        label: "Awareness Sessions",
      },
      {
        icon: "School",
        value: "60+",
        label: "Schools Involved",
      },
      {
        icon: "Recycle",
        value: "40+",
        label: "Harvesting Systems",
      },
      {
        icon: "Users",
        value: "50,000+",
        label: "Students Benefited",
      },
    ],
  },

>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1
  {
    number: "05",
    title: "Clean Community Initiative",
    image: "/assets/images/3.jpeg",
<<<<<<< HEAD
    imageAlt: "Volunteers cleaning a public space during a community drive",
    metrics: [
      { icon: Trash2, value: "200+", label: "Clean Drives" },
      { icon: Users, value: "15,000+", label: "Volunteers Engaged" },
      { icon: Trees, value: "100+", label: "Communities Covered" },
      { icon: Leaf, value: "30 Tons+", label: "Waste Collected" },
=======
    imageAlt:
      "Volunteers cleaning a public space during a community drive",
    metrics: [
      {
        icon: "Trash2",
        value: "200+",
        label: "Clean Drives",
      },
      {
        icon: "Users",
        value: "15,000+",
        label: "Volunteers Engaged",
      },
      {
        icon: "Trees",
        value: "100+",
        label: "Communities Covered",
      },
      {
        icon: "Leaf",
        value: "30 Tons+",
        label: "Waste Collected",
      },
>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1
    ],
  },
];

export const metadata: Metadata = {
  title: "Our Impact — StepUp for SDG",
  description:
    "A visual overview of StepUp for SDG's classroom, sustainability, and community programmes.",
};

<<<<<<< HEAD
function MetricCard({ metric }: { metric: ImpactMetric }) {
  const Icon = metric.icon;

  return (
    <div
      className="rounded-[22px] px-5 py-4"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 22px 40px -30px rgba(21, 93, 252, 0.22)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            background:
              "color-mix(in srgb, var(--electric) 12%, var(--card) 88%)",
            color: "var(--electric)",
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={2.1} />
        </div>
        <div>
          <div
            className="text-[1.9rem] font-semibold leading-none md:text-[2.15rem]"
            style={{ color: "var(--foreground)", fontFamily: headingFont }}
          >
            {metric.value}
          </div>
          <p
            className="mt-1 text-sm font-medium"
            style={{ color: "var(--muted-text)" }}
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
  return (
    <section className="py-10 md:py-16">
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={`flex flex-col ${reverse ? "lg:order-2" : ""}`}>
          <div
            className="relative flex-1 overflow-hidden rounded-[28px]"
            style={{
              background: "var(--card)",
              boxShadow: "0 32px 60px -42px rgba(21, 93, 252, 0.4)",
              minHeight: "420px",
            }}
          >
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={section.imagePosition ? { objectPosition: section.imagePosition } : undefined}
            />
          </div>
        </div>

        <div className={`flex flex-col justify-center ${reverse ? "lg:order-1" : ""}`}>
          <div className="flex items-center gap-4">
            <span className="text-[1.75rem] font-semibold" style={{ color: "var(--gold)" }}>
              {section.number}
            </span>
            <span className="h-px w-16" style={{ background: "var(--gold)" }} />
          </div>

          <h2
            className="mt-5 text-4xl leading-tight md:text-[3.15rem]"
            style={{ color: "var(--foreground)", fontFamily: headingFont }}
          >
            {section.title}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {section.metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:brightness-105"
              style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
            >
              See More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ImpactPage() {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--background) 92%, var(--electric) 8%) 0%, var(--background) 100%)",
        color: "var(--foreground)",
      }}
    >
      <section
        className="relative isolate overflow-hidden text-white"
        style={{ background: "var(--navy)" }}
      >
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Students in a classroom on the StepUp for SDG impact page"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center]"
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 72% 42%, rgba(21, 93, 252, 0.1), transparent 22%), linear-gradient(90deg, rgba(5, 11, 24, 0.96) 0%, rgba(5, 11, 24, 0.9) 34%, rgba(16, 29, 51, 0.54) 58%, rgba(16, 29, 51, 0.12) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(5, 11, 24, 1) 0%, rgba(5, 11, 24, 0.5) 48%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[35rem] max-w-[1460px] items-center px-5 py-16 md:min-h-[40rem] md:px-8 md:py-20">
          <div className="max-w-[50rem]">
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--gold)" }}
            >
              Our Impact
            </p>

            <h1
              className="mt-5 text-[3rem] leading-[1.02] text-white md:text-[4.35rem]"
              style={{ fontFamily: headingFont }}
            >
              Every Step We Take,
              <br />
              Moves a <span style={{ color: "var(--gold)" }}>Life Forward</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82 md:text-[1.1rem]">
              Beyond the numbers, this is where real change shows up in
              classrooms, communities, and countless acts of possibility for a
              better tomorrow.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/work-with-us"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-105"
                style={{
                  background: "var(--cta)",
                  boxShadow: "0 18px 40px -20px rgba(255, 122, 0, 0.7)",
                }}
              >
                Work With Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="impact-programs" className="relative">
        <div className="mx-auto max-w-[1460px] px-5 py-10 md:px-8 md:py-14">
          {sections.map((section, index) => (
            <ImpactBlock
              key={section.number}
              section={section}
              reverse={index % 2 === 1}
            />
          ))}

          <div
            className="mt-8 rounded-[30px] px-6 py-7 text-white md:px-8 md:py-8"
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 45%, #0369a1 100%)",
              boxShadow: "0 28px 60px -36px rgba(29, 78, 216, 0.55)",
            }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    border: "1px solid color-mix(in srgb, var(--gold) 32%, transparent)",
                    background:
                      "color-mix(in srgb, var(--electric) 16%, var(--deep-blue) 84%)",
                    color: "var(--gold)",
                  }}
                >
                  <HeartHandshake className="h-7 w-7" strokeWidth={2} />
                </div>
                <div>
                  <h2
                    className="text-[2rem] leading-tight md:text-[2.5rem]"
                    style={{ fontFamily: headingFont }}
                  >
                    Together, We Create Lasting Impact
                  </h2>
                  <p className="mt-2 max-w-3xl text-base leading-7 text-white/78">
                    Join us in building a better, sustainable and inclusive
                    tomorrow for every child.
                  </p>
                </div>
              </div>

              <Link
                href="/work-with-us"
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-105 lg:self-center"
                style={{
                  background: "var(--cta)",
                  boxShadow: "0 18px 40px -20px rgba(255, 122, 0, 0.7)",
                }}
              >
                Partner With Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
=======
export default function ImpactPage() {
  return (
    <ImpactClient
      sections={sections}
      heroImage={heroImage}
    />
  );
}
>>>>>>> 3ec4f9698ea500426404e7554e8195176bf740a1
