
import React from 'react';
import { Sparkles, Cake, Heart, Star } from 'lucide-react';

export const BirthdayHero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="text-center space-y-8 px-4 animate-bounce-in">
        <div className="relative">
          <h1 className="text-6xl md:text-8xl font-fredoka font-bold text-white drop-shadow-2xl">
            🎉 HAPPY 24th BIRTHDAY 🎂
          </h1>
          <h2 className="text-4xl md:text-6xl font-fredoka font-bold text-birthday-gold mt-4 animate-wiggle">
            ANMOL! ✨
          </h2>
        </div>
        
        <div className="flex justify-center space-x-4 animate-float">
          <div className="w-16 h-16 bg-birthday-coral rounded-full flex items-center justify-center animate-bounce-in delay-100">
            <Cake className="w-8 h-8 text-white" />
          </div>
          <div className="w-16 h-16 bg-birthday-turquoise rounded-full flex items-center justify-center animate-bounce-in delay-200">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="w-16 h-16 bg-birthday-pink rounded-full flex items-center justify-center animate-bounce-in delay-300">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div className="w-16 h-16 bg-birthday-gold rounded-full flex items-center justify-center animate-bounce-in delay-500">
            <Star className="w-8 h-8 text-white" />
          </div>
        </div>

        <p className="text-2xl md:text-3xl font-nunito font-medium text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
          🌟 It's time for the most amazing birthday celebration! 🌟
          <br />
          Get ready for puzzles, surprises, and lots of fun! 🎈
        </p>

        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border-2 border-white/30">
          <h3 className="text-xl font-fredoka font-semibold text-white mb-4">
            🎁 Your Birthday Adventure Awaits! 🎁
          </h3>
          <ul className="text-white space-y-2 text-lg">
            <li>🧩 Solve fun jigsaw puzzles with your photos</li>
            <li>🎁 Unlock special birthday gifts</li>
            <li>💝 Read heartfelt birthday wishes</li>
            <li>🎊 Enjoy interactive birthday magic!</li>
          </ul>
        </div>

        <div className="text-6xl animate-bounce">
          🎈🎂🎉🎁🎊
        </div>
      </div>
    </div>
  );
};
