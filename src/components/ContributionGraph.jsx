import React from 'react';
import { getLastNDays, calculateCompletionPercentage } from '../utils/dateUtils';
import { useHabits } from '../context/HabitContext';

const ContributionGraph = () => {
  const { dailyData } = useHabits();
  const last30Days = getLastNDays(30);

  const getColorClass = (percentage) => {
    if (percentage === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (percentage <= 25) return 'bg-green-200 dark:bg-green-900/30';
    if (percentage <= 50) return 'bg-green-300 dark:bg-green-800/40';
    if (percentage <= 75) return 'bg-green-400 dark:bg-green-700/50';
    return 'bg-green-500 dark:bg-green-600';
  };

  const getTooltipText = (date, percentage) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    if (percentage === 0) {
      return `${formattedDate}: No habits completed`;
    }
    return `${formattedDate}: ${percentage}% of habits completed`;
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Activity Graph
      </h2>
      
      <div className="grid grid-cols-7 gap-1">
        {last30Days.map((date, index) => {
          const dateString = date.toISOString().split('T')[0];
          const dayData = dailyData.find(data => data.date === dateString);
          const percentage = dayData 
            ? calculateCompletionPercentage([dayData], dateString)
            : 0;

          return (
            <div
              key={dateString}
              className={`
                aspect-square rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer
                ${getColorClass(percentage)}
                ${index === 29 ? 'ring-2 ring-blue-500' : ''}
              `}
              title={getTooltipText(dateString, percentage)}
            />
          );
        })}
      </div>
      
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
        <span>Less</span>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
          <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900/30"></div>
          <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800/40"></div>
          <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700/50"></div>
          <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-600"></div>
        </div>
        <span>More</span>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Last 30 days of habit completion
      </p>
    </div>
  );
};

export default ContributionGraph; 