"use client";
import React, { useEffect, useState } from "react";

export default function CircularTurnTimer({ seconds = 30, active = false, size = 130 }) {
  const RADIUS = size / 2 - 6;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!active) {
      setOffset(0);
      return;
    }

    let start = performance.now();

    const animate = (now) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / seconds, 1);

      // filled section length
      const drawLength = CIRCUMFERENCE * progress;

      setOffset(drawLength);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [active, seconds]);

  return (
    <div className="absolute flex items-center justify-center pointer-events-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="6"
          fill="transparent"
        />

        {/* Progress stroke */}
        {active && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={RADIUS}
            stroke="#2ED777"
            strokeWidth="6"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={`${offset} ${CIRCUMFERENCE}`}
          />
        )}
      </svg>
    </div>
  );
}
