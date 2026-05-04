import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import styles from "./PurposeHalls.module.css";

gsap.registerPlugin(ScrollTrigger);

const HALLS = [
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    desc: "Bookable by the hour or day. Free for members, available to everyone",
    color: "#ff7d7d",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "studios",
    title: "Studios",
    desc: "Fully equipped spaces for production, presentations, and recordings",
    color: "#4a9677",
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "weekend-day-pass",
    title: "Weekend/Day Pass",
    desc: "Full access to our shared spaces and all amenities any day of the week.",
    color: "#b9dfdd",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "virtual-office",
    title: "Virtual Office",
    desc: "Real business address, mail handling, meeting room access without a full-time desk.",
    color: "#efd37b",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  },
];

const SCROLL_PX = 160;

export default function PurposeHalls() {
  const items = useMemo(() => HALLS, []);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const stageRef  = useRef(null);   // only this part gets pinned
  const listRef   = useRef(null);
  const panelRef  = useRef(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    items.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, [items]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage   = stageRef.current;
    const list    = listRef.current;
    const panel   = panelRef.current;
    if (!section || !stage || !list || !panel) return;

    const total      = items.length;
    const activeMove = 54;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 861px)", () => {
      const itemEls  = Array.from(list.querySelectorAll("[data-ph-item]"));
      const textEls  = Array.from(list.querySelectorAll("[data-ph-text]"));
      const slideEls = Array.from(panel.querySelectorAll("[data-ph-slide]"));

      if (
        itemEls.length !== total ||
        textEls.length !== total ||
        slideEls.length !== total
      )
        return;

      // Position slides: first visible, rest hidden below
      gsap.set(slideEls, { yPercent: (i) => (i === 0 ? 0 : 100) });

      const setters = items.map((_, i) => ({
        itemX:       gsap.quickSetter(itemEls[i], "x", "px"),
        textOpacity: gsap.quickSetter(textEls[i], "opacity"),
        slideY:      gsap.quickSetter(slideEls[i], "yPercent"),
      }));

      const applyProgress = (p) => {
        for (let i = 0; i < total; i++) {
          const dist  = Math.abs(p - i);
          const w     = Math.max(0, 1 - dist);
          const eased = w * w * (3 - 2 * w);

          setters[i].itemX(eased * activeMove);
          setters[i].textOpacity(0.42 + 0.58 * eased);
          setters[i].slideY(gsap.utils.clamp(-100, 100, (i - p) * 100));
        }

        const rounded = gsap.utils.clamp(0, total - 1, Math.round(p));
        if (rounded !== activeIndexRef.current) {
          activeIndexRef.current = rounded;
          setActiveIndex(rounded);
        }
      };

      applyProgress(0);

      const state = { p: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,          // only the content stage, NOT the heading
          pin:     true,           // pin the trigger element itself
          start:   "top top",
          end:     () => `+=${SCROLL_PX * (total - 1)}`,
          scrub:   true,           // instant follow — no lag, no jump
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo:    1 / (total - 1),
            duration:  { min: 0.12, max: 0.28 },
            delay:     0,
            ease:      "power2.out",
            directional: true,     // any scroll forward = next image
          },
        },
      });

      tl.to(state, {
        p:        total - 1,
        ease:     "none",
        duration: 1,
        onUpdate: () => applyProgress(state.p),
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([...itemEls, ...textEls, ...slideEls], { clearProps: "all" });
      };
    });

    mm.add("(max-width: 860px)", () => {
      activeIndexRef.current = 0;
      setActiveIndex(0);
    });

    return () => mm.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className={styles.section} id="purpose-halls">

      {/* ── Heading: scrolls normally, never pinned ── */}
      <div className={styles.headArea}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          <span>Purpose Halls</span>
        </div>
        <h2 className={styles.title}>
          and because work isn&apos;t
          <br />
          always just a desk:
        </h2>
      </div>

      {/* ── Stage: this part gets pinned by GSAP ── */}
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.stageInner}>

          <ul ref={listRef} className={styles.list} role="list">
            {items.map((hall, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={hall.id}
                  data-ph-item
                  className={`${styles.item} ${isActive ? styles.active : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={styles.itemTile}
                    style={{ "--tile-color": hall.color }}
                    aria-hidden="true"
                  />
                  <div data-ph-text className={styles.itemText}>
                    <h3 className={styles.itemTitle}>{hall.title}</h3>
                    <p className={styles.itemDesc}>{hall.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div ref={panelRef} className={styles.panel} aria-live="polite">
            <div className={styles.panelStack}>
              {items.map((hall, index) => (
                <div
                  key={hall.id}
                  data-ph-slide
                  className={`${styles.panelSlide} ${
                    index === activeIndex ? styles.activeSlide : ""
                  }`}
                  aria-hidden={index === activeIndex ? "false" : "true"}
                >
                  <img
                    className={styles.panelImage}
                    src={hall.image}
                    alt={hall.title}
                    decoding="async"
                    draggable="false"
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                </div>
              ))}
            </div>

            <div className={styles.panelDots} aria-hidden="true">
              {items.map((item, index) => (
                <span
                  key={item.id}
                  className={`${styles.panelDot} ${
                    index === activeIndex ? styles.activeDot : ""
                  }`}
                />
              ))}
            </div>

            <a className={styles.cta} href="#contact">
              <span>Make Enquiry</span>
              <span className={styles.ctaIcon} aria-hidden="true">
                <HiMiniArrowUpRight />
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
