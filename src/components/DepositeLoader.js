"use client";
import React, { useEffect, useState } from "react";

export default function DepositeLoader({
  className = "",
  height = 55,
  targetPoint = 0,
  duration = 1500,
  coinSrc = "/images/coin.svg",
  updateHandler,
}) {
  const intervals = ["", "0", 6, 14, 35, 100];

  const defaultIndex = 2;

  const [targetIndex, setTargetIndex] = useState(defaultIndex);
  const [fillWidth, setFillWidth] = useState(0); // <-- always 0 for SSR safety

  // Set the target index safely on the client
  useEffect(() => {
    const idx = intervals.indexOf(targetPoint);
    setTargetIndex(idx !== -1 ? idx : defaultIndex);
  }, [targetPoint]);

  // Animate bar after targetIndex is known
  useEffect(() => {
    const percent = (targetIndex / (intervals.length - 1)) * 100;
    setTimeout(() => setFillWidth(percent), 100);
  }, [targetIndex]);

  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative w-full button-outline-primary rounded-full"
        style={{ height }}
      >
        {/* Filled Bar */}
        <div
          className="bg-primary opacity-80 h-full absolute top-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${fillWidth}%` }}
        />

        {/* Coin */}
        <img
          src={coinSrc}
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-30"
          style={{ left: `calc(${fillWidth}% - 110px)` }}
          alt="coin"
        />

        {/* Interval Labels */}
        <div className="flex justify-between mt-2 px-1 relative z-20">
          {intervals.map((point, i) => (
            <span
              key={i}
              onClick={() => updateHandler(point)}
              className="
                text-primary normal-text-shadow flex items-center 
                text-[32px] font-bold text-center min-w-5 h-9 cursor-pointer
              "
            >
              {typeof point === "number" ? `${point}$` : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
