import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "../data/profile.js";

export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer theme-dark">
      <div className="stage">
        <div className="footer-main">
          <div className="footer-contact">
            <p>Have an opportunity in mind?</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={19} aria-hidden="true" /></a>
          </div>
          <div className="footer-links">
            {socials.filter(s => s.label !== "Email").map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-link">{s.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
            <a href={profile.resume.primary.href} download className="text-link">Resume ↓</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vishnu Sai Bodapati</p>
          <a href="#main" className="text-link">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
