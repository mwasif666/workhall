import React, {
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
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
  { icon: si("spotify"),    bg: "#1DB954", name: "Spotify"     },
  { icon: si("netflix"),    bg: "#E50914", name: "Netflix"     },
  { icon: si("messenger"),  bg: "#0084FF", name: "Messenger"   },
  { empty: true,            bg: "#f0ebe2"                      },
  { icon: si("instagram"),  bg: "#C13584", name: "Instagram"   },
  { icon: si("whatsapp"),   bg: "#25D366", name: "WhatsApp"    },
  { icon: si("youtube"),    bg: "#FF0000", name: "YouTube"     },
  { icon: si("discord"),    bg: "#5865F2", name: "Discord"     },
  { icon: si("applemusic"), bg: "#FC3C44", name: "Apple Music" },
  { empty: true,            bg: "#f0ebe2"                      },
  { icon: si("slack"),      bg: "#4A154B", name: "Slack"       },
  { icon: si("figma"),      bg: "#F24E1E", name: "Figma"       },
  { icon: si("notion"),     bg: "#37352F", name: "Notion"      },
  { icon: si("github"),     bg: "#24292F", name: "GitHub"      },
  { icon: si("x"),          bg: "#14171A", name: "X"           },
  { icon: si("tiktok"),     bg: "#EE1D52", name: "TikTok"      },
  { icon: si("linkedin"),   bg: "#0077B5", name: "LinkedIn"    },
  { empty: true,            bg: "#f0ebe2"                      },
];

const buildLogoCells = () =>
  Array.from({ length: TOTAL_CELLS }, (_, index) => {
    const cell = BRAND_CELLS[index % BRAND_CELLS.length];
    return {
      icon:  cell.icon  ?? null,
      bg:    cell.bg,
      name:  cell.name  ?? "",
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
            stagger: (_index, target) =>
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
                      className={`cc-logoCard${logo.empty ? " cc-logoCard--empty" : ""} ${responsiveClass}`}
                      data-fade-rank={fadeRank}
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
