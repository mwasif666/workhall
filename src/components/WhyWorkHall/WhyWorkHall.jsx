import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhyWorkHall.css";

gsap.registerPlugin(ScrollTrigger);

const GIVE_FEATURES = [
  "Free Gated Parking At Every Location",
  "Open 24/7, 365 Days with Full Access",
  "Service Staff at Your Own Desks",
  "Custom Office Or Desk Layouts",
  "EV Charging Stations For All Wheelers",
  "Real Green Spaces",
  "On Site Car and Bike Cleaning",
  "Permission To Bring Your Pets",
  "Quiet and Secure Peaceful Environment",
  "Indoor & Outdoor Dining Spaces",
  "Member-Only Events & Workshops",
  "High-Speed Fiber & Backup Power",
];

const NO_FEATURES = [
  "No Hidden Fees",
  "No Surprise Charges",
  "No Compromises Ever.",
];

export default function WhyWorkHall() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const p1 = panel1Ref.current;
    const p2 = panel2Ref.current;
    if (!section || !stage || !p1 || !p2) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 860px)", () => {
      // Panels start fully below the stage; they'll rise into view on scroll.
      gsap.set([p1, p2], { yPercent: 100, force3D: true });

      // Timeline plan (units = 1 viewport of scroll each):
      //   0.0 -> 1.0  ENTER 1 : Panel 1 rises from below, fully settles.
      //   1.0 -> 2.0  STACK   : Panel 2 rises IMMEDIATELY (no hold) and
      //                         stacks over panel 1. Panel 2 is positioned
      //                         with a larger top inset so panel 1's top
      //                         edge stays visible as a peek — giving the
      //                         clean visible gap between the two cards.
      const ENTER = 1;
      const STACK = 1;
      const TOTAL = ENTER + STACK;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * TOTAL}`,
          pin: stage,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(p1, { yPercent: 0, ease: "power2.out", duration: ENTER }, 0).to(
        p2,
        { yPercent: 0, ease: "power2.out", duration: STACK },
        ENTER,
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([p1, p2], { clearProps: "transform" });
      };
    });

    mm.add("(max-width: 859px)", () => {
      // No pin on mobile — panels flow naturally and fade-up into view.
      gsap.set([p1, p2], { clearProps: "transform" });

      const triggers = [p1, p2].map((panel) =>
        gsap.fromTo(
          panel,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        ),
      );

      return () => {
        triggers.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="wwh-section" id="why-work-hall">
      <div ref={stageRef} className="wwh-stage">
        <div className="wwh-intro">
          <div className="wwh-eyebrow">
            <span className="wwh-eyebrowDot" aria-hidden="true" />
            Why Work Hall
          </div>
          <h2 className="wwh-title">
            still, why should you choose
            <br />
            Work Hall over any other
            <br />
            coworking space?
          </h2>
        </div>

        <div ref={panel1Ref} className="wwh-panel wwh-panel--one">
          <div className="wwh-panelInner wwh-panelInner--wide">
            <div className="wwh-panelLeft">
              <ul className="wwh-featuresGrid">
                {GIVE_FEATURES.map((label) => (
                  <li key={label} className="wwh-featureItem">
                    <span className="wwh-featureTile" aria-hidden="true" />
                    <span className="wwh-featureLabel">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="wwh-panelRight">
              <h3 className="wwh-panelTitle">
                because we give
                <br />
                you everything
                <br />
                you need,
              </h3>
            </div>
          </div>
        </div>

        <div ref={panel2Ref} className="wwh-panel wwh-panel--two">
          <div className="wwh-panelInner">
            <div className="wwh-panelLeft">
              <ul className="wwh-featuresList">
                {NO_FEATURES.map((label) => (
                  <li key={label} className="wwh-featureItem">
                    <span className="wwh-featureTile" aria-hidden="true" />
                    <span className="wwh-featureLabel">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="wwh-panelRight">
              <h3 className="wwh-panelTitle">
                and nothing
                <br />
                you don&apos;t.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
