import { motion as Motion, useMotionValue, useTransform } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./Stack.css";

const getSeededRotation = (id) =>
  (((id * 9301 + 49297) % 233280) / 233280) * 10 - 5;

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_event, info) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <Motion.div
        className="stack-card-rotate-disabled"
        style={{ x: 0, y: 0 }}
      >
        {children}
      </Motion.div>
    );
  }

  return (
    <Motion.div
      className="stack-card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </Motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const fallbackCards = useMemo(
    () => [
      {
        content: (
          <img
            src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
            alt="card-1"
            className="stack-card-image"
          />
        ),
      },
      {
        content: (
          <img
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
            alt="card-2"
            className="stack-card-image"
          />
        ),
      },
      {
        content: (
          <img
            src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
            alt="card-3"
            className="stack-card-image"
          />
        ),
      },
      {
        content: (
          <img
            src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
            alt="card-4"
            className="stack-card-image"
          />
        ),
      },
    ],
    [],
  );

  const cardContents = useMemo(
    () => (cards.length ? cards.map((content) => ({ content })) : fallbackCards),
    [cards, fallbackCards],
  );

  const [order, setOrder] = useState([]);

  const normalizeOrder = useCallback(
    (sourceOrder) => {
      const nextOrder = [];
      const seen = new Set();

      sourceOrder.forEach((cardIndex) => {
        if (
          Number.isInteger(cardIndex) &&
          cardIndex >= 0 &&
          cardIndex < cardContents.length &&
          !seen.has(cardIndex)
        ) {
          nextOrder.push(cardIndex);
          seen.add(cardIndex);
        }
      });

      cardContents.forEach((_card, cardIndex) => {
        if (!seen.has(cardIndex)) {
          nextOrder.push(cardIndex);
        }
      });

      return nextOrder;
    },
    [cardContents],
  );

  const stackOrder = useMemo(
    () => normalizeOrder(order),
    [normalizeOrder, order],
  );

  const sendToBack = useCallback(
    (cardIndex) => {
      setOrder((prev) => {
        const newOrder = normalizeOrder(prev);
        const index = newOrder.indexOf(cardIndex);

        if (index === -1) return newOrder;

        const [card] = newOrder.splice(index, 1);
        newOrder.unshift(card);
        return newOrder;
      });
    },
    [normalizeOrder],
  );

  useEffect(() => {
    if (autoplay && stackOrder.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardIndex = stackOrder[stackOrder.length - 1];
        sendToBack(topCardIndex);
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, isPaused, sendToBack, stackOrder]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stackOrder.map((cardIndex, index) => {
        const randomRotate = randomRotation
          ? getSeededRotation(cardIndex + 1)
          : 0;
        const card = cardContents[cardIndex];

        return (
          <CardRotate
            key={cardIndex}
            onSendToBack={() => sendToBack(cardIndex)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <Motion.div
              className="stack-card"
              onClick={() => shouldEnableClick && sendToBack(cardIndex)}
              animate={{
                rotateZ: (stackOrder.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stackOrder.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {card.content}
            </Motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
