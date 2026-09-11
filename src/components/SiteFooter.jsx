import { profile, socials } from "../data/profile.js";

/**
 * Contact footer. Real email, quiet text links, no form (there is no backend),
 * no marquee and no duplicate contact cards.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-24 border-t border-[var(--color-line)] md:mt-32">
      <div className="shell py-16 md:py-20">
        <h2 className="t-section">Get in touch</h2>
        <p className="prose-measure mt-4">
          Open to conversations about XR, spatial tooling, and interactive systems
          work. Email is the most reliable way to reach me.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="link mt-6 inline-block text-[clamp(1.25rem,3vw,1.75rem)] text-[var(--color-ink)]"
        >
          {profile.email}
        </a>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {socials
            .filter((s) => s.label !== "Email")
            .map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                >
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
        <div className="shell flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta">
            © {year} {profile.name}
          </p>
          <p className="t-meta">{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
