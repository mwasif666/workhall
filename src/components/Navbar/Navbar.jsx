import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  HiChevronDown,
  HiChevronUp,
  HiMiniArrowUpRight,
  HiMiniBars3,
  HiMiniXMark,
} from "react-icons/hi2";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import "./Navbar.css";

const getSeededCardImage = (menuKey, title) =>
  `https://picsum.photos/seed/${encodeURIComponent(
    `workhall-${menuKey}-${title}`,
  )}/900/560`;

export default function Navbar() {
  const NAV = useMemo(
    () => [
      // {
      //   key: "plans",
      //   label: "Plans",
      //   hoverLabel: "Plans →",
      //   cards: [
      //     { title: "Day Pass", href: "#" },
      //     { title: "Hot Desk", href: "#" },
      //     { title: "Dedicated Desk", href: "#" },
      //     { title: "Private Office", href: "#" },
      //   ],
      // },
      {
        key: "locations",
        label: "Locations",
        hoverLabel: "Locations →",
        cards: [
          { title: "Clifton", href: "#" },
          { title: "DHA", href: "#" },
          { title: "PECHS", href: "#" },
          { title: "Gulshan", href: "#" },
        ],
      },
      {
        key: "community",
        label: "Community",
        hoverLabel: "Community →",
        cards: [
          { title: "Events", href: "#" },
          { title: "Workshops", href: "#" },
          { title: "Meetups", href: "#" },
          { title: "Partners", href: "#" },
        ],
      },
      {
        key: "why",
        label: "Why Workhall",
        hoverLabel: "Why Workhall →",
        cards: [
          { title: "Amenities", href: "#" },
          { title: "Culture", href: "#" },
          { title: "Safety", href: "#" },
          { title: "Support", href: "#" },
        ],
      },
      {
        key: "contact",
        label: "Contact",
        hoverLabel: "Contact →",
        cards: [
          { title: "Make Enquiry", href: "#" },
          { title: "Visit Us", href: "#" },
          { title: "Call / WhatsApp", href: "#" },
          { title: "Support", href: "#" },
        ],
      },
      {
        key: "members",
        label: "Members Lounge",
        hoverLabel: "Members Lounge →",
        cards: [
          { title: "Login", href: "#" },
          { title: "Benefits", href: "#" },
          { title: "Bookings", href: "#" },
          { title: "Community Board", href: "#" },
        ],
      },
      {
        key: "virtual",
        label: "Virtual Tour",
        hoverLabel: "Virtual Tour →",
        cards: [
          { title: "Login", href: "#" },
          { title: "Benefits", href: "#" },
          { title: "Bookings", href: "#" },
          { title: "Community Board", href: "#" },
        ],
      },
    ],
    [],
  );

  const [openKey, setOpenKey] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileKey, setMobileKey] = useState(null);
  const [megaLeft, setMegaLeft] = useState(18);
  const closeTimer = useRef(null);
  const rootRef = useRef(null);
  const wrapRef = useRef(null);
  const navItemRefs = useRef(new Map());

  const setNavItemRef = (key, el) => {
    if (!el) {
      navItemRefs.current.delete(key);
      return;
    }
    navItemRefs.current.set(key, el);
  };

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

  // body scroll lock when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const positionMega = (key, anchorEl) => {
    const rootEl = rootRef.current;
    const wrapEl = wrapRef.current;
    const targetEl = anchorEl || navItemRefs.current.get(key);
    if (!rootEl || !wrapEl || !targetEl) return;

    const rootRect = rootEl.getBoundingClientRect();
    const wrapRect = wrapEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const slotLeft = wrapRect.left - rootRect.left;
    const slotWidth = wrapRect.width;
    const panelWidth = Math.min(920, Math.max(340, slotWidth - 36));

    let nextLeft = targetRect.left - rootRect.left;
    nextLeft = Math.max(slotLeft + 18, nextLeft);
    nextLeft = Math.min(nextLeft, slotLeft + slotWidth - panelWidth - 18);

    setMegaLeft(nextLeft);
  };

  const openMenu = (key, anchorEl) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(key);
    if (key) positionMega(key, anchorEl);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 120);
  };

  const active = NAV.find((x) => x.key === openKey);
  const activeHasCards = !!active?.cards?.length;

  useEffect(() => {
    if (!openKey) return;
    const onResize = () => positionMega(openKey);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [openKey]);

  return (
    <div ref={rootRef}>
      <header className="cs-header">
        <div className="cs-wrap" ref={wrapRef}>
          <a className="cs-brand" href="#">
<<<<<<< HEAD
            {/* <span className="cs-mark">S</span> */}
=======
>>>>>>> be2e5828d5f7e37a33fee7e4d0d61ac040c3b471
            <span className="cs-brandText">
              Workhall<span className="cs-tm">™</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="cs-nav" aria-label="Primary">
            {NAV.map((item) => {
              const hasDrop = !!item.cards?.length;
              const isOpen = openKey === item.key;

              return (
                <div
                  key={item.key}
                  ref={(el) => setNavItemRef(item.key, el)}
                  className="cs-navItemWrap"
                  onMouseEnter={(e) =>
                    hasDrop
                      ? openMenu(item.key, e.currentTarget)
                      : setOpenKey(null)
                  }
                  onMouseLeave={() => (hasDrop ? scheduleClose() : null)}
                >
                  <a
                    href={item.href || "#"}
                    className={`cs-pill ${isOpen ? "isOpen" : ""}`}
                    onClick={(e) => {
                      if (hasDrop) e.preventDefault();
                    }}
                    onFocus={(e) =>
                      hasDrop
                        ? openMenu(
                            item.key,
                            e.currentTarget.closest(".cs-navItemWrap"),
                          )
                        : setOpenKey(null)
                    }
                    onBlur={() => (hasDrop ? scheduleClose() : null)}
                  >
                    {/* TEXT SWAP */}
                    <span className="cs-pillTextSwap">
                      <span className="cs-pillTextSwap__a">{item.label}</span>
                      <span className="cs-pillTextSwap__b">
                        {item.hoverLabel || `${item.label} →`}
                      </span>
                    </span>

                    {/* ICON SWAP (hover + open sync) */}
                    {hasDrop && (
                      <span
                        className={`cs-pillIconSwap ${isOpen ? "isOpen" : ""}`}
                        aria-hidden="true"
                      >
                        <span className="cs-pillIconSwap__a">
                          <GoArrowDown />
                        </span>
                        <span className="cs-pillIconSwap__b">
                          <GoArrowUp />
                        </span>
                      </span>
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          <div className="cs-right">
            {/* <a className="cs-cta" href="#">
              <span className="cs-ctaLabel">Let's talk</span>
              <span className="cs-ctaIconBox cs-iconSwap" aria-hidden="true">
                <span className="cs-iconSwap__a">
                  <HiMiniArrowUpRight />
                </span>
                <span className="cs-iconSwap__b">
                  <HiMiniArrowUpRight />
                </span>
              </span>
            </a> */}

            {/* Mobile burger */}
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

        {/* Desktop Mega Dropdown */}
        <div
          className={`cs-megaSlot ${activeHasCards ? "show" : ""}`}
          style={activeHasCards ? { paddingLeft: `${megaLeft}px` } : undefined}
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
                      {/* arrow fixed top-right */}
                      <span
                        className="cs-cardArrow cs-iconSwap"
                        aria-hidden="true"
                      >
                        <span className="cs-iconSwap__a">
                          <HiMiniArrowUpRight />
                        </span>
                        <span className="cs-iconSwap__b">
                          <HiMiniArrowUpRight />
                        </span>
                      </span>

                      <div
                        className="cs-cardVisual"
                        style={{
                          backgroundImage: `
                            linear-gradient(180deg, rgba(6, 20, 95, 0.15) 0%, rgba(6, 20, 95, 0.78) 100%),
                            linear-gradient(130deg, rgba(16, 46, 255, 0.82) 0%, rgba(6, 18, 118, 0.78) 58%, rgba(5, 12, 58, 0.92) 100%),
                            url("${getSeededCardImage(active.key, c.title)}")
                          `,
                        }}
                      />
                      <div className="cs-cardLabel">{c.title}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ✅ MOBILE DRAWER */}
      <div className={`cs-drawer ${mobileOpen ? "open" : ""}`}>
        <button
          className="cs-drawerBackdrop"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />

        <aside className="cs-drawerPanel" role="dialog" aria-modal="true">
          <div className="cs-drawerInner">
            {/* Sticky top */}
            <div className="cs-drawerTop">
              <div className="cs-drawerBrand">
                <span className="cs-mark">S</span>
                <span className="cs-brandText">
                  Workhall<span className="cs-tm">™</span>
                </span>
              </div>

              <button
                type="button"
                className="cs-drawerClose"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <HiMiniXMark />
              </button>
            </div>

            <div className="cs-drawerContent">
              {NAV.map((item) => {
                const hasDrop = !!item.cards?.length;
                const isOpen = mobileKey === item.key;

                if (!hasDrop) {
                  return (
                    <a
                      key={item.key}
                      className="cs-mLink"
                      href={item.href || "#"}
                      onClick={() => setMobileOpen(false)}
                    >
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
                      <span className="cs-mIcon" aria-hidden="true">
                        {isOpen ? <HiChevronUp /> : <HiChevronDown />}
                      </span>
                    </button>

                    <div className={`cs-mPanel ${isOpen ? "open" : ""}`}>
                      <div className="cs-mGrid">
                        {item.cards.map((c) => (
                          <a
                            key={c.title}
                            className="cs-mCard"
                            href={c.href || "#"}
                            onClick={() => setMobileOpen(false)}
                          >
                            <div className="cs-mCardTop">
                              <span
                                className="cs-mCardArrow cs-iconSwap"
                                aria-hidden="true"
                              >
                                <span className="cs-iconSwap__a">
                                  <HiMiniArrowUpRight />
                                </span>
                                <span className="cs-iconSwap__b">
                                  <HiMiniArrowUpRight />
                                </span>
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

              <a
                className="cs-mCta"
                href="#"
                onClick={() => setMobileOpen(false)}
              >
                <span>Let's talk</span>
                <span className="cs-mCtaIcon cs-iconSwap" aria-hidden="true">
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
        </aside>
      </div>
    </div>
  );
}
