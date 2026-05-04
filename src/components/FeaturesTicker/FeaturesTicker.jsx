import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiMiniTruck,
  HiMiniClock,
  HiMiniUsers,
  HiMiniBolt,
  HiMiniHeart,
  HiMiniShieldCheck,
  HiMiniCalendarDays,
  HiMiniWifi,
  HiMiniSparkles,
  HiMiniHome,
  HiMiniStar,
  HiMiniMapPin,
} from "react-icons/hi2";
import "./FeaturesTicker.css";

gsap.registerPlugin(ScrollTrigger);

const ROW1 = [
  {
    label: "Free Gated Parking At Every Location",
    icon: HiMiniTruck,
    color: "#c4522a",
  },
  {
    label: "Open 24/7, 365 Days With Full Access",
    icon: HiMiniClock,
    color: "#b24d8a",
  },
  {
    label: "Service Staff At Your Own Desks",
    icon: HiMiniUsers,
    color: "#2a6647",
  },
  {
    label: "Custom Office Or Desk Layouts",
    icon: HiMiniStar,
    color: "#3d5faa",
  },
  {
    label: "EV Charging Stations For All Wheelers",
    icon: HiMiniBolt,
    color: "#c4522a",
  },
  {
    label: "Real Green Spaces",
    icon: HiMiniHome,
    color: "#b24d8a",
  },
];

const ROW2 = [
  {
    label: "On Site Car and Bike Cleaning",
    icon: HiMiniSparkles,
    color: "#2a6647",
  },
  {
    label: "Permission To Bring Your Pets",
    icon: HiMiniHeart,
    color: "#3d5faa",
  },
  {
    label: "Quiet and Secure Peaceful Environment",
    icon: HiMiniShieldCheck,
    color: "#c4522a",
  },
  {
    label: "Indoor & Outdoor Dining Spaces",
    icon: HiMiniMapPin,
    color: "#b24d8a",
  },
  {
    label: "Member-Only Events & Workshops",
    icon: HiMiniCalendarDays,
    color: "#2a6647",
  },
  {
    label: "High-Speed Fiber & Backup Power",
    icon: HiMiniWifi,
    color: "#3d5faa",
  },
];

function TickerPill({ label, icon: Icon, color }) {
  return (
    <div className="ft-pill" style={{ backgroundColor: color }}>
      <span className="ft-iconBox" aria-hidden="true">
        <Icon />
      </span>

      <span className="ft-label">{label}</span>
    </div>
  );
}

export default function FeaturesTicker() {
  const sectionRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;

    if (!section || !track1 || !track2) return;

    const ctx = gsap.context(() => {
      gsap.set(track1, {
        xPercent: 0,
        force3D: true,
      });

      gsap.set(track2, {
        xPercent: -10,
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          end: "bottom 5%",
          scrub: 2.4,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        track1,
        {
          xPercent: -12,
          ease: "none",
        },
        0,
      ).to(
        track2,
        {
          xPercent: 2,
          ease: "none",
        },
        0,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const row1Items = [...ROW1, ...ROW1, ...ROW1];
  const row2Items = [...ROW2, ...ROW2, ...ROW2];

  return (
    <section
      ref={sectionRef}
      className="ft-section"
      aria-label="Workspace features"
    >
      <div className="ft-row">
        <div ref={track1Ref} className="ft-track">
          {row1Items.map((item, index) => (
            <TickerPill key={`row-1-${index}`} {...item} />
          ))}
        </div>
      </div>

      <div className="ft-row">
        <div ref={track2Ref} className="ft-track">
          {row2Items.map((item, index) => (
            <TickerPill key={`row-2-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
