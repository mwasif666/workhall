import { useState, useRef, useLayoutEffect } from "react";
import { flushSync } from "react-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Testimonials.css";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: "t1",
    stat: "3x",
    statLabel: "Boost in team productivity",
    quote:
      "Work Hall's meeting rooms are genuinely world-class. Premium AV, zero noise — we closed our biggest client deal right here.",
    tags: ["Premium AV Setup", "Zero Distractions"],
    name: "Ahmed Raza",
    role: "Co-Founder, TechLaunch PK",
    avatar: "AR",
    cardBg: "#dbe8df",
    mainImg:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    sideImg:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80",
    metricValue: "12",
    metricSub: "client deals closed",
    metricFrom: "Month 1",
    metricTo: "Month 6",
  },
  {
    id: "t2",
    stat: "2x",
    statLabel: "Growth in monthly deliverables",
    quote:
      "The studio at Work Hall is fully loaded — lights, backdrops, recording setup. I take on twice the projects and deliver faster than ever.",
    tags: ["Studio Equipment", "24/7 Access"],
    name: "Sara Mahmood",
    role: "Creative Director",
    avatar: "SM",
    cardBg: "#dde5f5",
    mainImg:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=80",
    sideImg:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=80",
    metricValue: "18",
    metricSub: "projects per month",
    metricFrom: "Month 1",
    metricTo: "Month 5",
  },
  {
    id: "t3",
    stat: "40%",
    statLabel: "Reduction in overhead costs",
    quote:
      "The Day Pass is perfect for me. I get a premium office whenever I need one — no rent, no commitment, just pure focus.",
    tags: ["No Commitment", "Flexible Hours"],
    name: "Omar Bilal",
    role: "Freelance Consultant",
    avatar: "OB",
    cardBg: "#f0e8d5",
    mainImg:
      "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=900&q=80",
    sideImg:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=500&q=80",
    metricValue: "14",
    metricSub: "days used per month",
    metricFrom: "Month 1",
    metricTo: "Month 4",
  },
  {
    id: "t4",
    stat: "100%",
    statLabel: "Remote business credibility",
    quote:
      "A real Karachi business address through Work Hall completely changed how clients see us. We look established from day one.",
    tags: ["Business Address", "Mail Handling"],
    name: "Fatima Riaz",
    role: "E-Commerce Brand Owner",
    avatar: "FR",
    cardBg: "#e8daf0",
    mainImg:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
    sideImg:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80",
    metricValue: "92%",
    metricSub: "client trust increase",
    metricFrom: "Month 1",
    metricTo: "Month 5",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[current];

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statCardRef = useRef(null);
  const mainImgRef = useRef(null);
  const sideImgRef = useRef(null);
  const metricCardRef = useRef(null);
  const navTimelineRef = useRef(null);
  const isSwitchingRef = useRef(false);

  const getAnimatedCards = () =>
    [
      statCardRef.current,
      mainImgRef.current,
      sideImgRef.current,
      metricCardRef.current,
    ].filter(Boolean);

  const goTo = (nextIndex, direction) => {
    if (isSwitchingRef.current || nextIndex === current) return;

    const cards = getAnimatedCards();
    if (!cards.length) {
      setCurrent(nextIndex);
      return;
    }

    navTimelineRef.current?.kill();
    isSwitchingRef.current = true;
    setIsSwitching(true);

    const exitOffset = direction > 0 ? -26 : 26;
    const enterOffset = direction > 0 ? 28 : -28;

    navTimelineRef.current = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        isSwitchingRef.current = false;
        setIsSwitching(false);
      },
    });

    navTimelineRef.current
      .to(cards, {
        autoAlpha: 0,
        y: exitOffset,
        scale: 0.985,
        duration: 0.18,
        stagger: { each: 0.07, from: direction > 0 ? "start" : "end" },
        overwrite: "auto",
      })
      .add(() => {
        flushSync(() => setCurrent(nextIndex));
        gsap.set(cards, {
          y: enterOffset,
          scale: 0.985,
        });
      })
      .to(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: { each: 0.09, from: "start" },
        clearProps: "transform,opacity,visibility",
        overwrite: "auto",
      });
  };

  const prev = () => goTo((current - 1 + total) % total, -1);
  const next = () => goTo((current + 1) % total, 1);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Header row */
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      /* Left stat card — slides from left */
      gsap.from(statCardRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statCardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      /* Right items — staggered from bottom */
      const rightEls = [
        mainImgRef.current,
        sideImgRef.current,
        metricCardRef.current,
      ].filter(Boolean);

      gsap.from(rightEls, {
        y: 50,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.13,
        scrollTrigger: {
          trigger: mainImgRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    return () => navTimelineRef.current?.kill();
  }, []);

  return (
    <section className="ts-section" id="testimonials" ref={sectionRef}>
      <div className="ts-wrap">
        {/* ── Header ── */}
        <div className="row align-items-end mb-4 g-0" ref={headerRef}>
          <div className="col">
            <p className="ts-eyebrow">TESTIMONIALS</p>
            <h2 className="ts-heading">Their words, not ours</h2>
          </div>
          <div className="col-auto d-flex gap-2">
            <button
              className="ts-navBtn"
              onClick={prev}
              aria-label="Previous testimonial"
              disabled={isSwitching}
            >
              <HiChevronLeft />
            </button>
            <button
              className="ts-navBtn"
              onClick={next}
              aria-label="Next testimonial"
              disabled={isSwitching}
            >
              <HiChevronRight />
            </button>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="ts-grid">
          {/* Left stat card */}
          <div className="ts-gridItem ts-gridItem--stat" ref={statCardRef}>
            <div className="ts-statCard" style={{ background: t.cardBg }}>
              <div>
                <div className="ts-stat">{t.stat}</div>
                <div className="ts-statLabel">{t.statLabel}</div>
              </div>

              <p className="ts-quote">&ldquo;{t.quote}&rdquo;</p>

              <div className="ts-tags">
                {t.tags.map((tag) => (
                  <span key={tag} className="ts-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="ts-person">
                <div>
                  <div className="ts-name">{t.name}</div>
                  <div className="ts-role">{t.role}</div>
                </div>
                <div className="ts-ball" />
              </div>
            </div>
          </div>

          {/* Main large image */}
          <div className="ts-gridItem ts-gridItem--main" ref={mainImgRef}>
            <div className="ts-mainImg">
              <img src={t.mainImg} alt={t.name} />
              <button className="ts-playBtn" aria-label="Watch video">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span className="ts-avatarBadge">{t.avatar}</span>
            </div>
          </div>

          {/* Side image */}
          <div className="ts-gridItem ts-gridItem--side" ref={sideImgRef}>
            <div className="ts-sideImg">
              <img src={t.sideImg} alt="" />
              <span className="ts-avatarBadge ts-avatarBadge--center">
                {t.avatar}
              </span>
            </div>
          </div>

          {/* Metric / graph card */}
          <div className="ts-gridItem ts-gridItem--metric" ref={metricCardRef}>
            <div className="ts-metricCard">
              <div className="ts-metricTop">
                <span className="ts-metricSub">{t.metricSub}</span>
                <span className="ts-metricValue">{t.metricValue}</span>
              </div>

              <div className="ts-graph" aria-hidden="true">
                <svg
                  viewBox="0 0 200 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 78 C40 72 70 60 100 45 C130 30 160 18 192 10"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="10" r="5" fill="#fff" />
                </svg>
              </div>

              <div className="ts-graphLabels">
                <span>{t.metricFrom}</span>
                <span>{t.metricTo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
