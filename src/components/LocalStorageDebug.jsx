import React, { useState, useEffect } from 'react';

const LocalStorageDebug = () => {
  const [debugInfo, setDebugInfo] = useState({});

  const checkLocalStorage = () => {
    const habits = localStorage.getItem('habits');
    const dailyData = localStorage.getItem('dailyData');
    const streaks = localStorage.getItem('streaks');
    
    setDebugInfo({
      habits: habits ? JSON.parse(habits) : null,
      dailyData: dailyData ? JSON.parse(dailyData) : null,
      streaks: streaks ? JSON.parse(streaks) : null,
      timestamp: new Date().toLocaleTimeString()
    });
  };

  const clearAllData = () => {
    localStorage.removeItem('habits');
    localStorage.removeItem('dailyData');
    localStorage.removeItem('streaks');
    setDebugInfo({});
    console.log('All localStorage data cleared');
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg max-w-sm">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
        LocalStorage Debug
      </h3>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Habits:</strong> {debugInfo.habits ? `${debugInfo.habits.length} items` : 'None'}
        </div>
        <div>
          <strong>Daily Data:</strong> {debugInfo.dailyData ? `${debugInfo.dailyData.length} days` : 'None'}
        </div>
        <div>
          <strong>Streaks:</strong> {debugInfo.streaks ? `Current: ${debugInfo.streaks.currentStreak}, Best: ${debugInfo.streaks.highestStreak}` : 'None'}
        </div>
        <div>
          <strong>Last Check:</strong> {debugInfo.timestamp || 'Never'}
        </div>
      </div>
      
      <div className="flex space-x-2 mt-3">
        <button
          onClick={checkLocalStorage}
          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
        <button
          onClick={clearAllData}
          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default LocalStorageDebug; 