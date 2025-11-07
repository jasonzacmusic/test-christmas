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

interface OrnamentProps {
  color: string;
  size: number;
  top: string;
  left: string;
  delay: string;
}

function Ornament({ color, size, top, left, delay }: OrnamentProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        animation: `sway 3s ease-in-out ${delay} infinite`,
      }}
    >
      <div
        className={`rounded-full ${color} shadow-lg`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      />
      <div
        className="mx-auto bg-yellow-600/60"
        style={{
          width: `${size * 0.3}px`,
          height: `${size * 0.4}px`,
          borderRadius: '0 0 50% 50%',
        }}
      />
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
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 6}s`,
      delay: `${Math.random() * 5}s`,
      size: 10 + Math.random() * 8,
    }))
  );

  const [ornaments] = useState(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      color: ['bg-red-600/40', 'bg-green-600/40', 'bg-yellow-600/40', 'bg-blue-600/40'][i % 4],
      size: 20 + Math.random() * 15,
      top: `${5 + Math.random() * 15}%`,
      left: i < 2 ? `${Math.random() * 10}%` : `${90 + Math.random() * 10}%`,
      delay: `${Math.random() * 2}s`,
    }))
  );

  const [sparkles] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
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
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} />
      ))}
      {ornaments.map((ornament) => (
        <Ornament key={ornament.id} {...ornament} />
      ))}
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} {...sparkle} />
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
