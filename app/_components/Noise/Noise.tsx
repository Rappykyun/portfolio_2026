"use client";

import React, { useRef, useEffect } from "react";
import { useReducedMotion } from "../useReducedMotion";

export interface NoiseProps {
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = ({
  patternRefreshInterval = 3,
  patternAlpha = 15,
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const canvasSize = 256;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Allocate once to avoid ~120MB/s garbage collection churn
    const imageData = ctx.createImageData(canvasSize, canvasSize);
    const data = imageData.data;
    const len = data.length;

    const drawGrain = () => {
      for (let i = 0; i < len; i += 4) {
        const value = (Math.random() * 255) | 0;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    drawGrain();

    if (reducedMotion) {
      return;
    }

    let frame = 0;
    let animationId: number;

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    animationId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [patternRefreshInterval, patternAlpha, reducedMotion]);

  return (
    <canvas
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-35"
      ref={grainRef}
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
};

export default Noise;
