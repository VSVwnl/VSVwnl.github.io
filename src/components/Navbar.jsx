import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { profile, socials } from "../data/profile.js";

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "archive", label: "Archive" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Track which section is on screen for the active nav state.
  useEffect(() => {
    const targets = LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400"
        style={{ scaleX: progress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "border-b border-white/8 bg-void/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14 md:h-[72px]"
        >
          <a href="#home" className="group flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl border border-white/15 bg-white/5 transition-colors duration-300 group-hover:border-cyan-400/50">
              <span className="text-gradient font-display text-sm font-bold">VB</span>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[13px] font-semibold tracking-[0.16em] text-zinc-100 uppercase">
                Vishnu Bodapati
              </span>
              <span className="mt-1.5 font-mono text-[9px] tracking-[0.32em] text-zinc-500 uppercase">
                XR · Games · Spatial
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`mono-label relative transition-colors duration-300 ${
                  active === id ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-100"
                }`}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 transition-opacity duration-300 ${
                    active === id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            ))}
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[10px] tracking-[0.22em] text-zinc-100 uppercase transition-all duration-300 hover:border-cyan-400/50 hover:text-zinc-100"
            >
              <Download className="size-3.5" aria-hidden="true" />
              CV
            </a>
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-zinc-100 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[59] flex flex-col justify-between bg-void/95 px-6 pt-28 pb-10 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {LINKS.map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/8 py-4 font-display text-4xl font-bold tracking-tight text-zinc-100 uppercase"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {label}
                  <ArrowUpRight className="size-6 text-cyan-400" aria-hidden="true" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a href={profile.cv} download className="btn-primary w-fit" onClick={() => setOpen(false)}>
                <Download className="size-4" aria-hidden="true" />
                Download CV
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target={s.id === "email" ? undefined : "_blank"}
                    rel={s.id === "email" ? undefined : "noopener noreferrer"}
                    className="mono-label text-zinc-500 transition-colors hover:text-zinc-100"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
