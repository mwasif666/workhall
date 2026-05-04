import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "studios",
    title: "Studios",
    desc: "Fully equipped spaces for production, presentations, and recordings",
    color: "#4a9677",
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "weekend-day-pass",
    title: "Weekend/Day Pass",
    desc: "Full access to our shared spaces and all amenities any day of the week.",
    color: "#b9dfdd",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "virtual-office",
    title: "Virtual Office",
    desc: "Real business address, mail handling, meeting room access without a full-time desk.",
    color: "#efd37b",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
  },
];

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      resolve();
      return;
    }

    img.onload = resolve;
    img.onerror = resolve;
  });
}

export default function PurposeHalls() {
  const items = useMemo(() => HALLS, []);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const listRef = useRef(null);
  const cardRefs = useRef([]);
  const activeIdxRef = useRef(0);

  useEffect(() => {
    items.forEach((item) => preloadImage(item.image));
  }, [items]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const list = listRef.current;

    if (!section || !stage || !list) return;

    const total = items.length;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 861px)", () => {
      const ctx = gsap.context(() => {
        const cards = cardRefs.current.filter(Boolean);
        const itemEls = Array.from(list.querySelectorAll("[data-ph-item]"));
        const textEls = Array.from(list.querySelectorAll("[data-ph-text]"));

        activeIdxRef.current = 0;
        setActiveIndex(0);

        gsap.set(cards, {
          yPercent: 0,
          zIndex: (i) => i + 1,
          force3D: true,
        });

        gsap.set(cards.slice(1), {
          yPercent: 105,
        });

        gsap.set(itemEls, {
          x: 0,
        });

        gsap.set(textEls, {
          opacity: (i) => (i === 0 ? 1 : 0.28),
        });

        gsap.set(itemEls[0], {
          x: 54,
        });

        const updateList = (idx) => {
          itemEls.forEach((el, i) => {
            gsap.to(el, {
              x: i === idx ? 54 : 0,
              duration: 0.4,
              ease: "power3.out",
              overwrite: true,
            });

            gsap.to(textEls[i], {
              opacity: i === idx ? 1 : 0.28,
              duration: 0.4,
              ease: "power3.out",
              overwrite: true,
            });
          });
        };

        const STEP = window.innerHeight;

        let currentIdx = 0;
        let isPinned = false;
        let isAnimating = false;

        const pinTrigger = ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: `+=${total * STEP}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            isPinned = self.isActive;
          },
        });

        const goTo = (nextIdx) => {
          if (nextIdx === currentIdx || isAnimating) return;

          isAnimating = true;

          const dir = nextIdx > currentIdx ? 1 : -1;
          const prevIdx = currentIdx;

          currentIdx = nextIdx;
          activeIdxRef.current = nextIdx;

          setActiveIndex(nextIdx);
          updateList(nextIdx);

          if (dir > 0) {
            gsap.set(cards[nextIdx], {
              yPercent: 105,
              zIndex: nextIdx + 20,
            });

            gsap.to(cards[nextIdx], {
              yPercent: 0,
              duration: 0.65,
              ease: "power3.inOut",
              overwrite: true,
              onComplete: () => {
                isAnimating = false;
              },
            });
          } else {
            gsap.set(cards[prevIdx], {
              zIndex: prevIdx + 20,
            });

            gsap.to(cards[prevIdx], {
              yPercent: 105,
              duration: 0.65,
              ease: "power3.inOut",
              overwrite: true,
              onComplete: () => {
                isAnimating = false;
              },
            });
          }

          const targetScroll = pinTrigger.start + nextIdx * STEP;

          window.scrollTo({
            top: targetScroll,
            behavior: "auto",
          });
        };

        const handleWheel = (e) => {
          if (!isPinned) return;

          const dir = e.deltaY > 0 ? 1 : -1;
          const nextIdx = currentIdx + dir;

          if (isAnimating) {
            e.preventDefault();
            return;
          }

          if (nextIdx < 0) {
            return;
          }

          if (nextIdx >= total) {
            return;
          }

          e.preventDefault();
          goTo(nextIdx);
        };

        const handleKeyDown = (e) => {
          if (!isPinned) return;

          const downKeys = ["ArrowDown", "PageDown", " "];
          const upKeys = ["ArrowUp", "PageUp"];

          let dir = 0;

          if (downKeys.includes(e.key)) dir = 1;
          if (upKeys.includes(e.key)) dir = -1;

          if (!dir) return;

          const nextIdx = currentIdx + dir;

          if (isAnimating) {
            e.preventDefault();
            return;
          }

          if (nextIdx < 0 || nextIdx >= total) return;

          e.preventDefault();
          goTo(nextIdx);
        };

        let touchStartY = 0;
        let touchEndY = 0;

        const handleTouchStart = (e) => {
          touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
          if (!isPinned) return;
          touchEndY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
          if (!isPinned) return;

          const diff = touchStartY - touchEndY;

          if (Math.abs(diff) < 40) return;

          const dir = diff > 0 ? 1 : -1;
          const nextIdx = currentIdx + dir;

          if (isAnimating) {
            e.preventDefault();
            return;
          }

          if (nextIdx < 0 || nextIdx >= total) return;

          e.preventDefault();
          goTo(nextIdx);
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        window.addEventListener("touchmove", handleTouchMove, {
          passive: true,
        });
        window.addEventListener("touchend", handleTouchEnd, {
          passive: false,
        });

        return () => {
          window.removeEventListener("wheel", handleWheel);
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("touchstart", handleTouchStart);
          window.removeEventListener("touchmove", handleTouchMove);
          window.removeEventListener("touchend", handleTouchEnd);

          pinTrigger.kill();

          gsap.set([...cards, ...itemEls, ...textEls], {
            clearProps: "all",
          });
        };
      }, section);

      return () => ctx.revert();
    });

    mm.add("(max-width: 860px)", () => {
      activeIdxRef.current = 0;
      setActiveIndex(0);
    });

    return () => mm.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className={styles.section} id="purpose-halls">
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

          <div className={styles.panel} aria-live="polite">
            <div className={styles.panelStack}>
              {items.map((hall, index) => (
                <div
                  key={hall.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={styles.imageLayer}
                >
                  <img
                    src={hall.image}
                    alt={hall.title}
                    className={styles.panelImage}
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
