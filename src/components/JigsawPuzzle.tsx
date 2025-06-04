
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

interface PuzzlePiece {
  id: number;
  correctPosition: number;
  currentPosition: number | null;
  isPlaced: boolean;
}

export const JigsawPuzzle: React.FC<JigsawPuzzleProps> = ({
  puzzleId,
  imageSrc,
  title,
  difficulty,
  onComplete,
  isCompleted,
}) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);

  const gridSize = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    initializePuzzle();
  }, [gridSize]);

  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = Array.from({ length: totalPieces }, (_, i) => ({
      id: i,
      correctPosition: i,
      currentPosition: null,
      isPlaced: false,
    }));
    setPieces(newPieces);
    setSelectedPiece(null);
    setMoves(0);
    setIsShuffled(false);
  };

  const shufflePuzzle = () => {
    const shuffledPieces = pieces.map(piece => ({
      ...piece,
      currentPosition: null,
      isPlaced: false,
    }));
    setPieces(shuffledPieces);
    setIsShuffled(true);
    setMoves(0);
    setSelectedPiece(null);
  };

  const handlePieceSelect = (pieceId: number) => {
    if (isCompleted || pieces[pieceId].isPlaced) return;
    setSelectedPiece(selectedPiece === pieceId ? null : pieceId);
  };

  const handleSlotClick = (slotIndex: number) => {
    if (!isShuffled || selectedPiece === null || isCompleted) return;

    const isSlotOccupied = pieces.some(piece => piece.currentPosition === slotIndex);
    if (isSlotOccupied) return;

    const newPieces = pieces.map(piece => 
      piece.id === selectedPiece 
        ? { ...piece, currentPosition: slotIndex, isPlaced: true }
        : piece
    );

    setPieces(newPieces);
    setSelectedPiece(null);
    setMoves(moves + 1);

    // Check if puzzle is solved
    const isSolved = newPieces.every(piece => 
      piece.isPlaced && piece.currentPosition === piece.correctPosition
    );

    if (isSolved) {
      setTimeout(() => onComplete(), 500);
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

  const unplacedPieces = pieces.filter(piece => !piece.isPlaced);

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-fredoka font-bold text-white text-xl">{title}</h3>
        {isCompleted && <CheckCircle className="w-6 h-6 text-green-400 animate-bounce" />}
      </div>

      <div className={`flex items-center space-x-1 mb-4 ${getDifficultyColor()}`}>
        {getDifficultyStars()}
        <span className="font-nunito font-medium capitalize">{difficulty}</span>
      </div>

      {/* Puzzle Grid */}
      <div 
        className="grid gap-2 mb-4 mx-auto bg-white/30 rounded-lg p-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: '280px',
          height: '280px',
        }}
      >
        {Array.from({ length: totalPieces }, (_, index) => {
          const placedPiece = pieces.find(piece => piece.currentPosition === index);
          return (
            <div
              key={index}
              className={`relative border-2 border-dashed border-white/50 rounded-lg cursor-pointer transition-all duration-300 hover:border-white hover:bg-white/10 ${
                placedPiece ? 'border-solid border-green-400 bg-white/20' : ''
              }`}
              onClick={() => handleSlotClick(index)}
              style={{
                backgroundImage: placedPiece ? `url(${imageSrc})` : 'none',
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                backgroundPosition: placedPiece ? 
                  `${(placedPiece.correctPosition % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(placedPiece.correctPosition / gridSize) * (100 / (gridSize - 1))}%` : 
                  'center',
              }}
            >
              {!placedPiece && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50 font-fredoka">
                  {index + 1}
                </div>
              )}
              {placedPiece && placedPiece.correctPosition === index && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Available Pieces */}
      {isShuffled && unplacedPieces.length > 0 && (
        <div className="mb-4">
          <h4 className="text-white font-fredoka mb-2">Click a piece, then click where it goes:</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {unplacedPieces.map((piece) => (
              <div
                key={piece.id}
                className={`w-16 h-16 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedPiece === piece.id 
                    ? 'border-birthday-gold shadow-lg scale-110 shadow-birthday-gold/50' 
                    : 'border-white/50 hover:border-white hover:scale-105'
                }`}
                onClick={() => handlePieceSelect(piece.id)}
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                  backgroundPosition: `${(piece.correctPosition % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(piece.correctPosition / gridSize) * (100 / (gridSize - 1))}%`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-white mb-4">
        <span className="font-nunito">Moves: {moves}</span>
        {isCompleted && (
          <span className="text-green-400 font-fredoka font-bold animate-bounce">🎉 Completed!</span>
        )}
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={shufflePuzzle}
          disabled={isCompleted}
          className="flex-1 bg-birthday-coral hover:bg-birthday-coral/80 text-white font-fredoka"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Start Puzzle
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
