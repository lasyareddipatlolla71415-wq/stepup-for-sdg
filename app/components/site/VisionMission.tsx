"use client";

import { Eye, Target, type LucideIcon } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

type CardData = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  highlight: string;
};

const cards: CardData[] = [
  {
    id: "vision",
    icon: Eye,
    eyebrow: "Our Vision",
    headline: "Empowering Every Learner to Build a Better Tomorrow",
    paragraphs: [
      "We envision a future where every child, regardless of geography, income, or background, has equal access to quality education, technology, and opportunities that unlock their full potential.",
      "StepUp for SDG aims to create inclusive schools, empowered educators, and connected communities that inspire lifelong learning and sustainable development.",
    ],
    highlight: "Education is the foundation for lasting change.",
  },
  {
    id: "mission",
    icon: Target,
    eyebrow: "Our Mission",
    headline: "Transforming Partnerships into Measurable Educational Impact",
    paragraphs: [
      "Our mission is to connect schools, NGOs, companies, volunteers, and communities through one collaborative platform that enables transparent educational initiatives, innovation, and measurable social impact.",
      "Every contribution helps children gain knowledge, confidence, and opportunities for a brighter future.",
    ],
    highlight: "Together we create opportunities that transform lives.",
  },
];

function Card({ data, isDark }: { data: CardData; isDark: boolean }) {
  const Icon = data.icon;
  const bg = isDark ? "#0f172a" : "#ffffff";
  const headlineColor = isDark ? "#ffffff" : "#0d1829";
  const eyebrowColor = isDark ? "#ffffff" : "#0d1829";
  const paraColor = isDark ? "#e2e8f0" : "#374151";
  return (
    <div className="vm-card group relative rounded-[32px] p-[1.5px]">
      <div className="vm-surface relative flex h-full flex-col gap-5 rounded-[31px] p-6 md:p-7" style={{background: bg, border: isDark ? "none" : "1px solid #e1e8f0", boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.07)"}}>
        <div className="flex items-center gap-3">
          <span className="vm-icon grid h-12 w-12 place-items-center rounded-2xl">
            <Icon className="h-6 w-6 text-white" />
          </span>
          <h3 className="font-display text-xl font-bold md:text-2xl" style={{color: eyebrowColor}}>
            {data.eyebrow}
          </h3>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <h4 className="font-display text-lg font-semibold leading-snug" style={{color: headlineColor}}>
            {data.headline}
          </h4>
          {data.paragraphs.map((p, i) => (
            <p key={i} className="text-[13px] leading-relaxed" style={{color: paraColor}}>
              {p}
            </p>
          ))}
          <p className="vm-highlight mt-0.5 border-l-2 pl-3 text-[13px] font-medium italic">
            "{data.highlight}"
          </p>
        </div>
      </div>
    </div>
  );
}

export function VisionMission() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <section className="vm-section relative overflow-hidden">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="vision-title font-display text-4xl font-bold md:text-5xl">
          Vision &amp; Mission
        </h2>
      </div>
      <div className="mx-auto mt-12 grid w-full max-w-[1120px] grid-cols-1 gap-8 md:grid-cols-2">
        {cards.map((c) => (
          <Card key={c.id} data={c} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}
