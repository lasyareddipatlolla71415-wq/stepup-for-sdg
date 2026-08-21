import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getSdgById, sdgs, withAlpha } from "../data/sdgs";
import SdgGoalNavigator from "../components/SdgGoalNavigator";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return sdgs.map((sdg) => ({
    id: String(sdg.id),
  }));
}

export default async function SDGDetailPage({ params }: PageProps) {
  const { id } = await params;
  const goalId = Number(id);

  if (!Number.isInteger(goalId)) {
    notFound();
  }

  const sdg = getSdgById(goalId);

  if (!sdg) {
    notFound();
  }

  const imagePath = `/sdg/goal-${String(sdg.id).padStart(2, "0")}.png`;
  const officialUnUrl = `https://sdgs.un.org/goals/goal${sdg.id}`;

  return (
    <main className="relative min-h-fit overflow-hidden bg-white px-5 py-6 text-[#0F172A] sm:px-8 lg:px-12" style={{ background: "#FFFFFF", colorScheme: "light" }}>
      <style>
        {`
          @keyframes sdgInfoFadeInUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center">
        <Link
          className="mb-8 inline-flex w-fit rounded-full border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_10px_24px_-18px_rgba(15,23,42,0.35)] transition hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
          href="/sdg"
        >
          Back to Goals
        </Link>

        <div className="mt-6" />

        <SdgGoalNavigator currentGoalId={sdg.id} key={sdg.id} />

        <section
          className="grid items-center gap-10 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-[0_28px_80px_-46px_rgba(15,23,42,0.32)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
          style={{ boxShadow: `0 28px 90px -46px ${withAlpha(sdg.color, 0.42)}` }}
        >
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg border border-[#E2E8F0] bg-white shadow-[0_22px_52px_-28px_rgba(15,23,42,0.32)]">
            <Image
              alt={`SDG Goal ${sdg.id}: ${sdg.title}`}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 24rem"
              src={imagePath}
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#155DFC]">
              Goal Number {sdg.id}
            </p>
            <h1 className="mt-5 text-balance text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-none text-[#0F172A]">
              {sdg.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#475569]">
              Detailed information about SDG Goal {sdg.id}.
            </p>

            <div className="mt-8 rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.28)] [animation:sdgInfoFadeInUp_700ms_ease-out_160ms_both]">
              <h2 className="text-2xl font-bold text-[#0F172A]">About this Goal</h2>
              <p className="mt-4 text-base leading-8 text-[#475569]">
                This Sustainable Development Goal focuses on improving global conditions and encouraging collective
                action. 
              </p>

              <a
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 px-5 py-3 text-center text-sm font-bold leading-5 text-white shadow-[0_16px_42px_-18px_rgba(56,189,248,0.9)] transition duration-300 hover:shadow-[0_18px_54px_-16px_rgba(56,189,248,1)] sm:w-fit sm:px-6"
                href={officialUnUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Visit Official UN SDG Page</span>
                <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
