import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CommunitySection.css";

gsap.registerPlugin(ScrollTrigger);

const GRID_ROWS = 5;
const GRID_COLS = 9;
const TOTAL_CELLS = GRID_ROWS * GRID_COLS;

const ROTATOR_WORDS = ["Startups", "Teams", "Founders", "Brands"];

const LOGO_IMAGES = [
  "photo-1614680376593-902f74cf0d41",
  "photo-1611162617474-5b21e879e113",
  "photo-1611162618071-b39a2ec055fb",
  "photo-1611162616305-c69b3037f9bb",
  "photo-1611224923853-80b023f02d71",
  "photo-1633409361618-c73427e4e206",
  "photo-1634942537034-2531766767d1",
  "photo-1642132652860-471b4228023e",
  "photo-1614680376408-81e91ffe3db7",
  "photo-1611162616475-46b635cb6868",
  "photo-1614680376739-414d95ff43df",
  "photo-1614680376573-df3480f0c6ff",
  "photo-1626785774625-0b1c2c4c6c94",
  "photo-1626785774573-4b799315345d",
  "photo-1633356122544-f134324a6cee",
];

const CARD_BACKGROUNDS = [
  "#ffffff",
  "#f7f2e9",
  "#f3f5f2",
  "#f5f1ec",
  "#edf3f8",
  "#f8f1ee",
  "#f2f2f2",
];

const buildLogoCells = () =>
  Array.from({ length: TOTAL_CELLS }, (_, index) => {
    const imageId = LOGO_IMAGES[index % LOGO_IMAGES.length];

    return {
      src: `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=500&h=500&q=80`,
      bg: CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length],
    };
  });

export default function CommunitySection() {
  const logoCells = useMemo(buildLogoCells, []);
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
  const gridFrameRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveWordIndex(
        (currentIndex) => (currentIndex + 1) % ROTATOR_WORDS.length,
      );
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const gridFrame = gridFrameRef.current;
    const grid = gridRef.current;

    if (!section || !gridFrame || !grid) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 860px)", () => {
      const ctx = gsap.context(() => {
        const logoCards = Array.from(grid.querySelectorAll(".cc-logoCard"));

        gsap.set(grid, {
          y: 0,
          opacity: 1,
          clearProps: "filter",
        });

        gsap.set(logoCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridFrame,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 1.1, 760)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          grid,
          {
            y: -24,
            ease: "none",
            duration: 1,
          },
          0,
        ).to(
          logoCards,
          {
            opacity: 0,
            y: -18,
            scale: 0.92,
            filter: "blur(10px)",
            ease: "none",
            duration: 0.76,
            stagger: (index, target) =>
              Number(target.dataset.fadeRank || 0) * 0.055,
          },
          0.05,
        );
      }, section);

      return () => ctx.revert();
    });

    mm.add("(max-width: 859px)", () => {
      const logoCards = Array.from(grid.querySelectorAll(".cc-logoCard"));
      gsap.set([grid, ...logoCards], { clearProps: "all" });
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

      <div ref={gridFrameRef} className="cc-gridFrame">
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
                  const logo = logoCells[cellIndex];

                  const edgeRank = Math.min(colIndex, GRID_COLS - 1 - colIndex);

                  const rowSoftness =
                    Math.abs(rowIndex - (GRID_ROWS - 1) / 2) * 0.16;

                  const fadeRank = edgeRank + rowSoftness;

                  const responsiveClass = [
                    cellIndex >= 32 ? "cc-tabletHide" : "",
                    cellIndex >= 20 ? "cc-mobileHide" : "",
                    cellIndex >= 12 ? "cc-phoneHide" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <article
                      key={`logo-${cellIndex}`}
                      className={`cc-logoCard ${responsiveClass}`}
                      data-fade-rank={fadeRank}
                      style={{ "--cc-card-bg": logo.bg }}
                    >
                      <img
                        src={logo.src}
                        alt=""
                        loading={cellIndex < 12 ? "eager" : "lazy"}
                        draggable="false"
                        className="cc-logoImg"
                      />
                    </article>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="cc-gridEdge cc-gridEdge--left" aria-hidden="true" />
          <div className="cc-gridEdge cc-gridEdge--right" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
