import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { notFound } from 'next/navigation';

const BLUE = '#155DFC';
const BLUE_LIGHT = '#eff6ff';

const BLOG_CONTENT: Record<string, {
  tag: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  body: { heading?: string; text: string }[];
}> = {
  'what-are-17-sdgs': {
    tag: 'SDG Basics',
    title: 'What Are the 17 SDGs and Why Should Every Student Care?',
    author: 'Priya Reddy',
    date: 'Jul 18, 2025',
    readTime: '5 min read',
    body: [
      { text: 'In 2015, world leaders at the United Nations agreed on 17 goals to make the world a better, fairer, and more sustainable place by 2030. These are the Sustainable Development Goals — and they affect every single person on the planet, including you.' },
      { heading: 'The 17 Goals at a Glance', text: 'The SDGs cover everything from ending poverty (Goal 1) and zero hunger (Goal 2) to quality education (Goal 4), clean water (Goal 6), affordable energy (Goal 7), climate action (Goal 13), and life on land (Goal 15). Together they form a blueprint for a world where no one is left behind.' },
      { heading: 'Why Should Students Care?', text: 'By 2030, today\'s students will be in their 20s and 30s — entering the workforce, starting businesses, voting in elections, and raising families. The decisions made in the next five years will shape the world you inherit. Understanding the SDGs means understanding the challenges and opportunities that will define your generation.' },
      { heading: 'SDGs in the Classroom', text: 'The SDGs are not just abstract global targets. They show up in everyday life — the quality of your school\'s drinking water (Goal 6), whether your community has reliable electricity (Goal 7), whether girls in your neighbourhood have the same access to education as boys (Goal 5). Recognising these connections is the first step to taking action.' },
      { heading: 'How StepUp Brings the SDGs to Life', text: 'StepUp\'s SDG Education Program makes the goals tangible through interactive workshops, real-world activities like tree plantation, and a certification that proves you understand and care about sustainable development. Over 12,000 students across India have already taken this step. Will you be next?' },
    ],
  },
  'sdg-certification-career': {
    tag: 'Career Impact',
    title: 'How SDG Certification Changes a Student\'s Career Path',
    author: 'Arjun Sharma',
    date: 'Jul 2, 2025',
    readTime: '6 min read',
    body: [
      { text: 'Sustainability is no longer a niche interest — it is a core competency that employers, universities, and scholarship committees are actively looking for. An SDG certification from StepUp signals that you are not just aware of global challenges, but that you have taken concrete steps to understand and address them.' },
      { heading: 'What Employers Are Looking For', text: 'A 2024 survey of 500 Indian companies found that 68% of HR managers consider sustainability awareness a positive differentiator when hiring fresh graduates. Companies with active CSR programs — which now include most large Indian corporations under the Companies Act — specifically seek candidates who can contribute to their sustainability goals.' },
      { heading: 'University Admissions', text: 'Top universities in India and abroad are increasingly asking applicants to demonstrate social awareness and community engagement. An SDG certification, combined with participation in StepUp workshops and drives, gives you a concrete, verifiable story to tell in your personal statement or interview.' },
      { heading: 'Scholarship Opportunities', text: 'Several national and international scholarships — including those from the UN, Tata Trusts, and Azim Premji Foundation — explicitly prioritise candidates with demonstrated commitment to sustainable development. Your StepUp certificate is direct evidence of that commitment.' },
      { heading: 'Building Your SDG Profile', text: 'The certification is just the beginning. StepUp students who go on to participate in events, volunteer drives, and fellowship programs build a rich portfolio of sustainability experience. This profile — visible on LinkedIn and shareable with employers — sets you apart in a crowded job market.' },
    ],
  },
  'inside-sdg-workshop': {
    tag: 'Impact Stories',
    title: 'Inside a StepUp SDG School Workshop — What Really Happens',
    author: 'Sneha Rao',
    date: 'Jun 15, 2025',
    readTime: '4 min read',
    body: [
      { text: 'What does a StepUp SDG workshop actually look like? We went inside a session at a government school in Hyderabad to find out — and what we saw was far more energetic, interactive, and impactful than a typical classroom lesson.' },
      { heading: 'The Setup', text: 'Our educator arrives 30 minutes early to set up. The classroom is rearranged into small groups of five or six students. Each group gets a set of SDG goal cards — colourful, illustrated cards showing each of the 17 goals. The energy in the room shifts immediately. Students are curious.' },
      { heading: 'The Opening Activity', text: 'The session starts with a simple question: "What problem in your neighbourhood bothers you the most?" Students shout out answers — dirty water, no streetlights, girls dropping out of school. The educator maps each answer to an SDG goal on the board. Within ten minutes, the abstract UN framework has become personal and local.' },
      { heading: 'The Core Learning', text: 'Over the next 45 minutes, students work through three activities: a goal-matching quiz, a short video on a real SDG success story from India, and a group challenge where each team designs a one-week action plan for their chosen goal. The room is loud, collaborative, and focused.' },
      { heading: 'The Certification Moment', text: 'At the end of the session, students complete a short 10-question assessment on their tablets or paper. Those who pass — and most do — receive their StepUp SDG certificate on the spot. The pride on their faces when they hold it up for photos is the reason our educators keep coming back.' },
      { heading: 'The Lasting Impact', text: 'Three months after one such workshop in Jaipur, the school principal reported that students had started a "Green Corner" in their classroom, were composting food waste from the canteen, and had written to the local municipal corporation about a broken water pipe. That is what SDG education looks like when it works.' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(BLOG_CONTENT).map((slug) => ({ slug }));
}

export default async function SDGEducationBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = BLOG_CONTENT[slug];
  if (!article) notFound();

  return (
    <div className="bg-[#f5f6fa] min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">

        <Link href="/projects/sdg-education"
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-70 mb-10"
          style={{ color: BLUE }}>
          <ArrowLeft className="h-4 w-4" /> Back to SDG Education
        </Link>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <span className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ background: BLUE_LIGHT, color: BLUE }}>
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
                {block.heading && <h2 className="mb-2 text-lg font-bold text-slate-950">{block.heading}</h2>}
                <p className="text-base leading-8 text-slate-600">{block.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-[28px] p-8 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #60a5fa 100%)` }}>
          <p className="text-lg font-bold">Ready to inspire young changemakers?</p>
          <p className="mt-2 text-sm text-white/80">Register your school for the SDG Education Program today.</p>
          <Link href="/projects/sdg-education/register"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold transition hover:opacity-90"
            style={{ color: BLUE }}>
            Register now
          </Link>
        </div>

      </div>
    </div>
  );
}
