
import React, { useState } from 'react';
import { Heart, Sparkles, Cake, Star, Gift, Music } from 'lucide-react';

export const BirthdayWishes = () => {
  const [currentWish, setCurrentWish] = useState(0);

  const wishes = [
    {
      icon: Heart,
      title: "From Your Heart ❤️",
      message: "Happy 24th Birthday, Anmol! You bring so much joy and positivity to everyone around you. Your smile lights up any room, and your kindness touches every heart. May this new year of your life be filled with endless happiness, amazing adventures, and all the love you deserve!",
      color: "bg-birthday-coral"
    },
    {
      icon: Sparkles,
      title: "Dreams & Magic ✨",
      message: "As you turn 24, may all your dreams sparkle into reality! You have such incredible potential and the most beautiful spirit. This year, may you discover new passions, achieve your goals, and create magical memories that will last a lifetime. The world is so much brighter with you in it!",
      color: "bg-birthday-turquoise"
    },
    {
      icon: Star,
      title: "Shining Bright 🌟",
      message: "Anmol, you're a star that shines so bright! At 24, you're stepping into an amazing chapter of your life. May this year bring you success in everything you pursue, wonderful friendships, exciting opportunities, and moments that make your heart sing with joy. Keep being the incredible person you are!",
      color: "bg-birthday-pink"
    },
    {
      icon: Cake,
      title: "Sweet Celebrations 🎂",
      message: "Another year around the sun, and you keep getting more amazing! Your 24th year is going to be the sweetest yet. May every day be filled with laughter, every challenge become a stepping stone, and every moment be a celebration of the wonderful person you are. Here's to making this year absolutely unforgettable!",
      color: "bg-birthday-gold"
    },
    {
      icon: Gift,
      title: "Special Blessings 🎁",
      message: "Happy Birthday to someone who makes life more beautiful just by being in it! As you celebrate 24 years of being absolutely amazing, may you be blessed with good health, incredible adventures, loving relationships, and all the happiness your heart can hold. You deserve nothing but the very best!",
      color: "bg-birthday-lavender"
    }
  ];

  const currentWishData = wishes[currentWish];
  const Icon = currentWishData.icon;

  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-fredoka font-bold text-center mb-12 text-white drop-shadow-lg">
          💝 Birthday Wishes for Anmol 💝
        </h2>

        <div className={`${currentWishData.color} rounded-3xl p-8 md:p-12 border-4 border-white/50 animate-bounce-in relative overflow-hidden`}>
          <div className="absolute top-4 right-4 opacity-20">
            <Icon className="w-16 h-16 text-white" />
          </div>
          
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <Icon className="w-8 h-8 text-white" />
              <h3 className="text-2xl md:text-3xl font-fredoka font-bold text-white">
                {currentWishData.title}
              </h3>
              <Icon className="w-8 h-8 text-white" />
            </div>

            <p className="text-lg md:text-xl text-white leading-relaxed max-w-3xl mx-auto font-nunito">
              {currentWishData.message}
            </p>

            <div className="flex justify-center space-x-4 pt-6">
              {wishes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWish(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentWish ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setCurrentWish((prev) => (prev - 1 + wishes.length) % wishes.length)}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-fredoka font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30"
          >
            ← Previous Wish
          </button>
          <button
            onClick={() => setCurrentWish((prev) => (prev + 1) % wishes.length)}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-fredoka font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30"
          >
            Next Wish →
          </button>
        </div>

        <div className="mt-12 text-center">
          <div className="text-6xl animate-float">
            🎈🌟🎊💖✨
          </div>
          <p className="text-2xl text-white font-fredoka font-bold mt-4">
            With lots of love and best wishes! 💕
          </p>
        </div>
      </div>
    </div>
  );
};
