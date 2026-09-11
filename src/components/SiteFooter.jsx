import { profile, socials } from "../data/profile.js";
import MotionToggle from "./MotionToggle.jsx";
import { useReveal } from "../hooks.js";

/** Confident typographic close, then the real contact details. */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  const [ref, cls] = useReveal();

  return (
    <footer id="contact" className="mt-28 border-t border-[var(--color-line)] md:mt-40">
      <div ref={ref} className={`stage py-20 md:py-28 ${cls}`}>
        <h2 className="t-display t-section max-w-[16ch]">
          Let&rsquo;s build something people can step into.
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="link mt-10 inline-block text-[clamp(1.25rem,3.2vw,2rem)] text-[var(--color-paper)]"
        >
          {profile.email}
        </a>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {socials
            .filter((s) => s.label !== "Email")
            .map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  {s.label}
                </a>
              </li>
            ))}
          <li>
            <a href={profile.resume.primary.href} download className="link-quiet">
              Resume
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="stage flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta">
            © {year} {profile.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <p className="t-meta">{profile.location}</p>
            <MotionToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
