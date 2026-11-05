import React, { useMemo } from 'react';

export default function SnowEffect({ active = true }) {
  if (!active) return null;

  const flakes = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const duration = 7 + (i % 6) * 1.5;
      // Using negative delay pre-starts the animation at various heights across the screen,
      // eliminating any initial pause, frozen bunching, or sticking at the top.
      const delay = -((i * 1.7) % duration);
      return {
        id: i,
        left: `${(i * 3.1) % 98}%`,
        duration: `${duration.toFixed(2)}s`,
        delay: `${delay.toFixed(2)}s`,
        size: `${11 + (i % 5) * 4}px`,
        opacity: 0.35 + ((i % 4) * 0.15),
        char: i % 3 === 0 ? '❄' : i % 3 === 1 ? '❅' : '•'
      };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake select-none"
          style={{
            left: flake.left,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            fontSize: flake.size,
            opacity: flake.opacity,
          }}
        >
          {flake.char}
        </span>
      ))}
    </div>
  );
}
