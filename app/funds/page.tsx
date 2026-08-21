'use client'

import Image from 'next/image'
import { useEffect, useState, type FormEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import {
  BadgeCheck,
  BookOpen,
  Check,
  CreditCard,
  Heart,
  HeartHandshake,
  Landmark,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Smartphone,
  X,
} from 'lucide-react'
import { addDonation } from '@/app/lib/adminStore'

const currencySymbol = '\u20B9'
const rightArrow = '\u2192'
const checkMark = '\u2713'

const presetAmounts = [500, 1000, 2500, 5000]
const featuredVideoId = 'BMgAM-PG0_I'

const communityProfiles = [
  '/team/pavan.png',
  '/team/vijay.png',
  '/team/eswar.png',
]

const contactItems = [
  {
    label: 'General Enquiry',
    email: 'contact@stepupforsdg.org',
  },
  {
    label: 'Information',
    email: 'info@stepupforsdg.org',
  },
  {
    label: 'Partnerships',
    email: 'partner@stepupforsdg.org',
  },
]

const newsletterBenefits = [
  'We respect your privacy.',
  'No spam.',
  'Unsubscribe anytime.',
]

/* =========================================================
   DESIGN SYSTEM
   ========================================================= */

const inputClass =
  'type-body-small w-full rounded-2xl border border-[#D7E0EA] bg-white px-4 py-3.5 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10'

const paymentInputClass =
  'type-body-small w-full rounded-xl border border-[#D7E0EA] bg-[#F8FAFC] px-3.5 py-3 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10'

const labelClass =
  'type-label mb-2 block uppercase tracking-[0.18em] text-[#64748B]'

/* =========================================================
   DONATION STORY
   ========================================================= */

const coinDrops = [
  { id: 'coin-1', left: 28, delay: 0, rotate: 26 },
  { id: 'coin-2', left: 52, delay: 0.62, rotate: -18 },
  { id: 'coin-3', left: 40, delay: 1.24, rotate: 34 },
  { id: 'coin-4', left: 61, delay: 1.86, rotate: -28 },
  { id: 'coin-5', left: 35, delay: 2.48, rotate: 20 },
]

const printedBooks = [
  { id: 'printed-1', color: '#155DFC', delay: 2.25 },
  { id: 'printed-2', color: '#00A86B', delay: 3.05 },
  { id: 'printed-3', color: '#F59E0B', delay: 3.85 },
]

const flyingBooks = [
  { id: 'flying-1', color: '#155DFC', delay: 4.2, top: 26, rotate: -10 },
  { id: 'flying-2', color: '#00A86B', delay: 4.92, top: 42, rotate: 8 },
  { id: 'flying-3', color: '#F59E0B', delay: 5.64, top: 34, rotate: -4 },
]

const celebrationBits = [
  {
    id: 'spark-1',
    Icon: Sparkles,
    left: 8,
    top: 28,
    delay: 6.1,
    color: '#155DFC',
  },
  {
    id: 'heart-1',
    Icon: Heart,
    left: 18,
    top: 62,
    delay: 6.35,
    color: '#00A86B',
  },
  {
    id: 'spark-2',
    Icon: Sparkles,
    left: 78,
    top: 24,
    delay: 6.6,
    color: '#F59E0B',
  },
  {
    id: 'heart-2',
    Icon: Heart,
    left: 72,
    top: 66,
    delay: 6.85,
    color: '#0099CC',
  },
]

const storyMoments = [
  'Donation gathered',
  'Books printed',
  'Support delivered',
  'Joy shared',
]

const storyContainerVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: 'easeOut',
      staggerChildren: 0.16,
    },
  },
}

const storyItemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: 'easeOut',
    },
  },
}

/* =========================================================
   PAGE ANIMATION STYLES
   ========================================================= */

function FundsPageStyles() {
  return (
    <style>{`
      @keyframes fundsFadeIn {
        from {
          opacity: 0;
          transform: translateY(18px);
          filter: blur(8px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes fundsProfileFloat {
        0%, 100% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(-8px);
        }
      }

      .funds-fade {
        animation: fundsFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      .funds-delay-1 {
        animation-delay: 0.12s;
      }

      .funds-delay-2 {
        animation-delay: 0.22s;
      }

      .funds-profile-float {
        animation: fundsProfileFloat 4.8s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .funds-fade,
        .funds-profile-float {
          animation: none !important;
        }
      }
    `}</style>
  )
}

/* =========================================================
   STORY BOOK
   ========================================================= */

function StoryBook({ color }: { color: string }) {
  return (
    <div
      className="relative h-8 w-11 overflow-hidden rounded-[7px] border border-white/70 shadow-[0_10px_24px_-16px_rgba(15,23,42,0.55)]"
      style={{ background: color }}
    >
      <div className="absolute inset-y-1 left-1 w-1.5 rounded-full bg-white/45" />
      <div className="absolute right-1.5 top-2 h-1 w-5 rounded-full bg-white/55" />
      <div className="absolute bottom-2 right-1.5 h-1 w-4 rounded-full bg-white/35" />
    </div>
  )
}

/* =========================================================
   DONATION BOX
   ========================================================= */

function DonationBoxScene({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null
}) {
  return (
    <motion.div
      variants={storyItemVariants}
      className="relative flex min-h-[175px] w-full max-w-[154px] shrink-0 items-end justify-center"
    >
      <div
        className="absolute inset-x-0 top-0 mx-auto h-28 w-full"
        aria-hidden="true"
      >
        {coinDrops.map((coin) => (
          <motion.div
            key={coin.id}
            className="absolute top-0 grid h-6 w-6 place-items-center rounded-full border border-[#E0A11B] bg-[radial-gradient(circle_at_34%_26%,#FFF7C2_0%,#F7C948_44%,#D99A17_100%)] text-[10px] font-black text-[#915A00] shadow-[0_10px_18px_-12px_rgba(145,90,0,0.7)]"
            style={{ left: `${coin.left}%` }}
            initial={{
              opacity: 0,
              y: -12,
              rotate: 0,
            }}
            animate={
              shouldReduceMotion
                ? {
                    opacity: [0.42, 0.78, 0.42],
                  }
                : {
                    y: [-12, 76, 88, 80, 86],
                    opacity: [0, 1, 1, 1, 0],
                    rotate: [0, coin.rotate, coin.rotate + 18],
                    scale: [0.82, 1, 1.08, 0.98, 0.86],
                  }
            }
            transition={{
              duration: 4.7,
              delay: coin.delay,
              repeat: Infinity,
              repeatDelay: 0.9,
              ease: 'easeInOut',
            }}
          >
            {currencySymbol}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative h-[118px] w-[148px]"
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -3,
                scale: 1.02,
              }
        }
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 18,
        }}
      >
        <motion.div
          className="absolute left-1/2 top-4 z-20 h-4 w-24 -translate-x-1/2 rounded-full bg-[#CFE4FF] shadow-[inset_0_2px_7px_rgba(15,23,42,0.16)]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scaleX: [1, 1.08, 1],
                  opacity: [0.82, 1, 0.82],
                }
          }
          transition={{
            duration: 2.1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="absolute bottom-0 h-24 w-full overflow-hidden rounded-[22px] border border-[#D8E8F7] bg-white shadow-[0_24px_55px_-34px_rgba(15,23,42,0.52)]">
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(34,197,94,0.2)_0%,rgba(0,168,107,0.38)_100%)]"
            initial={{ height: '24%' }}
            animate={
              shouldReduceMotion
                ? { height: '50%' }
                : {
                    height: [
                      '24%',
                      '46%',
                      '67%',
                      '52%',
                      '30%',
                      '24%',
                    ],
                  }
            }
            transition={{
              duration: 8.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="absolute inset-x-5 top-3 h-2 rounded-full bg-[#EAF4FF]" />

          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              className="grid h-14 w-14 place-items-center rounded-2xl bg-[#EAFBF4] text-[#00A86B] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.08, 1],
                      rotate: [0, -3, 0],
                    }
              }
              transition={{
                duration: 2.8,
                delay: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart className="h-8 w-8 fill-current" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* =========================================================
   FLOW CONNECTOR
   ========================================================= */

function FlowConnector({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null
}) {
  return (
    <motion.div
      variants={storyItemVariants}
      className="relative flex h-12 w-10 shrink-0 items-center justify-center md:h-20 md:w-8"
      aria-hidden="true"
    >
      <div className="hidden h-px w-full rounded-full bg-[linear-gradient(90deg,rgba(21,93,252,0.18),rgba(0,168,107,0.7))] md:block" />

      <div className="h-full w-px rounded-full bg-[linear-gradient(180deg,rgba(21,93,252,0.18),rgba(0,168,107,0.7))] md:hidden" />

      <motion.div
        className="absolute h-2.5 w-2.5 rounded-full bg-[#00A86B] shadow-[0_0_18px_rgba(0,168,107,0.46)]"
        animate={
          shouldReduceMotion
            ? {
                opacity: [0.45, 0.8, 0.45],
              }
            : {
                x: [0, 10, 0],
                y: [-16, 0, 16],
                opacity: [0, 1, 0],
                scale: [0.75, 1, 0.75],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute hidden h-2.5 w-2.5 rounded-full bg-[#155DFC] shadow-[0_0_18px_rgba(21,93,252,0.42)] md:block"
        animate={
          shouldReduceMotion
            ? {
                opacity: [0.45, 0.8, 0.45],
              }
            : {
                x: [-14, 0, 14],
                opacity: [0, 1, 0],
                scale: [0.75, 1, 0.75],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

/* =========================================================
   BOOK MACHINE
   ========================================================= */

function BookMachineScene({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null
}) {
  return (
    <motion.div
      variants={storyItemVariants}
      className="relative flex min-h-[175px] w-full max-w-[172px] shrink-0 items-center justify-center"
    >
      <motion.div
        className="relative h-[130px] w-[168px]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 0.8, -0.8, 0],
                y: [0, -0.6, 0.6, 0],
              }
        }
        transition={{
          duration: 0.34,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.02,
              }
        }
      >
        <motion.div
          className="absolute inset-0 rounded-[24px] border border-[#BBDCFB] bg-white shadow-[0_24px_58px_-34px_rgba(21,93,252,0.55)]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  boxShadow: [
                    '0 24px 58px -34px rgba(21,93,252,0.44)',
                    '0 28px 68px -32px rgba(0,168,107,0.5)',
                    '0 24px 58px -34px rgba(21,93,252,0.44)',
                  ],
                }
          }
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="absolute left-4 top-4 grid h-14 w-20 place-items-center rounded-[18px] bg-[#EAF4FF] text-[#155DFC] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <BookOpen className="h-8 w-8" />
        </div>

        <div className="absolute left-5 top-[86px] flex gap-1.5">
          {[0, 1, 2].map((bar) => (
            <motion.span
              key={bar}
              className="h-2 w-6 rounded-full bg-[#D9ECFF]"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [0.42, 1, 0.42],
                      scaleX: [0.72, 1, 0.72],
                    }
              }
              transition={{
                duration: 1.2,
                delay: bar * 0.18,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="absolute right-3 top-12 h-16 w-16 rounded-[18px] bg-[#0F172A] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
          <div className="absolute left-2 right-2 top-3 h-2 rounded-full bg-[#64748B]" />

          <div className="absolute -right-6 top-8 h-4 w-9 rounded-r-full bg-[#155DFC]" />

          {printedBooks.map((book, index) => (
            <motion.div
              key={book.id}
              className="absolute -right-7 top-5"
              initial={{
                opacity: 0,
                x: -8,
                scale: 0.72,
              }}
              animate={
                shouldReduceMotion
                  ? {
                      opacity: [0.4, 0.82, 0.4],
                    }
                  : {
                      opacity: [0, 1, 1, 0],
                      x: [-8, 18, 32, 40],
                      scale: [0.72, 1, 1, 0.92],
                    }
              }
              transition={{
                duration: 3.35,
                delay: book.delay,
                repeat: Infinity,
                repeatDelay: 2.9,
                ease: 'easeInOut',
              }}
              style={{
                zIndex: printedBooks.length - index,
              }}
            >
              <StoryBook color={book.color} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* =========================================================
   BOOK FLIGHT CONNECTOR
   ========================================================= */

function BookFlightConnector({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null
}) {
  return (
    <motion.div
      variants={storyItemVariants}
      className="relative flex h-20 w-12 shrink-0 items-center justify-center md:w-14"
      aria-hidden="true"
    >
      <div className="hidden h-px w-full rounded-full bg-[linear-gradient(90deg,rgba(21,93,252,0.16),rgba(245,158,11,0.56),rgba(0,168,107,0.68))] md:block" />

      <div className="h-full w-px rounded-full bg-[linear-gradient(180deg,rgba(21,93,252,0.16),rgba(245,158,11,0.56),rgba(0,168,107,0.68))] md:hidden" />

      {flyingBooks.map((book) => (
        <motion.div
          key={book.id}
          className="absolute"
          style={{
            top: `${book.top}%`,
          }}
          initial={{
            opacity: 0,
            x: -20,
            y: 0,
            rotate: 0,
            scale: 0.76,
          }}
          animate={
            shouldReduceMotion
              ? {
                  opacity: [0.35, 0.86, 0.35],
                }
              : {
                  x: [-20, 2, 22, 42],
                  y: [0, -8, 4, 10],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, book.rotate, book.rotate * -0.35, 4],
                  scale: [0.76, 1, 1, 0.84],
                }
          }
          transition={{
            duration: 3.55,
            delay: book.delay,
            repeat: Infinity,
            repeatDelay: 2.45,
            ease: 'easeInOut',
          }}
        >
          <StoryBook color={book.color} />
        </motion.div>
      ))}
    </motion.div>
  )
}

/* =========================================================
   STUDENT SCENE
   ========================================================= */

function StudentScene({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null
}) {
  return (
    <motion.div
      variants={storyItemVariants}
      className="relative flex min-h-[184px] w-full max-w-[158px] shrink-0 items-center justify-center"
    >
      {celebrationBits.map(
        ({ id, Icon, left, top, delay, color }) => (
          <motion.div
            key={id}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              color,
            }}
            initial={{
              opacity: 0,
              scale: 0.65,
              y: 6,
              rotate: 0,
            }}
            animate={
              shouldReduceMotion
                ? {
                    opacity: [0.38, 0.78, 0.38],
                  }
                : {
                    opacity: [0, 1, 0],
                    scale: [0.65, 1, 0.82],
                    y: [6, -12, -24],
                    rotate: [0, 18, 38],
                  }
            }
            transition={{
              duration: 2.8,
              delay,
              repeat: Infinity,
              repeatDelay: 4.2,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5 fill-current" />
          </motion.div>
        ),
      )}

      <motion.div
        className="relative flex flex-col items-center"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -3, 0],
                scale: [1, 1.035, 1],
              }
        }
        transition={{
          duration: 2.45,
          delay: 6.15,
          repeat: Infinity,
          repeatDelay: 3.85,
          ease: 'easeInOut',
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -4,
                scale: 1.04,
              }
        }
      >
        <div className="relative h-20 w-20 rounded-full bg-[#F6C39E] shadow-[0_18px_36px_-24px_rgba(120,53,15,0.58)]">
          <div className="absolute -top-1 left-2 h-9 w-16 rounded-t-full bg-[#29364A]" />

          <div className="absolute left-5 top-9 h-2 w-2 rounded-full bg-[#0F172A]" />

          <div className="absolute right-5 top-9 h-2 w-2 rounded-full bg-[#0F172A]" />

          <motion.div
            className="absolute bottom-5 left-1/2 h-3 w-8 -translate-x-1/2 rounded-b-full border-b-2 border-[#7A3D20]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scaleX: [0.76, 1.14, 1],
                  }
            }
            transition={{
              duration: 2,
              delay: 6.2,
              repeat: Infinity,
              repeatDelay: 4.3,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="-mt-1 h-14 w-24 rounded-t-[28px] bg-[linear-gradient(135deg,#155DFC_0%,#0099CC_58%,#00A86B_100%)] shadow-[0_22px_46px_-30px_rgba(21,93,252,0.58)]" />

        <div className="absolute bottom-7 left-1 h-3 w-12 rotate-[-16deg] rounded-full bg-[#F6C39E]" />

        <div className="absolute bottom-7 right-1 h-3 w-12 rotate-[16deg] rounded-full bg-[#F6C39E]" />

        <motion.div
          className="absolute bottom-6 flex -space-x-8"
          initial={{
            opacity: 0,
            y: 10,
            scale: 0.82,
          }}
          animate={
            shouldReduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : {
                  opacity: [0, 1, 1, 0.85],
                  y: [10, -1, 0, 0],
                  scale: [0.82, 1.08, 1, 1],
                }
          }
          transition={{
            duration: 3.35,
            delay: 5.85,
            repeat: Infinity,
            repeatDelay: 3.35,
            ease: 'easeInOut',
          }}
        >
          <StoryBook color="#155DFC" />
          <StoryBook color="#00A86B" />
          <StoryBook color="#F59E0B" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* =========================================================
   DONATION IMPACT STORY
   ========================================================= */

function DonationImpactStory() {
  const shouldReduceMotion = useReducedMotion()
  const [momentIndex, setMomentIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return

    const interval = window.setInterval(() => {
      setMomentIndex(
        (current) => (current + 1) % storyMoments.length,
      )
    }, 1900)

    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <motion.div
      className="relative mt-7 overflow-hidden rounded-[24px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(248,251,255,0.9)_46%,rgba(236,253,245,0.88)_100%)] p-5 shadow-[0_26px_72px_-46px_rgba(21,93,252,0.45)] backdrop-blur-xl sm:p-6"
      variants={storyContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.35,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 160,
        damping: 20,
      }}
      role="img"
      aria-label="Donation impact story showing coins becoming printed books for a student"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(21,93,252,0.06)_0%,transparent_34%,rgba(0,168,107,0.08)_100%)]" />

      <motion.div
        variants={storyItemVariants}
        className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="type-h2 text-[#0F172A]">
            A Donation Becomes Learning
          </h2>

          <p className="type-body-small mt-2 max-w-md text-[#475569]">
            Every rupee moves through a quiet chain of care, from giving to
            books in a child&apos;s hands.
          </p>
        </div>

        <div
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D7EAFE] bg-white/80 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#155DFC] shadow-[0_14px_34px_-28px_rgba(21,93,252,0.5)] backdrop-blur-md"
          aria-hidden="true"
        >
          <Sparkles className="h-4 w-4 text-[#00A86B]" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={storyMoments[momentIndex]}
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -5,
              }}
              transition={{
                duration: 0.28,
                ease: 'easeOut',
              }}
            >
              {storyMoments[momentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="relative mt-6 flex min-h-[620px] flex-col items-center justify-between gap-4 overflow-hidden rounded-[22px] border border-[#E5F0FF] bg-white/58 px-4 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] sm:min-h-[660px] md:min-h-[240px] md:flex-row md:px-4 md:py-5"
        variants={storyItemVariants}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(234,244,255,0.55),rgba(255,255,255,0.18)_42%,rgba(236,253,245,0.46))]" />

        <DonationBoxScene
          shouldReduceMotion={shouldReduceMotion}
        />

        <FlowConnector
          shouldReduceMotion={shouldReduceMotion}
        />

        <BookMachineScene
          shouldReduceMotion={shouldReduceMotion}
        />

        <BookFlightConnector
          shouldReduceMotion={shouldReduceMotion}
        />

        <StudentScene
          shouldReduceMotion={shouldReduceMotion}
        />
      </motion.div>
    </motion.div>
  )
}

/* =========================================================
   NEWSLETTER
   ========================================================= */

function NewsletterSubscription() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    if (!newsletterEmail.trim()) return

    setIsSubscribed(true)
  }

  return (
    <section className="relative z-10 px-5 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[24px] border border-white/75 bg-[linear-gradient(135deg,rgba(234,244,255,0.96)_0%,rgba(255,255,255,0.94)_58%,rgba(255,255,255,0.88)_100%)] p-6 shadow-[0_32px_90px_-50px_rgba(21,93,252,0.42)] backdrop-blur-xl sm:p-8 lg:p-10">
        <form
          onSubmit={handleNewsletterSubmit}
          className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.75fr)_auto] lg:gap-8"
        >
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#155DFC_0%,#0099CC_58%,#00A86B_100%)] text-white shadow-[0_22px_48px_-26px_rgba(21,93,252,0.75)]">
              <Mail className="h-9 w-9" />
            </span>

            <div>
              <h2 className="type-h2 text-[#0F172A]">
                Stay Updated
              </h2>

              <p className="type-body mt-3 max-w-2xl text-[#475569]">
                Subscribe to our newsletter and receive updates about SDG
                projects, community impact, volunteering opportunities,
                success stories, and upcoming initiatives.
              </p>
            </div>
          </div>

          <div>
            <input
              required
              type="email"
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value)
                setIsSubscribed(false)
              }}
              placeholder="Enter your email address"
              className="type-body-small h-14 w-full rounded-2xl border border-[#D7E0EA] bg-white/95 px-5 text-[#0F172A] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition placeholder:text-[#94A3B8] focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/15"
            />

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {newsletterBenefits.map((benefit) => (
                <span
                  key={benefit}
                  className="type-caption inline-flex items-center gap-1.5 font-medium text-[#64748B]"
                >
                  <span className="font-extrabold text-[#00A86B]">
                    {checkMark}
                  </span>

                  {benefit}
                </span>
              ))}
            </div>

            {isSubscribed && (
              <p className="type-body-small mt-3 font-bold text-[#00A86B]">
                Thank you for subscribing.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="type-button inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00A86B_0%,#16C784_100%)] px-8 text-white shadow-[0_20px_44px_-26px_rgba(0,168,107,0.85)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_-28px_rgba(0,168,107,0.95)] lg:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

/* =========================================================
   CONTACT
   ========================================================= */

function ContactInformation() {
  return (
    <section className="relative z-10 px-5 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[24px] border border-white/70 bg-white/85 p-6 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.34)] backdrop-blur-xl sm:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          {contactItems.map((item) => (
            <a
              key={item.email}
              href={`mailto:${item.email}`}
              className="group flex items-center gap-4 rounded-[20px] border border-[#E2E8F0] bg-white px-5 py-5 shadow-[0_18px_45px_-36px_rgba(15,23,42,0.42)] transition duration-300 hover:-translate-y-1 hover:border-[#BBDCFB] hover:shadow-[0_26px_60px_-38px_rgba(21,93,252,0.42)]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#EAF4FF] text-[#155DFC] transition duration-300 group-hover:bg-[#155DFC] group-hover:text-white">
                <Mail className="h-5 w-5" />
              </span>

              <span className="min-w-0">
                <span className="type-label block uppercase tracking-[0.2em] text-[#64748B]">
                  {item.label}
                </span>

                <span className="type-body-small mt-1 block break-words font-semibold text-[#0F172A] transition group-hover:text-[#155DFC]">
                  {item.email}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   COPYRIGHT
   ========================================================= */

function CopyrightLine() {
  return (
    <div className="type-caption relative z-10 px-5 pb-10 pt-5 text-center text-[#64748B] sm:px-6">
      {'\u00A9 2026 Pavdhan Foundation \u2022 Empowering Students through the Sustainable Development Goals'}
    </div>
  )
}

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function FundsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [showPayModal, setShowPayModal] = useState(false)

  const [payTab, setPayTab] = useState<
    'upi' | 'card' | 'netbanking'
  >('upi')

  const [upiId, setUpiId] = useState('')

  const [cardNo, setCardNo] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')

  const [selectedBank, setSelectedBank] = useState('')

  const [paying, setPaying] = useState(false)

  const finalAmount = customAmount || amount

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!finalAmount) return

    setShowPayModal(true)
  }

  const handlePay = () => {
    setPaying(true)

    setTimeout(() => {
      addDonation({
        name,
        email,
        phone,
        amount: Number(finalAmount),
        message,
        method: payTab,
      })

      setPaying(false)
      setShowPayModal(false)
      setSubmitted(true)
    }, 2000)
  }

  /* =======================================================
     SUCCESS STATE
     ======================================================= */

  if (submitted) {
    return (
      <div className="relative isolate overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
        <FundsPageStyles />

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-25 blur-2xl"
            style={{
              backgroundImage: "url('/assets/images/1.jpeg')",
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.94)_52%,rgba(239,253,244,0.92)_100%)]" />
        </div>

        <section className="relative z-10 flex min-h-[72vh] items-center justify-center px-5 py-16 sm:px-6 lg:px-8">
          <div className="funds-fade w-full max-w-md rounded-[24px] border border-white/80 bg-white p-8 text-center shadow-[0_34px_90px_-44px_rgba(15,23,42,0.42)]">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_18px_36px_-20px_rgba(5,150,105,0.9)]">
              <Check className="h-8 w-8" />
            </div>

            <div className="type-label mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 uppercase tracking-[0.18em] text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
              Donation Successful
            </div>

            <h1 className="type-h2 mt-5 text-[#0F172A]">
              Thank You, {name}!
            </h1>

            <p className="type-stat-number mt-3 text-[#155DFC]">
              {currencySymbol}
              {Number(finalAmount).toLocaleString()}
            </p>

            <p className="type-body-small mx-auto mt-4 max-w-xs text-[#64748B]">
              Confirmation will be sent to{' '}
              <strong className="font-bold text-[#0F172A]">
                {email}
              </strong>
              .
            </p>

            <button
              onClick={() => {
                setSubmitted(false)
                setName('')
                setEmail('')
                setPhone('')
                setAmount('')
                setCustomAmount('')
                setMessage('')
              }}
              className="type-button mt-7 inline-flex items-center justify-center rounded-full bg-[#155DFC] px-7 py-3 text-white shadow-[0_16px_36px_-20px_rgba(21,93,252,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0F46CC]"
            >
              Make Another Donation
            </button>
          </div>
        </section>

        <NewsletterSubscription />

        <ContactInformation />

        <CopyrightLine />
      </div>
    )
  }

  /* =======================================================
     MAIN PAGE
     ======================================================= */

  return (
    <div className="relative isolate overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      <FundsPageStyles />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-25 blur-2xl"
          style={{
            backgroundImage: "url('/assets/images/2.jpeg')",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(248,250,252,0.93)_48%,rgba(239,253,244,0.9)_100%)]" />
      </div>

      <section className="relative z-10 px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:gap-10">

          {/* =================================================
              LEFT SIDE
              ================================================= */}

          <div className="funds-fade flex h-full flex-col justify-between">
            <div>
              <h1 className="type-hero-title mt-7 text-[#0F172A]">
                Your Support.
                <br />

                <span className="bg-[linear-gradient(90deg,#155DFC_0%,#00A86B_82%)] bg-clip-text text-transparent">
                  Their Tomorrow.
                </span>
              </h1>

              <p className="type-body-large mt-6 max-w-xl text-[#475569]">
                Every contribution you make helps build a better, more equal
                and sustainable India.
              </p>

              <div className="mt-7 flex flex-col gap-4 rounded-[22px] border border-white/75 bg-white/70 p-4 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.38)] backdrop-blur-xl sm:flex-row sm:items-center">
                <div className="flex -space-x-3">
                  {communityProfiles.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={48}
                      height={48}
                      sizes="48px"
                      className="funds-profile-float h-12 w-12 rounded-full border-2 border-white object-cover shadow-[0_12px_26px_-18px_rgba(15,23,42,0.7)]"
                      style={{
                        animationDelay: `${index * 0.22}s`,
                      }}
                    />
                  ))}
                </div>

                <p className="type-body-small max-w-sm font-semibold text-[#334155]">
                  Join 12,000+ changemakers already making an impact.
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_32px_80px_-42px_rgba(15,23,42,0.55)]">
                <div className="relative aspect-video overflow-hidden bg-[#EAF4FF]">
                  <iframe
                    src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=1&mute=1&loop=1&playlist=${featuredVideoId}&rel=0`}
                    title="StepUp for SDG - Impact Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.28)_100%)]" />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE - DONATION FORM
              ================================================= */}

          <div className="funds-fade funds-delay-1 flex h-full">
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_34px_90px_-44px_rgba(15,23,42,0.5)]">

              {/* Header */}

              <div className="flex items-center justify-between gap-4 bg-[linear-gradient(135deg,#155DFC_0%,#0099CC_58%,#00A86B_100%)] px-5 py-5 sm:px-7">
                <div>
                  <h2 className="type-h3 text-white">
                    Make a Donation
                  </h2>

                  <p className="type-caption mt-1 text-white/78">
                    100% goes directly to SDG projects
                  </p>
                </div>

                <div className="hidden items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md sm:inline-flex">
                  <ShieldCheck className="h-4 w-4" />

                  <span className="type-label font-bold uppercase tracking-[0.14em]">
                    Razorpay Secure
                  </span>
                </div>
              </div>

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col p-5 sm:p-7"
              >
                {/* Your Details */}

                <div>
                  <label className={labelClass}>
                    Your Details
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className={inputClass}
                    />

                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      type="tel"
                      className={inputClass}
                    />
                  </div>

                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    type="email"
                    className={`${inputClass} mt-3`}
                  />
                </div>

                {/* Amount */}

                <div className="mt-7">
                  <label className={labelClass}>
                    Donation Amount ({currencySymbol})
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {presetAmounts.map((presetAmount) => {
                      const selected =
                        amount === String(presetAmount) &&
                        !customAmount

                      return (
                        <div
                          key={presetAmount}
                          className="relative pt-2"
                        >
                          {presetAmount === 1000 && (
                            <span className="type-label absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-full bg-[#00A86B] px-2.5 py-1 uppercase tracking-[0.16em] text-white shadow-[0_10px_22px_-14px_rgba(0,168,107,0.9)]">
                              Popular
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setAmount(String(presetAmount))
                              setCustomAmount('')
                            }}
                            className={`type-button h-14 w-full rounded-2xl border transition duration-300 hover:-translate-y-0.5 ${
                              selected
                                ? 'border-[#155DFC] bg-[linear-gradient(135deg,#155DFC,#0099CC)] text-white shadow-[0_18px_36px_-24px_rgba(21,93,252,0.9)]'
                                : 'border-[#D7E0EA] bg-[#F8FAFC] text-[#334155] hover:border-[#BBDCFB] hover:bg-white'
                            }`}
                          >
                            {currencySymbol}
                            {presetAmount.toLocaleString()}
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  <div className="relative mt-4">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-[#64748B]">
                      {currencySymbol}
                    </span>

                    <input
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setAmount('')
                      }}
                      placeholder="Enter custom amount"
                      type="number"
                      min="1"
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                </div>

                {/* Message */}

                <div className="mt-7">
                  <label className={labelClass}>
                    Message{' '}
                    <span className="font-normal normal-case tracking-normal text-[#94A3B8]">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Why are you donating? Leave a message..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Security */}

                <div className="type-body-small mt-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-semibold text-emerald-700">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                    <LockKeyhole className="h-4 w-4" />
                  </span>

                  <span>
                    Your donation is secure and tax-deductible.
                  </span>
                </div>

                {/* Selected amount */}

                {finalAmount && (
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#D7E0EA] bg-[#F8FAFC] px-4 py-3">
                    <span className="type-body-small font-semibold text-[#64748B]">
                      Selected amount
                    </span>

                    <span className="type-h6 text-[#155DFC]">
                      {currencySymbol}
                      {Number(finalAmount).toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Submit */}

                <div className="mt-auto pt-5">
                  <button
                    type="submit"
                    disabled={
                      !finalAmount ||
                      !name ||
                      !email ||
                      !phone
                    }
                    className="type-button inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#155DFC_0%,#0099CC_58%,#00A86B_100%)] px-6 py-4 text-white shadow-[0_22px_48px_-28px_rgba(21,93,252,0.85)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_58px_-30px_rgba(0,168,107,0.85)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    Donate Securely {rightArrow}
                  </button>

                  <div className="type-caption mt-3 flex items-center justify-center gap-2 font-semibold text-[#64748B]">
                    <ShieldCheck className="h-4 w-4 text-[#155DFC]" />
                    Powered by Razorpay
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
          ===================================================== */}

      <NewsletterSubscription />

      {/* =====================================================
          CONTACT
          ===================================================== */}

      <ContactInformation />

      {/* =====================================================
          COPYRIGHT
          ===================================================== */}

      <CopyrightLine />

      {/* =====================================================
          PAYMENT MODAL
          ===================================================== */}

      {showPayModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0F172A]/55 p-5 backdrop-blur-md">
          <div className="w-full max-w-md overflow-hidden rounded-[24px] bg-white shadow-[0_34px_90px_-34px_rgba(15,23,42,0.7)]">

            {/* Modal Header */}

            <div className="flex items-center justify-between gap-4 bg-[linear-gradient(135deg,#155DFC,#0099CC)] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/16 text-white">
                  <HeartHandshake className="h-5 w-5" />
                </div>

                <div>
                  <div className="type-body-small font-bold text-white">
                    StepUp for SDG
                  </div>

                  <div className="type-caption text-white/72">
                    Amount: {currencySymbol}
                    {Number(finalAmount).toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowPayModal(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                aria-label="Close payment modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Payment Tabs */}

            <div className="grid grid-cols-3 border-b border-[#E2E8F0]">
              {(
                [
                  ['upi', 'UPI', Smartphone],
                  ['card', 'Card', CreditCard],
                  ['netbanking', 'Net Banking', Landmark],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPayTab(id)}
                  className={`type-label flex items-center justify-center gap-1.5 px-2 py-3 font-bold transition ${
                    payTab === id
                      ? 'bg-white text-[#155DFC] shadow-[inset_0_-3px_0_#155DFC]'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:bg-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="p-5">

              {/* =================================================
                  UPI
                  ================================================= */}

              {payTab === 'upi' && (
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <div className="type-body-small font-bold text-[#0F172A]">
                      Scan QR Code
                    </div>

                    <div className="type-caption text-[#64748B]">
                      Use any UPI app to scan and pay
                    </div>
                  </div>

                  <div className="mx-auto grid h-36 w-36 place-items-center rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.55)]">
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      fill="none"
                    >
                      <rect
                        x="4"
                        y="4"
                        width="34"
                        height="34"
                        rx="3"
                        fill="#155DFC"
                      />

                      <rect
                        x="11"
                        y="11"
                        width="20"
                        height="20"
                        rx="1.5"
                        fill="white"
                      />

                      <rect
                        x="15"
                        y="15"
                        width="12"
                        height="12"
                        rx="1"
                        fill="#155DFC"
                      />

                      <rect
                        x="82"
                        y="4"
                        width="34"
                        height="34"
                        rx="3"
                        fill="#155DFC"
                      />

                      <rect
                        x="89"
                        y="11"
                        width="20"
                        height="20"
                        rx="1.5"
                        fill="white"
                      />

                      <rect
                        x="93"
                        y="15"
                        width="12"
                        height="12"
                        rx="1"
                        fill="#155DFC"
                      />

                      <rect
                        x="4"
                        y="82"
                        width="34"
                        height="34"
                        rx="3"
                        fill="#155DFC"
                      />

                      <rect
                        x="11"
                        y="89"
                        width="20"
                        height="20"
                        rx="1.5"
                        fill="white"
                      />

                      <rect
                        x="15"
                        y="93"
                        width="12"
                        height="12"
                        rx="1"
                        fill="#155DFC"
                      />

                      {[46, 54, 62, 70, 46, 62, 70, 50, 58, 66, 50, 66].map(
                        (x, i) => (
                          <rect
                            key={i}
                            x={x}
                            y={
                              [
                                4,
                                4,
                                4,
                                4,
                                14,
                                14,
                                14,
                                24,
                                24,
                                24,
                                34,
                                34,
                              ][i]
                            }
                            width="6"
                            height="6"
                            rx="1"
                            fill="#155DFC"
                          />
                        ),
                      )}

                      {[46, 54, 62, 70, 46, 54, 62, 70, 46, 54, 62, 70].map(
                        (x, i) => (
                          <rect
                            key={i + 20}
                            x={x}
                            y={
                              [
                                46,
                                46,
                                46,
                                46,
                                56,
                                56,
                                56,
                                56,
                                66,
                                66,
                                66,
                                66,
                              ][i]
                            }
                            width="6"
                            height="6"
                            rx="1"
                            fill="#155DFC"
                          />
                        ),
                      )}
                    </svg>
                  </div>

                  <div className="flex gap-2">
                    <input
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className={`${paymentInputClass} flex-1`}
                    />

                    <button
                      type="button"
                      onClick={handlePay}
                      className="type-button rounded-xl bg-[#155DFC] px-4 text-white transition hover:bg-[#0F46CC]"
                    >
                      Verify
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(
                      (app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={handlePay}
                          className="type-caption rounded-full border border-[#CFE4FF] bg-[#EAF4FF] px-3 py-1.5 font-bold text-[#155DFC] transition hover:bg-white"
                        >
                          {app}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  CARD
                  ================================================= */}

              {payTab === 'card' && (
                <div className="flex flex-col gap-3">
                  <input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name on Card"
                    className={paymentInputClass}
                  />

                  <input
                    value={cardNo}
                    onChange={(e) =>
                      setCardNo(
                        e.target.value
                          .replace(/\D/g, '')
                          .slice(0, 16)
                          .replace(/(\d{4})/g, '$1 ')
                          .trim(),
                      )
                    }
                    placeholder="Card Number"
                    className={paymentInputClass}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={cardExp}
                      onChange={(e) =>
                        setCardExp(e.target.value)
                      }
                      placeholder="MM / YY"
                      className={paymentInputClass}
                    />

                    <input
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(
                          e.target.value.slice(0, 3),
                        )
                      }
                      placeholder="CVV"
                      type="password"
                      className={paymentInputClass}
                    />
                  </div>
                </div>
              )}

              {/* =================================================
                  NET BANKING
                  ================================================= */}

              {payTab === 'netbanking' && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    {
                      name: 'SBI',
                      color: '#1A3A8F',
                    },
                    {
                      name: 'HDFC',
                      color: '#004C8F',
                    },
                    {
                      name: 'ICICI',
                      color: '#B5261E',
                    },
                    {
                      name: 'Axis',
                      color: '#97144D',
                    },
                    {
                      name: 'Kotak',
                      color: '#E8222B',
                    },
                    {
                      name: 'Others',
                      color: '#475569',
                    },
                  ].map((bank) => (
                    <button
                      key={bank.name}
                      type="button"
                      onClick={() =>
                        setSelectedBank(bank.name)
                      }
                      className="type-body-small rounded-xl border px-3 py-3 font-bold transition hover:-translate-y-0.5"
                      style={{
                        borderColor:
                          selectedBank === bank.name
                            ? bank.color
                            : `${bank.color}30`,
                        background:
                          selectedBank === bank.name
                            ? `${bank.color}15`
                            : `${bank.color}08`,
                        color: bank.color,
                      }}
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>
              )}

              {/* =================================================
                  PAY BUTTON
                  ================================================= */}

              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                className="type-button mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#155DFC,#0099CC)] px-5 py-3.5 text-white shadow-[0_18px_42px_-26px_rgba(21,93,252,0.8)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {paying
                  ? 'Processing...'
                  : `Pay ${currencySymbol}${Number(
                      finalAmount,
                    ).toLocaleString()}`}
              </button>

              <div className="type-caption mt-3 flex items-center justify-center gap-1.5 font-semibold text-[#64748B]">
                <ShieldCheck className="h-4 w-4 text-[#155DFC]" />

                Secured by{' '}
                <span className="font-bold text-[#155DFC]">
                  Razorpay
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}