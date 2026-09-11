import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";

/** Shared shell: skip link, header, one <main>, contact footer. */
export default function Page({ current, children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-[var(--color-ink)] focus:px-4 focus:py-2.5 focus:text-[#14151a]"
      >
        Skip to content
      </a>
      <SiteHeader current={current} />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
