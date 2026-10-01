import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav } from "../data/profile.js";

export default function SiteHeader({ current }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onOutside = (e) => {
      if (!header.current?.contains(e.target)) setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 760px)");
    const onResize = () => {
      if (wide.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    wide.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      wide.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <header ref={header} className="site-header">
      <div className="stage header-inner">
        <a className="wordmark" href="/" aria-label="Vishnu Sai Bodapati — home">
          <span className="wordmark-name">Vishnu Sai Bodapati</span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav
          id="primary-nav"
          aria-label="Primary"
          className={open ? "primary-nav is-open" : "primary-nav"}
        >
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={
                current && item.href === `/${current}/` ? "page" : undefined
              }
              download={item.download || undefined}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={item.download ? "nav-resume" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
              {(item.download || item.external) && <ArrowUpRight size={14} aria-hidden="true" />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
