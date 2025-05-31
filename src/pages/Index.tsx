
import React, { useState, useEffect } from 'react';
import { BirthdayHero } from '../components/BirthdayHero';
import { JigsawPuzzle } from '../components/JigsawPuzzle';
import { GiftReveal } from '../components/GiftReveal';
import { BirthdayWishes } from '../components/BirthdayWishes';
import { ConfettiAnimation } from '../components/ConfettiAnimation';
import { FloatingBalloons } from '../components/FloatingBalloons';
import { BirthdayNavigation } from '../components/BirthdayNavigation';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const puzzleImages = [
    {
      id: 1,
      src: '/lovable-uploads/c64fce0f-941b-4a42-b964-e7d89a9e2227.png',
      title: 'ALL THE BEST Sign',
      difficulty: 'easy'
    },
    {
      id: 2,
      src: '/lovable-uploads/136f99d4-8004-498c-952d-9c6347fc6865.png',
      title: 'Letter A Portrait',
      difficulty: 'medium'
    },
    {
      id: 3,
      src: '/lovable-uploads/807ed5ba-e9d5-40f7-b8f2-52be2e9bebb0.png',
      title: 'Group Celebration',
      difficulty: 'hard'
    }
  ];

  const handlePuzzleComplete = (puzzleId: number) => {
    if (!completedPuzzles.includes(puzzleId)) {
      setCompletedPuzzles([...completedPuzzles, puzzleId]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  useEffect(() => {
    // Auto-trigger confetti on page load
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {showConfetti && <ConfettiAnimation />}
      <FloatingBalloons />
      
      <BirthdayNavigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />

      {currentSection === 'home' && (
        <BirthdayHero />
      )}

      {currentSection === 'puzzles' && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-4xl font-fredoka font-bold text-center mb-8 text-white drop-shadow-lg">
            🧩 Birthday Puzzle Fun! 🧩
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {puzzleImages.map((puzzle) => (
              <JigsawPuzzle
                key={puzzle.id}
                puzzleId={puzzle.id}
                imageSrc={puzzle.src}
                title={puzzle.title}
                difficulty={puzzle.difficulty}
                onComplete={() => handlePuzzleComplete(puzzle.id)}
                isCompleted={completedPuzzles.includes(puzzle.id)}
              />
            ))}
          </div>
        </div>
      )}

      {currentSection === 'gifts' && (
        <GiftReveal completedPuzzles={completedPuzzles} />
      )}

      {currentSection === 'wishes' && (
        <BirthdayWishes />
      )}
    </div>
  );
};

export default Index;
