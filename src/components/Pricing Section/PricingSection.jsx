import React, { useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import "./PricingSection.css";

const SLIDES = [
  "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
  "https://w0.peakpx.com/wallpaper/276/81/HD-wallpaper-lakes-lake-greenery-mountain-nature-reflection-rock.jpg",
  "https://w0.peakpx.com/wallpaper/45/562/HD-wallpaper-before-the-storm-water-alps-sunset-island-colors-reflections-trees-clouds-germany-bavarian-sky.jpg",
];

function ImageSlider({ images = SLIDES, interval = 2600 }) {
  const [i, setI] = useState(0);
  const timer = useRef(null);

  const go = (next) => {
    setI((prev) => {
      const n = images.length;
      return (next % n + n) % n;
    });
  };

  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  const start = () => {
    stop();
    timer.current = setInterval(() => {
      setI((prev) => (prev + 1) % images.length);
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
  // ✅ 2 pages, per page 3 cards
  const pages = useMemo(
    () => [
      {
        key: "beginners",
        eyebrow: "RVING FOR",
        title: "BEGINNERS",
        desc:
          "With an RV you can explore the world and live your wildhood. Take the comfort of your own home with you and follow your own adventures.",
        cta: "GET STARTED",
        items: [
          {
            id: "b-1",
            title: "Air",
            price: "PKR 20,000/mo",
            desc:
              "Access to an open spot in our shared space. You choose a new spot every time you come in. Hook your laptop, pick a desk, and get to work.",
            suitedFor: ["Freelancers", "Consultants", "Students", "Remote Employees"],
          },
          {
            id: "b-2",
            title: "Desk",
            price: "PKR 35,000/mo",
            desc:
              "A dedicated desk that’s yours. Leave your essentials, come back anytime, and work with consistency in a premium shared environment.",
            suitedFor: ["Creators", "Founders", "Remote Teams", "Consultants"],
          },
          {
            id: "b-3",
            title: "Suite",
            price: "PKR 55,000/mo",
            desc:
              "Private space for focused work. Extra privacy, more comfort, and a setup that feels like your own office—without the overhead.",
            suitedFor: ["Solo Founders", "Executives", "Researchers", "Designers"],
          },
        ],
      },
      {
        key: "experts",
        eyebrow: "RVING FOR",
        title: "EXPERTS",
        desc:
          "Already into the lifestyle? Explore this section for tips, ideas and inspiration from experts on all things related.",
        cta: "GET INSPIRED",
        items: [
          {
            id: "e-1",
            title: "Air",
            price: "PKR 80,000/mo",
            desc:
              "Flexible seating for small teams with shared collaboration areas. Great for hybrid teams that need occasional in-person sync.",
            suitedFor: ["Startups", "Hybrid Teams", "Agencies", "Project Teams"],
          },
          {
            id: "e-2",
            title: "Desk",
            price: "PKR 140,000/mo",
            desc:
              "Dedicated seats for your team so everyone has a stable base. Perfect for consistent daily operations and deep work.",
            suitedFor: ["Growing Teams", "Product Teams", "Support Teams", "Operations"],
          },
          {
            id: "e-3",
            title: "Suite",
            price: "PKR 220,000/mo",
            desc:
              "Private team room with controlled access. Meeting-friendly, brandable, and ideal for teams that want full privacy.",
            suitedFor: ["Sales Teams", "Leadership", "Client-Facing Teams", "Studios"],
          },
        ],
      },
    ],
    []
  );

  const viewportRef = useRef(null);

  // ✅ wheel => horizontal (scroll-trigger feel)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // only convert vertical wheel to horizontal when we can scroll horizontally
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollToPage = (dir) => {
    const el = viewportRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section className="ps-section2">
      <div className="ps-container2">
        {/* optional nav */}
        <button
          className="ps-pageNav ps-pageNav--left"
          type="button"
          aria-label="Previous page"
          onClick={() => scrollToPage(-1)}
        >
          <HiChevronLeft />
        </button>

        <div ref={viewportRef} className="ps-viewport">
          <div className="ps-track">
            {pages.map((p, idx) => (
              <div key={p.key} className={`ps-page ${idx === 0 ? "isLeft" : "isRight"}`}>
                <header className="ps-pageHead">
                  <div className="ps-eyebrow">
                    <span className="ps-dotMini" />
                    {p.eyebrow}
                  </div>
                  <h2 className="ps-bigTitle">{p.title}</h2>

                  <div className="ps-pageFooterText">
                    <p className="ps-pageDesc">{p.desc}</p>
                    <a className="ps-pageCta" href="#">
                      {p.cta} <span aria-hidden="true">›</span>
                    </a>
                  </div>
                </header>

                <div className="ps-grid3">
                  {p.items.map((it) => (
                    <Card key={it.id} {...it} />
                  ))}
                </div>
              </div>
            ))}

            {/* ✅ vertical divider line between pages */}
            <span className="ps-divider" aria-hidden="true" />
          </div>
        </div>

        <button
          className="ps-pageNav ps-pageNav--right"
          type="button"
          aria-label="Next page"
          onClick={() => scrollToPage(1)}
        >
          <HiChevronRight />
        </button>
      </div>
    </section>
  );
}