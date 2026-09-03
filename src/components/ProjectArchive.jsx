import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section, { FadeIn } from "./Section.jsx";
import { categories, projects } from "../data/projects.js";

const FILTERS = ["All", ...categories];

function countFor(filter) {
  if (filter === "All") return projects.length;
  return projects.filter((p) => p.categories.includes(filter)).length;
}

function ArchiveRow({ project, index }) {
  const link = project.links[0];
  const Wrapper = link ? "a" : "div";
  const wrapperProps = link
    ? { href: link.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group grid grid-cols-[44px_1fr_44px] items-start gap-4 px-2 py-6 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-[64px_1.5fr_0.75fr_0.85fr_48px] md:items-center md:gap-6 md:px-4 md:py-7"
    >
      <span className="pt-1 font-mono text-xs text-zinc-600 md:pt-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="min-w-0">
        <span className="block font-display text-xl font-semibold tracking-tight text-zinc-200 transition-colors duration-300 group-hover:text-cyan-300 md:text-2xl">
          {project.title}
        </span>
        <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-zinc-500">
          {project.description}
        </span>
        {/* category + role, mobile only */}
        <span className="mt-3 flex flex-wrap items-center gap-2 md:hidden">
          {project.categories.map((c) => (
            <span key={c} className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.14em] uppercase ${project.accent.chip}`}>
              {c}
            </span>
          ))}
          <span className="font-mono text-[10px] tracking-[0.1em] text-zinc-600 uppercase">
            {project.role}
          </span>
        </span>
      </span>

      <span className="hidden flex-wrap gap-1.5 md:flex">
        {project.categories.map((c) => (
          <span key={c} className={`rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] uppercase ${project.accent.chip}`}>
            {c}
          </span>
        ))}
      </span>

      <span className="hidden min-w-0 flex-col gap-1 md:flex">
        <span className="text-sm text-zinc-400">{project.role}</span>
        <span className="font-mono text-[10px] tracking-[0.12em] text-zinc-600 uppercase">
          {project.platform}
        </span>
      </span>

      <span
        aria-hidden={link ? undefined : "true"}
        className={`grid size-10 place-items-center justify-self-end rounded-full border transition-all duration-300 md:size-11 ${
          link
            ? "border-white/15 text-zinc-200 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/10"
            : "border-white/8 text-zinc-700"
        }`}
      >
        {link ? (
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        ) : (
          <span className="size-1 rounded-full bg-zinc-700" />
        )}
      </span>
    </Wrapper>
  );
}

export default function ProjectArchive() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <Section
      id="archive"
      index="04"
      eyebrow="Project Archive"
      title="The"
      accent="Archive"
      lead="Every build on record, filterable by discipline. The index grows as the lab does."
    >
      <FadeIn className="mb-10 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ${
                isActive
                  ? "border-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 font-medium text-[#050509]"
                  : "border-white/12 bg-white/[0.03] text-zinc-400 hover:border-white/30 hover:text-zinc-200"
              }`}
            >
              {f}
              <span className={isActive ? "opacity-70" : "text-zinc-600"}>
                {String(countFor(f)).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </FadeIn>

      <FadeIn delay={0.1}>
        <div
          aria-hidden="true"
          className="hidden grid-cols-[64px_1.5fr_0.75fr_0.85fr_48px] gap-6 border-b border-white/8 px-4 pb-3 md:grid"
        >
          {["Index", "Project", "Category", "Role", "Link"].map((h) => (
            <span key={h} className="mono-label text-zinc-600">
              {h}
            </span>
          ))}
        </div>

        <motion.ul layout className="divide-y divide-white/8 border-b border-white/8">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => (
              <motion.li
                layout
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArchiveRow project={project} index={i} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/12 px-6 py-14 text-center">
            <p className="font-mono text-xs tracking-[0.22em] text-zinc-500 uppercase">
              // Nothing filed under {filter} — yet. The archive grows.
            </p>
          </div>
        )}
      </FadeIn>
    </Section>
  );
}
