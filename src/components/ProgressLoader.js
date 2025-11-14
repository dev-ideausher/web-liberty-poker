"use client";
import React, { useEffect, useState } from "react";

export default function ProgressLoader({
  className,
  duration = 10, // total time to reach 100% (seconds)
  onComplete,
  pauses = 3, // number of random pauses
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    let pausePoints = [];

    // generate random pause points between 10% and 90%
    for (let i = 0; i < pauses; i++) {
      pausePoints.push(Math.floor(Math.random() * 80) + 10);
    }
    pausePoints.sort((a, b) => a - b); // ensure ascending order

    const totalSteps = 100;
    const baseStepTime = (duration * 1000) / totalSteps;

    let currentPauseIndex = 0;
    let paused = false;

    const startProgress = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (paused || prev >= 100) return prev;

          const next = prev + 1;
          if (pausePoints[currentPauseIndex] && next >= pausePoints[currentPauseIndex]) {
            paused = true;
            currentPauseIndex++;

            // random pause duration between 0.5–2 seconds
            const pauseTime = 500 + Math.random() * 1500;
            setTimeout(() => {
              paused = false;
            }, pauseTime);
          }

          if (next >= 100) {
            clearInterval(interval);
            if (onComplete) onComplete();
            return 100;
          }

          return next;
        });
      }, baseStepTime);
    };

    startProgress();

    return () => clearInterval(interval);
  }, [duration, pauses, onComplete]);

  return (
    <div
      className={`${className} relative h-5 overflow-hidden bg-[#F4E17E50] rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]`}
    >
      <div
        className="bg-primary absolute top-0 left-0 h-full rounded-full transition-all linear"
        style={{
          width: `${progress}%`,
          transition: "width 0.15s linear",
        }}
      ></div>
    </div>
  );
}
