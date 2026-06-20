"use client";

/*
	jsrepo 1.28.4
	Installed from https://reactbits.dev/tailwind/
	1-27-2025
*/

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";

interface CardRotateProps {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

interface CardData {
  id: number;
  img: string;
}

interface CardDimensions {
  width: number;
  height: number;
}

interface AnimationConfig {
  stiffness: number;
  damping: number;
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: CardDimensions;
  cardsData?: CardData[];
  animationConfig?: AnimationConfig;
  sendToBackOnClick?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
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

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}: StackProps) {
  const [cards, setCards] = useState<CardData[]>(
    cardsData.length
      ? cardsData
      : [
          {
            id: 1,
            img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
          },
          {
            id: 2,
            img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
          },
          {
            id: 3,
            img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
          },
          {
            id: 4,
            img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
          },
        ]
  );

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  // Compute a stable rotation per card in an effect (Math.random is impure, so it
  // can't run during render). Defaults to 0, matching server render.
  const [randomRotations, setRandomRotations] = useState<number[]>(() =>
    cardsData.length ? cardsData.map(() => 0) : [0, 0, 0, 0]
  );

  useEffect(() => {
    if (!randomRotation) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRandomRotations(cards.map(() => Math.random() * 10 - 5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomRotation]);

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotations[index] ?? 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="absolute w-full h-full rounded-lg overflow-hidden"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
