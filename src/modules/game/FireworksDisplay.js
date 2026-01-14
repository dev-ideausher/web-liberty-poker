import React, { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';

export default function WinnerScreen() {
  const fireworksRef = useRef(null);
  const fireworksInstance = useRef(null); // Track the Fireworks instance

  useEffect(() => {
    // Only initialize if there is no existing instance
    if (fireworksRef.current && !fireworksInstance.current) {
      fireworksInstance.current = new Fireworks(fireworksRef.current, {
        speed: 2,
        particles: 250,
        trace: 30,
        traceSpeed: 20,
        explosion: 3,
        intensity: 20,
        flickering: 20,
        gravity: 1.2,
        opacity: 0.5,
        volume: 100,
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'], // Custom colors
      });
      fireworksInstance.current.start();
    }

    // Cleanup function to stop and clear the fireworks
    return () => {
      if (fireworksInstance.current) {
        fireworksInstance.current.stop();
        fireworksInstance.current = null; // Reset instance
      }
      if (fireworksRef.current) {
        fireworksRef.current.innerHTML = ''; // Clear any canvas elements inside the ref
      }
    };
  }, []);

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.75)]">
      {/* Fireworks container */}
      <div ref={fireworksRef} style={{ position: 'absolute', width: '100%', height: '100%' }} />

      {/* Winner Screen content */}
      <div className="z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h1>
        <p className="text-xl">You are the winner!</p>
      </div>
    </div>
  );
}
