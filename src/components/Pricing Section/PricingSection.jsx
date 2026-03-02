import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import "./PricingSection.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=80",
];

const DESKTOP_CARDS_PER_PAGE = 4;

function ImageSlider({ images = SLIDES, interval = 2600 }) {
  const [i, setI] = useState(0);
  const timer = useRef(null);

  const go = (next) => {
    setI(() => {
      const n = images.length;
      return ((next % n) + n) % n;
    });
  };

  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  const start = () => {
    stop();
    timer.current = setInterval(() => {
      setI((prevI) => (prevI + 1) % images.length);
    }, interval);
  };

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, interval]);

  return (
    <div
      className="ps-media"
      onMouseEnter={stop}
      onMouseLeave={start}
      onFocus={stop}
      onBlur={start}
    >
      <div className="ps-mediaTrack">
        {images.map((src, idx) => (
          <img
            key={src + idx}
            className={`ps-mediaImg ${idx === i ? "isActive" : ""}`}
            src={src}
            alt=""
            loading="lazy"
            draggable="false"
          />
        ))}
      </div>

      <button
        className="ps-mediaNav ps-mediaNav--left"
        type="button"
        aria-label="Prev"
        onClick={prev}
      >
        <HiChevronLeft />
      </button>
      <button
        className="ps-mediaNav ps-mediaNav--right"
        type="button"
        aria-label="Next"
        onClick={next}
      >
        <HiChevronRight />
      </button>

      <div className="ps-dots" aria-hidden="true">
        {images.map((_, idx) => (
          <span key={idx} className={`ps-dot ${idx === i ? "isActive" : ""}`} />
        ))}
      </div>
    </div>
  );
}

function Card({ title, price, desc, suitedFor }) {
  return (
    <article className="ps-card">
      <ImageSlider />

      <div className="ps-body">
        <div className="ps-top">
          <h3 className="ps-title">{title}</h3>

          <div className="ps-price">
            <div className="ps-price__small">Starting from</div>
            <div className="ps-price__big">{price}</div>
          </div>
        </div>

        <p className="ps-desc">{desc}</p>

        <div className="ps-suited">
          <div className="ps-suited__label">Best Suited For:</div>
          <ul className="ps-suited__list">
            {suitedFor.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function PricingSection() {
  const sections = useMemo(
    () => [
      {
        key: "individuals",
        eyebrow: "WORKHALL PLANS",
        title: "Individuals",
        desc: "Flexible plans for freelancers, consultants and solo professionals who need a polished office environment without long-term overhead.",
        cta: "EXPLORE INDIVIDUAL PLANS",
        items: [
          {
            id: "i-1",
            title: "Air",
            price: "PKR 20,000/mo",
            desc: "Access to an open spot in our shared space. You choose a new spot every time you come in. Hook your laptop, pick a desk, and get to work.",
            suitedFor: [
              "Freelancers",
              "Consultants",
              "Students",
              "Remote Employees",
            ],
          },
          {
            id: "i-2",
            title: "Desk",
            price: "PKR 35,000/mo",
            desc: "A dedicated desk that's yours. Leave your essentials, come back anytime, and work with consistency in a premium shared environment.",
            suitedFor: ["Creators", "Founders", "Remote Teams", "Consultants"],
          },
          {
            id: "i-3",
            title: "Suite",
            price: "PKR 55,000/mo",
            desc: "Private space for focused work. Extra privacy, more comfort, and a setup that feels like your own office without the overhead.",
            suitedFor: [
              "Solo Founders",
              "Executives",
              "Researchers",
              "Designers",
            ],
          },
          {
            id: "i-4",
            title: "Studio",
            price: "PKR 75,000/mo",
            desc: "A compact private studio with storage and meeting credits for independent professionals who want a premium base every day.",
            suitedFor: [
              "Lawyers",
              "Architects",
              "Content Producers",
              "Analysts",
            ],
          },
        ],
      },
      {
        key: "teams",
        eyebrow: "WORKHALL PLANS",
        title: "Teams",
        desc: "Scalable workspace options for startups and growing teams with dedicated seating, collaboration areas and private office upgrades.",
        cta: "VIEW TEAM PLANS",
        items: [
          {
            id: "t-1",
            title: "Air",
            price: "PKR 80,000/mo",
            desc: "Flexible seating for small teams with shared collaboration areas. Great for hybrid teams that need occasional in-person sync.",
            suitedFor: [
              "Startups",
              "Hybrid Teams",
              "Agencies",
              "Project Teams",
            ],
          },
          {
            id: "t-2",
            title: "Desk",
            price: "PKR 140,000/mo",
            desc: "Dedicated seats for your team so everyone has a stable base. Perfect for consistent daily operations and deep work.",
            suitedFor: [
              "Growing Teams",
              "Product Teams",
              "Support Teams",
              "Operations",
            ],
          },
          {
            id: "t-3",
            title: "Suite",
            price: "PKR 220,000/mo",
            desc: "Private team room with controlled access. Meeting-friendly, brandable, and ideal for teams that want full privacy.",
            suitedFor: [
              "Sales Teams",
              "Leadership",
              "Client-Facing Teams",
              "Studios",
            ],
          },
          {
            id: "t-4",
            title: "Office",
            price: "PKR 320,000/mo",
            desc: "A move-in-ready private office cluster for medium teams that need leadership cabins, focused zones, and collaboration tables.",
            suitedFor: [
              "Engineering Teams",
              "Marketing Teams",
              "Finance Teams",
              "Service Teams",
            ],
          },
        ],
      },
      {
        key: "enterprises",
        eyebrow: "WORKHALL PLANS",
        title: "Enterprises",
        desc: "Enterprise-grade workplace plans with security controls, custom branding, and scalable footprints for larger organizations.",
        cta: "CONTACT ENTERPRISE SALES",
        items: [
          {
            id: "en-1",
            title: "Private Floor",
            price: "PKR 550,000/mo",
            desc: "A secured private floor with controlled entry and dedicated support for high-focus enterprise departments.",
            suitedFor: ["Enterprises", "Banks", "Healthcare", "Public Sector"],
          },
          {
            id: "en-2",
            title: "Branded HQ",
            price: "PKR 850,000/mo",
            desc: "Custom branding, executive meeting suites, and client-facing zones designed around your company's operating model.",
            suitedFor: ["Corporate HQ", "Regional Offices", "MNC Teams", "PSX Firms"],
          },
          {
            id: "en-3",
            title: "Multi-City",
            price: "PKR 1,200,000/mo",
            desc: "Multi-location workspace access with centralized billing and policy controls for distributed enterprise teams.",
            suitedFor: [
              "National Teams",
              "Field Operations",
              "Sales Networks",
              "Global Functions",
            ],
          },
          {
            id: "en-4",
            title: "Enterprise Plus",
            price: "Custom Quote",
            desc: "Fully tailored enterprise workplace stack with compliance workflows, integrations, and a dedicated account pod.",
            suitedFor: ["Fortune 500", "Regulated Firms", "Scaleups", "Gov Projects"],
          },
        ],
      },
    ],
    [],
  );

  const sliderPages = useMemo(
    () =>
      sections.map((section) => ({
        key: section.key,
        eyebrow: section.eyebrow,
        title: section.title,
        desc: section.desc,
        cta: section.cta,
        items: section.items,
      })),
    [sections],
  );

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
      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const getHeadDistance = () =>
        Math.max(0, headTrack.scrollWidth - headViewport.clientWidth);

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
          start: "top top+=12",
          end: () => `+=${getDistance() * scrollStretchRef.current}`,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        headTrack,
        {
          x: () => -getHeadDistance(),
          ease: "none",
        },
        0,
      );

      timeline.to(
        track,
        {
          x: () => -getDistance(),
          ease: "none",
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

  // wheel -> horizontal (scroll-trigger feel)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // only convert vertical wheel to horizontal when we can scroll horizontally
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
      ref={sectionRef}
      className="ps-section2"
      style={{ "--ps-cards-per-page": DESKTOP_CARDS_PER_PAGE }}
    >
      <div ref={containerRef} className="ps-container2">
        <div ref={headViewportRef} className="ps-headSplit">
          <div ref={headTrackRef} className="ps-headSplitTrack">
            {sliderPages.map((p, idx) => (
              <div
                key={`${p.key}-split`}
                className={`ps-headSplitCol ${idx === 0 ? "isFirst" : ""}`}
              >
                <div className="ps-headSplitEyebrow">{p.eyebrow}</div>
                <h2 className="ps-headSplitTitle">{p.title}</h2>
              </div>
            ))}
          </div>
        </div>

        <div ref={viewportRef} className="ps-viewport">
          <div ref={trackRef} className="ps-track">
            {sliderPages.map((p, idx) => (
              <div
                key={p.key}
                className={`ps-page ${
                  idx === 0
                    ? "isFirst"
                    : idx === sliderPages.length - 1
                      ? "isLast"
                      : "isMiddle"
                }`}
              >
                <header className="ps-pageHead">
                  <div className="ps-eyebrow">
                    <span className="ps-dotMini" />
                    {p.eyebrow}
                  </div>
                  <h2 className="ps-bigTitle">{p.title}</h2>

                  <div className="ps-pageFooterText">
                    <p className="ps-pageDesc">{p.desc}</p>
                    <a className="ps-pageCta" href="#">
                      {p.cta} <span aria-hidden="true">&gt;</span>
                    </a>
                  </div>
                </header>

                <div
                  className="ps-grid3"
                  style={{
                    "--ps-columns-this-page": Math.min(
                      p.items.length,
                      DESKTOP_CARDS_PER_PAGE,
                    ),
                  }}
                >
                  {p.items.map((it) => (
                    <Card key={it.id} {...it} />
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
