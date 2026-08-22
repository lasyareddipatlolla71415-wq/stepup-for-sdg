import {
  GraduationCap,
  School,
  HeartHandshake,
  Handshake,
  Users2,
  Building2,
  BookOpen,
  Presentation,
  Award,
  Monitor,
  ClipboardList,
  Clock,
  UsersRound,
  CalendarCheck,
  Briefcase,
  Megaphone,
  Home,
  MapPin,
  Laptop2,
  Droplets,
  Trash2,
  Leaf,
  Star,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------- */
/* Hero (unchanged — still referenced by ImpactHero.tsx)                */
/* -------------------------------------------------------------------- */

export const heroStat = { value: 96000, suffix: "+", label: "Learning resources shared" };

/* -------------------------------------------------------------------- */
/* Impact by Category                                                   */
/* -------------------------------------------------------------------- */

export type CategoryStat = { icon: LucideIcon; value: number; suffix: string; label: string };

export type ImpactCategory = {
  icon: LucideIcon;
  title: string;
  accent: string;
  stats: CategoryStat[];
};

export const impactCategories: ImpactCategory[] = [
  {
    icon: GraduationCap,
    title: "Student Impact",
    accent: "var(--electric)",
    stats: [
      { icon: Users2, value: 95000, suffix: "+", label: "Students Benefited" },
      { icon: BookOpen, value: 12500, suffix: "+", label: "Learning Resources Distributed" },
      { icon: Presentation, value: 4800, suffix: "+", label: "Students Trained" },
      { icon: Award, value: 3200, suffix: "+", label: "Certifications Issued" },
    ],
  },
  {
    icon: School,
    title: "School Impact",
    accent: "var(--leaf)",
    stats: [
      { icon: Building2, value: 450, suffix: "+", label: "Schools Supported" },
      { icon: Presentation, value: 1200, suffix: "+", label: "Teachers Trained" },
      { icon: Monitor, value: 280, suffix: "+", label: "Digital Classrooms" },
      { icon: ClipboardList, value: 950, suffix: "+", label: "School Programs Conducted" },
    ],
  },
  {
    icon: HeartHandshake,
    title: "Volunteer Impact",
    accent: "var(--cyan-glow)",
    stats: [
      { icon: Users2, value: 8500, suffix: "+", label: "Active Volunteers" },
      { icon: Clock, value: 25000, suffix: "+", label: "Volunteer Hours" },
      { icon: UsersRound, value: 950, suffix: "+", label: "Mentoring Sessions" },
      { icon: CalendarCheck, value: 600, suffix: "+", label: "Events Supported" },
    ],
  },
  {
    icon: Handshake,
    title: "NGO Impact",
    accent: "var(--gold)",
    stats: [
      { icon: Handshake, value: 120, suffix: "+", label: "NGO Partners" },
      { icon: Briefcase, value: 350, suffix: "+", label: "Joint Projects" },
      { icon: Megaphone, value: 90, suffix: "+", label: "Awareness Campaigns" },
      { icon: Users2, value: 180, suffix: "+", label: "Communities Reached" },
    ],
  },
  {
    icon: Users2,
    title: "Community Impact",
    accent: "var(--teal)",
    stats: [
      { icon: Users2, value: 250, suffix: "+", label: "Communities Served" },
      { icon: Home, value: 15000, suffix: "+", label: "Families Benefited" },
      { icon: Presentation, value: 500, suffix: "+", label: "Workshops Conducted" },
      { icon: MapPin, value: 100, suffix: "+", label: "Villages Reached" },
    ],
  },
  {
    icon: Building2,
    title: "Corporate Impact",
    accent: "var(--cta)",
    stats: [
      { icon: Building2, value: 75, suffix: "+", label: "Corporate Partners" },
      { icon: Handshake, value: 180, suffix: "+", label: "CSR Initiatives" },
      { icon: School, value: 150, suffix: "+", label: "Schools Sponsored" },
      { icon: Laptop2, value: 300, suffix: "+", label: "Technology Donations" },
    ],
  },
];

/* -------------------------------------------------------------------- */
/* Global impact banner                                                  */
/* -------------------------------------------------------------------- */

/* -------------------------------------------------------------------- */
/* Projects Impact (4 flagship programmes)                              */
/* -------------------------------------------------------------------- */

export type ProjectActivity = { label: string; indent?: boolean };

export type ProjectStat = {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
};

export type ImpactProject = {
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  accent: string;
  activities: ProjectActivity[];
  stats: ProjectStat[];
};

export const impactProjects: ImpactProject[] = [
  {
    number: "01",
    title: "Teaching SDG",
    image: "/assets/images/1.jpeg",
    imageAlt: "Students being taught about the Sustainable Development Goals",
    accent: "var(--electric)",
    activities: [
      { label: "Certification" },
      { label: "Schools" },
      { label: "Educating Students on the SDG", indent: true },
      { label: "Stationery Distribution" },
      { label: "Compass Box Distribution", indent: true },
      { label: "Plantation" },
    ],
    stats: [
      { icon: Building2,     value: 150,   suffix: "+",  label: "Schools Reached" },
      { icon: GraduationCap, value: 18500, suffix: "+",  label: "Students Educated" },
      { icon: Users2,        value: 320,   suffix: "+",  label: "SDG Workshops" },
      { icon: Award,         value: 12000, suffix: "+",  label: "Certificates Issued" },
    ],
  },
  {
    number: "02",
    title: "Water Harvesting",
    image: "/assets/images/2.jpeg",
    imageAlt: "Students at a rainwater harvesting system",
    accent: "var(--cyan-glow)",
    activities: [
      { label: "Rainwater Harvesting Awareness" },
      { label: "School Water Harvesting Initiatives" },
      { label: "Water Conservation Programs" },
      { label: "Sustainable Water Management" },
    ],
    stats: [
      { icon: Megaphone, value: 125,   suffix: "+",  label: "Awareness Sessions" },
      { icon: School,    value: 60,    suffix: "+",  label: "Schools Involved" },
      { icon: Droplets,  value: 40,    suffix: "+",  label: "Harvesting Systems" },
      { icon: Users2,    value: 50000, suffix: "+",  label: "Students Benefited" },
    ],
  },
  {
    number: "03",
    title: "Community Clean Drive",
    image: "/assets/images/3.jpeg",
    imageAlt: "Volunteers conducting a community clean drive",
    accent: "var(--leaf)",
    activities: [
      { label: "Community Cleanliness Campaigns" },
      { label: "Waste Collection Drives" },
      { label: "Environmental Awareness Programs" },
      { label: "Volunteer Engagement Activities" },
    ],
    stats: [
      { icon: Trash2,    value: 200,   suffix: "+",      label: "Clean Drives" },
      { icon: UsersRound,value: 15000, suffix: "+",      label: "Volunteers Engaged" },
      { icon: MapPin,    value: 100,   suffix: "+",      label: "Communities Covered" },
      { icon: Leaf,      value: 30,    suffix: " Tons+", label: "Waste Collected" },
    ],
  },
  {
    number: "04",
    title: "Different Career Exposure",
    image: "/assets/images/WhatsApp%20Image%202026-07-20%20at%209.30.49%20PM.jpeg",
    imageAlt: "Career guidance session with students and industry experts",
    imagePosition: "center center",
    accent: "var(--gold)",
    activities: [
      { label: "Career Guidance Sessions" },
      { label: "Industry Expert Talks" },
      { label: "Skill Development Workshops" },
      { label: "Corporate Exposure Programs" },
      { label: "Career Awareness Programs" },
    ],
    stats: [
      { icon: Briefcase,     value: 250,   suffix: "+", label: "Career Sessions" },
      { icon: HeartHandshake,value: 20,    suffix: "+", label: "Industry Experts" },
      { icon: GraduationCap, value: 10000, suffix: "+", label: "Students Reached" },
      { icon: Star,          value: 95,    suffix: "%", label: "Positive Feedback" },
    ],
  },
];

/* -------------------------------------------------------------------- */
export const globalImpact = {
  value: 100000,
  suffix: "+",
  label: "Lives Positively Impacted",
  desc: "Every category above adds up to one connected movement — students, schools, volunteers, NGOs, communities and companies, working as one.",
};
