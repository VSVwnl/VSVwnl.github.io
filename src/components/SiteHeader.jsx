import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, profile } from "../data/profile.js";
import SpatialMark from "./SpatialMark.jsx";

export default function SiteHeader({ current }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Close on Escape and return focus to the control that opened the menu.
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the panel so keyboard users land somewhere sensible.
    panelRef.current?.querySelector("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const isCurrent = (item) =>
    current && item.href === `/${current}/` ? "page" : undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-bg)]/92 backdrop-blur-sm">
      <div className="shell flex h-[68px] items-center justify-between gap-6">
        <a
          href="/"
          className="link-quiet flex items-center gap-2.5 text-[var(--color-ink)] no-underline"
        >
          <SpatialMark className="text-[var(--color-accent)]" size={18} />
          <span className="font-medium tracking-tight">{profile.shortName}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={isCurrent(item)}
              {...(item.download ? { download: "" } : {})}
              className={
                isCurrent(item)
                  ? "text-[15px] text-[var(--color-ink)]"
                  : "link-quiet text-[15px]"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="btn btn-ghost -mr-2 px-3 md:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-[var(--color-line)] bg-[var(--color-bg)] md:hidden"
        >
          <nav aria-label="Primary" className="shell flex flex-col py-2">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={isCurrent(item)}
                {...(item.download ? { download: "" } : {})}
                onClick={() => setOpen(false)}
                className="flex min-h-[52px] items-center border-b border-[var(--color-line)] text-[17px] text-[var(--color-ink)] last:border-b-0"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
