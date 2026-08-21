import Link from "next/link";
import { notFound } from "next/navigation";

const OPPORTUNITIES = [
  {
    id: "climate-data-policy",
    title: "Climate Data & Policy Fellow",
    organization: "Terra Nova Institute",
    category: "FELLOWSHIP",
    verified: true,
    location: "Remote · India",
    duration: "6 months",
    closes: "28 May 2026",
    compensation: "Stipend · ₹25,000/mo",
    match: 92,
    workMode: "Remote",
    experience: "Student",
    domain: "Climate Change",
    description:
      "Join a research-led team translating climate data into policy that communities can act on. You will work alongside scientists, policy makers, and storytellers on a live climate resilience brief.",
    details: [
      "Build climate research briefs",
      "Analyze open environmental datasets",
      "Support stakeholder workshops",
    ],
    skills: ["Climate Research", "Data Analysis", "Policy Research"],
    about:
      "Terra Nova Institute works with local leaders, researchers, and communities to turn sustainability ambition into measurable progress. You’ll join a thoughtful team that values learning, clarity, and work that travels beyond the room.",
    sdgs: ["SDG 13", "SDG 11"],
  },
  {
    id: "ocean-stewardship",
    title: "Ocean Stewardship Fellowship",
    organization: "Blue Horizon Network",
    category: "FELLOWSHIP",
    verified: false,
    location: "International · Remote",
    duration: "3–6 months",
    closes: "9 April 2026",
    compensation: "Unpaid · Certificate",
    match: 73,
    workMode: "Remote",
    experience: "Professional",
    domain: "Ocean & Marine Conservation",
    description:
      "A cohort-based fellowship for emerging leaders building healthier coastal futures through science, storytelling, and community action.",
    details: [
      "Lead a coastal impact project",
      "Join expert learning circles",
      "Share findings with the network",
    ],
    skills: ["Environmental Science", "Content Creation", "Leadership"],
    about:
      "Blue Horizon Network works with local leaders, researchers, and communities to turn sustainability ambition into measurable progress. You’ll join a thoughtful team that values learning, clarity, and work that travels beyond the room.",
    sdgs: ["SDG 14", "SDG 15"],
  },
  {
    id: "circular-cities-design",
    title: "Circular Cities Design Intern",
    organization: "ReLoop Collective",
    category: "INTERNSHIP",
    verified: true,
    location: "Bengaluru, India",
    duration: "3 months",
    closes: "17 April 2026",
    compensation: "Paid · ₹18,000/mo",
    match: 86,
    workMode: "Hybrid",
    experience: "Beginner",
    domain: "Circular Economy",
    description:
      "Help redesign everyday systems so materials stay in use longer. This internship pairs field research with practical experiments in reuse, repair, and neighborhood-scale circularity.",
    details: [
      "Map material flows",
      "Interview community partners",
      "Prototype circular service ideas",
    ],
    skills: ["Research", "Project Management", "Community Engagement"],
    about:
      "ReLoop Collective works with local leaders, researchers, and communities to turn sustainability ambition into measurable progress. You’ll join a thoughtful team that values learning, clarity, and work that travels beyond the room.",
    sdgs: ["SDG 12", "SDG 11"],
  },
  {
    id: "clean-energy-access",
    title: "Clean Energy Access Associate",
    organization: "Sunrise Commons",
    category: "RESEARCH",
    verified: true,
    location: "New Delhi, India",
    duration: "12 months",
    closes: "12 June 2026",
    compensation: "Scholarship · ₹30,000/mo",
    match: 78,
    workMode: "On-site",
    experience: "Graduate",
    domain: "Renewable Energy",
    description:
      "Support equitable access to clean energy through research, community listening, and implementation support with local partners across India.",
    details: [
      "Evaluate distributed energy projects",
      "Prepare impact dashboards",
      "Coordinate partner meetings",
    ],
    skills: ["Renewable Energy", "Data Analysis", "Communication"],
    about:
      "Sunrise Commons works with local leaders, researchers, and communities to turn sustainability ambition into measurable progress. You’ll join a thoughtful team that values learning, clarity, and work that travels beyond the room.",
    sdgs: ["SDG 7", "SDG 13"],
  },
  {
    id: "ocean-stewardship",
    title: "Ocean Stewardship Fellowship",
    organization: "Blue Horizon Network",
    category: "FELLOWSHIP",
    verified: false,
    location: "International · Remote",
    duration: "3–6 months",
    closes: "9 April 2026",
    compensation: "Unpaid · Certificate",
    match: 73,
    workMode: "Remote",
    experience: "Professional",
    domain: "Ocean & Marine Conservation",
    description:
      "A cohort-based fellowship for emerging leaders building healthier coastal futures through science, storytelling, and community action.",
    details: [
      "Lead a coastal impact project",
      "Join expert learning circles",
      "Share findings with the network",
    ],
    skills: ["Environmental Science", "Content Creation", "Leadership"],
    about:
      "Blue Horizon Network works with local leaders, researchers, and communities to turn sustainability ambition into measurable progress into measurable progress. You’ll join a thoughtful team that values learning, clarity, and work that travels beyond the room.",
    sdgs: ["SDG 14", "SDG 15"],
  },
];

type DetailPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return OPPORTUNITIES.map((opportunity) => ({
    id: opportunity.id,
  }));
}

export default async function ProjectDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const opportunity = OPPORTUNITIES.find((item) => item.id === id);

  if (!opportunity) {
    return notFound();
  }

  return (
    <div className="bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-slate-900">
          <span className="mr-2 text-xl leading-none">←</span> All opportunities
        </Link>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                {opportunity.category}
              </span>
              {opportunity.verified && (
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  Verified organization
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {opportunity.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {opportunity.organization} · {opportunity.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100">
              <span className="text-sm">↗</span>
            </button>
            <Link
              href={`/projects/${opportunity.id}/apply`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c2410c] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9a3412]"
            >
              Apply now <span>↗</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-10">
          <div className="grid gap-10 lg:grid-cols-[1.45fr_0.95fr]">
            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold text-slate-950">About the opportunity</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{opportunity.description}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">What you’ll do</h2>
                <div className="mt-4 space-y-3">
                  {opportunity.details.map((detail) => (
                    <p key={detail} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">✓</span>
                      {detail}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Skills you’ll build</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {opportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">About {opportunity.organization}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{opportunity.about}</p>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[28px] bg-slate-950 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Feels right for you</p>
                <div className="mt-5 flex items-end justify-between gap-6">
                  <div>
                    <p className="text-4xl font-semibold">{opportunity.match}%</p>
                    <p className="mt-2 max-w-[16rem] text-sm leading-6 text-slate-300">
                      Matches your sustainability interests and learning goals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Application deadline</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">{opportunity.closes}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Duration</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">{opportunity.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Work mode</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">{opportunity.workMode}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Compensation</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">{opportunity.compensation}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Experience</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">{opportunity.experience}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-emerald-100 bg-emerald-50 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">SDG alignment</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {opportunity.sdgs.map((sdg) => (
                    <span
                      key={sdg}
                      className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                    >
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
