import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { notFound } from 'next/navigation';

const BLUE = '#0369a1';

const BLOG_CONTENT: Record<string, {
  tag: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  body: { heading?: string; text: string }[];
}> = {
  'why-rainwater-harvesting': {
    tag: 'Water Conservation',
    title: 'Why Rainwater Harvesting is the Future of Urban Water Security',
    author: 'Priya Reddy',
    date: 'Jul 12, 2025',
    readTime: '5 min read',
    body: [
      {
        text: 'India\'s cities are running out of water. With groundwater tables dropping and municipal supply struggling to keep pace with rapid urbanisation, the need for decentralised water solutions has never been more urgent. Rainwater harvesting (RWH) offers a practical, scalable answer.',
      },
      {
        heading: 'What is Rainwater Harvesting?',
        text: 'Rainwater harvesting is the collection and storage of rainwater from rooftops, open ground, and other surfaces for later use. It can be as simple as a barrel under a drainpipe or as sophisticated as an underground cistern feeding an entire building\'s non-potable water needs.',
      },
      {
        heading: 'Why Cities Need It Now',
        text: 'Chennai, Bengaluru, and Hyderabad have all faced severe water crises in recent years. Day Zero — the point at which taps run dry — is no longer a distant hypothetical. Centralised water infrastructure takes decades and billions of rupees to build. RWH systems can be installed in days and pay for themselves within a few years through reduced water bills.',
      },
      {
        heading: 'The Role of Schools and Communities',
        text: 'Schools are ideal sites for RWH. Large rooftop areas, predictable usage patterns, and the opportunity to educate the next generation make them natural champions of the technology. StepUp\'s Water Conservation Program has already installed systems in 80+ schools, collectively harvesting over 2 million litres annually.',
      },
      {
        heading: 'Getting Started',
        text: 'The first step is a site assessment — understanding your roof area, local rainfall data, and water demand. From there, a system can be designed and installed within weeks. Register your school or community through StepUp to receive a free assessment and join India\'s growing network of water-conscious institutions.',
      },
    ],
  },
  'sdg6-india-progress': {
    tag: 'SDG 6',
    title: "India's Progress on SDG 6: Gaps, Gains and What Youth Can Do",
    author: 'Arjun Sharma',
    date: 'Jun 28, 2025',
    readTime: '7 min read',
    body: [
      {
        text: 'SDG 6 — Clean Water and Sanitation — calls for universal access to safe drinking water and adequate sanitation by 2030. With five years left on the clock, India\'s progress is a story of remarkable gains shadowed by persistent gaps.',
      },
      {
        heading: 'The Gains',
        text: 'The Jal Jeevan Mission has connected over 140 million rural households to tap water since 2019. Open defecation has fallen dramatically following the Swachh Bharat Mission. These are genuine achievements that have improved the lives of hundreds of millions of people.',
      },
      {
        heading: 'The Gaps',
        text: 'Access does not equal quality. Studies show that a significant proportion of piped water in rural India does not meet drinking water standards. Urban slums remain chronically underserved. And groundwater depletion — driven by agriculture and industry — threatens the long-term sustainability of every gain made so far.',
      },
      {
        heading: 'The Climate Dimension',
        text: 'SDG 6 and SDG 13 (Climate Action) are deeply intertwined. Erratic monsoons, more frequent droughts, and flooding all undermine water security. Any serious plan to achieve SDG 6 must also address climate resilience — which is why StepUp links water conservation directly to climate education.',
      },
      {
        heading: 'What Youth Can Do',
        text: 'Young people are not passive observers of this crisis — they are its most powerful solvers. Conducting water audits at school, advocating for RWH policies in local government, organising awareness walks, and participating in citizen science water-quality monitoring are all actions students can take today. StepUp\'s SDG 6 Youth Summit brings together the most motivated young water champions every year — apply to join.',
      },
    ],
  },
  'school-water-audit-guide': {
    tag: 'How-To Guide',
    title: 'How to Conduct a Water Audit at Your School in 5 Simple Steps',
    author: 'Sneha Rao',
    date: 'Jun 10, 2025',
    readTime: '4 min read',
    body: [
      {
        text: 'A water audit is the first step toward conservation. It tells you how much water your school uses, where it goes, and where it is being wasted. Here is how to do one in five straightforward steps.',
      },
      {
        heading: 'Step 1 — Map Your Water Sources',
        text: 'Walk around the school and identify every point where water enters: municipal supply meters, borewells, tanker delivery points, and any rainwater collection systems. Note the location of each on a simple sketch map.',
      },
      {
        heading: 'Step 2 — Record Consumption',
        text: 'Read the water meter at the start and end of a school week. If there is no meter, estimate consumption by counting taps, toilets, and urinals and applying standard usage figures (a tap left running uses roughly 6 litres per minute). Ask the school office for water bills from the past 12 months.',
      },
      {
        heading: 'Step 3 — Identify Leaks and Waste',
        text: 'A dripping tap wastes up to 20,000 litres a year. Walk every corridor, toilet block, and kitchen area. Mark leaking taps, running cisterns, and broken pipes on your map. Check the meter overnight when no one is using water — if it moves, there is a hidden leak.',
      },
      {
        heading: 'Step 4 — Calculate Your Water Footprint',
        text: 'Divide total weekly consumption by the number of students and staff. Compare this to the national benchmark of 45 litres per person per day for schools. If your school is above this figure, you have clear room to improve.',
      },
      {
        heading: 'Step 5 — Build an Action Plan',
        text: 'Present your findings to the school principal and student council. Prioritise quick wins — fixing leaks, installing aerators on taps, and putting up reminder signs — before moving to larger investments like rainwater harvesting. Register with StepUp to access free audit templates, data tools, and expert support.',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(BLOG_CONTENT).map((slug) => ({ slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = BLOG_CONTENT[slug];
  if (!article) notFound();

  return (
    <div className="bg-[#f5f6fa] min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">

        {/* Back */}
        <Link
          href="/projects/water-conservation"
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-70 mb-10"
          style={{ color: BLUE }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Water Conservation
        </Link>

        {/* Header */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ background: '#e0f2fe', color: BLUE }}
          >
            {article.tag}
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-snug text-slate-950 sm:text-4xl">
            {article.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-slate-100 pb-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{article.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{article.readTime}</span>
          </div>

          {/* Body */}
          <div className="mt-8 space-y-6">
            {article.body.map((block, i) => (
              <div key={i}>
                {block.heading && (
                  <h2 className="mb-2 text-lg font-bold text-slate-950">{block.heading}</h2>
                )}
                <p className="text-base leading-8 text-slate-600">{block.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-8 rounded-[28px] p-8 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #0ea5e9 100%)` }}
        >
          <p className="text-lg font-bold">Ready to take action?</p>
          <p className="mt-2 text-sm text-white/80">Join the Water Conservation Program and make a real impact.</p>
          <Link
            href="/projects/water-conservation/register"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold transition hover:opacity-90"
            style={{ color: BLUE }}
          >
            Register now
          </Link>
        </div>

      </div>
    </div>
  );
}
