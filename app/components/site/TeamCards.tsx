"use client";

import Image from "next/image";

const team = [
  {
    name: "Eswar Vardhan",
    role: "Co-Founder & Head of Operations",
    src: "/team/eswar.png",
    bio: "Building sustainable educational programs through strategic operations, efficient execution, and strong collaboration with schools, NGOs, and partners.",
    tags: ["Operations • Leadership", "Partnerships • Execution"],
    linkedin: "https://www.linkedin.com/in/eswarvardhan/",
  },
  {
    name: "Vijay Vedantam",
    role: "Financial Advisor & Strategic Advisor",
    src: "/team/vijay.png",
    bio: "Guiding the organization's long-term vision through strategic planning, innovation, and partnerships that strengthen educational impact and sustainable growth.",
    tags: ["Strategy • Innovation", "Mentorship • Partnerships"],
    linkedin: "https://www.linkedin.com/in/vijayvedantam/",
  },
  {
    name: "Pavan Tarak",
    role: "Co-Founder & Head of Execution",
    src: "/team/pavan.png",
    bio: "Driving project execution by transforming ideas into impactful educational initiatives through teamwork, coordination, and community engagement.",
    tags: ["Execution • Leadership", "Projects • Community Impact"],
    linkedin: "https://www.linkedin.com/in/pavantarak/",
  },
];

type Member = (typeof team)[number];

function TeamCard({ member }: { member: Member }) {
  return (
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-2xl flex flex-col items-center justify-center text-center p-6 hover:opacity-80 transition-opacity cursor-pointer"
      style={{ height: "280px" }}
    >
      <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white">
        <Image
          src={member.src}
          alt={member.name}
          width={160}
          height={160}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <h4 className="mt-4 text-lg font-semibold">{member.name}</h4>
      <p className="text-sm text-muted-text">{member.role}</p>
    </a>
  );
}

export function TeamCards() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {team.map((member) => (
        <TeamCard key={member.name} member={member} />
      ))}
    </div>
  );
}