import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { useEffect, useRef } from "react";
import { setupPageMotion } from "../lib/page-motion.js";
export default function Page({ current, children }) {
  const main = useRef(null);
  useEffect(() => setupPageMotion(main.current), []);
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current={current} />
      <main id="main" tabIndex={-1} ref={main}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
