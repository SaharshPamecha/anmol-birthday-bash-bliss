
import React, { useEffect, useState } from 'react';

interface CelebrationEffectsProps {
  isActive: boolean;
  duration?: number;
}

export const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({ 
  isActive, 
  duration = 4000 
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
  }>>([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    // Create particles
    const newParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50,
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 10 - 5,
      color: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8FB1', '#A8E6CF'][Math.floor(Math.random() * 5)],
      size: Math.random() * 8 + 4,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 10,
    }));

    setParticles(newParticles);

    // Animate particles
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx * 0.5,
          y: particle.y + particle.vy * 0.5,
          vy: particle.vy + 0.3, // gravity
          rotation: particle.rotation + particle.rotationSpeed,
        })).filter(particle => particle.y < 120)
      );
    };

    const interval = setInterval(animateParticles, 16);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, duration]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            transform: `rotate(${particle.rotation}deg)`,
            transition: 'none',
          }}
        />
      ))}
    </div>
  );
};
