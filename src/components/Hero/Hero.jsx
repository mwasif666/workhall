import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  HiChevronDown,
  HiMiniArrowUpRight,
  HiPlus,
  HiMinus,
} from "react-icons/hi2";
import "./Hero.css";

const getSeededLocationImage = (title) =>
  `https://picsum.photos/seed/${encodeURIComponent(`workhall-location-${title}`)}/900/560`;

const HERO_KEYWORDS = [
  "COMPANY OWNER",
  "TEAM MANAGER",
  "HR / ADMIN",
  "TEAM MEMBER",
];

export default function Hero() {
  const locations = useMemo(
    () => [
      { title: "DHA Karachi", desc: "Phase 6, main boulevard" },
      { title: "Clifton", desc: "Block 5, sea view side" },
      { title: "Shahrah-e-Faisal", desc: "Main road, easy access" },
      { title: "Gulshan", desc: "Near Civic Center" },
      { title: "Islamabad", desc: "Blue Area, central" },
      { title: "Lahore", desc: "Gulberg, premium zone" },
    ],
    [],
  );

  const [friends, setFriends] = useState(3);
  const [locOpen, setLocOpen] = useState(false);
  const [location, setLocation] = useState("Choose a Location");

  const locRef = useRef(null);
  const closeTimer = useRef(null);
  const heroKeywordRef = useRef(null);

  const closeLoc = () => setLocOpen(false);

  useEffect(() => {
    const onDown = (e) => {
      if (!locRef.current) return;
      if (!locRef.current.contains(e.target)) closeLoc();
    };

    const onEsc = (e) => {
      if (e.key === "Escape") closeLoc();
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => {
    const keywordNode = heroKeywordRef.current;
    if (!keywordNode || HERO_KEYWORDS.length === 0) return undefined;

    let index = 0;
    keywordNode.textContent = HERO_KEYWORDS[index];

    const loop = gsap.timeline({
      repeat: -1,
      repeatDelay: 2.2,
    });

    loop
      .to(keywordNode, {
        y: -20,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          index = (index + 1) % HERO_KEYWORDS.length;
          keywordNode.textContent = HERO_KEYWORDS[index];
          gsap.set(keywordNode, { y: 20 });
        },
      })
      .to(keywordNode, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });

    return () => {
      loop.kill();
    };
  }, []);

  const openLoc = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setLocOpen(true);
  };

  const scheduleCloseLoc = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setLocOpen(false), 140);
  };

  return (
    <div className="hero">
      <div className="hero__container">
        <div className="hero__box">
          <h1 className="hero__title">
            <span className="hero__titleLine">Find Your Ideal Workspace For</span>
            <span className="hero__titleKeywordWrap">
              <span ref={heroKeywordRef} className="hero__titleKeyword">
                {HERO_KEYWORDS[0]}
              </span>
            </span>
          </h1>

          <div className="hero__controls">
            <div className="hPill hPill--friends">
              <div className="hPill__icon" />

              <div className="hPill__txt">
                <div className="hPill__label">How Many Friends?</div>
                <div className="hPill__sub">
                  Select number of desks you need
                </div>
              </div>

              <div className="hCounter">
                <button
                  className="hCounter__btn"
                  type="button"
                  onClick={() => setFriends((v) => Math.max(1, v - 1))}
                  aria-label="Decrease"
                >
                  <HiMinus />
                </button>

                <div className="hCounter__val">
                  {String(friends).padStart(2, "0")}
                </div>

                <button
                  className="hCounter__btn"
                  type="button"
                  onClick={() => setFriends((v) => Math.min(99, v + 1))}
                  aria-label="Increase"
                >
                  <HiPlus />
                </button>
              </div>
            </div>

            <div
              id="loc"
              className={`hDrop ${locOpen ? "open" : ""}`}
              ref={locRef}
              onMouseEnter={openLoc}
              onMouseLeave={scheduleCloseLoc}
            >
              <button
                className="hPill hPill--loc hDrop__trigger"
                type="button"
                aria-expanded={locOpen}
                onClick={() => setLocOpen((v) => !v)}
              >
                <div className="hPill__icon" />

                <div className="hPill__txt">
                  <div className="hPill__label">Choose a Location</div>
                  <div className="hPill__sub">
                    {location === "Choose a Location"
                      ? "All locations to choose as per plans"
                      : location}
                  </div>
                </div>

                <span className="cs-iconSwap hPill__endIcon" aria-hidden="true">
                  <span className="cs-iconSwap__a">
                    <HiChevronDown />
                  </span>
                  <span className="cs-iconSwap__b">
                    <HiChevronDown />
                  </span>
                </span>

                <span className="hPill__swapText" aria-hidden="true">
                  <span className="hSwap__a">Browse</span>
                  <span className="hSwap__b">Browse -&gt;</span>
                </span>
              </button>

              {locOpen && (
                <div className="hDrop__menu">
                  <div className="hDrop__grid">
                    {locations.map((l) => (
                      <button
                        key={l.title}
                        type="button"
                        className="hDropCard"
                        style={{
                          backgroundImage: `
                            linear-gradient(180deg, rgba(6, 20, 95, 0.12) 0%, rgba(6, 20, 95, 0.78) 100%),
                            linear-gradient(130deg, rgba(16, 46, 255, 0.84) 0%, rgba(6, 18, 118, 0.78) 58%, rgba(5, 12, 58, 0.92) 100%),
                            url("${getSeededLocationImage(l.title)}")
                          `,
                        }}
                        onClick={() => {
                          setLocation(l.title);
                          setLocOpen(false);
                        }}
                      >
                        <span
                          className="hDropCard__arrow cs-iconSwap"
                          aria-hidden="true"
                        >
                          <span className="cs-iconSwap__a">
                            <HiMiniArrowUpRight />
                          </span>
                          <span className="cs-iconSwap__b">
                            <HiMiniArrowUpRight />
                          </span>
                        </span>

                        <div className="hDropCard__title">{l.title}</div>
                        <div className="hDropCard__desc">{l.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a className="hCta" href="#">
              <span className="hCta__swap">
                <span className="hSwap__a">Make Enquiry</span>
                <span className="hSwap__b">Make Enquiry -&gt;</span>
              </span>

              <span className="hCta__icon cs-iconSwap" aria-hidden="true">
                <span className="cs-iconSwap__a">
                  <HiMiniArrowUpRight />
                </span>
                <span className="cs-iconSwap__b">
                  <HiMiniArrowUpRight />
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
