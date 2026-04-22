import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import "./CommunitySection.css";

gsap.registerPlugin(ScrollTrigger);

const GRID_ROWS = 5;
const GRID_COLS = 9;
const TOTAL_CELLS = GRID_ROWS * GRID_COLS;

const PEOPLE = [
  "photo-1522071820081-009f0129c71c",
  "photo-1600880292203-757bb62b4baf",
  "photo-1494790108377-be9c29b29330",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1539571696357-5a69c17a67c6",
  "photo-1438761681033-6461ffad8d80",
  "photo-1500648767791-00dcc994a43e",
  "photo-1573496359142-b8d87734a5a2",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1580489944761-15a19d654956",
  "photo-1531123897727-8f129e1688ce",
  "photo-1487412720507-e7ab37603c6f",
  "photo-1544005313-94ddf0286df2",
  "photo-1524504388940-b1c1722653e1",
  "photo-1488426862026-3ee34a7d66df",
];

const buildCells = () => {
  const cells = [];
  for (let i = 0; i < TOTAL_CELLS; i += 1) {
    const id = PEOPLE[i % PEOPLE.length];
    cells.push(
      `https://images.unsplash.com/${id}?auto=format&fit=crop&w=320&h=320&q=70`,
    );
  }
  return cells;
};

const ROTATOR_WORDS = ["Startups", "Founders", "Creators", "Teams"];

export default function CommunitySection() {
  const cells = useMemo(buildCells, []);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const maxWordLength = useMemo(
    () =>
      ROTATOR_WORDS.reduce(
        (currentMax, word) => Math.max(currentMax, word.length),
        0,
      ),
    [],
  );

  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveWordIndex((currentIndex) =>
        (currentIndex + 1) % ROTATOR_WORDS.length,
      );
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const grid = gridRef.current;
    if (!frame || !grid) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 860px)", () => {
      const rowEls = Array.from(grid.querySelectorAll(".cc-row"));
      // Reset any previous per-row state (from the older staggered fade).
      gsap.set(rowEls, { clearProps: "opacity,transform" });
      gsap.set(grid, { opacity: 1 });

      // Pin distance = one viewport. During this pin the whole grid fades
      // uniformly from opacity 1 → ~0.18 (washed-out look from the
      // reference) while the next section (WhyWorkHall) rises up to
      // cover it via its negative top margin + higher z-index.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(grid, {
        opacity: 0.18,
        ease: "power1.inOut",
        duration: 1,
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(grid, { clearProps: "opacity" });
        gsap.set(rowEls, { clearProps: "opacity,transform" });
      };
    });

    mm.add("(max-width: 859px)", () => {
      const rowEls = grid.querySelectorAll(".cc-row");
      gsap.set(rowEls, { clearProps: "opacity,transform" });
      gsap.set(grid, { clearProps: "opacity" });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cc-section" id="community">
      <div className="cc-container cc-container--head">
        <header className="cc-head">
          <div className="cc-eyebrow">
            <span className="cc-eyebrowDot" aria-hidden="true" />
            Our Community
          </div>
          <h2 className="cc-title">
            that&apos;s why Work Hall is where Pakistan&apos;s Top{" "}
            <span className="cc-chip" aria-hidden="true">
              <span className="cc-chipBox" />
              <span
                className="cc-chipRotator"
                style={{
                  "--cc-chip-width": `${maxWordLength + 0.8}ch`,
                }}
              >
                <span
                  className="cc-chipTrack"
                  style={{
                    transform: `translateY(-${activeWordIndex}em)`,
                  }}
                >
                  {ROTATOR_WORDS.map((word, index) => (
                    <span
                      key={word}
                      className={`cc-chipWord ${
                        index === activeWordIndex ? "isActive" : ""
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </span>{" "}
            come to work.
          </h2>
        </header>
      </div>

      {/* Full-bleed sticky grid — only this pins. */}
      <div ref={frameRef} className="cc-gridFrame">
        <div className="cc-gridWrap">
          <div
            ref={gridRef}
            className="cc-grid"
            style={{
              "--cc-cols": GRID_COLS,
              "--cc-rows": GRID_ROWS,
            }}
          >
            {Array.from({ length: GRID_ROWS }).map((_, rowIndex) => (
              <div key={`row-${rowIndex}`} className="cc-row">
                {Array.from({ length: GRID_COLS }).map((__, colIndex) => {
                  const cellIndex = rowIndex * GRID_COLS + colIndex;
                  const src = cells[cellIndex];
                  return (
                    <div key={`c-${cellIndex}`} className="cc-cell">
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        draggable="false"
                        className="cc-cellImg"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="cc-bottomScrim" aria-hidden="true" />

          <a className="cc-cta" href="#contact">
            <span>Become Part Of The Community</span>
            <span className="cc-ctaIcon" aria-hidden="true">
              <HiMiniArrowUpRight />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
