import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiChevronLeft,
  HiChevronRight,
  HiMiniArrowUpRight,
} from "react-icons/hi2";
import "./PricingSection.css";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_CARDS_PER_PAGE = 3;

const OFFICE_IMAGES = {
  individuals: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=80",
  ],
  teams: [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
  ],
  enterprise: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
  ],
};

const PLAN_GROUPS = [
  {
    key: "individuals",
    eyebrow: "Plans",
    title: "Individuals",
    desc: "Flexible workspace options for freelancers, consultants, and solo professionals who need a polished environment without the long-term office overhead.",
    cta: "Explore Individual Plans",
    items: [
      {
        id: "individuals-air",
        title: "Air",
        learnMore: "#",
        desc: "Access to shared seating whenever you need focused work. Plug in, settle down, and get moving without the commitment of a fixed desk.",
        suitedFor: [
          "Freelancers",
          "Consultants",
          "Students",
          "Remote Employees",
        ],
        images: OFFICE_IMAGES.individuals,
      },
      {
        id: "individuals-desk",
        title: "Desk",
        learnMore: "#",
        desc: "Your own dedicated desk, ready every day. Leave your monitor, keep your setup intact, and work with consistency in a premium shared space.",
        suitedFor: ["Creators", "Founders", "Analysts", "Solo Operators"],
        images: [...OFFICE_IMAGES.individuals].reverse(),
      },
      {
        id: "individuals-nox",
        title: "Nox",
        learnMore: "#",
        desc: "Shared or fixed desk access at a reduced rate. Same space, same amenities, same great community, just during the quieter hours of the night.",
        suitedFor: [
          "Budget-Conscious Freelancers",
          "Overseas Client Work",
          "Part-Time Workers",
          "Night Owls",
        ],
        images: OFFICE_IMAGES.individuals.slice(1),
      },
    ],
  },
  {
    key: "teams",
    eyebrow: "Plans",
    title: "Teams",
    desc: "Scalable workspace solutions for startups and growing teams that need dedicated seating, collaboration room, and private office flexibility.",
    cta: "View Team Plans",
    items: [
      {
        id: "teams-base",
        title: "Base",
        learnMore: "#",
        desc: "Dedicated desks for your whole team in a shared environment. Sit together, collaborate freely, and stay close to the energy of a full community.",
        suitedFor: [
          "Startups",
          "Growing Businesses",
          "Small Team Pods",
          "Agencies",
        ],
        images: OFFICE_IMAGES.teams,
      },
      {
        id: "teams-box",
        title: "Box",
        learnMore: "#",
        desc: "A private, lockable office that is entirely yours. Confidential, personal, and set up exactly the way your team wants it.",
        suitedFor: [
          "Studios",
          "Founder Teams",
          "Client-Facing Teams",
          "Operations",
        ],
        images: [...OFFICE_IMAGES.teams].reverse(),
      },
      {
        id: "teams-suite",
        title: "Suite",
        learnMore: "#",
        desc: "A fully private suite with room to grow. Build out leadership cabins, collaboration areas, and custom layouts around your workflow.",
        suitedFor: [
          "Product Teams",
          "Sales Teams",
          "Support Teams",
          "Scaling Startups",
        ],
        images: OFFICE_IMAGES.teams.slice(1),
      },
    ],
  },
  {
    key: "enterprises",
    eyebrow: "Plans",
    title: "Enterprises",
    desc: "Enterprise-grade workplace plans with privacy controls, custom branding, and larger footprints for organizations that need more structure.",
    cta: "Contact Enterprise Sales",
    items: [
      {
        id: "enterprise-hq",
        title: "HQ",
        learnMore: "#",
        desc: "A branded headquarters environment designed around your workflows with secure access, polished reception, and executive-ready meeting space.",
        suitedFor: [
          "Corporate HQ",
          "Regional Offices",
          "Leadership Teams",
          "MNCs",
        ],
        images: OFFICE_IMAGES.enterprise,
      },
      {
        id: "enterprise-floor",
        title: "Floor",
        learnMore: "#",
        desc: "A private floor with controlled access and dedicated support staff. Ideal for departments that need privacy, scale, and uninterrupted operations.",
        suitedFor: [
          "Banks",
          "Healthcare",
          "Public Sector",
          "Compliance-Heavy Teams",
        ],
        images: [...OFFICE_IMAGES.enterprise].reverse(),
      },
      {
        id: "enterprise-custom",
        title: "Custom",
        learnMore: "#",
        desc: "Tailored multi-site workspace planning with custom layouts, centralized billing, and operational flexibility for large distributed organizations.",
        suitedFor: [
          "National Teams",
          "Enterprise Sales",
          "Field Operations",
          "Global Functions",
        ],
        images: OFFICE_IMAGES.enterprise.slice(1),
      },
    ],
  },
];

function ImageSlider({ images, title, interval = 2800 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const frameCount = images.length;

  const stop = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = () => {
    if (frameCount <= 1) return;
    stop();
    timerRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % frameCount);
    }, interval);
  };

  const goPrev = () => {
    setIndex((current) => (current - 1 + frameCount) % frameCount);
  };

  const goNext = () => {
    setIndex((current) => (current + 1) % frameCount);
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, interval]);

  return (
    <div
      className="ps-media"
      onMouseEnter={stop}
      onMouseLeave={start}
      onFocus={stop}
      onBlur={start}
    >
      <div className="ps-mediaTrack">
        {images.map((src, imageIndex) => (
          <img
            key={`${title}-${src}-${imageIndex}`}
            className={`ps-mediaImg ${imageIndex === index ? "isActive" : ""}`}
            src={src}
            alt={`${title} workspace`}
            loading="lazy"
            draggable="false"
          />
        ))}
      </div>

      {frameCount > 1 && (
        <>
          <button
            className="ps-mediaNav ps-mediaNav--left"
            type="button"
            aria-label={`Previous ${title} image`}
            onClick={goPrev}
          >
            <HiChevronLeft />
          </button>
          <button
            className="ps-mediaNav ps-mediaNav--right"
            type="button"
            aria-label={`Next ${title} image`}
            onClick={goNext}
          >
            <HiChevronRight />
          </button>

          <div className="ps-dots" aria-hidden="true">
            {images.map((_, imageIndex) => (
              <span
                key={`${title}-dot-${imageIndex}`}
                className={`ps-dot ${imageIndex === index ? "isActive" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PlanCard({ title, learnMore, desc, suitedFor, images }) {
  return (
    <article className="ps-card">
      <ImageSlider images={images} title={title} />

      <div className="ps-cardBody">
        <div className="ps-cardTitleRow">
          <h3 className="ps-cardTitle">{title}</h3>
          <span className="ps-cardDivider" aria-hidden="true" />
          <a className="ps-cardLink" href={learnMore}>
            Learn More
            <HiMiniArrowUpRight />
          </a>
        </div>

        <p className="ps-cardDesc">{desc}</p>

        <div className="ps-cardSuit">
          <div className="ps-cardSuitLabel">Best Suited For:</div>
          <ul className="ps-cardSuitList">
            {suitedFor.map((item) => (
              <li key={`${title}-${item}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function PricingSection() {
  const sliderPages = useMemo(() => PLAN_GROUPS, []);

  const headViewportRef = useRef(null);
  const headTrackRef = useRef(null);
  const viewportRef = useRef(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const gsapModeRef = useRef(false);
  const scrollStretchRef = useRef(1.2);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const headViewport = headViewportRef.current;
    const headTrack = headTrackRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (
      !section ||
      !container ||
      !headViewport ||
      !headTrack ||
      !viewport ||
      !track
    ) {
      return;
    }

    const resetGsapMode = () => {
      section.classList.remove("isGsapMode");
      gsap.set([headTrack, track], { clearProps: "transform" });
      gsapModeRef.current = false;
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 640px)", () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);
      const segmentCount = Math.max(1, sliderPages.length - 1);

      if (getDistance() <= 0) {
        resetGsapMode();
        return undefined;
      }

      section.classList.add("isGsapMode");
      gsapModeRef.current = true;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: container,
          start: "top top",
          end: () => `+=${getDistance() * scrollStretchRef.current}`,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        track,
        {
          x: () => -getDistance(),
          ease: "none",
          duration: segmentCount,
        },
        0,
      );

      ScrollTrigger.refresh();

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        resetGsapMode();
      };
    });

    mm.add("(max-width: 639px)", () => {
      resetGsapMode();
    });

    return () => {
      mm.revert();
      resetGsapMode();
    };
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (gsapModeRef.current) return;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      id="plans"
      ref={sectionRef}
      className="ps-section2"
      style={{ "--ps-cards-per-page": DESKTOP_CARDS_PER_PAGE }}
    >
      <div ref={containerRef} className="ps-container2">
        <div ref={headViewportRef} className="ps-headSplit">
          <div ref={headTrackRef} className="ps-headSplitTrack">
            {sliderPages.map((page, index) => (
              <div
                key={`${page.key}-split`}
                className={`ps-headSplitCol ${index === 0 ? "isFirst" : ""}`}
              >
                <div className="ps-headSplitEyebrow">{page.eyebrow}</div>
                <h2 className="ps-headSplitTitle">{page.title}</h2>
              </div>
            ))}
          </div>
        </div>

        <div ref={viewportRef} className="ps-viewport">
          <div ref={trackRef} className="ps-track">
            {sliderPages.map((page, index) => (
              <div
                key={page.key}
                className={`ps-page ${
                  index === 0
                    ? "isFirst"
                    : index === sliderPages.length - 1
                      ? "isLast"
                      : "isMiddle"
                }`}
              >
                <header className="ps-pageHead">
                  <div className="ps-eyebrow">
                    <span className="ps-dotMini" aria-hidden="true" />
                    {page.eyebrow}
                  </div>
                  <h2 className="ps-bigTitle">{page.title}</h2>

                  {/* <div className="ps-pageFooterText">
                    <p className="ps-pageDesc">{page.desc}</p>
                    <a className="ps-pageCta" href="#">
                      {page.cta} <span aria-hidden="true">&gt;</span>
                    </a>
                  </div> */}
                </header>

                <div
                  className="ps-grid3"
                  style={{
                    "--ps-columns-this-page": Math.min(
                      page.items.length,
                      DESKTOP_CARDS_PER_PAGE,
                    ),
                  }}
                >
                  {page.items.map((item) => (
                    <PlanCard key={item.id} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
