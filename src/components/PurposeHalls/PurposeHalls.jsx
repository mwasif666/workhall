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
import "./PurposeHalls.css";

gsap.registerPlugin(ScrollTrigger);

const HALLS = [
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    desc: "Bookable by the hour or day. Free for members, available to everyone.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "studios",
    title: "Studios",
    desc: "Fully equipped spaces for production, presentations, and recordings.",
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "weekend-day-pass",
    title: "Weekend / Day Pass",
    desc: "Full access to our shared spaces and all amenities any day of the week.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "virtual-office",
    title: "Virtual Office",
    desc: "Real business address, mail handling, meeting room access without a full-time desk.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function PurposeHalls() {
  const items = useMemo(() => HALLS, []);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const listRef = useRef(null);
  const panelRef = useRef(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    items.forEach((item) => {
      const image = new Image();
      image.src = item.image;
    });
  }, [items]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const list = listRef.current;
    const panel = panelRef.current;
    if (!section || !stage || !list || !panel) return undefined;

    const total = items.length;
    const maxForward = 36;
    const minOpacity = 0.34;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 860px)", () => {
      const itemEls = Array.from(list.querySelectorAll(".ph-item"));
      const tileEls = Array.from(list.querySelectorAll(".ph-itemTile"));
      const slideEls = Array.from(panel.querySelectorAll(".ph-panelSlide"));

      if (
        itemEls.length !== total ||
        tileEls.length !== total ||
        slideEls.length !== total
      ) {
        return undefined;
      }

      const setters = items.map((_, i) => ({
        itemX: gsap.quickSetter(itemEls[i], "x", "px"),
        itemOpacity: gsap.quickSetter(itemEls[i], "opacity"),
        tileScale: gsap.quickSetter(tileEls[i], "scale"),
        slideY: gsap.quickSetter(slideEls[i], "yPercent"),
      }));

      const applyProgress = (p) => {
        for (let i = 0; i < total; i += 1) {
          const w = Math.max(0, 1 - Math.abs(p - i));
          const eased = w * w * (3 - 2 * w);
          const slideY = gsap.utils.clamp(-100, 100, (i - p) * 100);

          setters[i].itemX(eased * maxForward);
          setters[i].itemOpacity(minOpacity + (1 - minOpacity) * eased);
          setters[i].tileScale(1 + 0.04 * eased);
          setters[i].slideY(slideY);
        }

        const rounded = Math.min(total - 1, Math.max(0, Math.round(p)));
        if (rounded !== activeIndexRef.current) {
          activeIndexRef.current = rounded;
          setActiveIndex(rounded);
        }
      };

      applyProgress(0);

      const state = { p: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (total - 1) * 0.88}`,
          pin: stage,
          pinSpacing: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(state, {
        p: total - 1,
        ease: "none",
        duration: 1,
        onUpdate: () => applyProgress(state.p),
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        const els = [...itemEls, ...tileEls, ...slideEls];
        gsap.set(els, { clearProps: "transform,opacity,scale" });
      };
    });

    mm.add("(max-width: 859px)", () => {
      activeIndexRef.current = 0;
      setActiveIndex(0);
    });

    return () => mm.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className="ph-section" id="purpose-halls">
      <div ref={stageRef} className="ph-stage">
        <div className="ph-container">
          <header className="ph-head">
            <div className="ph-eyebrow">
              <span className="ph-eyebrowDot" aria-hidden="true" />
              Purpose Halls
            </div>
            <h2 className="ph-title">
              and because work isn&apos;t
              <br />
              always just a desk:
            </h2>
          </header>

          <div className="ph-body">
            <ul ref={listRef} className="ph-list" role="list">
              {items.map((hall, index) => {
                const isActive = index === activeIndex;
                return (
                  <li
                    key={hall.id}
                    className={`ph-item ${isActive ? "isActive" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="ph-itemTile" aria-hidden="true" />
                    <div className="ph-itemText">
                      <div className="ph-itemTitle">{hall.title}</div>
                      <p className="ph-itemDesc">{hall.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div ref={panelRef} className="ph-panel" aria-live="polite">
              <div className="ph-panelStack">
                {items.map((hall, index) => (
                  <div
                    key={hall.id}
                    className={`ph-panelSlide ${
                      index === activeIndex ? "isActive" : ""
                    }`}
                    aria-hidden={index === activeIndex ? "false" : "true"}
                  >
                    <img
                      className="ph-panelImage"
                      src={hall.image}
                      alt={hall.title}
                      decoding="async"
                      draggable="false"
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                    <span className="ph-panelLabel">{hall.title}</span>
                  </div>
                ))}
                <div className="ph-panelScrim" aria-hidden="true" />
              </div>

              <a className="ph-cta" href="#contact">
                <span>Make Enquiry</span>
                <span className="ph-ctaIcon" aria-hidden="true">
                  <HiMiniArrowUpRight />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
