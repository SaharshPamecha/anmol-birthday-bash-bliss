
import React from 'react';

export const FloatingBalloons = () => {
  const balloons = [
    { color: 'bg-birthday-coral', position: 'top-20 left-10', delay: '0s' },
    { color: 'bg-birthday-turquoise', position: 'top-32 right-16', delay: '1s' },
    { color: 'bg-birthday-pink', position: 'top-48 left-20', delay: '2s' },
    { color: 'bg-birthday-gold', position: 'top-64 right-8', delay: '0.5s' },
    { color: 'bg-birthday-lavender', position: 'top-80 left-8', delay: '1.5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {balloons.map((balloon, index) => (
        <div
          key={index}
          className={`absolute w-12 h-16 ${balloon.color} rounded-full ${balloon.position} animate-balloon-float opacity-70`}
          style={{ animationDelay: balloon.delay }}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-600"></div>
        </div>
      ))}
    </div>
  );
};
