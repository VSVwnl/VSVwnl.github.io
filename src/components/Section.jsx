import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Masked line reveal used for all display headings.
 * The viewport trigger lives on the unclipped wrapper — the inner span starts
 * translated outside the overflow-hidden mask, so observing it directly would
 * never fire (a clipped element has no viewport intersection).
 */
export function RevealLine({ children, delay = 0, className = "" }) {
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: "112%", opacity: 0 },
          visible: { y: "0%", opacity: 1 },
        }}
        transition={{ duration: 0.9, delay, ease: EASE, opacity: { duration: 0.45, delay } }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Fade-up reveal for supporting content. */
export function FadeIn({ children, delay = 0, className = "", y = 22 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial section shell: mono index + eyebrow, huge display title
 * (solid line + outlined accent line), optional lead paragraph.
 */
export default function Section({
  id,
  index,
  eyebrow,
  title,
  accent,
  lead,
  children,
  className = "",
}) {
  return (
    <section
      id={id}
      data-section
      className={`relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-36 lg:px-14 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-14 md:mb-20">
          <FadeIn y={14} className="flex items-center gap-4">
            <span className="mono-label text-cyan-300/90">{index}</span>
            <span
              aria-hidden="true"
              className="h-px w-14 bg-gradient-to-r from-cyan-300/60 to-transparent"
            />
            <span className="mono-label text-zinc-500">{eyebrow}</span>
          </FadeIn>

          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.4rem)] leading-[0.95] font-bold tracking-tight text-white uppercase">
            <RevealLine>{title}</RevealLine>
            {accent && (
              <RevealLine delay={0.1}>
                <span className="text-outline">{accent}</span>
              </RevealLine>
            )}
          </h2>

          {lead && (
            <FadeIn delay={0.15}>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
                {lead}
              </p>
            </FadeIn>
          )}
        </header>

        {children}
      </div>
    </section>
  );
}
