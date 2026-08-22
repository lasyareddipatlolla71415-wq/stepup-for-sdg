"use client";

import { FormEvent, useState } from "react";

import {
  CheckCircle,
  Mail,
  MessageCircle,
  Phone,
  Send,
  User,
} from "lucide-react";

import { addContactMessage } from "@/app/lib/adminStore";

import {
  Manrope,
  Cormorant_Garamond,
} from "next/font/google";


/* =========================================================
   FONTS
========================================================= */

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});


/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {

  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });


  /* =======================================================
     NEWSLETTER FORM
  ======================================================= */

  const [newsletterForm, setNewsletterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });


  /* =======================================================
     SUBMISSION STATES
  ======================================================= */

  const [contactSubmitted, setContactSubmitted] =
    useState(false);

  const [newsletterSubmitted, setNewsletterSubmitted] =
    useState(false);


  /* =======================================================
     CONTACT SUBMIT
  ======================================================= */

  function handleContactSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    addContactMessage({
      from: contactForm.name,
      email: contactForm.email,
      phone: contactForm.phone,
      subject: "Contact Enquiry",
      body: contactForm.message,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: "Today",
      tag: "Contact",
    });

    setContactSubmitted(true);
  }


  /* =======================================================
     NEWSLETTER SUBMIT
  ======================================================= */

  function handleNewsletterSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setNewsletterSubmitted(true);
  }


  return (
    <main
      className={`${manrope.className} min-h-screen bg-[#F8F5E9] text-[#12372A]`}
    >

      {/* =====================================================
          CONTACT IMAGE
      ===================================================== */}

      <section className="relative -mt-1 w-full overflow-hidden">

        <div className="relative w-full">

          <img
            src="/assets/images/contact-banner.png"
            alt="Get in touch for sustainable development"
            className="
              block
              h-[190px]
              w-full
              object-cover
              object-center
              sm:h-[220px]
              lg:h-[250px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-10
              bg-gradient-to-b
              from-[#F8F5E9]
              to-transparent
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-16
              bg-gradient-to-t
              from-[#F8F5E9]
              to-transparent
            "
          />

        </div>

      </section>


      {/* =====================================================
          CONTACT + NEWSLETTER
      ===================================================== */}

      <section
        className="
          px-6
          pb-14
          pt-10
          sm:px-10
          lg:px-14
          lg:pb-20
          lg:pt-12
        "
      >

        <div className="mx-auto max-w-7xl">

          <div
            className="
              grid
              lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)]
            "
          >

            {/* =================================================
                CONTACT — LEFT SIDE
            ================================================= */}

            <div className="lg:pr-14">

              <div className="mb-7">

                {/* LABEL — Manrope 12 / 18 / 500 */}

                <p
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                    text-[12px]
                    font-medium
                    leading-[18px]
                    uppercase
                    tracking-[0.28em]
                    text-[#16865F]
                  "
                >
                  <span className="text-sm">
                    🌱
                  </span>

                  START A CONVERSATION
                </p>


                {/* H2 — Manrope 48 / 60 / 700 */}

                <h2
                  className="
                    text-[48px]
                    font-bold
                    leading-[60px]
                    text-[#12372A]
                  "
                >
                  Let&apos;s create
                  <br />
                  meaningful change.
                </h2>


                {/* BODY — Manrope 18 / 30 / 400 */}

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-[18px]
                    font-normal
                    leading-[30px]
                    text-[#527568]
                  "
                >
                  Tell us how you would like to contribute,
                  collaborate or support sustainable development.
                </p>

              </div>


              {/* =================================================
                  CONTACT SUCCESS
              ================================================= */}

              {contactSubmitted ? (

                <div className="flex min-h-[300px] items-center justify-center">

                  <div className="text-center">

                    <div
                      className="
                        mx-auto
                        mb-5
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-[#DDEFE7]
                      "
                    >
                      <CheckCircle
                        className="h-7 w-7 text-[#16865F]"
                      />
                    </div>


                    {/* H3 — Manrope 36 / 48 / 600 */}

                    <h3
                      className="
                        text-[36px]
                        font-semibold
                        leading-[48px]
                        text-[#12372A]
                      "
                    >
                      Thank you!
                    </h3>


                    {/* BODY — Manrope 18 / 30 / 400 */}

                    <p
                      className="
                        mt-2
                        text-[18px]
                        font-normal
                        leading-[30px]
                        text-[#527568]
                      "
                    >
                      Your message has been received.
                    </p>

                    <p
                      className="
                        mt-1
                        text-[18px]
                        font-normal
                        leading-[30px]
                        text-[#527568]
                      "
                    >
                      We&apos;ll get back to you soon.
                    </p>

                  </div>

                </div>

              ) : (

                /* =================================================
                   CONTACT FORM
                ================================================= */

                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-5"
                >

                  {/* NAME + PHONE */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* NAME */}

                    <label className="block">

                      <span
                        className="
                          mb-2
                          flex
                          items-center
                          gap-2
                          text-[12px]
                          font-medium
                          leading-[18px]
                          uppercase
                          tracking-[0.2em]
                          text-[#527568]
                        "
                      >

                        <User className="h-3.5 w-3.5" />

                        NAME

                      </span>


                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm((current) => ({
                            ...current,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Your name"
                        required
                        className="
                          w-full
                          border-0
                          border-b
                          border-[#BFD5C8]
                          bg-transparent
                          px-0
                          py-3
                          text-[16px]
                          font-normal
                          leading-[28px]
                          text-[#12372A]
                          outline-none
                          transition
                          placeholder:text-[#9BAFA4]
                          focus:border-[#16865F]
                        "
                      />

                    </label>


                    {/* PHONE */}

                    <label className="block">

                      <span
                        className="
                          mb-2
                          flex
                          items-center
                          gap-2
                          text-[12px]
                          font-medium
                          leading-[18px]
                          uppercase
                          tracking-[0.2em]
                          text-[#527568]
                        "
                      >

                        <Phone className="h-3.5 w-3.5" />

                        PHONE

                      </span>


                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) =>
                          setContactForm((current) => ({
                            ...current,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="Your number"
                        required
                        className="
                          w-full
                          border-0
                          border-b
                          border-[#BFD5C8]
                          bg-transparent
                          px-0
                          py-3
                          text-[16px]
                          font-normal
                          leading-[28px]
                          text-[#12372A]
                          outline-none
                          transition
                          placeholder:text-[#9BAFA4]
                          focus:border-[#16865F]
                        "
                      />

                    </label>

                  </div>


                  {/* EMAIL */}

                  <label className="block">

                    <span
                      className="
                        mb-2
                        flex
                        items-center
                        gap-2
                        text-[12px]
                        font-medium
                        leading-[18px]
                        uppercase
                        tracking-[0.2em]
                        text-[#527568]
                      "
                    >

                      <Mail className="h-3.5 w-3.5" />

                      EMAIL ADDRESS

                    </span>


                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((current) => ({
                          ...current,
                          email: e.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      required
                      className="
                        w-full
                        border-0
                        border-b
                        border-[#BFD5C8]
                        bg-transparent
                        px-0
                        py-3
                        text-[16px]
                        font-normal
                        leading-[28px]
                        text-[#12372A]
                        outline-none
                        transition
                        placeholder:text-[#9BAFA4]
                        focus:border-[#16865F]
                      "
                    />

                  </label>


                  {/* MESSAGE */}

                  <label className="block">

                    <span
                      className="
                        mb-2
                        flex
                        items-center
                        gap-2
                        text-[12px]
                        font-medium
                        leading-[18px]
                        uppercase
                        tracking-[0.2em]
                        text-[#527568]
                      "
                    >

                      <MessageCircle className="h-3.5 w-3.5" />

                      YOUR MESSAGE

                    </span>


                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((current) => ({
                          ...current,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Tell us about your idea, question or opportunity..."
                      required
                      className="
                        w-full
                        resize-none
                        border-0
                        border-b
                        border-[#BFD5C8]
                        bg-transparent
                        px-0
                        py-3
                        text-[16px]
                        font-normal
                        leading-[28px]
                        text-[#12372A]
                        outline-none
                        placeholder:text-[#9BAFA4]
                        transition
                        focus:border-[#16865F]
                      "
                    />

                  </label>


                  {/* PRIMARY BUTTON — Manrope 16 / 24 / 600 */}

                  <button
                    type="submit"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      bg-[#12372A]
                      px-7
                      py-3.5
                      text-[16px]
                      font-semibold
                      leading-[24px]
                      text-white
                      transition
                      hover:-translate-y-0.5
                      hover:bg-[#16865F]
                    "
                  >

                    Send Message

                    <Send
                      className="
                        h-4
                        w-4
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />

                  </button>

                </form>

              )}

            </div>


            {/* =================================================
                MIDDLE LINE
            ================================================= */}

            <div
              className="
                hidden
                bg-[#CFE0D7]
                lg:block
              "
            />


            {/* =================================================
                NEWSLETTER — RIGHT SIDE
            ================================================= */}

            <div
              className="
                mt-14
                border-t
                border-[#D5E2DB]
                pt-12
                lg:mt-0
                lg:border-t-0
                lg:pl-14
                lg:pt-0
              "
            >

              <div className="mb-7">

                {/* LABEL — Manrope 12 / 18 / 500 */}

                <p
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                    text-[12px]
                    font-medium
                    leading-[18px]
                    uppercase
                    tracking-[0.28em]
                    text-[#16865F]
                  "
                >

                  <span className="text-sm">
                    🌍
                  </span>

                  STAY CONNECTED

                </p>


                {/* H2 — Manrope 48 / 60 / 700 */}

                <h2
                  className="
                    text-[48px]
                    font-bold
                    leading-[60px]
                    text-[#12372A]
                  "
                >
                  Subscribe to our
                  <br />
                  newsletter.
                </h2>


                {/* BODY — Manrope 18 / 30 / 400 */}

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-[18px]
                    font-normal
                    leading-[30px]
                    text-[#527568]
                  "
                >
                  Stay connected with our work, opportunities,
                  stories and initiatives for sustainable
                  development.
                </p>

              </div>


              {/* =================================================
                  NEWSLETTER SUCCESS
              ================================================= */}

              {newsletterSubmitted ? (

                <div className="flex min-h-[300px] items-center justify-center">

                  <div className="text-center">

                    <div
                      className="
                        mx-auto
                        mb-5
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-[#DDEFE7]
                      "
                    >

                      <CheckCircle
                        className="h-7 w-7 text-[#16865F]"
                      />

                    </div>


                    {/* H3 — Manrope 36 / 48 / 600 */}

                    <h3
                      className="
                        text-[36px]
                        font-semibold
                        leading-[48px]
                        text-[#12372A]
                      "
                    >
                      You&apos;re connected!
                    </h3>


                    {/* BODY — Manrope 18 / 30 / 400 */}

                    <p
                      className="
                        mt-2
                        text-[18px]
                        font-normal
                        leading-[30px]
                        text-[#527568]
                      "
                    >
                      Thank you for joining our journey.
                    </p>

                  </div>

                </div>

              ) : (

                /* =================================================
                   NEWSLETTER FORM
                ================================================= */

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="space-y-5"
                >

                  {/* FIRST NAME + LAST NAME */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* FIRST NAME */}

                    <label className="block">

                      <span
                        className="
                          mb-2
                          block
                          text-[12px]
                          font-medium
                          leading-[18px]
                          uppercase
                          tracking-[0.2em]
                          text-[#527568]
                        "
                      >
                        FIRST NAME
                      </span>


                      <input
                        type="text"
                        value={newsletterForm.firstName}
                        onChange={(e) =>
                          setNewsletterForm((current) => ({
                            ...current,
                            firstName: e.target.value,
                          }))
                        }
                        placeholder="First name"
                        required
                        className="
                          w-full
                          border-0
                          border-b
                          border-[#BFD5C8]
                          bg-transparent
                          px-0
                          py-3
                          text-[16px]
                          font-normal
                          leading-[28px]
                          text-[#12372A]
                          outline-none
                          transition
                          placeholder:text-[#9BAFA4]
                          focus:border-[#16865F]
                        "
                      />

                    </label>


                    {/* LAST NAME */}

                    <label className="block">

                      <span
                        className="
                          mb-2
                          block
                          text-[12px]
                          font-medium
                          leading-[18px]
                          uppercase
                          tracking-[0.2em]
                          text-[#527568]
                        "
                      >
                        LAST NAME
                      </span>


                      <input
                        type="text"
                        value={newsletterForm.lastName}
                        onChange={(e) =>
                          setNewsletterForm((current) => ({
                            ...current,
                            lastName: e.target.value,
                          }))
                        }
                        placeholder="Last name"
                        required
                        className="
                          w-full
                          border-0
                          border-b
                          border-[#BFD5C8]
                          bg-transparent
                          px-0
                          py-3
                          text-[16px]
                          font-normal
                          leading-[28px]
                          text-[#12372A]
                          outline-none
                          transition
                          placeholder:text-[#9BAFA4]
                          focus:border-[#16865F]
                        "
                      />

                    </label>

                  </div>


                  {/* EMAIL */}

                  <label className="block">

                    <span
                      className="
                        mb-2
                        flex
                        items-center
                        gap-2
                        text-[12px]
                        font-medium
                        leading-[18px]
                        uppercase
                        tracking-[0.2em]
                        text-[#527568]
                      "
                    >

                      <Mail className="h-3.5 w-3.5" />

                      EMAIL ADDRESS

                    </span>


                    <input
                      type="email"
                      value={newsletterForm.email}
                      onChange={(e) =>
                        setNewsletterForm((current) => ({
                          ...current,
                          email: e.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      required
                      className="
                        w-full
                        border-0
                        border-b
                        border-[#BFD5C8]
                        bg-transparent
                        px-0
                        py-3
                        text-[16px]
                        font-normal
                        leading-[28px]
                        text-[#12372A]
                        outline-none
                        transition
                        placeholder:text-[#9BAFA4]
                        focus:border-[#16865F]
                      "
                    />

                  </label>


                  {/* BUTTON — Manrope 16 / 24 / 600 */}

                  <button
                    type="submit"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      bg-[#16865F]
                      px-7
                      py-3.5
                      text-[16px]
                      font-semibold
                      leading-[24px]
                      text-white
                      transition
                      hover:-translate-y-0.5
                      hover:bg-[#12372A]
                    "
                  >

                    Subscribe

                    <Send
                      className="
                        h-4
                        w-4
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />

                  </button>

                </form>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT INFORMATION STRIP
      ===================================================== */}

      <section className="bg-[#F8F5E9]">

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-center
            px-6
            py-3
            text-center
          "
        >

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              text-[14px]
              font-normal
              leading-[22px]
              text-[#527568]
            "
          >

            <a
              href="mailto:contact@stepupforsdg.org"
              className="px-4 transition-colors hover:text-[#16865F]"
            >
              ✉ contact@stepupforsdg.org
            </a>

            <span className="h-3 w-px bg-[#BFD5C8]" />

            <a
              href="mailto:info@stepupforsdg.org"
              className="px-4 transition-colors hover:text-[#16865F]"
            >
              ✉ info@stepupforsdg.org
            </a>

            <span className="h-3 w-px bg-[#BFD5C8]" />

            <a
              href="mailto:partner@stepupforsdg.org"
              className="px-4 transition-colors hover:text-[#16865F]"
            >
              ✉ partner@stepupforsdg.org
            </a>

          </div>


          <p
            className="
              mt-1
              text-[14px]
              font-normal
              leading-[22px]
              text-[#78939A]
            "
          >
            © 2026 Pushkar Foundation • Empowering Students through the
            Sustainable Development Goals
          </p>

        </div>

      </section>


    </main>
  );
}