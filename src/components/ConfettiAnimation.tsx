
import React, { useEffect, useState } from 'react';

export const ConfettiAnimation = () => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
