import { useEffect, useState } from 'react';

interface SnowflakeProps {
  left: string;
  animationDuration: string;
  delay: string;
  size: number;
}

function Snowflake({ left, animationDuration, delay, size }: SnowflakeProps) {
  return (
    <div
      className="absolute pointer-events-none text-white/20"
      style={{
        left,
        top: '-10px',
        fontSize: `${size}px`,
        animation: `fall ${animationDuration} linear ${delay} infinite`,
      }}
    >
      ❄
    </div>
  );
}

interface CandyCaneProps {
  top: string;
  left: string;
  rotation: number;
  delay: string;
}

function CandyCane({ top, left, rotation, delay }: CandyCaneProps) {
  return (
    <div
      className="absolute pointer-events-none opacity-40"
      style={{
        top,
        left,
        transform: `rotate(${rotation}deg)`,
        animation: `sway 4s ease-in-out ${delay} infinite`,
      }}
    >
      <div className="relative w-4 h-12">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500 via-white to-red-500 rounded-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #ef4444 0px, #ef4444 6px, white 6px, white 12px)',
          }}
        />
      </div>
    </div>
  );
}

interface ChristmasStarProps {
  top: string;
  left: string;
  size: number;
  delay: string;
}

function ChristmasStar({ top, left, size, delay }: ChristmasStarProps) {
  return (
    <div
      className="absolute pointer-events-none text-yellow-400"
      style={{
        top,
        left,
        fontSize: `${size}px`,
        animation: `twinkle 3s ease-in-out ${delay} infinite`,
      }}
    >
      ⭐
    </div>
  );
}

interface ChristmasLightProps {
  top: string;
  left: string;
  color: string;
  delay: string;
}

function ChristmasLight({ top, left, color, delay }: ChristmasLightProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        animation: `pulse 2s ease-in-out ${delay} infinite`,
      }}
    >
      <div className={`w-3 h-4 ${color} rounded-b-full opacity-50`} />
    </div>
  );
}

interface SparkleProps {
  top: string;
  left: string;
  delay: string;
  color: string;
}

function Sparkle({ top, left, delay, color }: SparkleProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        animation: `twinkle 2s ease-in-out ${delay} infinite`,
      }}
    >
      <div className={`${color} text-xs`}>✨</div>
    </div>
  );
}

export function ChristmasDecorations() {
  const [snowflakes] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 6}s`,
      delay: `${Math.random() * 5}s`,
      size: 10 + Math.random() * 8,
    }))
  );

  const [candyCanes] = useState(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: `${10 + Math.random() * 30}%`,
      left: i === 0 ? `${Math.random() * 15}%` : i === 1 ? `${85 + Math.random() * 10}%` : `${40 + Math.random() * 20}%`,
      rotation: -20 + Math.random() * 40,
      delay: `${Math.random() * 2}s`,
    }))
  );

  const [stars] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: `${5 + Math.random() * 40}%`,
      left: `${10 + Math.random() * 80}%`,
      size: 16 + Math.random() * 12,
      delay: `${Math.random() * 3}s`,
    }))
  );

  const [lights] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${3 + Math.random() * 15}%`,
      left: `${i * 12 + Math.random() * 8}%`,
      color: ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500'][i % 4],
      delay: `${Math.random() * 2}s`,
    }))
  );

  const [sparkles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${10 + Math.random() * 80}%`,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 2}s`,
      color: ['text-yellow-400/30', 'text-red-400/30', 'text-green-400/30'][i % 3],
    }))
  );

  useEffect(() => {
    // Add animations to the document if not already present
    if (!document.getElementById('christmas-decorations-styles')) {
      const style = document.createElement('style');
      style.id = 'christmas-decorations-styles';
      style.textContent = `
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes sway {
          0%, 100% {
            transform: translateX(0) rotate(-2deg);
          }
          50% {
            transform: translateX(10px) rotate(2deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => (
        <Snowflake key={`snow-${flake.id}`} {...flake} />
      ))}
      {candyCanes.map((cane) => (
        <CandyCane key={`cane-${cane.id}`} {...cane} />
      ))}
      {stars.map((star) => (
        <ChristmasStar key={`star-${star.id}`} {...star} />
      ))}
      {lights.map((light) => (
        <ChristmasLight key={`light-${light.id}`} {...light} />
      ))}
      {sparkles.map((sparkle) => (
        <Sparkle key={`sparkle-${sparkle.id}`} {...sparkle} />
      ))}
    </div>
  );
}

export function CornerHolly({ position = 'top-left' }: { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4 scale-x-[-1]',
    'bottom-left': 'bottom-4 left-4 scale-y-[-1]',
    'bottom-right': 'bottom-4 right-4 scale-[-1]',
  };

  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none opacity-30 hidden md:block`}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Holly leaves */}
        <path
          d="M10 20C10 20 15 10 25 15C25 15 20 25 10 20Z"
          fill="#22c55e"
          className="opacity-70"
        />
        <path
          d="M20 15C20 15 30 10 35 20C35 20 25 20 20 15Z"
          fill="#16a34a"
          className="opacity-70"
        />
        <path
          d="M30 20C30 20 35 10 40 18C40 18 32 25 30 20Z"
          fill="#22c55e"
          className="opacity-70"
        />
        {/* Berries */}
        <circle cx="22" cy="18" r="3" fill="#dc2626" />
        <circle cx="28" cy="20" r="3" fill="#ef4444" />
        <circle cx="24" cy="24" r="2.5" fill="#dc2626" />
      </svg>
    </div>
  );
}
