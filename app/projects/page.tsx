import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  Briefcase,
  HeartHandshake,
  Leaf,
  Sparkles,
  Sun,
  Target,
  TreePine,
} from "lucide-react";
import { FadeUp } from "@/app/components/site/FadeUp";
import { ProjectCard } from "./ProjectCard";

export const metadata = {
  title: "Projects - StepUp for SDG",
  description:
    "Empowering schools, students, NGOs, volunteers and CSR partners through real-world Sustainable Development Goal initiatives.",
};

const PROJECT_HERO_VIDEO_SRC = "/PROJECT video.mp4";

type Project = {
  name: string;
  description: string;
  includes: string[];
  costItems: { label?: string; value: string }[];
  sdgs: string[];
  icon: LucideIcon;
  color: string;
  backgroundImage: string;
  sdgIcon: string;
  href?: string;
};

const projects: Project[] = [
  {
    name: "SDG Education for Students",
    description:
      "A comprehensive education and sustainability program that combines SDG awareness, school outreach, educational resources, certification, student engagement, and environmental activities.",
    includes: [
      "Teaching SDG",
      "SDG Certification",
      "Schools Outreach",
      "Educating Students on SDGs",
      "Stationery Distribution",
      "Compass Box Distribution",
      "Tree Plantation",
    ],
    costItems: [
      { value: "₹100 per participant" },
      { label: "Stationery Kit", value: "₹200" },
      { label: "Tree Plantation", value: "₹60 per plant" },
    ],
    sdgs: ["Quality Education", "Climate Action", "Life on Land"],
    icon: Award,
    color: "#155DFC",
    backgroundImage: "/sdg/sdg certt.png",
    sdgIcon: "/sdg/goal-04.png",
    href: "/projects/sdg-education",
  },
  {
    name: "Sustainability Education Program",
    description:
      "Providing solar lamps to rural schools and underserved communities to improve access to clean energy.",
    includes: ["Solar Lamp Distribution"],
    costItems: [{ value: "Contact Us" }],
    sdgs: ["Affordable & Clean Energy", "Climate Action"],
    icon: Sun,
    color: "#FCC30B",
    backgroundImage: "/sdg/ld.png",
    sdgIcon: "/sdg/goal-07.png",
    href: "/projects/sustainability-education",
  },
  {
    name: "Fellowship",
    description:
      "Industry experts guide students toward future careers, innovation, entrepreneurship and higher education opportunities.",
    includes: ["Career Exposure Program"],
    costItems: [{ value: "₹100 per participant" }],
    sdgs: ["Quality Education", "Decent Work & Economic Growth"],
    icon: Briefcase,
    color: "#A21942",
    backgroundImage: "/sdg/cg.png",
    sdgIcon: "/sdg/goal-08.png",
    href: "/projects/fellowship",
  },
  {
    name: "Water Conservation Program",
    description:
      "Promoting sustainable water conservation by implementing rainwater harvesting systems in schools and communities.",
    includes: ["Rainwater Harvesting"],
    costItems: [{ value: "Contact Us" }],
    sdgs: ["Clean Water & Sanitation", "Climate Action"],
    icon: Leaf,
    color: "#26BDE2",
    backgroundImage: "/sdg/rw.png",
    sdgIcon: "/sdg/goal-06.png",
    href: "/projects/water-conservation",
  },
  {
    name: "Clean Community Initiative",
    description:
      "Community cleanliness campaigns encouraging environmental responsibility and sustainable living.",
    includes: ["Community Clean Drive"],
    costItems: [{ value: "Contact Us" }],
    sdgs: ["Climate Action", "Life on Land"],
    icon: TreePine,
    color: "#3F7E44",
    backgroundImage: "/sdg/plant.png",
    sdgIcon: "/sdg/goal-13.png",
    href: "/projects/clean-community",
  },
];

const supportedSdgs = [
  { id: 4, name: "Quality Education", image: "/sdg/goal-04.png" },
  { id: 6, name: "Clean Water & Sanitation", image: "/sdg/goal-06.png" },
  { id: 7, name: "Affordable & Clean Energy", image: "/sdg/goal-07.png" },
  { id: 8, name: "Decent Work & Economic Growth", image: "/sdg/goal-08.png" },
  { id: 13, name: "Climate Action", image: "/sdg/goal-13.png" },
  { id: 15, name: "Life on Land", image: "/sdg/goal-15.png" },
];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <FadeUp>
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#64748B]">
          {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-[#0F172A] md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#475569] md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </FadeUp>
  );
}

export default function ProjectsPage() {
  return (
    <div className="bg-white text-[#0F172A]">
      <section className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-black px-6 py-20 text-white sm:min-h-[88vh] sm:py-24 lg:min-h-[92vh] lg:py-32">
        <div className="absolute inset-0 -z-30 overflow-hidden" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover opacity-0 [animation:projectsVideoFadeIn_1.4s_ease-out_0.1s_forwards]"
          >
            <source src={PROJECT_HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 -z-20 bg-black/45" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-t from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-black/45 to-transparent" />
        <style>{`
          @keyframes projectsVideoFadeIn {
            from {
              opacity: 0;
              transform: scale(1.02);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>

        <div className="mx-auto flex w-full max-w-7xl items-center justify-center text-center">
          <FadeUp>
            <div className="mx-auto max-w-4xl">
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-7xl">
                Our Projects
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                Creating measurable impact through education, sustainability,
                environmental initiatives and community development.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                Empowering schools, students, NGOs, volunteers and CSR partners
                through real-world Sustainable Development Goal initiatives.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="btn-arrow inline-flex items-center justify-center gap-2 rounded-full bg-cta px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,122,0,0.45)] transition hover:brightness-110"
                >
                  Explore Projects <ArrowRight className="arr h-4 w-4" />
                </a>
                <Link
                  href="/work-with-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#CBD5E1] bg-white/90 px-7 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_14px_35px_-26px_rgba(15,23,42,0.36)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-white"
                >
                  Become a Partner <HeartHandshake className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 bg-[#F8FAFC] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Projects"
            title="Real-world initiatives ready for schools, NGOs and CSR partners"
            subtitle="Choose a focused project model, align it with the relevant SDGs, and activate it with clear resources, coordination and reporting."
          />

          <div className="mt-12 grid gap-10">
            {projects.map(({ name, description, backgroundImage, sdgIcon, href }, index) => (
              <ProjectCard
                key={name}
                project={{ name, description, backgroundImage, sdgIcon, href }}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:gap-14">
          <FadeUp>
            <div className="max-w-2xl lg:pr-4">
              <h2 className="font-display text-4xl font-extrabold leading-[1.08] text-[#0F172A] sm:text-5xl lg:text-[48px]">
                Focused Sustainable Development Goals
              </h2>
              <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.25em] text-[#64748B]">
                Our Focus SDGs
              </span>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#475569]">
                Our projects focus on key Sustainable Development Goals that
                create measurable impact through education, water conservation,
                clean energy, climate action, economic growth, and biodiversity.
              </p>
              <Link
                href="/sdg"
                className="btn-arrow mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(255,122,0,0.9)] transition duration-300 hover:brightness-110"
              >
                Explore Goals <ArrowRight className="arr h-4 w-4" />
              </Link>
            </div>
          </FadeUp>

          <div className="grid w-full max-w-[560px] grid-cols-2 gap-5 justify-self-start sm:gap-6 md:grid-cols-3 lg:justify-self-end">
            {supportedSdgs.map((sdg, index) => (
              <FadeUp key={sdg.id} delay={index * 55}>
                <Link
                  href={`/Pages/sdg/${sdg.id}`}
                  aria-label={`Explore SDG ${sdg.id}: ${sdg.name}`}
                  className="group block aspect-square overflow-hidden rounded-xl bg-white shadow-[0_16px_40px_-30px_rgba(15,23,42,0.34)] ring-1 ring-[#E2E8F0] transition duration-300 hover:-translate-y-1.5 hover:scale-[1.025] hover:shadow-[0_28px_65px_-34px_rgba(15,23,42,0.42)] hover:ring-[#CBD5E1]"
                >
                  <Image
                    src={sdg.image}
                    alt={`SDG ${sdg.id} - ${sdg.name}`}
                    width={520}
                    height={520}
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 42vw, 45vw"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.035]"
                  />
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-20 sm:py-24">
        <FadeUp>
          <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-[#E2E8F0] bg-white px-6 py-12 text-center shadow-[0_24px_80px_-48px_rgba(15,23,42,0.32)] sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#64748B] backdrop-blur-xl">
                <Target className="h-4 w-4 text-[#2563EB]" />
                Take Action
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Together We Can Build a Sustainable Future
              </h2>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/get-involved/volunteer"
                  className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(255,122,0,0.9)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  Become a Volunteer
                </Link>
                <Link
                  href="/work-with-us"
                  className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_12px_30px_-22px_rgba(15,23,42,0.32)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
                >
                  Partner with STEPUP
                </Link>
                <Link
                  href="/get-involved/sponsor"
                  className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_12px_30px_-22px_rgba(15,23,42,0.32)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
                >
                  CSR Partnership
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_12px_30px_-22px_rgba(15,23,42,0.32)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
