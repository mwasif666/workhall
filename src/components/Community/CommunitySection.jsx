import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingText from "@/components/RotatingText/RotatingText";
import "./CommunitySection.css";

gsap.registerPlugin(ScrollTrigger);

const GRID_ROWS = 5;
const GRID_COLS = 9;
const TOTAL_CELLS = GRID_ROWS * GRID_COLS;

const ROTATOR_WORDS = ["Startups", "Teams", "Founders", "Brands"];
const si = (slug) => `https://cdn.simpleicons.org/${slug}/ffffff`;

const BRAND_CELLS = [
  { icon: si("spotify"), bg: "#1DB954", name: "Spotify" },
  { icon: si("netflix"), bg: "#E50914", name: "Netflix" },
  { icon: si("messenger"), bg: "#0084FF", name: "Messenger" },
  { icon: si("paypal"), bg: "#003087", name: "PayPal" },
  { icon: si("instagram"), bg: "#C13584", name: "Instagram" },
  { icon: si("whatsapp"), bg: "#25D366", name: "WhatsApp" },
  { icon: si("youtube"), bg: "#FF0000", name: "YouTube" },
  { icon: si("discord"), bg: "#5865F2", name: "Discord" },
  { icon: si("applemusic"), bg: "#FC3C44", name: "Apple Music" },
  { icon: si("spotify"), bg: "#1DB954", name: "Spotify" },
  { icon: si("netflix"), bg: "#E50914", name: "Netflix" },
  { icon: si("figma"), bg: "#F24E1E", name: "Figma" },
  { icon: si("notion"), bg: "#37352F", name: "Notion" },
  { icon: si("github"), bg: "#24292F", name: "GitHub" },
  { icon: si("x"), bg: "#14171A", name: "X" },
  { icon: si("tiktok"), bg: "#EE1D52", name: "TikTok" },
  { icon: si("uber"), bg: "#000000", name: "Uber" },
  { icon: si("airbnb"), bg: "#FF5A5F", name: "Airbnb" },
];

const buildLogoCells = () =>
  Array.from({ length: TOTAL_CELLS }, (_, index) => {
    const cell = BRAND_CELLS[index % BRAND_CELLS.length];

    return {
      icon: cell.icon ?? null,
      bg: cell.bg,
      name: cell.name ?? "",
      empty: !!cell.empty,
    };
  });

export default function CommunitySection() {
  const logoCells = useMemo(buildLogoCells, []);

  const sectionRef = useRef(null);
  const gridFrameRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const gridFrame = gridFrameRef.current;
    const grid = gridRef.current;

    if (!section || !gridFrame || !grid) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 860px)", () => {
      const ctx = gsap.context(() => {
        const logoCards = Array.from(grid.querySelectorAll(".cc-logoCard"));

        const sortedLogoCards = [...logoCards].sort((a, b) => {
          const rankA = Number(a.dataset.fadeRank || 0);
          const rankB = Number(b.dataset.fadeRank || 0);
          const indexA = Number(a.dataset.cellIndex || 0);
          const indexB = Number(b.dataset.cellIndex || 0);

          return rankA - rankB || indexA - indexB;
        });

        gsap.set(grid, {
          y: 0,
          opacity: 1,
          clearProps: "filter",
        });

        gsap.set(logoCards, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
          transformOrigin: "center center",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridFrame,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 1.18, 820)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          grid,
          {
            y: -22,
            ease: "none",
            duration: 1,
          },
          0,
        ).to(
          sortedLogoCards,
          {
            opacity: 0,
            scale: 0.28,
            x: (_index, target) => Number(target.dataset.exitX || 0),
            y: (_index, target) => Number(target.dataset.exitY || 0),
            rotate: (_index, target) => Number(target.dataset.exitRotate || 0),
            filter: "blur(13px)",
            ease: "power1.inOut",
            duration: 0.18,
            stagger: {
              each: 0.026,
              from: "start",
            },
          },
          0.12,
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
            that&apos;s why Work Hall is where Pakistan&apos;s Top <br />
            <span className="cc-chip">
              <span className="cc-chipBox" aria-hidden="true" />
              <RotatingText
                texts={ROTATOR_WORDS}
                mainClassName="cc-chipRotatingText"
                splitLevelClassName="cc-chipSplitLevel"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.025}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2200}
              />
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

                  const centerCol = (GRID_COLS - 1) / 2;
                  const centerRow = (GRID_ROWS - 1) / 2;

                  const isLeft = colIndex < centerCol;
                  const isRight = colIndex > centerCol;

                  const sideDirection = isLeft
                    ? -1
                    : isRight
                      ? 1
                      : rowIndex % 2 === 0
                        ? -1
                        : 1;

                  /*
                    Row-wise bottom se top animation:
                    - Sab se pehle bottom row jayegi
                    - Phir us ke upar wali row
                    - Har row ke icons left-to-right one by one jayenge
                  */
                  const rowFromBottom = GRID_ROWS - 1 - rowIndex;
                  const fadeRank = rowFromBottom * GRID_COLS + colIndex;

                  const edgeDistance = Math.min(
                    colIndex,
                    GRID_COLS - 1 - colIndex,
                  );

                  const exitX = sideDirection * (92 + edgeDistance * 14);
                  const exitY = (rowIndex - centerRow) * 18 - 10;
                  const exitRotate = sideDirection * (8 + edgeDistance * 2);

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
                      className={`cc-logoCard${
                        logo.empty ? " cc-logoCard--empty" : ""
                      } ${responsiveClass}`}
                      data-cell-index={cellIndex}
                      data-row-index={rowIndex}
                      data-col-index={colIndex}
                      data-fade-rank={fadeRank}
                      data-exit-x={exitX}
                      data-exit-y={exitY}
                      data-exit-rotate={exitRotate}
                      style={{ "--cc-card-bg": logo.bg }}
                    >
                      {!logo.empty && (
                        <>
                          <img
                            src={logo.icon}
                            alt={logo.name}
                            loading={cellIndex < 12 ? "eager" : "lazy"}
                            draggable="false"
                            className="cc-logoImg"
                          />
                          {/* <span className="cc-logoLabel">{logo.name}</span> */}
                        </>
                      )}
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
