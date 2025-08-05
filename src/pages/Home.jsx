import React, { useState } from 'react';
import { Plus, Target, Clock, Calendar } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import HabitItem from '../components/HabitItem';
import ContributionGraph from '../components/ContributionGraph';
import StreakInfo from '../components/StreakInfo';

const Home = () => {
  const { habits, addHabit } = useHabits();
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [newHabitTarget, setNewHabitTarget] = useState(1);
  const [newHabitStartTime, setNewHabitStartTime] = useState('');
  const [newHabitEndTime, setNewHabitEndTime] = useState('');
  const [newHabitDuration, setNewHabitDuration] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (newHabitTitle.trim()) {
      addHabit(
        newHabitTitle.trim(), 
        parseInt(newHabitTarget) || 1,
        null, // timestamp
        newHabitDuration ? parseInt(newHabitDuration) : null,
        newHabitStartTime || null,
        newHabitEndTime || null
      );
      setNewHabitTitle('');
      setNewHabitTarget(1);
      setNewHabitStartTime('');
      setNewHabitEndTime('');
      setNewHabitDuration('');
      setShowAddForm(false);
    }
  };

  const completedToday = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const todayProgress = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Habit Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Build better habits, one day at a time
          </p>
        </div>

        {/* Today's Progress */}
        {totalHabits > 0 && (
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Today's Progress
              </h2>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {todayProgress}%
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${todayProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {completedToday} of {totalHabits} habits completed
            </p>
          </div>
        )}

        {/* Add Habit Form */}
        {showAddForm ? (
          <div className="card mb-8">
            <form onSubmit={handleAddHabit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Habit Name
                </label>
                <input
                  type="text"
                  value={newHabitTitle}
                  onChange={(e) => setNewHabitTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Read 30 minutes, Exercise, Drink water"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Daily Target
                </label>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={newHabitTarget}
                    onChange={(e) => setNewHabitTarget(e.target.value)}
                    min="1"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                  />
                  <span className="text-gray-600 dark:text-gray-400">times per day</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Time
                  </label>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      value={newHabitStartTime}
                      onChange={(e) => setNewHabitStartTime(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newHabitEndTime}
                    onChange={(e) => setNewHabitEndTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (minutes)
                </label>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={newHabitDuration}
                    onChange={(e) => setNewHabitDuration(e.target.value)}
                    min="1"
                    placeholder="30"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-600 dark:text-gray-400">minutes</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Habit
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mb-8">
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary flex items-center justify-center w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Habit
            </button>
          </div>
        )}

        {/* Habits List */}
        {habits.length > 0 ? (
          <div className="grid gap-6 mb-8">
            {habits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12 mb-8">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Target className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No habits yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start by adding your first habit to begin tracking your progress.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary"
            >
              Add Your First Habit
            </button>
          </div>
        )}

        {/* Stats and Graph */}
        {habits.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            <StreakInfo />
            <ContributionGraph />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 