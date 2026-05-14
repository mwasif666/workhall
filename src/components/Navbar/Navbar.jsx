import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  HiChevronDown,
  HiChevronUp,
  HiMiniArrowUpRight,
  HiMiniBars3,
  HiMiniXMark,
} from "react-icons/hi2";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Navbar.css";

gsap.registerPlugin(ScrollTrigger);

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
        label: "Member's Lounge",
        hoverLabel: "Member's Lounge ->",
        href: "#",
        cards: [],
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

  const navItems = useMemo(
    () => [
      {
        key: "plans",
        label: "Plans",
        hoverLabel: "Plans ->",
        cards: [
          { title: "Day Pass", href: "#" },
          { title: "Hot Desk", href: "#" },
          { title: "Dedicated Desk", href: "#" },
          { title: "Private Office", href: "#" },
        ],
      },
      ...NAV,
    ],
    [NAV],
  );

  const desktopNavItems = useMemo(
    () => navItems.filter((item) => item.key !== "virtual"),
    [navItems],
  );

  const virtualTourItem = useMemo(
    () => navItems.find((item) => item.key === "virtual") ?? null,
    [navItems],
  );

  const [openKey, setOpenKey] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileKey, setMobileKey] = useState(null);
  const [compactHeader, setCompactHeader] = useState(false);
  const [scrollCompact, setScrollCompact] = useState(false);
  const [megaLeft, setMegaLeft] = useState(18);
  const closeTimer = useRef(null);
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const wrapRef = useRef(null);
  const measureRef = useRef(null);
  const scrollCompactRef = useRef(false);
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

  useEffect(() => {
    const evaluateHeaderMode = () => {
      const headerEl = headerRef.current;
      const measureEl = measureRef.current;
      if (!headerEl || !measureEl) return;

      if (window.innerWidth <= 980) {
        setCompactHeader(true);
        setOpenKey(null);
        return;
      }

      const headerStyles = window.getComputedStyle(headerEl);
      const paddingLeft = parseFloat(headerStyles.paddingLeft) || 0;
      const paddingRight = parseFloat(headerStyles.paddingRight) || 0;
      const availableWidth = headerEl.clientWidth - paddingLeft - paddingRight;
      const requiredWidth = Math.ceil(measureEl.scrollWidth);

      const nextCompactHeader = requiredWidth > availableWidth;
      setCompactHeader(nextCompactHeader);

      if (nextCompactHeader) {
        setOpenKey(null);
      } else {
        setMobileOpen(false);
        setMobileKey(null);
      }
    };

    evaluateHeaderMode();

    const resizeObserver = new ResizeObserver(() => {
      evaluateHeaderMode();
    });

    if (headerRef.current) resizeObserver.observe(headerRef.current);
    if (measureRef.current) resizeObserver.observe(measureRef.current);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", evaluateHeaderMode);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", evaluateHeaderMode);
    };
  }, [navItems]);

  useEffect(() => {
    const setHeaderMode = (nextCompact) => {
      if (scrollCompactRef.current === nextCompact) return;
      scrollCompactRef.current = nextCompact;
      setScrollCompact(nextCompact);
      if (nextCompact) setOpenKey(null);
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const scrollY = self.scroll();

        if (scrollY <= 8) {
          setHeaderMode(false);
          return;
        }

        if (self.direction === 1 && scrollY > 12) {
          setHeaderMode(true);
          return;
        }

        if (self.direction === -1) {
          setHeaderMode(false);
        }
      },
    });

    setHeaderMode(window.scrollY > 12);

    return () => trigger.kill();
  }, []);

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

  const active = navItems.find((x) => x.key === openKey);
  const activeHasCards = !!active?.cards?.length && !compactHeader;

  useEffect(() => {
    if (!openKey) return;
    const onResize = () => positionMega(openKey);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [openKey]);

  return (
    <div ref={rootRef} className="cs-navRoot">
      <header
        ref={headerRef}
        className={`cs-header ${compactHeader ? "isCompact" : ""} ${
          scrollCompact ? "isScrollCompact" : ""
        }`}
      >
        <div className="cs-measureRow" ref={measureRef} aria-hidden="true">
          <span className="cs-brand cs-brand--measure">
            <img
              src="/workhall-logo.png"
              alt=""
              className="cs-brandTile"
              style={{ objectFit: "contain" }}
            />
          </span>

          <div className="cs-nav cs-nav--measure">
            {desktopNavItems.map((item) => {
              const isExternal = item.key === "members";
              const hasThumb = item.key === "virtual";
              const hasDrop = !!item.cards?.length && !isExternal && !hasThumb;

              return (
                <span key={`measure-${item.key}`} className="cs-navItemWrap">
                  <span className="cs-pill cs-pill--measure">
                    <span className="cs-pillTextSwap">
                      <span className="cs-pillTextSwap__a">{item.label}</span>
                    </span>

                    {hasDrop && (
                      <span className="cs-pillIconSwap" aria-hidden="true">
                        <span className="cs-pillIconSwap__a">
                          <GoArrowDown />
                        </span>
                      </span>
                    )}

                    {isExternal && (
                      <span
                        className="cs-pillAction cs-iconSwap"
                        aria-hidden="true"
                      >
                        <span className="cs-iconSwap__a">
                          <HiMiniArrowUpRight />
                        </span>
                      </span>
                    )}

                    {hasThumb && (
                      <span
                        className="cs-pillThumb"
                        style={{
                          backgroundImage: `url("${getSeededCardImage("virtual-tour", item.label)}")`,
                        }}
                      />
                    )}
                  </span>
                </span>
              );
            })}
          </div>

          {virtualTourItem && (
            <div className="cs-right cs-right--measure">
              <span className="cs-pill cs-pill--measure cs-headerAction">
                <span className="cs-pillTextSwap">
                  <span className="cs-pillTextSwap__a">
                    {virtualTourItem.label}
                  </span>
                </span>

                <span
                  className="cs-pillThumb"
                  style={{
                    backgroundImage: `url("${getSeededCardImage("virtual-tour", virtualTourItem.label)}")`,
                  }}
                />
              </span>
            </div>
          )}
        </div>

        <div className="cs-wrap" ref={wrapRef}>
          <a className="cs-brand" href="#">
            <img
              src="/workhall-logo.png"
              alt="Workhall"
              className="cs-brandTile"
              style={{ objectFit: "contain" }}
            />
  
          </a>

          {/* Desktop Nav */}
          <nav className="cs-nav" aria-label="Primary">
            {desktopNavItems.map((item) => {
              const isExternal = item.key === "members";
              const hasThumb = item.key === "virtual";
              const hasDrop = !!item.cards?.length && !isExternal && !hasThumb;
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
                        {item.hoverLabel || `${item.label} ->`}
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

                    {isExternal && (
                      <span
                        className="cs-pillAction cs-iconSwap"
                        aria-hidden="true"
                      >
                        <span className="cs-iconSwap__a">
                          <HiMiniArrowUpRight />
                        </span>
                        <span className="cs-iconSwap__b">
                          <HiMiniArrowUpRight />
                        </span>
                      </span>
                    )}

                    {hasThumb && (
                      <span
                        className="cs-pillThumb"
                        style={{
                          backgroundImage: `url("${getSeededCardImage("virtual-tour", item.label)}")`,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          <div className="cs-right">
            {virtualTourItem && (
              <a
                href={virtualTourItem.href || "#"}
                className="cs-pill cs-headerAction"
              >
                <span className="cs-pillTextSwap">
                  <span className="cs-pillTextSwap__a">
                    {virtualTourItem.label}
                  </span>
                  <span className="cs-pillTextSwap__b">
                    {`${virtualTourItem.label} ->`}
                  </span>
                </span>

                <span
                  className="cs-pillThumb"
                  style={{
                    backgroundImage: `url("${getSeededCardImage("virtual-tour", virtualTourItem.label)}")`,
                  }}
                  aria-hidden="true"
                />
              </a>
            )}

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
              {navItems.map((item) => {
                const hasDrop =
                  !!item.cards?.length &&
                  item.key !== "members" &&
                  item.key !== "virtual";
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
