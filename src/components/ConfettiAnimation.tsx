
import React, { useEffect, useState } from 'react';

export const ConfettiAnimation = () => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ 
    id: number; 
    left: number; 
    delay: number; 
    size: number;
    color: string;
    shape: string;
  }>>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 8 + 4,
      color: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8FB1', '#A8E6CF'][Math.floor(Math.random() * 5)],
      shape: Math.random() > 0.5 ? 'circle' : 'square',
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: piece.shape === 'circle' ? '50%' : '0%',
            transform: piece.shape === 'square' ? 'rotate(45deg)' : 'none',
          }}
        />
      ))}
    </div>
  );
};
