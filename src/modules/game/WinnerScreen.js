import React, { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';
import Timer from './Timer';

export default function WinnerScreen({children, handler}) {
  const fireworksRef = useRef(null);
  const fireworksInstance = useRef(null); // Track the Fireworks instance
  const soundIntervalRef = useRef(null); // Store sound interval reference
  const explosionCountRef = useRef(0); // Track the number of explosions
  // Create a function to play sound at explosion time
  const playExplosionSound = () => {
    const soundFiles = [
      'https://fireworks.js.org/sounds/explosion0.mp3',
      'https://fireworks.js.org/sounds/explosion1.mp3',
      'https://fireworks.js.org/sounds/explosion2.mp3',
    ];
    const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];
    const audio = new Audio(randomSound);
    // audio.play().catch((e) => console.log('Audio autoplay failed:', e));
  };

  useEffect(() => {
    if (fireworksRef.current && !fireworksInstance.current) {
      fireworksInstance.current = new Fireworks(fireworksRef.current, {
        speed: 1,
        particles: 250,
        trace: 30,
        traceSpeed: 20,
        explosion: 3,
        intensity: 10,
        flickering: 20,
        gravity: 1.2,
        opacity: 0.5,
        volume: 100,
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'], // Custom colors
        sound: {
          enable: false, // Disable internal sound to prevent conflicts
        },
      });

      fireworksInstance.current.start();

      // Function to trigger sound when an explosion happens
      const triggerSoundOnExplosion = () => {
        // Simulate an explosion by triggering sound at regular intervals
        playExplosionSound();
        explosionCountRef.current += 1;
        
        // After a set number of explosions, we stop the interval
        if (explosionCountRef.current >= 20) { // Adjust this number based on how many explosions you want
          clearInterval(soundIntervalRef.current);
          fireworksInstance.current.stop();
        }
      };

      // Sync sound with the fireworks explosion
      soundIntervalRef.current = setInterval(() => {
        triggerSoundOnExplosion();
      }, 500); // Adjust the interval to match the visual timing of explosions

      // Cleanup function to stop and clear the fireworks and sound interval when the component is unmounted
      return () => {
        if (soundIntervalRef.current) {
          clearInterval(soundIntervalRef.current); // Clear sound interval
        }
        if (fireworksInstance.current) {
          fireworksInstance.current.stop();
          fireworksInstance.current = null; // Reset instance
        }
        if (fireworksRef.current) {
          fireworksRef.current.innerHTML = ''; // Clear canvas elements inside the ref
        }
      };
    }
  }, []); // Empty dependency array ensures this only runs once when component mounts

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center winner-screen">
      <span className='absolute z-50 right-10 top-10 text-white text-lg size-10 rounded-full flex items-center justify-center border-2 border-white font-bold'>
        <Timer count={5} callback={handler} />
        
      </span>
      {/* Fireworks container */}
      <div ref={fireworksRef} style={{ position: 'absolute', width: '100%', height: '100%' }} />

      {/* Winner Screen content */}
      <div className="w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
