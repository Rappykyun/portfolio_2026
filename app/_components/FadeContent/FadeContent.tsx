"use client";

import * as React from "react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  blur?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  container,
  blur = false,
  duration = 1000,
  ease = "power2.out",
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power2.in",
  onComplete,
  onDisappearanceComplete,
  className = "",
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    let scrollerTarget: Element | string | null = container || null;
    if (typeof scrollerTarget === "string") {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const getSeconds = (value: number) => (value > 10 ? value / 1000 : value);
    let animation: gsap.core.Tween | null = null;

    const trigger = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${(1 - threshold) * 100}%`,
      once: true,
      onEnter: () => {
        animation = gsap.fromTo(
          el,
          {
            autoAlpha: initialOpacity,
            filter: blur ? "blur(10px)" : "blur(0px)",
          },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: getSeconds(duration),
            delay: getSeconds(delay),
            ease,
            onComplete: () => {
              onComplete?.();
              if (disappearAfter > 0) {
                gsap.to(el, {
                  autoAlpha: initialOpacity,
                  filter: blur ? "blur(10px)" : "blur(0px)",
                  delay: getSeconds(disappearAfter),
                  duration: getSeconds(disappearDuration),
                  ease: disappearEase,
                  onComplete: onDisappearanceComplete,
                });
              }
            },
          },
        );
      },
    });

    return () => {
      trigger.kill();
      animation?.kill();
      gsap.killTweensOf(el);
    };
  }, [
    blur,
    container,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    duration,
    ease,
    initialOpacity,
    onComplete,
    onDisappearanceComplete,
    reducedMotion,
    threshold,
  ]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
