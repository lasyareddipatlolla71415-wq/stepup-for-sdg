"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "@/app/components/ThemeProvider";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

/* --- GLOBAL STYLES --------------------------------------------------------- */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,600;1,700&family=Manrope:wght@400;500;600;700;800&family=Ruluko&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .font-quote {
    font-family: 'Cormorant Garamond', 'Ruluko', Georgia, serif;
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(250%) skewX(-12deg); }
  }
  @keyframes shimmer-bg {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes border-glow {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }

  .space-bg {
    background:
      /* centered soft blue glow */
      radial-gradient(
        ellipse 75% 60% at 50% 40%,
        rgba(21, 93, 252, 0.32),
        transparent 60%
      ),
      radial-gradient(
        ellipse 50% 40% at 50% 42%,
        rgba(0, 194, 255, 0.14),
        transparent 60%
      ),
      /* vignette: darken all four edges */
      radial-gradient(
        ellipse 120% 105% at 50% 50%,
        transparent 42%,
        rgba(2, 6, 16, 0.7) 100%
      ),
      /* base linear depth (top/bottom darker) */
      linear-gradient(180deg, #040912 0%, #07101f 50%, #040912 100%);
  }

  .stars-layer {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(1px 1px at 2% 5%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 5% 18%, #fff, transparent),
      radial-gradient(1px 1px at 8% 32%, #fff, transparent),
      radial-gradient(2px 2px at 11% 47%, #fff, transparent),
      radial-gradient(1px 1px at 14% 61%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 17% 75%, #fff, transparent),
      radial-gradient(1px 1px at 20% 88%, #fff, transparent),
      radial-gradient(1px 1px at 23% 12%, #fff, transparent),
      radial-gradient(2px 2px at 26% 28%, #fff, transparent),
      radial-gradient(1px 1px at 29% 43%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 32% 57%, #fff, transparent),
      radial-gradient(1px 1px at 35% 71%, #fff, transparent),
      radial-gradient(1px 1px at 38% 84%, #fff, transparent),
      radial-gradient(2px 2px at 41% 96%, #fff, transparent),
      radial-gradient(1px 1px at 44% 8%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 47% 22%, #fff, transparent),
      radial-gradient(1px 1px at 50% 36%, #fff, transparent),
      radial-gradient(1px 1px at 53% 50%, #fff, transparent),
      radial-gradient(2px 2px at 56% 64%, #fff, transparent),
      radial-gradient(1px 1px at 59% 78%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 62% 91%, #fff, transparent),
      radial-gradient(1px 1px at 65% 14%, #fff, transparent),
      radial-gradient(1px 1px at 68% 29%, #fff, transparent),
      radial-gradient(2px 2px at 71% 44%, #fff, transparent),
      radial-gradient(1px 1px at 74% 58%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 77% 72%, #fff, transparent),
      radial-gradient(1px 1px at 80% 86%, #fff, transparent),
      radial-gradient(1px 1px at 83% 7%, #fff, transparent),
      radial-gradient(2px 2px at 86% 21%, #fff, transparent),
      radial-gradient(1px 1px at 89% 35%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 92% 49%, #fff, transparent),
      radial-gradient(1px 1px at 95% 63%, #fff, transparent),
      radial-gradient(1px 1px at 98% 77%, #fff, transparent),
      radial-gradient(2px 2px at 3% 90%, #fff, transparent),
      radial-gradient(1px 1px at 7% 55%, rgba(200, 220, 255, 0.9), transparent),
      radial-gradient(
        1.5px 1.5px at 13% 40%,
        rgba(200, 220, 255, 0.8),
        transparent
      ),
      radial-gradient(1px 1px at 19% 25%, rgba(200, 220, 255, 0.9), transparent),
      radial-gradient(1px 1px at 25% 68%, rgba(200, 220, 255, 0.7), transparent),
      radial-gradient(2px 2px at 31% 82%, rgba(200, 220, 255, 0.8), transparent),
      radial-gradient(1px 1px at 37% 15%, rgba(200, 220, 255, 0.9), transparent),
      radial-gradient(
        1.5px 1.5px at 43% 52%,
        rgba(200, 220, 255, 0.7),
        transparent
      ),
      radial-gradient(1px 1px at 49% 93%, rgba(200, 220, 255, 0.8), transparent),
      radial-gradient(1px 1px at 55% 38%, rgba(200, 220, 255, 0.9), transparent),
      radial-gradient(2px 2px at 61% 6%, rgba(200, 220, 255, 0.7), transparent),
      radial-gradient(1px 1px at 67% 74%, rgba(200, 220, 255, 0.8), transparent),
      radial-gradient(
        1.5px 1.5px at 73% 19%,
        rgba(200, 220, 255, 0.9),
        transparent
      ),
      radial-gradient(1px 1px at 79% 55%, rgba(200, 220, 255, 0.7), transparent),
      radial-gradient(1px 1px at 85% 88%, rgba(200, 220, 255, 0.8), transparent),
      radial-gradient(2px 2px at 91% 33%, rgba(200, 220, 255, 0.9), transparent),
      radial-gradient(1px 1px at 97% 66%, rgba(200, 220, 255, 0.7), transparent),
      radial-gradient(
        1.5px 1.5px at 4% 42%,
        rgba(180, 210, 255, 0.8),
        transparent
      ),
      radial-gradient(1px 1px at 10% 76%, rgba(180, 210, 255, 0.7), transparent),
      radial-gradient(1px 1px at 16% 9%, rgba(180, 210, 255, 0.9), transparent),
      radial-gradient(2px 2px at 22% 53%, rgba(180, 210, 255, 0.8), transparent),
      radial-gradient(1px 1px at 28% 87%, rgba(180, 210, 255, 0.7), transparent),
      radial-gradient(
        1.5px 1.5px at 34% 31%,
        rgba(180, 210, 255, 0.9),
        transparent
      ),
      radial-gradient(1px 1px at 40% 65%, rgba(180, 210, 255, 0.8), transparent),
      radial-gradient(1px 1px at 46% 4%, rgba(180, 210, 255, 0.7), transparent),
      radial-gradient(2px 2px at 52% 79%, rgba(180, 210, 255, 0.9), transparent),
      radial-gradient(1px 1px at 58% 23%, rgba(180, 210, 255, 0.8), transparent),
      radial-gradient(
        1.5px 1.5px at 64% 47%,
        rgba(180, 210, 255, 0.7),
        transparent
      ),
      radial-gradient(1px 1px at 70% 83%, rgba(180, 210, 255, 0.9), transparent),
      radial-gradient(1px 1px at 76% 11%, rgba(180, 210, 255, 0.8), transparent),
      radial-gradient(2px 2px at 82% 59%, rgba(180, 210, 255, 0.7), transparent),
      radial-gradient(1px 1px at 88% 95%, rgba(180, 210, 255, 0.9), transparent),
      radial-gradient(
        1.5px 1.5px at 94% 27%,
        rgba(180, 210, 255, 0.8),
        transparent
      );
    background-size: 100% 100%;
    animation: twinkle 6s ease-in-out infinite alternate;
    pointer-events: none;
    opacity: 0.85;
  }

  @keyframes twinkle {
    0% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.95;
    }
  }

  .streak {
    position: absolute;
    width: 140px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00c2ff, transparent);
    opacity: 0;
    animation: streak 6s linear infinite;
    pointer-events: none;
  }

  @keyframes streak {
    0% {
      transform: translate(-200px, 0) rotate(20deg);
      opacity: 0;
    }
    10% {
      opacity: 0.9;
    }
    100% {
      transform: translate(120vw, 200px) rotate(20deg);
      opacity: 0;
    }
  }

  .logo-pill {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
    cursor: default;
  }
  .logo-pill:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); opacity: 1 !important; }

  .shine-sweep::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%);
    transform: translateX(-100%) skewX(-12deg); pointer-events: none; border-radius: inherit;
  }
  .shine-sweep:hover::after { animation: shimmer 0.7s ease forwards; }

  .segmented-tab { position: relative; transition: color 0.2s ease; }
  .glass-input { transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
  .glass-input:focus { outline: none; }

  .theme-transition * { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease; }

  .logo-shimmer {
    background-image: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
    background-size: 200% 100%;
    animation: shimmer-bg 1.4s ease infinite;
  }
  .bg-grid-pattern {
    background-size: 28px 28px;
    background-image: radial-gradient(circle, var(--grid-color) 1.2px, transparent 1.2px);
  }
`;

/* --- THEMES ---------------------------------------------------------------- */
const DARK = {
  pageBg: "#040912",
  sectionAlt: "#07101f",
  card: "#0b1630",
  cardHover: "#101f42",
  footer: "#040912",
  border: "rgba(21, 93, 252, 0.22)",
  borderSubtle: "rgba(255, 255, 255, 0.08)",
  text: "#ffffff",
  textSub: "rgba(255, 255, 255, 0.7)",
  muted: "rgba(255, 255, 255, 0.55)",
  dim: "rgba(255, 255, 255, 0.35)",
  accent: "#00c2ff",
  accentGlow: "rgba(0, 194, 255, 0.25)",
  electric: "#155dfc",
  cyan: "#00c2ff",
  teal: "#00d084",
  accentRed: "#ef4444",
  inputBg: "#07101f",
  glass: "rgba(11, 22, 48, 0.85)",
  glassBorder: "rgba(0, 194, 255, 0.2)",
  glow: "rgba(21, 93, 252, 0.3)",
  overlay: "rgba(4, 9, 18, 0.9)",
  gridLine: "rgba(0, 194, 255, 0.03)",
};

const LIGHT = {
  pageBg: "#fafbfd",
  sectionAlt: "#f3f6fa",
  card: "#ffffff",
  cardHover: "#fafcff",
  footer: "#111827",
  border: "#e1e8f0",
  borderSubtle: "#edf2f7",
  text: "#0d1829",
  textSub: "#374151",
  muted: "#6b7280",
  dim: "#9ca3af",
  accent: "#155dfc",
  accentGlow: "rgba(21,93,252,0.15)",
  electric: "#155dfc",
  cyan: "#0088bb",
  teal: "#007a9a",
  accentRed: "#dc2626",
  inputBg: "#f8fafc",
  glass: "rgba(255,255,255,0.92)",
  glassBorder: "rgba(21,93,252,0.2)",
  glow: "rgba(21,93,252,0.08)",
  overlay: "rgba(0,0,0,0.75)",
  gridLine: "rgba(0,0,0,0.025)",
};

type T = typeof DARK;

/* --- TYPES ----------------------------------------------------------------- */
type PartnerType = "School" | "NGO" | "Company" | "University";
type Tier = "Gold" | "Silver";

interface Partner {
  id: number;
  name: string;
  type: PartnerType;
  city: string;
  initials: string;
  sdgs: number[];
  since: string;
  story: string;
  lastActivity: string;
  funds?: string;
  fundsLakh?: number;
  tier?: Tier;
  logoSources: string[];
  domain?: string;
}

/* --- TYPE CONFIGS ---------------------------------------------------------- */
const typeConfig: Record<
  PartnerType,
  {
    color: string;
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
    IconEl: (p: { className?: string; style?: React.CSSProperties }) => React.JSX.Element;
  }
> = {
  School: {
    color: "#00d084",
    bg: "rgba(0,208,132,0.08)",
    border: "rgba(0,208,132,0.25)",
    badgeBg: "rgba(0,208,132,0.12)",
    badgeText: "#00d084",
    gradient: "linear-gradient(135deg, rgba(0,208,132,0.14) 0%, rgba(0,194,255,0.06) 100%)",
    IconEl: ({ className = "w-[18px] h-[18px]", style }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  NGO: {
    color: "#00c2ff",
    bg: "rgba(0,194,255,0.08)",
    border: "rgba(0,194,255,0.25)",
    badgeBg: "rgba(0,194,255,0.12)",
    badgeText: "#00c2ff",
    gradient: "linear-gradient(135deg, rgba(0,194,255,0.14) 0%, rgba(21,93,252,0.08) 100%)",
    IconEl: ({ className = "w-[18px] h-[18px]", style }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  Company: {
    color: "#155dfc",
    bg: "rgba(21,93,252,0.08)",
    border: "rgba(21,93,252,0.3)",
    badgeBg: "rgba(21,93,252,0.15)",
    badgeText: "#155dfc",
    gradient: "linear-gradient(135deg, rgba(21,93,252,0.16) 0%, rgba(0,194,255,0.08) 100%)",
    IconEl: ({ className = "w-[18px] h-[18px]", style }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
  },
  University: {
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.25)",
    badgeBg: "rgba(251,191,36,0.12)",
    badgeText: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(249,115,22,0.06) 100%)",
    IconEl: ({ className = "w-[18px] h-[18px]", style }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
      </svg>
    ),
  },
};

const tierConfig: Record<Tier, { label: string; color: string; bg: string }> = {
  Gold: { label: "Gold", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Silver: { label: "Silver", color: "#94a3b8", bg: "rgba(148,163,184,0.1)" },
};

const tabs = ["All", "NGOs", "Companies", "Educational Institutes"] as const;
type Tab = (typeof tabs)[number];
const TAB_TO_TYPE: Record<Tab, PartnerType[] | null> = {
  All: null,
  NGOs: ["NGO"],
  Companies: ["Company"],
  "Educational Institutes": ["School", "University"],
};

/* --- DATA ------------------------------------------------------------------ */
const partners: Partner[] = [
  {
    id: 1,
    name: "Delhi Public School",
    type: "School",
    city: "New Delhi",
    initials: "DPS",
    sdgs: [4, 13],
    since: "2023",
    story: "Students launched their own sustainability council after their first SDG workshop.",
    lastActivity: "Hosted an SDG workshop • 2 weeks ago",
    domain: "dpsrkp.net",
    logoSources: [
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Delhi_Public_School_logo.png/200px-Delhi_Public_School_logo.png",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://dpsrkp.net&size=128",
    ],
  },
  {
    id: 2,
    name: "GreenEarth Initiative",
    type: "NGO",
    city: "Hyderabad",
    initials: "GE",
    sdgs: [13, 15],
    since: "2024",
    story: "Co-designed a tree-cover restoration curriculum now used across 6 partner schools.",
    lastActivity: "Published impact report • 5 days ago",
    domain: "greenearth.org",
    logoSources: [
      "https://cdn.brandfetch.io/greenearth.org/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://greenearth.org&size=128",
    ],
  },
  {
    id: 3,
    name: "TechCorp India",
    type: "Company",
    city: "Bangalore",
    initials: "TC",
    sdgs: [4, 9],
    since: "2023",
    story: "A Rs50L CSR commitment turned into 3 audited programs reaching 620 students.",
    lastActivity: "Funded the AI Bootcamp cohort • 3 days ago",
    fundsLakh: 50,
    tier: "Gold",
    domain: "techcorp.in",
    logoSources: [
      "https://cdn.brandfetch.io/techcorp.in/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://techcorp.in&size=128",
    ],
  },
  {
    id: 4,
    name: "IIT Hyderabad",
    type: "University",
    city: "Hyderabad",
    initials: "IIT",
    sdgs: [4, 9, 17],
    since: "2023",
    story: "420 student volunteers now run peer-led SDG workshops in government schools.",
    lastActivity: "Volunteer cohort onboarded • 1 week ago",
    domain: "iith.ac.in",
    logoSources: [
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Indian_Institute_of_Technology_Hyderabad_Logo.svg/240px-Indian_Institute_of_Technology_Hyderabad_Logo.svg.png",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://iith.ac.in&size=128",
    ],
  },
  {
    id: 5,
    name: "Bright Futures Academy",
    type: "School",
    city: "Mumbai",
    initials: "BF",
    sdgs: [4, 10],
    since: "2024",
    story: "First cohort of 95% satisfaction-rated SDG electives • expanding to more grade levels.",
    lastActivity: "Completed term-1 workshops • 4 days ago",
    domain: "brightfuturesacademy.in",
    logoSources: [
      "https://cdn.brandfetch.io/brightfuturesacademy.in/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://brightfuturesacademy.in&size=128",
    ],
  },
  {
    id: 6,
    name: "EcoVolt Energy",
    type: "Company",
    city: "Chennai",
    initials: "EV",
    sdgs: [7, 13],
    since: "2024",
    story: "Brought hands-on renewable-energy labs to schools.",
    lastActivity: "New funding round confirmed • 6 days ago",
    fundsLakh: 20,
    tier: "Silver",
    domain: "ecovolt.in",
    logoSources: [
      "https://cdn.brandfetch.io/ecovolt.in/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ecovolt.in&size=128",
    ],
  },
  {
    id: 7,
    name: "Hope NGO",
    type: "NGO",
    city: "Delhi",
    initials: "HN",
    sdgs: [1, 10],
    since: "2024",
    story: "Connected 840 beneficiaries across 4 cities with partner companies.",
    lastActivity: "Beneficiary survey completed • 2 weeks ago",
    domain: "hopengo.org",
    logoSources: [
      "https://cdn.brandfetch.io/hopengo.org/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://hopengo.org&size=128",
    ],
  },
  {
    id: 8,
    name: "Woxsen University",
    type: "University",
    city: "Hyderabad",
    initials: "WU",
    sdgs: [4, 17],
    since: "2025",
    story: "Newest university partner • piloting a joint research project with GreenEarth.",
    lastActivity: "Joined the ecosystem • 3 weeks ago",
    domain: "woxsen.edu.in",
    logoSources: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Woxsen.png/240px-Woxsen.png",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://woxsen.edu.in&size=128",
    ],
  },
  {
    id: 9,
    name: "InfraBuild Corp",
    type: "Company",
    city: "Mumbai",
    initials: "IB",
    sdgs: [9, 11],
    since: "2024",
    story: "Funding urban-planning workshops letting students redesign real city blocks.",
    lastActivity: "Workshop showcase held • 1 week ago",
    fundsLakh: 30,
    tier: "Silver",
    domain: "l-and-t.com",
    logoSources: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Larsen_and_Toubro_logo.svg/240px-Larsen_and_Toubro_logo.svg.png",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://l-and-t.com&size=128",
    ],
  },
];

const COMPANY_PROJECTS = [
  { name: "SDG Workshop • Hyderabad", amount: "Rs15L", status: "Completed" as const, verified: true },
  { name: "AI Bootcamp for Schools", amount: "Rs12L", status: "Ongoing" as const, verified: false },
  { name: "Climate Action Camp", amount: "Rs11L", status: "Completed" as const, verified: true },
];

const audienceCards: { title: string; type: PartnerType; benefits: string[]; href: string; btnLabel: string }[] = [
  {
    title: "For Companies",
    type: "Company",
    href: "mailto:companies@stepupsdg.in",
    btnLabel: "Get started",
    benefits: ["Verified impact reports for your board", "Direct line to 12,000+ students", "Brand visibility across 6 states"],
  },
  {
    title: "For Educational Institutes",
    type: "School",
    href: "mailto:schools@stepupsdg.in",
    btnLabel: "Join as an institute",
    benefits: ["Ready SDG curriculum and materials", "Funded workshops at zero cost", "Student leadership opportunities"],
  },
  {
    title: "For NGOs",
    type: "NGO",
    href: "mailto:ngos@stepupsdg.in",
    btnLabel: "Partner with us",
    benefits: ["Co-design programs with companies", "Reach across 8 partner cities", "Joint grant opportunities"],
  },
];

/* --- ICONS ----------------------------------------------------------------- */
const Icon = {
  Search: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  X: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: ({ className = "w-3.5 h-3.5", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  MapPin: ({ className = "w-3 h-3" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Arrow: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Star: ({ className = "w-2.5 h-2.5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Shield: ({ className = "w-3.5 h-3.5", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Heart: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Users: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Megaphone: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 19l-7-5H2V10h3l7-5v14z" />
      <path d="M17 14c.88-1.16.88-2.84 0-4" />
      <path d="M19 17c1.72-2.14 1.72-5.86 0-8" />
    </svg>
  ),
  Handshake: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2" />
      <path d="m14 14 2.5 2.5a1 1 0 0 0 1.4 0l2.8-2.8a1 1 0 0 0 0-1.4l-3.3-3.3" />
      <path d="M18 10 9 1 2 8l5 5" />
      <path d="m2 8 7 7 4-4" />
      <path d="m9 15 2 2" />
    </svg>
  ),
  BarChart: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Target: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Rupee: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4 4 0 0 0 0-8" />
    </svg>
  ),
  Leaf: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
};

/* --- MULTI-SOURCE IMAGE ---------------------------------------------------- */
function MultiSourceImg({
  sources,
  alt,
  initials,
  color,
  gradient,
  border,
  className,
  style,
  isDark,
}: {
  sources: string[];
  alt: string;
  initials: string;
  color: string;
  gradient: string;
  border: string;
  className?: string;
  style?: React.CSSProperties;
  isDark: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);
  const tryNext = () => {
    if (idx + 1 < sources.length) {
      setIdx((i) => i + 1);
      setLoaded(false);
    } else setAllFailed(true);
  };
  if (allFailed || sources.length === 0) {
    return (
      <div
        className={className}
        style={{
          background: gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${border}`,
          borderRadius: "50%",
          width: 56,
          height: 56,
          ...style,
        }}
      >
        <span style={{ color, fontWeight: 900, fontSize: "14px", letterSpacing: "-0.02em" }}>
          {initials}
        </span>
      </div>
    );
  }
  return (
    <div className={className} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {!loaded && <div className="logo-shimmer" style={{ position: "absolute", inset: 0, borderRadius: "inherit" }} />}
      <img
        key={idx}
        src={sources[idx]}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={tryNext}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.35s ease",
          filter: isDark ? "brightness(0.9) saturate(0.85)" : "none",
        }}
      />
    </div>
  );
}

/* --- SCROLL REVEAL --------------------------------------------------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

/* --- ROLLING NUMBER COUNTER ------------------------------------------------ */
function RollingNumber({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1800,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const current = p === 1 ? to : eased * to;
        setVal(current);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, [inView, to, duration]);

  const formatted =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* --- PARTNER CARD ---------------------------------------------------------- */
function PartnerCard({
  partner,
  onSelect,
  theme,
  isDark,
}: {
  partner: Partner;
  onSelect: () => void;
  theme: T;
  isDark: boolean;
}) {
  const cfg = typeConfig[partner.type];
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300"
      style={{
        background: "transparent",
        border: "1px solid transparent",
        borderRadius: 24,
        transform: hovered ? "translateY(-6px)" : "none",
      }}
    >
      {/* Logo (Poster) - Floating with NO background/border container */}
      <div
        className="flex h-20 w-full items-center justify-center transition-all duration-300"
        style={{
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        <MultiSourceImg
          sources={partner.logoSources}
          alt={partner.name}
          initials={partner.initials}
          color={cfg.color}
          gradient={cfg.gradient}
          border={cfg.border}
          isDark={isDark}
          style={
            partner.logoSources.length > 0
              ? { width: "90%", height: "100%", borderRadius: 0 }
              : { width: 56, height: 56, borderRadius: "50%" }
          }
        />
      </div>

      {/* Partner Name */}
      <span
        className="text-[14px] sm:text-[16px] font-semibold text-center mt-3 tracking-tight transition-colors duration-300 line-clamp-1 px-2"
        style={{ color: hovered ? "#155dfc" : theme.text }}
      >
        {partner.name}
      </span>
    </div>
  );
}

/* --- PARTNER MODAL --------------------------------------------------------- */
function PartnerModal({
  partner,
  onClose,
  theme,
  isDark,
}: {
  partner: Partner;
  onClose: () => void;
  theme: T;
  isDark: boolean;
}) {
  const cfg = typeConfig[partner.type];
  const metrics: any[] = [];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: theme.overlay, backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[24px]"
        style={{ background: theme.card, border: `1px solid ${theme.border}`, boxShadow: `0 40px 80px rgba(0,0,0,0.4)` }}
      >
        <div
          className="sticky top-0 z-10 p-6 flex items-start justify-between"
          style={{ background: theme.card, borderBottom: `1px solid ${theme.border}`, backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-4">
            <MultiSourceImg
              sources={partner.logoSources}
              alt={partner.name}
              initials={partner.initials}
              color={cfg.color}
              gradient={cfg.gradient}
              border={cfg.border}
              isDark={isDark}
              style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0 }}
            />
            <div>
              {/* Modal Title (Card Heading H4) - Manrope 24px/30px */}
              <div className="text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] tracking-tight" style={{ color: theme.text }}>{partner.name}</div>
              <div className="flex items-center gap-1.5 mt-1 text-[16px] font-normal leading-[28px]" style={{ color: theme.muted }}>
                <Icon.MapPin className="w-3.5 h-3.5" />
                {partner.city} • Since {partner.since}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="rounded-full px-3 py-1 text-[12px] font-medium leading-[18px]"
                  style={{ background: cfg.badgeBg, color: cfg.badgeText }}
                >
                  {partner.type}
                </span>
                {partner.tier && (
                  <span
                    className="flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold leading-[18px]"
                    style={{ color: tierConfig[partner.tier].color, background: tierConfig[partner.tier].bg }}
                  >
                    <Icon.Star />
                    {tierConfig[partner.tier].label}
                  </span>
                )}
              </div>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ border: `1px solid ${theme.border}`, color: theme.muted, background: theme.pageBg }}
          >
            <Icon.X />
          </motion.button>
        </div>
        <div className="flex flex-col gap-5 p-6">
          <div className="rounded-2xl p-5" style={{ background: theme.pageBg, border: `1px solid ${theme.border}` }}>
            <div className="mb-2 text-[12px] font-medium uppercase tracking-widest leading-[18px]" style={{ color: theme.muted }}>
              The story so far
            </div>
            {/* Body Small - Manrope 16px / 400 / 28px */}
            <p className="text-[16px] font-normal leading-[28px]" style={{ color: theme.textSub }}>
              {partner.story}
            </p>
          </div>
          <div
            className="flex items-center gap-2.5 rounded-xl p-3.5"
            style={{ border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.06)" }}
          >
            <Icon.Shield className="w-4 h-4" style={{ color: "#22c55e" }} />
            <span className="text-[14px] font-semibold leading-[20px]" style={{ color: "#22c55e" }}>
              Verified Partner
            </span>
            <span className="ml-auto text-[12px] font-medium leading-[18px]" style={{ color: "#4ade80" }}>
              Audited • Impact verified
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {metrics.map(([val, label]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl p-4 text-center"
                style={{ background: cfg.gradient, border: `1px solid ${cfg.border}` }}
              >
                {/* Metric Number */}
                <div className="text-[24px] sm:text-[28px] font-extrabold tracking-tight leading-none" style={{ color: cfg.color }}>
                  {val}
                </div>
                {/* Metric Label */}
                <div className="mt-1.5 text-[13px] sm:text-[14px] font-medium leading-[18px] sm:leading-[20px]" style={{ color: theme.muted }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
          {partner.type === "Company" && (
            <div>
              <div className="mb-3 text-[12px] font-medium uppercase tracking-widest leading-[18px]" style={{ color: theme.muted }}>
                Funding journey
              </div>
              {COMPANY_PROJECTS.map((p, i) => (
                <div key={p.name} className="relative flex gap-3 pb-4 pl-1 last:pb-0">
                  {i !== COMPANY_PROJECTS.length - 1 && (
                    <span className="absolute left-[7px] top-4 h-full w-px" style={{ background: theme.border }} />
                  )}
                  <span
                    className="z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2"
                    style={{ borderColor: cfg.color, background: p.status === "Completed" ? cfg.color : "transparent" }}
                  />
                  <div className="flex-1 rounded-xl p-3.5" style={{ background: theme.pageBg, border: `1px solid ${theme.border}` }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] sm:text-[16px] font-medium leading-[22px]" style={{ color: theme.text }}>
                        {p.name}
                      </span>
                      <span className="text-[14px] sm:text-[16px] font-bold leading-[22px]" style={{ color: cfg.color }}>
                        {p.amount}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[12px] leading-[18px]" style={{ color: theme.muted }}>
                      <span>{p.status}</span>
                      {p.verified && (
                        <span className="flex items-center gap-1 font-medium" style={{ color: theme.accent }}>
                          <Icon.Check className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --- MAIN PAGE COMPONENT --------------------------------------------------- */
export default function PartnersPage() {
  const { theme: siteTheme } = useTheme();
  const isDark = siteTheme === "dark";
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedPartner, setSelected] = useState<Partner | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const theme: T = isDark ? DARK : LIGHT;

  const filtered = partners.filter((p) => {
    const targetTypes = TAB_TO_TYPE[activeTab];
    const matchesTab = targetTypes === null || targetTypes.includes(p.type);
    const q = searchQuery.trim().toLowerCase();
    return matchesTab && (q === "" || p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
  });

  return (
    <div
      className={`min-h-screen theme-transition flex flex-col relative overflow-hidden ${
        isDark ? "space-bg" : "bg-grid-pattern"
      }`}
      style={{
        background: isDark ? undefined : theme.pageBg,
        color: theme.text,
        fontFamily: "'Inter',system-ui,sans-serif",
        "--grid-color": isDark ? "rgba(0,194,255,0.03)" : "rgba(15,23,42,0.035)",
      } as React.CSSProperties}
    >
      <style>{GLOBAL_STYLES}</style>

      {/* -- SPACE STARS & STREAKS (DARK MODE) -- */}
      {isDark && (
        <>
          <div className="stars-layer" aria-hidden="true" />
          <div
            className="streak"
            style={{ top: "20%", left: "10%", animationDelay: "0.5s", opacity: 0.6 }}
            aria-hidden="true"
          />
          <div
            className="streak"
            style={{ top: "60%", left: "30%", animationDelay: "3.2s", opacity: 0.5 }}
            aria-hidden="true"
          />
          <div
            className="streak"
            style={{ top: "85%", left: "15%", animationDelay: "5.5s", opacity: 0.4 }}
            aria-hidden="true"
          />
        </>
      )}

      {/* -- ECOSYSTEM CONSTELLATION HERO -- */}
      <section
        className="px-6 md:px-12 lg:px-20 pt-6 pb-24 md:pt-8 md:pb-32 flex flex-col items-center justify-center relative overflow-hidden z-10"
        style={{ background: "transparent" }}
      >
        {/* Two-Column Hero Container */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top SDG 17 Badge */}
            <Reveal delay={0.05}>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-medium leading-[18px] mb-6 border shadow-sm transition hover:scale-[1.02]"
                style={{
                  background: isDark ? "rgba(21,93,252,0.12)" : "rgba(21,93,252,0.06)",
                  borderColor: isDark ? "rgba(0,194,255,0.3)" : "rgba(21,93,252,0.2)",
                  color: isDark ? "#00c2ff" : "#155dfc",
                }}
              >
                <Icon.Handshake className="w-3.5 h-3.5" />
                <span className="tracking-wider uppercase text-[12px] font-medium leading-[18px]">SDG 17 — Partnerships for the Goals</span>
              </div>
            </Reveal>

            {/* Page Heading (H1) - Manrope 56px / 700 / 68px */}
            <Reveal delay={0.1}>
              <h1
                className="font-bold tracking-tight text-[40px] sm:text-[48px] lg:text-[72px] leading-[48px] sm:leading-[60px] lg:leading-[84px] mb-5"
                style={{ color: theme.text }}
              >
                Coordinating action <br />
                for a{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #155dfc 0%, #00c2ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  sustainable
                </span>{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #00c2ff 0%, #00d084 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  future
                </span>
              </h1>
            </Reveal>

            {/* Accent divider line */}
            <Reveal delay={0.12}>
              <div
                className="h-1 w-20 rounded-full mb-6"
                style={{
                  background: "linear-gradient(90deg, #155dfc 0%, #00c2ff 50%, #00d084 100%)",
                }}
              />
            </Reveal>

            {/* Hero Description / Body Large - Manrope 20px / 400 / 34px */}
            <Reveal delay={0.15}>
              <p
                className="text-[18px] sm:text-[20px] font-normal leading-[30px] sm:leading-[34px] mb-8 max-w-xl"
                style={{ color: theme.textSub }}
              >
                StepUp for SDG drives grassroots educational action under UN SDG 17. We match corporate funding, university research, and NGO fieldwork to deliver quality learning infrastructure where it is needed most.
              </p>
            </Reveal>

            {/* CTAs - Manrope 16px / 600 / 24px */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="#directory"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[16px] font-semibold leading-[24px] tracking-tight text-white transition hover:opacity-95 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, #155dfc, #00c2ff)`,
                    boxShadow: "0 8px 24px rgba(21,93,252,0.3)",
                  }}
                >
                  Explore Partners <Icon.Arrow className="w-4 h-4" />
                </a>
                <a
                  href="/work-with-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[16px] font-semibold leading-[24px] tracking-tight transition hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    borderColor: theme.border,
                    color: theme.text,
                    background: isDark ? "rgba(11,22,48,0.5)" : "rgba(255,255,255,0.7)",
                  }}
                >
                  Join Ecosystem <Icon.Arrow className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

            {/* 3 Proof Points under buttons */}
            <Reveal delay={0.25}>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(0,208,132,0.12)", color: "#00d084", border: "1px solid rgba(0,208,132,0.25)" }}
                  >
                    <Icon.Shield className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold leading-[20px]" style={{ color: theme.text }}>Trusted Partnerships</div>
                    <div className="text-[12px] font-normal leading-[18px]" style={{ color: theme.muted }}>Built on transparency</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(21,93,252,0.12)", color: "#155dfc", border: "1px solid rgba(21,93,252,0.25)" }}
                  >
                    <Icon.BarChart className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold leading-[20px]" style={{ color: theme.text }}>Measurable Impact</div>
                    <div className="text-[12px] font-normal leading-[18px]" style={{ color: theme.muted }}>Results that matter</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" }}
                  >
                    <Icon.Target className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold leading-[20px]" style={{ color: theme.text }}>SDG Aligned</div>
                    <div className="text-[12px] font-normal leading-[18px]" style={{ color: theme.muted }}>Driving SDG 17 goals</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Constellation Map */}
          <div className="lg:col-span-5 flex justify-center w-full relative">
            <div className="relative w-[340px] xs:w-[380px] md:w-[420px] h-[360px] mx-auto scale-95 xs:scale-100">
              {/* SVG Connection Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 420 360"
                preserveAspectRatio="xMidYMid meet"
              >
                {[
                  { x1: 58, y1: 58, x2: 172, y2: 148, color: typeConfig["School"].color, delay: 0.3 },
                  { x1: 362, y1: 58, x2: 248, y2: 148, color: typeConfig["NGO"].color, delay: 0.6 },
                  { x1: 58, y1: 285, x2: 172, y2: 212, color: typeConfig["Company"].color, delay: 0.9 },
                  { x1: 362, y1: 285, x2: 248, y2: 212, color: typeConfig["University"].color, delay: 1.2 },
                ].map((l, i) => (
                  <g key={i}>
                    <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={theme.border} strokeWidth="1.5" />
                    <motion.line
                      x1={l.x1}
                      y1={l.y1}
                      x2={l.x2}
                      y2={l.y2}
                      stroke={l.color}
                      strokeWidth="1.5"
                      strokeOpacity="0.7"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: l.delay, ease: "easeInOut" }}
                    />
                    <circle r="4" fill={l.color} style={{ filter: `drop-shadow(0 0 6px ${l.color})` }}>
                      <animateMotion dur="2s" begin={`${l.delay}s`} repeatCount="indefinite" path={`M${l.x1},${l.y1} L${l.x2},${l.y2}`} />
                      <animate attributeName="opacity" values="0;1;1;0" dur="2s" begin={`${l.delay}s`} repeatCount="indefinite" keyTimes="0;0.1;0.85;1" />
                      <animate attributeName="r" values="0;4;4;0" dur="2s" begin={`${l.delay}s`} repeatCount="indefinite" keyTimes="0;0.1;0.85;1" />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* 4 Corner Nodes */}
              {[
                { type: "School" as PartnerType, title: "Educational Institutes", role: "SDG education & awareness", style: { top: "0%", left: "0%" }, align: "flex-start" as const, textAlign: "left" as const, delay: 0.3 },
                { type: "NGO" as PartnerType, title: "NGOs", role: "Ground execution & community impact", style: { top: "0%", right: "0%" }, align: "flex-end" as const, textAlign: "right" as const, delay: 0.6 },
                { type: "Company" as PartnerType, title: "Companies", role: "Funding & resources", style: { bottom: "0%", left: "0%" }, align: "flex-start" as const, textAlign: "left" as const, delay: 0.9 },
                { type: "University" as PartnerType, title: "Universities", role: "Research, innovation & volunteers", style: { bottom: "0%", right: "0%" }, align: "flex-end" as const, textAlign: "right" as const, delay: 1.2 },
              ].map((node) => {
                const cfg = typeConfig[node.type];
                const rd = node.delay + 0.5;
                return (
                  <div
                    key={node.title}
                    className="absolute flex flex-col gap-1.5 z-10"
                    style={{ ...node.style, width: 130, alignItems: node.align, textAlign: node.textAlign }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className="absolute rounded-full pointer-events-none"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: [0.8, 1.8], opacity: [0.8, 0] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: rd, ease: "easeOut" }}
                        style={{ width: 64, height: 64, border: `2px solid ${cfg.color}`, borderRadius: "50%" }}
                      />
                      <motion.div
                        className="absolute rounded-full pointer-events-none"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: rd + 0.8 }}
                        style={{ width: 64, height: 64, border: `1.5px solid ${cfg.color}`, borderRadius: "50%" }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2, boxShadow: `0 0 24px ${cfg.color}50` }}
                        initial={{ opacity: 0, scale: 0.4, y: 16 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: rd, type: "spring", stiffness: 240, damping: 18 }}
                        className="relative flex h-16 w-16 items-center justify-center rounded-full border shadow-sm cursor-default"
                        style={{ background: cfg.gradient, borderColor: cfg.color }}
                      >
                        <motion.span
                          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
                          style={{ color: cfg.color }}
                        >
                          <cfg.IconEl className="w-6 h-6" />
                        </motion.span>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: rd + 0.15 }}
                      className="relative z-20 px-1 py-0.5 rounded"
                      style={{
                        background: isDark ? "rgba(4,9,18,0.7)" : "rgba(255,255,255,0.75)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <div className="text-[12px] font-bold" style={{ color: theme.text }}>
                        {node.title}
                      </div>
                      <div className="text-[10px] leading-snug mt-0.5" style={{ color: theme.muted }}>
                        {node.role}
                      </div>
                    </motion.div>
                  </div>
                );
              })}

              {/* Center Hub Node */}
              {(() => {
                const color = theme.accent;
                const rd = 0.15;
                return (
                  <div
                    className="absolute flex flex-col items-center gap-1.5 text-center"
                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 150 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className="absolute rounded-full pointer-events-none"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: [0.8, 1.8], opacity: [0.8, 0] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: rd, ease: "easeOut" }}
                        style={{ width: 96, height: 96, border: `2px solid ${color}`, borderRadius: "50%" }}
                      />
                      <motion.div
                        className="absolute rounded-full pointer-events-none"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: rd + 0.8 }}
                        style={{ width: 96, height: 96, border: `1.5px solid ${color}`, borderRadius: "50%" }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.08, boxShadow: `0 0 36px ${color}60` }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: rd, type: "spring", stiffness: 240, damping: 18 }}
                        className="relative flex h-24 w-24 items-center justify-center rounded-full border overflow-hidden shadow-md cursor-default"
                        style={{
                          background: isDark ? "#0b1630" : "#ffffff",
                          borderColor: color,
                          padding: 0,
                        }}
                      >
                        <img
                          src="/assets/SDG_LOGO-removebg-preview.png"
                          alt="StepUp SDG"
                          style={{ width: "80%", height: "80%", objectFit: "contain" }}
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: rd + 0.15 }}
                    >
                      <div className="text-[12px] font-bold">
                        <span style={{ color: theme.accent }}>StepUp</span>{" "}
                        <span style={{ color: "#00d084" }}>For SDG</span>
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: theme.muted }}>
                        Coordination & impact
                      </div>
                    </motion.div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Unified Metrics Stats Card Bar */}
        <Reveal delay={0.3} className="w-full max-w-7xl mx-auto">
          <div
            className="w-full mt-16 rounded-2xl border p-6 sm:p-8 shadow-sm backdrop-blur-md"
            style={{
              background: isDark ? "rgba(11, 22, 48, 0.75)" : "rgba(255, 255, 255, 0.9)",
              borderColor: isDark ? "rgba(21, 93, 252, 0.25)" : "rgba(15,23,42,0.08)",
              boxShadow: isDark ? "0 12px 36px rgba(4,9,18,0.5)" : "0 8px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-6">
              {/* Stat 1: 9 Verified Partners */}
              <div className="flex items-center gap-4 px-3 sm:px-4 lg:border-r border-slate-200 dark:border-slate-800/80">
                <div
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(0,194,255,0.12)", color: "#00c2ff", border: "1.5px solid rgba(0,194,255,0.25)", width: 52, height: 52 }}
                >
                  <Icon.Users className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <div className="text-[56px] sm:text-[64px] font-extrabold tracking-tight leading-none" style={{ color: "#00c2ff" }}>
                    <RollingNumber to={9} duration={1800} />
                  </div>
                  <div className="text-[18px] sm:text-[18px] font-medium mt-1.5 leading-[28px] whitespace-nowrap" style={{ color: theme.text }}>
                    Verified Partners
                  </div>
                  <div className="text-[18px] font-normal leading-[28px] mt-0.5" style={{ color: theme.muted }}>
                    Trusted collaborators
                  </div>
                </div>
              </div>

              {/* Stat 2: 6 States Reached */}
              <div className="flex items-center gap-4 px-3 sm:px-4 lg:border-r border-slate-200 dark:border-slate-800/80">
                <div
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(0,208,132,0.12)", color: "#00d084", border: "1.5px solid rgba(0,208,132,0.25)", width: 52, height: 52 }}
                >
                  <Icon.MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <div className="text-[56px] sm:text-[64px] font-extrabold tracking-tight leading-none" style={{ color: "#00d084" }}>
                    <RollingNumber to={6} duration={1800} />
                  </div>
                  <div className="text-[18px] font-medium mt-1.5 leading-[28px] whitespace-nowrap" style={{ color: theme.text }}>
                    States Reached
                  </div>
                  <div className="text-[18px] font-normal leading-[28px] mt-0.5" style={{ color: theme.muted }}>
                    Across India
                  </div>
                </div>
              </div>

              {/* Stat 3: Rs 1.2 Cr CSR Co-funding */}
              <div className="flex items-center gap-4 px-3 sm:px-4 lg:border-r border-slate-200 dark:border-slate-800/80">
                <div
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(21,93,252,0.12)", color: "#155dfc", border: "1.5px solid rgba(21,93,252,0.25)", width: 52, height: 52 }}
                >
                  <Icon.Rupee className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <div className="text-[52px] sm:text-[60px] font-extrabold tracking-tight leading-none whitespace-nowrap" style={{ color: "#155dfc" }}>
                    <RollingNumber to={1.2} decimals={1} prefix="Rs " suffix=" Cr" duration={1800} />
                  </div>
                  <div className="text-[18px] font-medium mt-1.5 leading-[28px] whitespace-nowrap" style={{ color: theme.text }}>
                    CSR Co-funding
                  </div>
                  <div className="text-[18px] font-normal leading-[28px] mt-0.5" style={{ color: theme.muted }}>
                    Resources mobilized
                  </div>
                </div>
              </div>

              {/* Stat 4: 12,000+ Students Impacted */}
              <div className="flex items-center gap-4 px-3 sm:px-4">
                <div
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1.5px solid rgba(251,191,36,0.25)", width: 52, height: 52 }}
                >
                  <Icon.Star className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <div className="text-[56px] sm:text-[64px] font-extrabold tracking-tight leading-none whitespace-nowrap" style={{ color: "#fbbf24" }}>
                    <RollingNumber to={12000} suffix="+" duration={1800} />
                  </div>
                  <div className="text-[18px] font-medium mt-1.5 leading-[28px] whitespace-nowrap" style={{ color: theme.text }}>
                    Students Impacted
                  </div>
                  <div className="text-[18px] font-normal leading-[28px] mt-0.5" style={{ color: theme.muted }}>
                    Lives positively influenced
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quote / Motto - Cormorant Garamond Italic / Ruluko 26px / 400 / 38px */}
          <div className="flex items-center justify-center gap-2.5 mt-12 mb-10 text-center" style={{ color: theme.muted }}>
            <Icon.Leaf className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="font-quote italic text-[22px] sm:text-[26px] lg:text-[26px] font-normal leading-[32px] sm:leading-[38px] lg:leading-[38px]">
              Together, we can build a more{" "}
              <strong className="font-bold not-italic text-blue-600 dark:text-blue-400">equitable</strong>,{" "}
              <strong className="font-bold not-italic text-teal-600 dark:text-teal-400">inclusive</strong> and{" "}
              <strong className="font-bold not-italic text-emerald-600 dark:text-emerald-400">sustainable</strong> future.
            </span>
          </div>
        </Reveal>
      </section>

      {/* -- PARTNER DIRECTORY SECTION -- */}
      <section id="directory" className="max-w-7xl mx-auto pt-28 pb-14 sm:pt-36 sm:pb-16 px-6 sm:px-10 lg:px-12 relative z-10" style={{ background: "transparent" }}>
        {/* Subtle Ambient Particle Glow on Left & Right */}
        <div
          className="pointer-events-none absolute -left-20 top-20 w-[450px] h-[450px] rounded-full blur-3xl opacity-40 dark:opacity-25"
          style={{ background: "radial-gradient(circle, #00c2ff 0%, rgba(21,93,252,0.15) 50%, transparent 75%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 top-40 w-[450px] h-[450px] rounded-full blur-3xl opacity-35 dark:opacity-20"
          style={{ background: "radial-gradient(circle, #155dfc 0%, rgba(0,208,132,0.15) 50%, transparent 75%)" }}
          aria-hidden="true"
        />

        <Reveal>
          <div className="text-center mb-12 relative z-10">
            {/* Top Pill Badge: OUR PARTNER ECOSYSTEM */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold tracking-wider uppercase leading-[18px] mb-4 border shadow-sm"
              style={{
                background: isDark ? "rgba(21,93,252,0.15)" : "rgba(21,93,252,0.08)",
                borderColor: isDark ? "rgba(0,194,255,0.3)" : "rgba(21,93,252,0.2)",
                color: isDark ? "#00c2ff" : "#155dfc",
              }}
            >
              <Icon.Shield className="w-3.5 h-3.5" />
              <span>Our Partner Ecosystem</span>
            </div>

            {/* Page Heading (H2) - Building Impact, Together. */}
            <h2 className="text-[40px] sm:text-[48px] lg:text-[56px] font-bold tracking-tight leading-[48px] sm:leading-[60px] lg:leading-[68px] mb-3" style={{ color: theme.text }}>
              Building Impact,<br />
              <span style={{ color: "#155dfc" }}>Together.</span>
            </h2>

            {/* Subtitle - Body Large */}
            <p className="max-w-xl mx-auto text-[18px] sm:text-[20px] font-normal leading-[28px] sm:leading-[34px]" style={{ color: theme.muted }}>
              Meet the organizations and institutions<br className="hidden sm:inline" />
              {" "}driving meaningful change with us.
            </p>

            {/* Divider Line with Gradient and Dot */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #155dfc, #00c2ff)" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00c2ff" }} />
            </div>
          </div>
        </Reveal>

        {/* Search & Segmented Tabs Bar */}
        <Reveal delay={0.1}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 w-full">
            {/* Search Input Pill - Expanded & Proportional */}
            <div className="relative flex-1 w-full max-w-md lg:max-w-xl">
              <span
                className="pointer-events-none absolute left-4.5 top-1/2 -translate-y-1/2 flex items-center justify-center z-10"
                style={{ color: theme.muted }}
              >
                <Icon.Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search by partner name, organization, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full rounded-full py-3.5 pr-6 text-[16px] font-medium leading-[24px] border shadow-sm outline-none transition-all"
                style={{
                  paddingLeft: "46px",
                  background: isDark ? "rgba(11, 22, 48, 0.85)" : "#ffffff",
                  borderColor: searchFocused ? "#155dfc" : isDark ? "rgba(21,93,252,0.25)" : "rgba(15,23,42,0.1)",
                  color: theme.text,
                  boxShadow: searchFocused ? `0 0 0 3px rgba(21,93,252,0.2)` : "0 2px 10px rgba(0,0,0,0.02)",
                }}
              />
            </div>

            {/* Segmented Filter Pills */}
            <div
              className="relative flex items-center rounded-full p-1.5 border shadow-sm shrink-0"
              style={{
                background: isDark ? "rgba(7, 16, 31, 0.85)" : "#ffffff",
                borderColor: isDark ? "rgba(21,93,252,0.25)" : "rgba(15,23,42,0.08)",
              }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative rounded-full px-5 py-2.5 text-[16px] font-medium leading-[24px] z-10 transition-colors whitespace-nowrap"
                    style={{
                      color: isActive ? "#ffffff" : isDark ? "rgba(255,255,255,0.7)" : "#475569",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tab-indicator"
                        className="absolute inset-0 rounded-full z-0"
                        style={{
                          background: "#155dfc",
                          boxShadow: "0 2px 10px rgba(21,93,252,0.35)",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div
            className="rounded-2xl py-16 text-center text-[16px] font-normal leading-[28px]"
            style={{ border: `1px dashed ${theme.border}`, color: theme.muted }}
          >
            No partners found for &ldquo;{searchQuery}&rdquo;
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mt-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((partner, idx) => (
                <motion.div
                  key={partner.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
                >
                  <PartnerCard
                    partner={partner}
                    onSelect={() => setSelected(partner)}
                    theme={theme}
                    isDark={isDark}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* -- AUDIENCE CALL-OUT CARDS SECTION -- */}
      <section
        className="px-6 sm:px-10 lg:px-12 pt-20 pb-28 sm:pt-24 sm:pb-36 relative overflow-hidden z-10"
        style={{ background: "transparent" }}
      >
        <div className="relative z-10 text-center mb-16">
          <Reveal>
            {/* Label - Manrope 12px / 500 / 18px */}
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-medium uppercase tracking-widest leading-[18px] mb-4"
              style={{
                background: isDark ? "rgba(0,194,255,0.12)" : "rgba(21,93,252,0.1)",
                border: `1px solid ${theme.accent}35`,
                color: theme.accent,
              }}
            >
              Join the ecosystem
            </span>
            {/* Section Heading (H2) - Manrope 48px / 700 / 60px */}
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-tight leading-[40px] sm:leading-[52px] lg:leading-[60px] mb-4" style={{ color: theme.text }}>
              Partner with{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, #155dfc, #00c2ff, #00d084)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                StepUp For SDG
              </span>
            </h2>
            {/* Body - Manrope 18px / 400 / 30px */}
            <p className="max-w-2xl mx-auto text-[18px] font-normal leading-[30px]" style={{ color: theme.textSub }}>
              Whether you're a school, NGO, company or volunteer — there's a place for you in building a future where every child creates real-world impact.
            </p>
          </Reveal>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {audienceCards.map((card, idx) => {
              const cfg = typeConfig[card.type];
              return (
                <Reveal key={card.title} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="relative overflow-hidden rounded-[24px] p-8 h-full flex flex-col border"
                    style={{
                      background: isDark
                        ? `linear-gradient(145deg, rgba(11,22,48,0.92) 0%, rgba(7,16,31,0.96) 100%)`
                        : `#ffffff`,
                      borderColor: isDark ? "rgba(21, 93, 252, 0.25)" : theme.border,
                      boxShadow: isDark
                        ? `0 16px 40px -12px rgba(4,9,18,0.6)`
                        : `0 8px 30px rgba(0,0,0,0.04)`,
                    }}
                  >
                    {/* watermark background icon */}
                    <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.05]">
                      <cfg.IconEl className="w-32 h-32" style={{ color: cfg.color }} />
                    </div>

                    {/* Card Heading (H4) - Manrope 30px / 600 / 40px */}
                    <div className="relative z-10 mb-4 text-[24px] sm:text-[28px] lg:text-[30px] font-semibold leading-[32px] sm:leading-[36px] lg:leading-[40px]" style={{ color: theme.text }}>
                      {card.title}
                    </div>

                    {/* Body Small - Manrope 16px / 400 / 28px */}
                    <ul className="relative z-10 flex flex-col gap-3 mb-8 flex-1">
                      {card.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[16px] font-normal leading-[28px]" style={{ color: theme.textSub }}>
                          <span
                            className="mt-[4px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{ background: isDark ? "rgba(0,194,255,0.15)" : "rgba(21,93,252,0.08)", border: `1px solid ${isDark ? "#00c2ff40" : "#155dfc30"}` }}
                          >
                            <Icon.Check className="w-3 h-3" style={{ color: isDark ? "#00c2ff" : "#155dfc" }} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Primary Button - Manrope 16px / 600 / 24px */}
                    <motion.a
                      href={card.href}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative z-10 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[16px] font-semibold leading-[24px] tracking-tight text-white shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, #155dfc, #00c2ff)`,
                        boxShadow: "0 4px 16px rgba(21,93,252,0.3)",
                      }}
                    >
                      {card.btnLabel} <Icon.Arrow className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* -- OUR PARTNERSHIP MODELS -- */}
        <div className="relative z-10 max-w-6xl mx-auto mt-12 pt-12 border-t" style={{ borderColor: `${theme.border}70` }}>
          <Reveal>
            <div className="text-left mb-8">
              {/* Sub Heading (H3) - Manrope 36px / 600 / 48px */}
              <h3 className="text-[28px] sm:text-[32px] lg:text-[36px] font-semibold leading-[36px] sm:leading-[42px] lg:leading-[48px]" style={{ color: theme.text }}>
                Our Partnership Models
              </h3>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Sponsorship",
                desc: "Fund SDG workshops and receive CSR compliance reports.",
                icon: "Heart",
              },
              {
                title: "Co-Hosted Programs",
                desc: "Run joint programs designed around your vision and SDG goals.",
                icon: "Users",
              },
              {
                title: "Awareness Campaigns",
                desc: "Create custom advocacy campaigns across partner schools.",
                icon: "Megaphone",
              },
            ].map((model, idx) => (
              <Reveal key={model.title} delay={idx * 0.1}>
                <div
                  className="rounded-[20px] p-7 flex flex-col border h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: isDark ? "rgba(11, 22, 48, 0.75)" : "#ffffff",
                    borderColor: theme.border,
                    boxShadow: isDark ? "0 4px 20px rgba(4,9,18,0.4)" : "0 4px 12px rgba(0,0,0,0.02)",
                  }}
                >
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: isDark ? "rgba(0,194,255,0.12)" : "rgba(21,93,252,0.06)",
                        border: `1px solid ${isDark ? "#00c2ff" : "#155DFC"}30`,
                      }}
                    >
                      {model.icon === "Heart" && (
                        <Icon.Heart className="w-4 h-4" style={{ color: isDark ? "#00c2ff" : "#155DFC" }} />
                      )}
                      {model.icon === "Users" && (
                        <Icon.Users className="w-4 h-4" style={{ color: isDark ? "#00c2ff" : "#155DFC" }} />
                      )}
                      {model.icon === "Megaphone" && (
                        <Icon.Megaphone className="w-4 h-4" style={{ color: isDark ? "#00c2ff" : "#155DFC" }} />
                      )}
                    </span>
                    {/* Small Heading (H5) - Manrope 24px / 600 / 34px */}
                    <h4 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold leading-[28px] sm:leading-[30px] lg:leading-[34px]" style={{ color: theme.text }}>
                      {model.title}
                    </h4>
                  </div>
                  {/* Body Small - Manrope 16px / 400 / 28px */}
                  <p className="text-[16px] font-normal leading-[28px] text-left flex-1" style={{ color: theme.textSub }}>
                    {model.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Centered Work With Us CTA button - Manrope 16px / 600 / 24px */}
          <Reveal delay={0.3}>
            <div className="flex justify-center mt-12 mb-8 sm:mb-12">
              <a
                href="mailto:partners@stepupsdg.in"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[16px] font-semibold leading-[24px] tracking-tight text-white transition hover:scale-[1.03] active:scale-[0.98] shadow-md"
                style={{
                  background: `linear-gradient(135deg, #155dfc, #00c2ff)`,
                  boxShadow: "0 8px 24px rgba(21,93,252,0.35)",
                }}
              >
                Work with us <Icon.Arrow className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <PartnerModal
            partner={selectedPartner}
            onClose={() => setSelected(null)}
            theme={theme}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
}