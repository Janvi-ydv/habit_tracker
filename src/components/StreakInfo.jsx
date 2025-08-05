import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

const StreakInfo = () => {
  const { currentStreak, highestStreak } = useHabits();

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Streak Stats
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-center mb-2">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {currentStreak}
          </div>
          <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">
            Current Streak
          </div>
          <div className="text-xs text-orange-500 dark:text-orange-500 mt-1">
            {currentStreak === 1 ? 'day' : 'days'}
          </div>
        </div>
        
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {highestStreak}
          </div>
          <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
            Best Streak
          </div>
          <div className="text-xs text-yellow-500 dark:text-yellow-500 mt-1">
            {highestStreak === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>
      
      {currentStreak > 0 && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-sm text-green-700 dark:text-green-300 text-center">
            {currentStreak === 1 
              ? "Great start! Keep it up for day 2!" 
              : `Amazing! You're on a ${currentStreak}-day streak! 🔥`
            }
          </div>
        </div>
      )}
      
      {currentStreak === 0 && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Complete all your habits today to start a streak!
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakInfo; 