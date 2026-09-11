import Page from "../components/Page.jsx";
import { useReveal } from "../hooks.js";
import { about, profile } from "../data/profile.js";
import { experience, education } from "../data/experience.js";

export default function AboutPage() {
  return (
    <Page current="about">
      <section className="stage pt-16 pb-12 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)] md:items-start md:gap-16">
          <div>
            <h1 className="t-display t-hero">About</h1>
            {about.story.map((p) => (
              <p key={p} className="measure mt-6">
                {p}
              </p>
            ))}
          </div>

          <img
            src="/Assets/profile/vishnu-headshot.jpg"
            alt={profile.name}
            width={1066}
            height={1600}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full rounded-lg border border-[var(--color-line)] object-cover"
            style={{ objectPosition: "center 30%", aspectRatio: "4 / 5" }}
          />
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────────────────── */}
      <section className="stage mt-16 md:mt-20">
        <hr className="rule" />
        <section className="pt-12">
          <h2 className="t-display t-section">Experience</h2>
          <ul className="mt-8 space-y-10">
            {experience.map((entry) => (
              <li key={entry.id}>
                <p className="t-meta">{entry.period}</p>
                <h3 className="mt-1.5 text-[1.25rem] font-medium text-[var(--color-paper)]">
                  {entry.role}
                </h3>
                <p className="t-meta mt-0.5">
                  {entry.org} — {entry.subtitle}
                </p>
                <ul className="measure mt-3 space-y-2">
                  {entry.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1 shrink-0 rounded-full bg-[var(--color-accent)]"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </section>

      {/* ── Education ─────────────────────────────────────────────────────── */}
      <section className="stage mt-16 md:mt-20">
        <hr className="rule" />
        <section className="pt-12">
          <h2 className="t-display t-section">Education</h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2">
            {education.map((entry) => (
              <li key={entry.id}>
                <p className="t-meta">{entry.period}</p>
                <h3 className="mt-1.5 text-[1.125rem] font-medium text-[var(--color-paper)]">
                  {entry.school}
                </h3>
                <p className="mt-1">{entry.degree}</p>
                <p className="t-meta mt-0.5">{entry.program}</p>
              </li>
            ))}
          </ul>
        </section>
      </section>

      {/* ── Capabilities ──────────────────────────────────────────────────── */}
      <section className="stage mt-16 md:mt-20">
        <hr className="rule" />
        <section className="pt-12">
          <h2 className="t-display t-section">Capabilities</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {about.capabilities.map((group) => (
              <div key={group.title}>
                <h3 className="text-[1.0625rem] font-medium text-[var(--color-paper)]">
                  {group.title}
                </h3>
                <p className="mt-2 text-[15px]">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* ── Recognition + documents ───────────────────────────────────────── */}
      <section className="stage mt-16 md:mt-20">
        <hr className="rule" />
        <section className="pt-12">
          <h2 className="t-display t-section">Recognition</h2>
          <p className="measure mt-5">{about.recognitionSummary}</p>
          <p className="t-meta mt-3">
            Exact award names and evidence sit on each project page.
          </p>

          <h2 className="t-display t-section mt-14">Documents</h2>
          <ul className="mt-5 space-y-5">
            {[profile.resume.primary, profile.resume.secondary].map((doc) => (
              <li key={doc.href}>
                <a href={doc.href} download className="link text-[var(--color-paper)]">
                  {doc.label}
                </a>
                <p className="t-meta mt-1">{doc.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </Page>
  );
}
