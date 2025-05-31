
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Shuffle, RotateCcw, CheckCircle, Star } from 'lucide-react';

interface JigsawPuzzleProps {
  puzzleId: number;
  imageSrc: string;
  title: string;
  difficulty: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export const JigsawPuzzle: React.FC<JigsawPuzzleProps> = ({
  puzzleId,
  imageSrc,
  title,
  difficulty,
  onComplete,
  isCompleted,
}) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [moves, setMoves] = useState(0);

  const gridSize = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 6;
  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    initializePuzzle();
  }, [gridSize]);

  const initializePuzzle = () => {
    const newPieces = Array.from({ length: totalPieces }, (_, i) => i);
    setPieces(newPieces);
    setIsShuffled(false);
    setMoves(0);
  };

  const shufflePuzzle = () => {
    const shuffled = [...pieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPieces(shuffled);
    setIsShuffled(true);
    setMoves(0);
  };

  const handlePieceClick = (index: number) => {
    if (!isShuffled || isCompleted) return;

    const emptyIndex = pieces.indexOf(totalPieces - 1);
    const canMove = 
      (Math.abs(index - emptyIndex) === 1 && Math.floor(index / gridSize) === Math.floor(emptyIndex / gridSize)) ||
      Math.abs(index - emptyIndex) === gridSize;

    if (canMove) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setMoves(moves + 1);

      // Check if puzzle is solved
      const isSolved = newPieces.every((piece, index) => piece === index);
      if (isSolved) {
        onComplete();
      }
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getDifficultyStars = () => {
    const starCount = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Array.from({ length: starCount }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-current" />
    ));
  };

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-fredoka font-bold text-white text-xl">{title}</h3>
        {isCompleted && <CheckCircle className="w-6 h-6 text-green-400" />}
      </div>

      <div className={`flex items-center space-x-1 mb-4 ${getDifficultyColor()}`}>
        {getDifficultyStars()}
        <span className="font-nunito font-medium capitalize">{difficulty}</span>
      </div>

      <div 
        className="grid gap-1 mb-4 mx-auto bg-white rounded-lg p-2"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: '280px',
          height: '280px',
        }}
      >
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${
              piece === totalPieces - 1 ? 'opacity-0' : ''
            }`}
            onClick={() => handlePieceClick(index)}
            style={{
              backgroundImage: piece !== totalPieces - 1 ? `url(${imageSrc})` : 'none',
              backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
              backgroundPosition: `${(piece % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(piece / gridSize) * (100 / (gridSize - 1))}%`,
            }}
          >
            {piece !== totalPieces - 1 && (
              <div className="absolute inset-0 border border-gray-300 rounded-sm" />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-white mb-4">
        <span className="font-nunito">Moves: {moves}</span>
        {isCompleted && (
          <span className="text-green-400 font-fredoka font-bold">🎉 Completed!</span>
        )}
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={shufflePuzzle}
          disabled={isCompleted}
          className="flex-1 bg-birthday-coral hover:bg-birthday-coral/80 text-white font-fredoka"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Shuffle
        </Button>
        <Button
          onClick={initializePuzzle}
          variant="outline"
          className="flex-1 border-white text-white hover:bg-white/20 font-fredoka"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};
