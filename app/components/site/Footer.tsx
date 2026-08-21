"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hideFundsAndContact } from "@/app/lib/siteFlags";

type FooterLinkItem = {
  href: string;
  label: string;
  ariaLabel: string;
};

type SocialLinkItem = {
  href: string;
  label: string;
  ariaLabel: string;
  icon: ReactNode;
};

const quickLinks: FooterLinkItem[] = [
  { href: "/", label: "Home", ariaLabel: "Go to the home page" },
  { href: "/about", label: "About Us", ariaLabel: "Go to the about page" },
  { href: "/impact", label: "Impact", ariaLabel: "Go to the impact page" },
  { href: "/projects", label: "Projects", ariaLabel: "Go to the projects page" },
  { href: "/sdg", label: "SDG", ariaLabel: "Go to the SDG page" },
  {
    href: "/partners",
    label: "Partners",
    ariaLabel: "Go to the partners page",
  },
  { href: "/contact", label: "Contact", ariaLabel: "Go to the contact page" },
];

const whoWeServeLinks: FooterLinkItem[] = [
  {
    href: "/get-involved/sponsor",
    label: "Companies",
    ariaLabel: "Open the corporate CSR form",
  },
  {
    href: "/get-involved/school",
    label: "Schools",
    ariaLabel: "Open the school registration form",
  },
  {
    href: "/get-involved/ngo-partner",
    label: "NGOs",
    ariaLabel: "Open the NGO partner form",
  },
  {
    href: "/get-involved/volunteer",
    label: "Volunteers",
    ariaLabel: "Open the volunteer registration form",
  },
  {
    href: "/get-involved/school",
    label: "Universities",
    ariaLabel: "Open the school or university registration form",
  },
  {
    href: "/get-involved/school",
    label: "Colleges",
    ariaLabel: "Open the school or college registration form",
  },
];

const socialLinks: SocialLinkItem[] = [
  {
    href: "https://www.linkedin.com/company/stepup-for-sdg/posts/?feedView=all",
    label: "LinkedIn",
    ariaLabel: "Visit LinkedIn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/stepup_for_sdg/?hl=en",
    label: "Instagram",
    ariaLabel: "Visit Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

const contactDetails = [
  {
    type: "Email",
    label: "info@stepupforsdg.org",
    href: "mailto:info@stepupforsdg.org",
    ariaLabel: "Send an email to info",
  },
  {
    type: "Phone",
    label: "+91 83410 11206",
    href: "tel:+918341011206",
    ariaLabel: "Call the StepUp for SDG team",
  },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className="relative mt-0"
      style={{
        background: "linear-gradient(180deg, #0a0f1e 0%, #020814 100%)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-4">
        <div className="flex flex-col items-start gap-6">
          <Link
            href="/"
            aria-label="Go to the home page"
            className="inline-block -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020814]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-full overflow-hidden bg-white">
              <img
                src="/assets/SDG_LOGO-removebg-preview.png"
                alt="StepUp for SDG"
                className="h-full w-full object-contain [filter:none] opacity-100 [mix-blend-mode:normal]"
              />
            </span>
          </Link>
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: "#94a3b8" }}
          >
            Educating students on the UN Sustainable Development Goals,
            empowering them to adopt sustainable lifestyles, make informed
            choices, explore meaningful careers, and drive positive change in
            their families and communities.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ href, ariaLabel, icon, label }, index) => (
              <a
                key={`${label}-${index}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className="h-10 w-10 grid place-items-center rounded-full transition-all duration-300 cursor-pointer hover:text-[#00D4FF] hover:border-[#00D4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020814]"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#94a3b8",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4
            className="text-sm font-bold uppercase tracking-[0.15em] mb-5"
            style={{ color: "#f1f5f9" }}
          >
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-label={item.ariaLabel}
                    aria-current={isActive ? "page" : undefined}
                    className={`block cursor-pointer hover:text-[#00D4FF] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020814] ${isActive ? "text-[#00D4FF] font-semibold" : ""}`}
                    style={{ color: isActive ? "#00D4FF" : "#94a3b8" }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4
            className="text-sm font-bold uppercase tracking-[0.15em] mb-5"
            style={{ color: "#f1f5f9" }}
          >
            Who We Serve
          </h4>
          <ul className="space-y-3 text-sm">
            {whoWeServeLinks.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={`${item.label}-${index}`}>
                  <Link
                    href={item.href}
                    aria-label={item.ariaLabel}
                    aria-current={isActive ? "page" : undefined}
                    className={`block cursor-pointer hover:text-[#00D4FF] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020814] ${isActive ? "text-[#00D4FF] font-semibold" : ""}`}
                    style={{ color: isActive ? "#00D4FF" : "#94a3b8" }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4
            className="text-sm font-bold uppercase tracking-[0.15em] mb-5"
            style={{ color: "#f1f5f9" }}
          >
            Contact
          </h4>
          <div
            className="flex flex-col gap-3 text-sm"
            style={{ color: "#94a3b8" }}
          >
            {contactDetails.map((item, index) => (
              <div
                key={`${item.type}-${index}`}
                className="flex flex-col gap-1"
              >
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#f1f5f9" }}
                >
                  {item.type}:
                </span>
                <a
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className="cursor-pointer hover:text-[#00D4FF] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020814]"
                  style={{ color: "#94a3b8" }}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="py-5 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: "#94a3b8" }}
        >
          <span>
            Pavdhan Foundation © {new Date().getFullYear()}. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
