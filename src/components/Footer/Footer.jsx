import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { HiArrowUpRight, HiOutlineCalendarDays } from "react-icons/hi2";
import "./Footer.css";

const Lanyard = lazy(() => import("./Lanyard"));

const exploreLinks = [
  { label: "Plans", href: "#plans" },
  { label: "Locations", href: "#locations", featured: true },
  { label: "Purpose Halls", href: "#purpose-halls" },
  { label: "Testimonials", href: "#testimonials" },
];

const aboutLinks = [
  { label: "Why Work Hall", href: "#why-work-hall" },
  { label: "Community", href: "#community" },
  { label: "Private Offices", href: "#plans" },
  { label: "Book a Visit", href: "#locations", featured: true },
];

function FooterLink({ href, label, featured = false }) {
  return (
    <a className="whf-link" href={href}>
      <span>{label}</span>
      {featured ? <HiArrowUpRight aria-hidden="true" /> : null}
    </a>
  );
}

export default function Footer() {
  const lanyardRef = useRef(null);
  const [showLanyard, setShowLanyard] = useState(false);

  useEffect(() => {
    if (!lanyardRef.current || showLanyard) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setShowLanyard(true);
          observer.disconnect();
        });
      },
      { rootMargin: "260px 0px" },
    );

    observer.observe(lanyardRef.current);

    return () => observer.disconnect();
  }, [showLanyard]);

  return (
    <footer className="whf-shell">
      <div className="whf-frame">
        <div className="whf-grid">
          <div className="whf-intro">
            <span className="whf-kicker">Work Hall</span>
            <h2 className="whf-title">
              Work Hall, shaping calmer workdays for founders, freelancers, and
              growing teams.
            </h2>
            <p className="whf-copy">
              From focused desk time to polished client meetings, our Karachi
              workspaces are built to keep momentum high and the day feeling
              effortless.
            </p>
            <p className="whf-note">
              Built for Karachi teams.
              <br />
              Designed for everyday flow.
            </p>
          </div>

          <div className="whf-col">
            <span className="whf-colTitle">Explore</span>
            <div className="whf-links">
              {exploreLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
            <a className="whf-contactLink" href="#locations">
              Contact us
            </a>
          </div>

          <div className="whf-col">
            <span className="whf-colTitle">About</span>
            <div className="whf-links">
              {aboutLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          <div className="whf-visualCol">
            <a className="whf-cta" href="#locations">
              <span>Book a Tour</span>
              <span className="whf-ctaIcon" aria-hidden="true">
                <HiOutlineCalendarDays />
              </span>
            </a>

            <div className="whf-lanyardCard">
              <div className="whf-lanyardMeta">
                <div>
                  <span className="whf-colTitle">Member Pass</span>
                  <p>
                    Social links are replaced with an interactive badge
                    preview. Drag it around to see the motion.
                  </p>
                </div>
              </div>

              <div className="whf-lanyardStage" ref={lanyardRef}>
                <div className="whf-lanyardGlow" aria-hidden="true" />
                {showLanyard ? (
                  <Suspense fallback={<div className="whf-lanyardFallback" />}>
                    <Lanyard
                      position={[0, 0, 18]}
                      gravity={[0, -32, 0]}
                      fov={22}
                    />
                  </Suspense>
                ) : (
                  <div className="whf-lanyardFallback" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="whf-bottom">
          <span>© 2026 Work Hall</span>
          <a href="#plans">Privacy Policy</a>
          <a href="#locations">Terms &amp; Booking</a>
        </div>
      </div>
    </footer>
  );
}
