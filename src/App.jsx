import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import FeaturedWork from "./components/FeaturedWork.jsx";
import ProjectArchive from "./components/ProjectArchive.jsx";
import Awards from "./components/Awards.jsx";
import Research from "./components/Research.jsx";
import Timeline from "./components/Timeline.jsx";
import SkillConstellation from "./components/SkillConstellation.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Preloader from "./components/Preloader.jsx";
import { marqueeItems, contactMarqueeItems } from "./data/profile.js";

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
      <CursorGlow />

      {/* Film-grain overlay for the whole page */}
      <div
        aria-hidden="true"
        className="noise pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-overlay"
      />

      <Navbar />

      <main id="main">
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <FeaturedWork />
        <ProjectArchive />
        <Awards />
        <Research />
        <Timeline />
        <SkillConstellation />
        <Education />
        <Marquee items={contactMarqueeItems} tone="loud" />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
