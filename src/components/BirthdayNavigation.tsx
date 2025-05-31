
import React from 'react';
import { Home, Puzzle, Gift, Heart } from 'lucide-react';

interface BirthdayNavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export const BirthdayNavigation: React.FC<BirthdayNavigationProps> = ({
  currentSection,
  onSectionChange,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, emoji: '🏠' },
    { id: 'puzzles', label: 'Puzzles', icon: Puzzle, emoji: '🧩' },
    { id: 'gifts', label: 'Gifts', icon: Gift, emoji: '🎁' },
    { id: 'wishes', label: 'Wishes', icon: Heart, emoji: '💝' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border-2 border-white/30">
      <div className="flex space-x-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-fredoka font-medium transition-all duration-300 ${
                currentSection === item.id
                  ? 'bg-birthday-coral text-white shadow-lg scale-105'
                  : 'text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              <span className="text-lg">{item.emoji}</span>
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
