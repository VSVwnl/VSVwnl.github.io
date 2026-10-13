import { useEffect, useRef, useState } from "react";
import { profile, socials } from "../data/profile.js";

// Four destinations, short enough to stay visible at 320px without a menu.
const links = [
  { label: "Work", href: "/work/", id: "work" },
  { label: "About", href: "/about/", id: "about" },
  { label: "Resume", href: profile.resume.primary.href, download: true },
  { label: "Contact", href: "#contact" },
];

function Header({ current, headerRef }) {
  return (
    <header className="masthead" ref={headerRef}>
      <div className="wrap masthead-inner">
        <a className="wordmark" href="/">
          {profile.shortName}
        </a>
        <nav id="primary-nav" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              download={link.download || undefined}
              aria-current={current && link.id === current ? "page" : undefined}
            >
              {link.label}
              {link.download && <span className="file-note"> (PDF)</span>}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/**
 * Once the header scrolls away, a round button keeps navigation one click
 * away. It opens a native modal <dialog>, which traps focus, closes on Escape
 * and returns focus to the button.
 */
function FloatingMenu({ headerRef, current }) {
  const [shown, setShown] = useState(false);
  const dialog = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting));
    io.observe(header);
    return () => io.disconnect();
  }, [headerRef]);

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        className={`menu-fab${shown ? " is-shown" : ""}`}
        aria-haspopup="dialog"
        aria-controls="site-menu"
        onClick={() => dialog.current?.showModal()}
      >
        <span className="menu-fab-lines" aria-hidden="true" />
        <span className="visually-hidden">Open menu</span>
      </button>
      <dialog
        id="site-menu"
        className="menu-panel"
        ref={dialog}
        aria-label="Menu"
        onClick={(e) => e.target === dialog.current && close()}
      >
        <div className="menu-panel-inner">
          <button type="button" className="menu-close" onClick={close}>
            <span aria-hidden="true">×</span>
            <span className="visually-hidden">Close menu</span>
          </button>
          <nav aria-label="Menu">
            <ul className="menu-links">
              <li>
                <a href="/" aria-current={!current ? "page" : undefined}>Home</a>
              </li>
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    download={link.download || undefined}
                    aria-current={current && link.id === current ? "page" : undefined}
                    onClick={link.href.startsWith("#") ? close : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-foot">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <ul>
              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}

function Footer() {
  return (
    <footer id="contact" className="colophon">
      <div className="wrap colophon-inner">
        <h2 className="colophon-title">Get in touch</h2>
        <p className="colophon-lede">
          The fastest way to reach me is email:{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <ul className="colophon-links">
          {socials
            .filter((s) => s.label !== "Email")
            .map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          <li>
            <a href={profile.resume.primary.href} download>
              Resume (PDF)
            </a>
          </li>
        </ul>
        <p className="colophon-small">
          © {new Date().getFullYear()} {profile.shortName}
        </p>
      </div>
    </footer>
  );
}

export default function Layout({ current, children }) {
  const headerRef = useRef(null);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header current={current} headerRef={headerRef} />
      <FloatingMenu headerRef={headerRef} current={current} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
