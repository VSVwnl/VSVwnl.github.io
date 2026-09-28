import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "../data/profile.js";

export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer theme-dark">
      <div className="stage">
        <div className="footer-main">
          <div>
            <p className="eyebrow">Have something in mind?</p>
            <h2>
              Let’s make
              <br />
              it work<span className="accent">.</span>
            </h2>
          </div>
          <div className="footer-contact">
            <p>Open to software, XR, games, and applied AI opportunities.</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={23} aria-hidden="true" />
            </a>
            <div className="footer-links">
              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    {s.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ))}
              <a
                href={profile.resume.primary.href}
                download
                className="text-link"
              >
                Resume ↓
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vishnu Sai Bodapati</p>
          <p>Built with care. Made to be explored.</p>
          <a href="#main" className="text-link">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
