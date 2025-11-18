"use client";
import React, { useEffect, useState } from "react";

export default function DayTimer({ minutes = null, futureDate = null, className = "" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Convert minutes → future timestamp
  const getTargetTime = () => {
    if (futureDate) return new Date(futureDate).getTime();
    if (minutes) return Date.now() + minutes * 60 * 1000;
    return null;
  };

  useEffect(() => {
    const target = getTargetTime();
    if (!target) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [minutes, futureDate]);

  return (
    <div className={`text-xl font-semibold ${className}`}>
      {timeLeft.days !== "00" && (
        <span>{timeLeft.days}d : </span>
      )}
      <span>{timeLeft.hours}h : </span>
      <span>{timeLeft.minutes}m : </span>
      <span>{timeLeft.seconds}s</span>
    </div>
  );
}
