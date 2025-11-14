"use client";
import RedCross from "@/icons/RedCross";
import React, { useRef, useEffect, useState } from "react";

export default function VideoRewardModal({ 
  src, 
  onClose, 
  autoPlay = true 
}) {
  const videoRef = useRef(null);
  const [showClose, setShowClose] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
  
    // Always mute before play to ensure autoplay works
    // video.muted = true;
  
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log("Video autoplay started"))
        .catch(() => {
          console.warn("Autoplay prevented, waiting for user interaction");
          // Try again after user clicks anywhere
          const retryPlay = () => {
            video.play();
            document.removeEventListener("click", retryPlay);
          };
          document.addEventListener("click", retryPlay);
        });
    }
  
    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      if (progress >= 70 && !showClose) setShowClose(true);
    };
  
    const handleEnded = () => {
      if (onClose) onClose();
    };
  
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
  
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [autoPlay, onClose, showClose]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        playsInline
        autoPlay={autoPlay}
      />

      {/* Close button (visible after 80% progress) */}
      {showClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-black p-4 rounded-full"
          aria-label="Close"
        >
          <RedCross/>
        </button>
      )}
    </div>
  );
}
