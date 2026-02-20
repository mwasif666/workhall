import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniArrowUpRight,
  HiMiniBars3,
  HiMiniXMark,
} from "react-icons/hi2";
import "./App.css";

export default function App() {
  const NAV = useMemo(
    () => [
      {
        key: "company",
        label: "Company",
        hoverLabel: "Company →",
        cards: [
          { title: "About Us", href: "#" },
          { title: "Regional Team", href: "#" },
          { title: "Executive Leadership", href: "#" },
          { title: "Contact Us", href: "#" },
          { title: "Divisions of Cleanspace", href: "#" },
        ],
      },
      {
        key: "cleanSpaces",
        label: "Clean Spaces",
        hoverLabel: "Explore Spaces →",
        cards: [
          { title: "Clean Spaces", href: "#" },
          { title: "Clean Rooms", href: "#" },
          { title: "Cold Rooms", href: "#" },
          { title: "Dry Rooms", href: "#" },
        ],
      },
      { key: "cleanFit", label: "CleanFit", hoverLabel: "CleanFit →", href: "#" },
      {
        key: "industries",
        label: "Industries",
        hoverLabel: "Industries →",
        cards: [
          { title: "Pharma", href: "#" },
          { title: "Healthcare", href: "#" },
          { title: "Food", href: "#" },
          { title: "Laboratories", href: "#" },
          { title: "Manufacturing", href: "#" },
          { title: "Warehousing", href: "#" },
        ],
      },
      {
        key: "resources",
        label: "Resources",
        hoverLabel: "Resources →",
        cards: [
          { title: "Blog", href: "#" },
          { title: "Case Studies", href: "#" },
          { title: "Downloads", href: "#" },
          { title: "FAQs", href: "#" },
        ],
      },
    ],
    []
  );

  const [openKey, setOpenKey] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileKey, setMobileKey] = useState(null);
  const closeTimer = useRef(null);
  const rootRef = useRef(null);

  const closeAll = () => {
    setOpenKey(null);
    setMobileKey(null);
  };

  useEffect(() => {
    const onDown = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) closeAll();
    };
    const onEsc = (e) => {
      if (e.key === "Escape") {
        closeAll();
        setMobileOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  const openMenu = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 120);
  };

  const active = NAV.find((x) => x.key === openKey);
  const activeHasCards = !!active?.cards?.length;

  return (
    <div ref={rootRef}>
      <header className="cs-header">
        <div className="cs-wrap">
          <a className="cs-brand" href="#">
            <span className="cs-mark">S</span>
            <span className="cs-brandText">
              CleanSpace<span className="cs-tm">™</span>
            </span>
          </a>

          <nav className="cs-nav" aria-label="Primary">
            {NAV.map((item) => {
              const hasDrop = !!item.cards?.length;
              const isOpen = openKey === item.key;

              return (
                <div
                  key={item.key}
                  className="cs-navItemWrap"
                  onMouseEnter={() =>
                    hasDrop ? openMenu(item.key) : setOpenKey(null)
                  }
                  onMouseLeave={() => (hasDrop ? scheduleClose() : null)}
                >
                  <a
                    href={item.href || "#"}
                    className={`cs-pill ${isOpen ? "isOpen" : ""}`}
                    onClick={(e) => {
                      if (hasDrop) e.preventDefault();
                    }}
                    onFocus={() =>
                      hasDrop ? openMenu(item.key) : setOpenKey(null)
                    }
                    onBlur={() => (hasDrop ? scheduleClose() : null)}
                  >
                    {/* ✅ WORKING hover-swap text */}
                    <span className="cs-pillTextSwap">
                      <span className="cs-pillTextSwap__a">{item.label}</span>
                      <span className="cs-pillTextSwap__b">
                        {item.hoverLabel || `${item.label} →`}
                      </span>
                    </span>

                    {hasDrop && (
                      <span className="cs-pillIconBox" aria-hidden="true">
                        {isOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                      </span>
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          <div className="cs-right">
            <a className="cs-cta" href="#">
              <span className="cs-ctaLabel">Let's talk</span>
              <span className="cs-ctaIconBox" aria-hidden="true">
                <HiMiniArrowUpRight />
              </span>
            </a>

            <button
              className="cs-burger"
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((v) => !v);
                closeAll();
              }}
            >
              {mobileOpen ? <HiMiniXMark /> : <HiMiniBars3 />}
            </button>
          </div>
        </div>

        <div
          className={`cs-megaSlot ${activeHasCards ? "show" : ""}`}
          onMouseEnter={() => {
            if (activeHasCards) openMenu(openKey);
          }}
          onMouseLeave={() => {
            if (activeHasCards) scheduleClose();
          }}
        >
          {activeHasCards && (
            <div className="cs-mega">
              <div
                className="cs-grid"
                style={{
                  gridTemplateColumns:
                    active.cards.length <= 4
                      ? "repeat(4, minmax(0, 1fr))"
                      : "repeat(3, minmax(0, 1fr))",
                }}
              >
                {active.cards.map((c) => (
                  <a key={c.title} className="cs-card" href={c.href || "#"}>
                    <div className="cs-cardThumb">
                      <span className="cs-cardArrow" aria-hidden="true">
                        <HiMiniArrowUpRight />
                      </span>
                      <div className="cs-cardVisual" />
                      <div className="cs-cardLabel">{c.title}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile */}
      <div className={`cs-mobile ${mobileOpen ? "open" : ""}`}>
        <div className="cs-mobileInner">
          {NAV.map((item) => {
            const hasDrop = !!item.cards?.length;
            const isOpen = mobileKey === item.key;

            if (!hasDrop) {
              return (
                <a key={item.key} className="cs-mLink" href={item.href || "#"}>
                  {item.label}
                </a>
              );
            }

            return (
              <div key={item.key} className="cs-mGroup">
                <button
                  type="button"
                  className={`cs-mTrigger ${isOpen ? "isOpen" : ""}`}
                  onClick={() =>
                    setMobileKey((k) => (k === item.key ? null : item.key))
                  }
                >
                  <span>{item.label}</span>
                  <span className="cs-mIcon">
                    {isOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                  </span>
                </button>

                <div className={`cs-mPanel ${isOpen ? "open" : ""}`}>
                  <div className="cs-mGrid">
                    {item.cards.map((c) => (
                      <a key={c.title} className="cs-mCard" href={c.href || "#"}>
                        <div className="cs-mCardTop">
                          <span className="cs-mCardArrow" aria-hidden="true">
                            <HiMiniArrowUpRight />
                          </span>
                        </div>
                        <div className="cs-mCardLabel">{c.title}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <a className="cs-mCta" href="#">
            <span>Let's talk</span>
            <span className="cs-mCtaIcon" aria-hidden="true">
              <HiMiniArrowUpRight />
            </span>
          </a>
        </div>
      </div>

      <main className="cs-page">
        <div className="cs-heroText">
          <h1>Cleanrooms: From Concept</h1>
          <p>Page content goes here…</p>
        </div>
      </main>
    </div>
  );
}