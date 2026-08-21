import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { notFound } from 'next/navigation';

const GREEN = '#3F7E44';
const GREEN_LIGHT = '#dcfce7';

const BLOG_CONTENT: Record<string, {
  tag: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  body: { heading?: string; text: string }[];
}> = {
  'how-to-organise-clean-drive': {
    tag: 'How-To Guide',
    title: 'How to Organise a Community Clean Drive in 6 Steps',
    author: 'Sneha Rao',
    date: 'Jul 5, 2025',
    readTime: '4 min read',
    body: [
      { text: 'A community clean drive is one of the most visible and immediate ways to take action on SDG 13 and SDG 15. It brings people together, creates measurable impact, and builds lasting habits. Here is how to run one from scratch.' },
      { heading: 'Step 1 — Choose Your Site', text: 'Pick a location that is visibly dirty and accessible — a park, a school ground, a roadside stretch, or a riverbank. Make sure you have permission from the local authority or school management before you begin.' },
      { heading: 'Step 2 — Assemble Your Team', text: 'Recruit at least 10 volunteers. Assign roles: a team lead, a waste data recorder, a photographer for documentation, and a safety officer. Brief everyone on waste segregation — dry, wet, and hazardous waste must be separated at the point of collection.' },
      { heading: 'Step 3 — Gather Your Supplies', text: 'You will need gloves, garbage bags (colour-coded if possible), tongs or litter pickers, and a weighing scale to measure the waste collected. StepUp provides a free toolkit with all checklists and segregation guides when you register.' },
      { heading: 'Step 4 — Execute the Drive', text: 'Set a clear start and end time — two to three hours is ideal. Divide the site into zones and assign teams to each. Keep energy high with music and regular check-ins. Document everything with photos and weight measurements.' },
      { heading: 'Step 5 — Dispose Responsibly', text: 'Do not just leave the bags on the roadside. Coordinate with your local municipal corporation or a certified waste management partner to ensure the collected waste is disposed of or recycled properly.' },
      { heading: 'Step 6 — Submit Your Impact Report', text: 'Log your data — kilograms collected, volunteers mobilised, site area covered — on the StepUp platform. Your school or organisation will receive a certificate and be featured on the StepUp community impact map.' },
    ],
  },
  'waste-management-sdg13-15': {
    tag: 'SDG 13 & 15',
    title: 'Why Waste Management is Central to SDG 13 and SDG 15',
    author: 'Arjun Sharma',
    date: 'Jun 20, 2025',
    readTime: '6 min read',
    body: [
      { text: 'When people think about climate action or biodiversity, they rarely think about the pile of plastic outside their building. But waste — how we produce it, manage it, and dispose of it — sits at the heart of both SDG 13 (Climate Action) and SDG 15 (Life on Land).' },
      { heading: 'Waste and Climate Change', text: 'Landfills are the third-largest source of methane emissions globally. Methane is 80 times more potent than CO₂ over a 20-year period. Every tonne of organic waste diverted from landfill through composting or biogas generation directly reduces greenhouse gas emissions. Burning plastic waste — still common in many Indian cities — releases toxic dioxins and contributes to black carbon, a powerful short-lived climate pollutant.' },
      { heading: 'Waste and Biodiversity', text: 'Plastic pollution is one of the leading threats to terrestrial and marine biodiversity. Microplastics have been found in the digestive systems of birds, fish, and mammals across every ecosystem on Earth. In India, stray cattle ingesting plastic waste is a visible and tragic symbol of this crisis. Reducing plastic at source and cleaning up existing pollution directly protects the ecosystems that SDG 15 is designed to safeguard.' },
      { heading: 'The Circular Economy Connection', text: 'SDG 12 (Responsible Consumption and Production) provides the bridge. A circular economy — where materials are kept in use for as long as possible — reduces both the waste that ends up in landfills and the virgin resources that need to be extracted. Schools and communities that adopt waste segregation, composting, and repair culture are living examples of circular economy principles in action.' },
      { heading: 'What Communities Can Do', text: 'The most powerful interventions happen at the local level. Waste segregation at source, community composting, plastic-free campaigns, and regular clean drives all create measurable impact. StepUp\'s Clean Community Initiative provides the tools, training, and recognition to make these actions count toward the global SDG targets.' },
    ],
  },
  'student-clean-campaigns': {
    tag: 'Impact Stories',
    title: 'Student-Led Clean Campaigns That Made a Real Difference',
    author: 'Priya Reddy',
    date: 'Jun 8, 2025',
    readTime: '5 min read',
    body: [
      { text: 'Across India, students are proving that you do not need a budget or a government mandate to clean up your community. Here are three campaigns that started small and ended up inspiring entire neighbourhoods.' },
      { heading: 'Hyderabad: The Hussain Sagar Shoreline Drive', text: 'A group of 22 students from IIT Hyderabad organised a Saturday morning clean-up of the Hussain Sagar shoreline after noticing the accumulation of plastic waste following the Ganesh festival. Armed with gloves and garbage bags, they collected 340 kg of waste in three hours. Their Instagram documentation went viral locally, prompting the GHMC to install permanent waste bins along the stretch.' },
      { heading: 'Jaipur: The Pink City Plastic-Free Challenge', text: 'Students at a government school in Jaipur launched a 30-day plastic-free challenge in their neighbourhood. Each family that pledged to avoid single-use plastic for a month received a small plant as a reward. By the end, 180 families had participated and the local sabzi mandi switched to cloth bags. The school was featured in the Rajasthan Patrika.' },
      { heading: 'Chennai: The Marina Beach Monthly Drive', text: 'A student collective at a Chennai engineering college turned a one-off beach clean-up into a monthly institution. Now in its 14th consecutive month, the drive has collected over 1.2 tonnes of waste and trained 60+ volunteers in waste segregation. Three local companies now sponsor the event as part of their CSR commitments.' },
      { heading: 'What These Stories Have in Common', text: 'None of these campaigns required external funding to get started. They all began with a small, motivated group, a clear and visible problem, and the willingness to document and share their impact. StepUp\'s Clean Community Initiative exists to give every student group like these the tools, recognition, and network to scale their impact further.' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(BLOG_CONTENT).map((slug) => ({ slug }));
}

export default async function CleanCommunityBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = BLOG_CONTENT[slug];
  if (!article) notFound();

  return (
    <div className="bg-[#f5f6fa] min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">

        <Link
          href="/projects/clean-community"
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-70 mb-10"
          style={{ color: GREEN }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Clean Community Initiative
        </Link>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ background: GREEN_LIGHT, color: GREEN }}
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
          style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #4ade80 100%)` }}
        >
          <p className="text-lg font-bold">Ready to take action?</p>
          <p className="mt-2 text-sm text-white/80">Join the Clean Community Initiative and make a real impact in your neighbourhood.</p>
          <Link
            href="/projects/clean-community/register"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold transition hover:opacity-90"
            style={{ color: GREEN }}
          >
            Register now
          </Link>
        </div>

      </div>
    </div>
  );
}
