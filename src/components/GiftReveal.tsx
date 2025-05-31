
import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Star, Cake, Music } from 'lucide-react';
import { Button } from './ui/button';

interface GiftRevealProps {
  completedPuzzles: number[];
}

export const GiftReveal: React.FC<GiftRevealProps> = ({ completedPuzzles }) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);

  const gifts = [
    {
      id: 1,
      requiredPuzzles: 1,
      icon: Heart,
      title: "💝 Friendship Gift",
      message: "A virtual hug from all your friends! You're amazing, Anmol! 🤗",
      color: "bg-birthday-pink",
    },
    {
      id: 2,
      requiredPuzzles: 2,
      icon: Sparkles,
      title: "✨ Happiness Potion",
      message: "May your 24th year be filled with endless joy and magical moments! ✨",
      color: "bg-birthday-turquoise",
    },
    {
      id: 3,
      requiredPuzzles: 3,
      icon: Star,
      title: "🌟 Dreams Come True",
      message: "All your wishes and dreams are getting ready to come true this year! 🌟",
      color: "bg-birthday-gold",
    },
  ];

  const handleOpenGift = (giftId: number) => {
    if (!openedGifts.includes(giftId)) {
      setOpenedGifts([...openedGifts, giftId]);
    }
  };

  const canOpenGift = (gift: any) => {
    return completedPuzzles.length >= gift.requiredPuzzles;
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-fredoka font-bold text-center mb-8 text-white drop-shadow-lg">
          🎁 Your Birthday Gifts! 🎁
        </h2>

        <p className="text-xl text-center text-white mb-12 max-w-2xl mx-auto">
          Complete puzzles to unlock special birthday gifts! You've completed {completedPuzzles.length} puzzle(s).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gifts.map((gift) => {
            const Icon = gift.icon;
            const isUnlocked = canOpenGift(gift);
            const isOpened = openedGifts.includes(gift.id);

            return (
              <div
                key={gift.id}
                className={`relative ${gift.color} rounded-2xl p-8 border-4 border-white/50 transition-all duration-500 ${
                  isUnlocked ? 'animate-bounce-in' : 'opacity-50 grayscale'
                }`}
              >
                <div className="text-center space-y-4">
                  {!isOpened ? (
                    <>
                      <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                        <Gift className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-fredoka font-bold text-white">
                        Mystery Gift {gift.id}
                      </h3>
                      <p className="text-white">
                        {isUnlocked 
                          ? "Click to open your gift!"
                          : `Complete ${gift.requiredPuzzles} puzzle(s) to unlock`
                        }
                      </p>
                      {isUnlocked && (
                        <Button
                          onClick={() => handleOpenGift(gift.id)}
                          className="bg-white text-gray-800 hover:bg-gray-100 font-fredoka font-bold"
                        >
                          Open Gift! 🎉
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-fredoka font-bold text-white">
                        {gift.title}
                      </h3>
                      <p className="text-white text-lg leading-relaxed">
                        {gift.message}
                      </p>
                      <div className="text-4xl animate-wiggle">🎊</div>
                    </>
                  )}
                </div>

                {isUnlocked && !isOpened && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-8 h-8 bg-birthday-coral rounded-full flex items-center justify-center animate-bounce">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {completedPuzzles.length === 3 && (
          <div className="mt-16 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border-4 border-birthday-gold">
              <h3 className="text-3xl font-fredoka font-bold text-birthday-gold mb-4">
                🏆 PUZZLE MASTER! 🏆
              </h3>
              <p className="text-white text-xl mb-6">
                Congratulations Anmol! You've completed all the puzzles and unlocked every gift! 
                You're absolutely amazing! 🌟
              </p>
              <div className="text-6xl animate-bounce">
                🎉🎂🎊🎁✨
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
