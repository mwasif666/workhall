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
      {/* images */}
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

      {/* arrows */}
      <button className="ps-mediaNav ps-mediaNav--left" type="button" aria-label="Prev" onClick={prev}>
        <HiChevronLeft />
      </button>
      <button className="ps-mediaNav ps-mediaNav--right" type="button" aria-label="Next" onClick={next}>
        <HiChevronRight />
      </button>

      {/* dots */}
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

function useRowCarousel() {
  const trackRef = useRef(null);

  const scrollByCards = (dir = 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".ps-card");
    if (!card) return;

    const gap = 14; // must match css gap
    const step = card.getBoundingClientRect().width + gap;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return { trackRef, scrollByCards };
}

export default function PricingSection() {
  // 6 cards like your screenshot (Individuals left, Teams right)
  const items = useMemo(
    () => [
      // Individuals
      {
        id: "i-air",
        title: "Air",
        price: "PKR 20,000/mo",
        desc:
          "Access to an open spot in our shared space. You choose a new spot every time you come in. Hook your laptop, pick a desk, and get to work.",
        suitedFor: ["Freelancers", "Consultants", "Students", "Remote Employees"],
      },
      {
        id: "i-desk",
        title: "Desk",
        price: "PKR 35,000/mo",
        desc:
          "A dedicated desk that’s yours. Leave your essentials, come back anytime, and work with consistency in a premium shared environment.",
        suitedFor: ["Creators", "Founders", "Remote Teams", "Consultants"],
      },
      {
        id: "i-suite",
        title: "Suite",
        price: "PKR 55,000/mo",
        desc:
          "Private space for focused work. Extra privacy, more comfort, and a setup that feels like your own office—without the overhead.",
        suitedFor: ["Solo Founders", "Executives", "Researchers", "Designers"],
      },

      // Teams
      {
        id: "t-air",
        title: "Air",
        price: "PKR 80,000/mo",
        desc:
          "Flexible seating for small teams with shared collaboration areas. Great for hybrid teams that need occasional in-person sync.",
        suitedFor: ["Startups", "Hybrid Teams", "Agencies", "Project Teams"],
      },
      {
        id: "t-desk",
        title: "Desk",
        price: "PKR 140,000/mo",
        desc:
          "Dedicated seats for your team so everyone has a stable base. Perfect for consistent daily operations and deep work.",
        suitedFor: ["Growing Teams", "Product Teams", "Support Teams", "Operations"],
      },
      {
        id: "t-suite",
        title: "Suite",
        price: "PKR 220,000/mo",
        desc:
          "Private team room with controlled access. Meeting-friendly, brandable, and ideal for teams that want full privacy.",
        suitedFor: ["Sales Teams", "Leadership", "Client-Facing Teams", "Studios"],
      },
    ],
    []
  );

  const { trackRef, scrollByCards } = useRowCarousel();

  return (
    <section className="ps-section">
      <div className="ps-head">
        <h2 className="ps-h2">Individuals</h2>
        <h2 className="ps-h2 ps-h2--right">Teams</h2>
      </div>

      <div className="ps-rowWrap">
        <button
          className="ps-rowNav ps-rowNav--left"
          type="button"
          aria-label="Previous cards"
          onClick={() => scrollByCards(-1)}
        >
          <HiChevronLeft />
        </button>

        <div ref={trackRef} className="ps-rowTrack">
          {items.map((it) => (
            <div key={it.id} className="ps-rowItem">
              <Card {...it} />
            </div>
          ))}
        </div>

        <button
          className="ps-rowNav ps-rowNav--right"
          type="button"
          aria-label="Next cards"
          onClick={() => scrollByCards(1)}
        >
          <HiChevronRight />
        </button>
      </div>
    </section>
  );
}