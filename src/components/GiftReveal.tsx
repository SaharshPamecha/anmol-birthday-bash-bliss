
import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Star, Cake, Music } from 'lucide-react';
import { Button } from './ui/button';
import { Gift3D } from './Gift3D';
import { CelebrationEffects } from './CelebrationEffects';

interface GiftRevealProps {
  completedPuzzles: number[];
}

export const GiftReveal: React.FC<GiftRevealProps> = ({ completedPuzzles }) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [celebratingGift, setCelebratingGift] = useState<number | null>(null);

  const gifts = [
    {
      id: 1,
      requiredPuzzles: 1,
      icon: Heart,
      title: "💝 Friendship Gift",
      message: "A virtual hug from all your friends! You're amazing, Anmol! 🤗",
      color: "bg-birthday-pink",
      celebration: "🎊 Friendship unlocked! 🎊"
    },
    {
      id: 2,
      requiredPuzzles: 2,
      icon: Sparkles,
      title: "✨ Happiness Potion",
      message: "May your 24th year be filled with endless joy and magical moments! ✨",
      color: "bg-birthday-turquoise",
      celebration: "🌟 Magic unleashed! 🌟"
    },
    {
      id: 3,
      requiredPuzzles: 3,
      icon: Star,
      title: "🌟 Dreams Come True",
      message: "All your wishes and dreams are getting ready to come true this year! 🌟",
      color: "bg-birthday-gold",
      celebration: "🚀 Dreams activated! 🚀"
    },
  ];

  const handleOpenGift = (giftId: number) => {
    if (!openedGifts.includes(giftId)) {
      setCelebratingGift(giftId);
    }
  };

  const handleAnimationComplete = (giftId: number) => {
    setOpenedGifts([...openedGifts, giftId]);
    setTimeout(() => setCelebratingGift(null), 2000);
  };

  const canOpenGift = (gift: any) => {
    return completedPuzzles.length >= gift.requiredPuzzles;
  };

  return (
    <div className="min-h-screen py-20 px-4 relative">
      <CelebrationEffects isActive={celebratingGift !== null} />
      
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-fredoka font-bold text-center mb-8 text-white drop-shadow-lg animate-bounce">
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
            const isCelebrating = celebratingGift === gift.id;

            return (
              <div
                key={gift.id}
                className={`relative ${gift.color} rounded-2xl p-8 border-4 border-white/50 transition-all duration-500 ${
                  isUnlocked ? 'animate-bounce-in' : 'opacity-50 grayscale'
                } ${isCelebrating ? 'animate-wiggle scale-110 shadow-2xl shadow-birthday-gold/50' : ''}`}
              >
                <div className="text-center space-y-4">
                  {!isOpened ? (
                    <>
                      <div className="w-24 h-24 mx-auto">
                        <Gift3D 
                          isOpen={isCelebrating} 
                          color={gift.color}
                          onAnimationComplete={() => handleAnimationComplete(gift.id)}
                        />
                      </div>
                      <h3 className="text-2xl font-fredoka font-bold text-white">
                        {isCelebrating ? gift.celebration : `Mystery Gift ${gift.id}`}
                      </h3>
                      <p className="text-white">
                        {isCelebrating 
                          ? "🎉 Opening your amazing gift! 🎉"
                          : isUnlocked 
                            ? "Click to open your gift!"
                            : `Complete ${gift.requiredPuzzles} puzzle(s) to unlock`
                        }
                      </p>
                      {isUnlocked && !isCelebrating && (
                        <Button
                          onClick={() => handleOpenGift(gift.id)}
                          className="bg-white text-gray-800 hover:bg-gray-100 font-fredoka font-bold transform hover:scale-105 transition-all duration-200"
                        >
                          Open Gift! 🎉
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="animate-bounce-in">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-birthday-gold to-birthday-coral rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-fredoka font-bold text-white animate-wiggle">
                        {gift.title}
                      </h3>
                      <p className="text-white text-lg leading-relaxed">
                        {gift.message}
                      </p>
                      <div className="text-6xl animate-wiggle">🎊</div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-birthday-gold via-birthday-coral to-birthday-pink rounded-2xl opacity-20 animate-pulse"></div>
                    </div>
                  )}
                </div>

                {isUnlocked && !isOpened && !isCelebrating && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-8 h-8 bg-birthday-coral rounded-full flex items-center justify-center animate-bounce">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {isCelebrating && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-2xl"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {completedPuzzles.length === 3 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-birthday-gold via-birthday-coral to-birthday-pink rounded-3xl p-8 max-w-2xl mx-auto border-4 border-birthday-gold animate-bounce-in shadow-2xl">
              <h3 className="text-4xl font-fredoka font-bold text-white mb-4 animate-wiggle">
                🏆 PUZZLE MASTER! 🏆
              </h3>
              <p className="text-white text-xl mb-6">
                Congratulations Anmol! You've completed all the puzzles and unlocked every gift! 
                You're absolutely amazing! 🌟
              </p>
              <div className="text-8xl animate-bounce">
                🎉🎂🎊🎁✨
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-birthday-gold via-birthday-coral to-birthday-pink rounded-3xl opacity-30 animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
