import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  HiChevronDown,
  HiMiniArrowUpRight,
  HiPlus,
  HiMinus,
  HiMagnifyingGlass,
  HiXMark,
} from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { workhallLocations } from "@/data/workhallLocations";
import "./Hero.css";

const HERO_STATS = [
  { num: 6, suffix: "", padded: true, label: "Location", color: "#3f967b" },
  { num: 7, suffix: "+", padded: true, label: "Years", color: "#d96842" },
  { num: 800, suffix: "+", padded: false, label: "Seats", color: "#3159ad" },
  {
    num: 40,
    suffix: "k+",
    padded: false,
    label: "Sq.ft area",
    color: "#928b68",
  },
];

function HeroStat({ item, index }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;

        setTimeout(
          () => {
            setVisible(true);

            const duration = 1400;
            const startTime = performance.now();

            const tick = (now) => {
              const p = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);

              setCount(Math.round(eased * item.num));

              if (p < 1) {
                requestAnimationFrame(tick);
              } else {
                setCount(item.num);
                setDone(true);
              }
            };

            requestAnimationFrame(tick);
          },
          300 + index * 160,
        );
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [item.num, index]);

  const display = item.padded
    ? String(count).padStart(2, "0") + item.suffix
    : `${count}${item.suffix}`;

  const color = done ? "#000000" : item.color;

  return (
    <div
      ref={ref}
      className="heroStat"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        className="heroStat__value"
        style={{
          color,
          transition: done ? "color 0.5s ease" : "none",
        }}
      >
        {display}
      </div>

      <div
        className="heroStat__label"
        style={{
          color,
          transition: done ? "color 0.5s ease" : "none",
        }}
      >
        {item.label}
      </div>
    </div>
  );
}

const HERO_SWIPER_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&h=960&q=80",
    alt: "Modern coworking space",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&h=960&q=80",
    alt: "Open office workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&h=960&q=80",
    alt: "Bright collaborative workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=700&h=960&q=80",
    alt: "Premium private office",
  },
  {
    src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=700&h=960&q=80",
    alt: "Professional meeting room",
  },
];

export default function Hero() {
  const locations = useMemo(() => workhallLocations, []);

  const [friends, setFriends] = useState(3);
  const [locOpen, setLocOpen] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [locSearch, setLocSearch] = useState("");

  const locRef = useRef(null);

  const closeLoc = () => {
    setLocOpen(false);
    setLocSearch("");
  };

  const activeLocation =
    locations.find((item) => item.id === locationId) ?? null;

  const filteredLocations = useMemo(() => {
    const query = locSearch.trim().toLowerCase();

    if (!query) return locations;

    return locations.filter((item) =>
      [item.name, item.area, item.address].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [locSearch, locations]);

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

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="row g-2 hero__row">
          <div className="col-lg-8 col-12 hero__leftCol">
            <div className="hero__box">
              <div className="hero__copy">
                <h1 className="hero__title">
                  <span className="hero__titleLine">Re-Think Your</span>
                  <span className="hero__titleLine hero__titleLine--large">
                    Workspace.
                  </span>
                </h1>

                <p className="hero__lede">
                  With Pakistan&apos;s most flexible coworking spaces, open
                  24/7, across 6 locations.
                  <br />
                  All built for the way you actually work, not the way an office
                  thinks you should.
                </p>
              </div>

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
                        {!activeLocation
                          ? "All locations feature all our plans and passes"
                          : activeLocation.name}
                      </div>
                    </div>

                    <span
                      className="cs-iconSwap hPill__endIcon"
                      aria-hidden="true"
                    >
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
                      <div className="hDrop__top">
                        <div className="hDrop__searchWrap">
                          <HiMagnifyingGlass className="hDrop__searchIcon" />
                          <input
                            className="hDrop__search"
                            type="text"
                            placeholder="Search location"
                            value={locSearch}
                            onChange={(e) => setLocSearch(e.target.value)}
                          />
                        </div>

                        <button
                          type="button"
                          className="hDrop__close"
                          onClick={closeLoc}
                          aria-label="Close locations"
                        >
                          <HiXMark />
                        </button>
                      </div>

                      <div className="hDrop__label">Work Hall Locations</div>

                      <div className="hDrop__grid">
                        {filteredLocations.map((locationItem) => (
                          <button
                            key={locationItem.id}
                            type="button"
                            className={`hDropOption ${
                              locationItem.id === locationId ? "isActive" : ""
                            }`}
                            onClick={() => {
                              setLocationId(locationItem.id);
                              closeLoc();
                            }}
                          >
                            <span
                              className="hDropOption__thumb"
                              aria-hidden="true"
                            >
                              <img
                                src={locationItem.image}
                                alt=""
                                loading="lazy"
                                draggable="false"
                              />
                            </span>

                            <span className="hDropOption__txt">
                              <span className="hDropOption__title">
                                {locationItem.name}
                              </span>
                              <span className="hDropOption__desc">
                                {locationItem.area}
                              </span>
                            </span>

                            <span
                              className="hDropOption__icon"
                              aria-hidden="true"
                            >
                              <HiMiniArrowUpRight />
                            </span>
                          </button>
                        ))}
                      </div>

                      {filteredLocations.length === 0 && (
                        <div className="hDrop__empty">
                          No Work Hall location matched your search.
                        </div>
                      )}
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

              <div
                className="hero__stats"
                aria-label="Workspace highlights summary"
              >
                {HERO_STATS.map((item, index) => (
                  <HeroStat key={item.label} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-12 hero__rightCol">
            <div className="hero__media" aria-label="Workspace photo stack">
              <div className="hero__stackFrame">
                <Swiper
                  effect="cards"
                  grabCursor={true}
                  modules={[EffectCards, Autoplay]}
                  cardsEffect={{
                    perSlideOffset: 7,
                    perSlideRotate: 1.2,
                    rotate: true,
                    slideShadows: false,
                  }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop={true}
                  className="hero__swiper"
                >
                  {HERO_SWIPER_IMAGES.map((img) => (
                    <SwiperSlide key={img.src} className="hero__swiperSlide">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="hero__swiperImg"
                        draggable="false"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
