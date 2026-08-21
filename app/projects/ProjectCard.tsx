"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type ProjectCardProject = {
  name: string;
  description: string;
  backgroundImage: string;
  href?: string;
};

function getVideoType(src: string) {
  const cleanSrc = src.toLowerCase().split("?")[0];

  if (cleanSrc.endsWith(".webm")) return "video/webm";
  if (cleanSrc.endsWith(".ogg")) return "video/ogg";
  return "video/mp4";
}

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectCardProject;
  index: number;
}) {
  const isReversed = index % 2 === 1;
  const imageOrder = isReversed ? "lg:order-2" : "lg:order-1";
  const contentOrder = isReversed ? "lg:order-1" : "lg:order-2";
  const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(project.backgroundImage);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="group grid overflow-hidden rounded-[1.5rem] border border-[#E2E8F0] bg-white p-4 shadow-[0_18px_55px_-36px_rgba(15,23,42,0.28)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#CBD5E1] hover:shadow-[0_34px_82px_-42px_rgba(15,23,42,0.38)] sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-7"
    >
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 36 : -36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className={`${imageOrder} relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#E2E8F0] shadow-[0_20px_45px_-32px_rgba(15,23,42,0.32)]`}
      >
        {isVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.035]"
          >
            <source src={project.backgroundImage} type={getVideoType(project.backgroundImage)} />
          </video>
        ) : (
          <Image
            src={project.backgroundImage}
            alt={`${project.name} project`}
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.035]"
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
        className={`${contentOrder} flex flex-col justify-center px-1 py-7 sm:px-2 lg:px-3 lg:py-8`}
      >
        <h3 className="font-display text-3xl font-extrabold leading-tight text-[#0F172A] md:text-4xl">
          {project.name}
        </h3>
        <p
          className="mt-4 max-w-2xl overflow-hidden text-base font-medium leading-relaxed text-[#475569] md:text-lg"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {project.description}
        </p>

        <div className="mt-8">
          <Link
            href={project.href ?? "/work-with-us"}
            className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(255,122,0,0.9)] transition duration-300 hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_0_30px_rgba(232,106,0,0.42)]"
          >
            Start This Project
          </Link>
        </div>
      </motion.div>
    </motion.article>
  );
}
