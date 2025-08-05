import React, { useState, useEffect } from 'react';

const LocalStorageTest = () => {
  const [testData, setTestData] = useState('');
  const [savedData, setSavedData] = useState('');

  const saveTestData = () => {
    localStorage.setItem('testData', testData);
    console.log('Test data saved:', testData);
  };

  const loadTestData = () => {
    const data = localStorage.getItem('testData');
    setSavedData(data || 'No data found');
    console.log('Test data loaded:', data);
  };

  const clearTestData = () => {
    localStorage.removeItem('testData');
    setSavedData('');
    console.log('Test data cleared');
  };

  const checkHabitsData = () => {
    const habits = localStorage.getItem('habits');
    const dailyData = localStorage.getItem('dailyData');
    const streaks = localStorage.getItem('streaks');
    
    console.log('=== LocalStorage Debug Info ===');
    console.log('habits:', habits);
    console.log('dailyData:', dailyData);
    console.log('streaks:', streaks);
    console.log('==============================');
  };

  useEffect(() => {
    // Check localStorage on component mount
    checkHabitsData();
  }, []);

  return (
    <div className="card mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        LocalStorage Test
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Test Data
          </label>
          <input
            type="text"
            value={testData}
            onChange={(e) => setTestData(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter test data"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={saveTestData}
            className="btn btn-primary"
          >
            Save Test Data
          </button>
          <button
            onClick={loadTestData}
            className="btn btn-secondary"
          >
            Load Test Data
          </button>
          <button
            onClick={clearTestData}
            className="btn btn-secondary"
          >
            Clear Test Data
          </button>
          <button
            onClick={checkHabitsData}
            className="btn btn-secondary"
          >
            Check Habits Data
          </button>
        </div>
        
        {savedData && (
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Loaded Data:</strong> {savedData}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalStorageTest; 