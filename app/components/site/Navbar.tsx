"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", disabled: false },
  { to: "/about", label: "About Us", disabled: false },
  { to: "/impact", label: "Impact", disabled: false },
  { to: "/projects", label: "Projects", disabled: false },
  { to: "/sdg", label: "SDG", disabled: false },
  { to: "/partners", label: "Partners", disabled: false },
  { to: "/contact", label: "Contact", disabled: false },
] as const;

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "as", label: "Assamese (অসমীয়া)" },
  { code: "bn", label: "Bengali (বাংলা)" },
  { code: "gu", label: "Gujarati (ગુજરાતી)" },
  { code: "hi", label: "Hindi (हिन्दी)" },
  { code: "kn", label: "Kannada (ಕನ್ನಡ)" },
  { code: "mai", label: "Maithili (मैथिली)" },
  { code: "ml", label: "Malayalam (മലയാളം)" },
  { code: "mni-Mtei", label: "Manipuri (মণিপুরী)" },
  { code: "mr", label: "Marathi (मराठी)" },
  { code: "ne", label: "Nepali (नेपाली)" },
  { code: "or", label: "Odia (ଓଡ଼ିଆ)" },
  { code: "pa", label: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "sa", label: "Sanskrit (संस्कृत)" },
  { code: "sd", label: "Sindhi (سنڌي)" },
  { code: "si", label: "Sinhala (සිංහල)" },
  { code: "ta", label: "Tamil (தமிழ்)" },
  { code: "te", label: "Telugu (తెలుగు)" },
  { code: "ur", label: "Urdu (اردو)" },
];

function readGoogleTranslateLanguage() {
  const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
  const code = match ? match[1] : "en";
  return LANGUAGES.find((l) => l.code === code);
}

function writeGoogleTranslateCookie(value: string) {
  document.cookie = value;
}

function LanguageSelect() {
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Read active language from cookie on mount
  useEffect(() => {
    const found = readGoogleTranslateLanguage();
    if (!found) return;

    const timeout = window.setTimeout(() => setSelected(found), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSelect(lang: (typeof LANGUAGES)[0]) {
    setSelected(lang);
    setOpen(false);
    if (lang.code === "en") {
      writeGoogleTranslateCookie(
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      );
      writeGoogleTranslateCookie(
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=." +
        location.hostname +
        "; path=/;"
      );
    } else {
      writeGoogleTranslateCookie("googtrans=/en/" + lang.code + "; path=/;");
      writeGoogleTranslateCookie(
        "googtrans=/en/" +
        lang.code +
        "; domain=." +
        location.hostname +
        "; path=/;"
      );
    }
    location.reload();
  }

  const shortLabel =
    selected.code === "en" ? "English" : selected.label.split(" ")[0];

  return (
    <div
      ref={ref}
      className="relative notranslate"
      data-no-translate
      translate="no"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[#E2E8F0] bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-[#0F172A] transition hover:border-[#155DFC]"
      >
        <Globe className="h-3.5 w-3.5 shrink-0" />
        <span className="max-w-[80px] truncate">{shortLabel}</span>
        <ChevronDown
          className={`h-3 w-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[#E2E8F0] bg-white shadow-lg z-50 overflow-y-auto max-h-80">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l)}
              className={`w-full px-4 py-2 text-left text-xs font-medium hover:bg-[#F8FAFC] transition ${
                selected.code === l.code ? "text-[#155DFC]" : "text-[#0F172A]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white border-b border-[#E2E8F0]">
      <div className="flex h-24 w-full items-center justify-between px-32 lg:px-44">
        <Link href="/" className="shrink-0 flex items-center group">
          <span className="inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm border border-[#E2E8F0]">
            <img
              src="/assets/SDG_LOGO-removebg-preview.png"
              alt="StepUp for SDG"
              className="h-full w-full object-contain"
            />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 xl:gap-8">
          {navLinks.map((l) =>
            l.disabled ? (
              <span
                key={l.to}
                className="text-base font-semibold text-[#475569] cursor-default select-none whitespace-nowrap"
              >
                {l.label}
              </span>
            ) : (
              <Link
                key={l.to}
                href={l.to}
                className={`text-base font-semibold whitespace-nowrap transition-colors ${
                  (l.to === "/" ? pathname === "/" : pathname.startsWith(l.to))
                    ? "text-[#155DFC]"
                    : "text-[#0F172A]/80 hover:text-[#0F172A]"
                }`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <LanguageSelect />
          <Link
            href="/funds"
            className="inline-flex items-center whitespace-nowrap rounded-full bg-[#155DFC] px-5 py-2.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(21,93,252,0.45)] hover:brightness-110 transition"
          >
            Funds
          </Link>
          <Link
            href="/work-with-us"
            className="inline-flex items-center whitespace-nowrap rounded-full bg-[#E86A00] px-5 py-2.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(232,106,0,0.45)] hover:brightness-110 transition"
          >
            Work With Us
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSelect />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white/95 px-6 py-4 space-y-3">
          {navLinks.map((l) =>
            l.disabled ? (
              <span
                key={l.to}
                className="block text-[#475569] cursor-default select-none"
              >
                {l.label}
              </span>
            ) : (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setMobileOpen(false)}
                className={`block transition-colors ${
                  (l.to === "/" ? pathname === "/" : pathname.startsWith(l.to))
                    ? "text-[#155DFC]"
                    : "text-[#475569] hover:text-[#0F172A]"
                }`}
              >
                {l.label}
              </Link>
            ),
          )}
        </div>
      )}
    </header>
  );
}
