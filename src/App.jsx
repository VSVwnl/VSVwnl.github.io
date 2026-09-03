import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Preloader from "./components/Preloader.jsx";
import { marqueeItems, contactMarqueeItems } from "./data/profile.js";

// Everything below the fold is code-split so it downloads and parses AFTER the
// hero has painted, instead of blocking first render inside one big bundle.
// Each section keeps its own Suspense boundary (null fallback) so it pops in
// independently as its chunk arrives — no single blank gap, no layout jump.
const FeaturedWork = lazy(() => import("./components/FeaturedWork.jsx"));
const ProjectArchive = lazy(() => import("./components/ProjectArchive.jsx"));
const Awards = lazy(() => import("./components/Awards.jsx"));
const Research = lazy(() => import("./components/Research.jsx"));
const Timeline = lazy(() => import("./components/Timeline.jsx"));
const SkillConstellation = lazy(() => import("./components/SkillConstellation.jsx"));
const Education = lazy(() => import("./components/Education.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

const Deferred = ({ children }) => <Suspense fallback={null}>{children}</Suspense>;

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:text-black"
      >
        Skip to content
      </a>

      <Preloader />

      {/* Film-grain overlay for the whole page. No mix-blend-mode: a blended
          full-screen fixed layer forces the compositor to re-blend everything
          beneath it on every scroll frame. A low-opacity flat grain reads
          nearly identical over the near-black background at a fraction of the cost. */}
      <div
        aria-hidden="true"
        className="noise pointer-events-none fixed inset-0 z-[90] opacity-[0.035]"
      />

      <Navbar />

      <main id="main">
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <Deferred>
          <FeaturedWork />
        </Deferred>
        <Deferred>
          <ProjectArchive />
        </Deferred>
        <Deferred>
          <Awards />
        </Deferred>
        <Deferred>
          <Research />
        </Deferred>
        <Deferred>
          <Timeline />
        </Deferred>
        <Deferred>
          <SkillConstellation />
        </Deferred>
        <Deferred>
          <Education />
        </Deferred>
        <Deferred>
          <Marquee items={contactMarqueeItems} tone="loud" />
          <Contact />
        </Deferred>
      </main>

      <Deferred>
        <Footer />
      </Deferred>
    </MotionConfig>
  );
}
