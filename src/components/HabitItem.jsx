import React, { useState } from 'react';
import { Plus, Minus, Trash2, Edit3, Check, Clock, Calendar } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

const HabitItem = ({ habit }) => {
  const { incrementHabit, decrementHabit, deleteHabit, updateHabit } = useHabits();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(habit.title);
  const [editTarget, setEditTarget] = useState(habit.target);
  const [editTimestamp, setEditTimestamp] = useState(habit.timestamp || '');
  const [editDuration, setEditDuration] = useState(habit.duration || '');
  const [editStartTime, setEditStartTime] = useState(habit.startTime || '');
  const [editEndTime, setEditEndTime] = useState(habit.endTime || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      updateHabit(habit.id, {
        title: editTitle.trim(),
        target: Math.max(1, parseInt(editTarget) || 1),
        timestamp: editTimestamp || null,
        duration: editDuration || null,
        startTime: editStartTime || null,
        endTime: editEndTime || null,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(habit.title);
    setEditTarget(habit.target);
    setEditTimestamp(habit.timestamp || '');
    setEditDuration(habit.duration || '');
    setEditStartTime(habit.startTime || '');
    setEditEndTime(habit.endTime || '');
    setIsEditing(false);
  };

  const progressPercentage = Math.min((habit.count / habit.target) * 100, 100);

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (duration) => {
    if (!duration) return '';
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="card animate-fade-in">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Habit name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Target
            </label>
            <input
              type="number"
              value={editTarget}
              onChange={(e) => setEditTarget(e.target.value)}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={editStartTime}
                onChange={(e) => setEditStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={editEndTime}
                onChange={(e) => setEditEndTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={editDuration}
              onChange={(e) => setEditDuration(e.target.value)}
              min="1"
              placeholder="30"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="btn btn-primary flex-1 flex items-center justify-center"
            >
              <Check className="w-4 h-4 mr-1" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {habit.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {habit.count} / {habit.target} completed
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Time and Duration Info */}
          {(habit.startTime || habit.endTime || habit.duration) && (
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              {habit.startTime && habit.endTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(habit.startTime)} - {formatTime(habit.endTime)}</span>
                </div>
              )}
              {habit.duration && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDuration(habit.duration)}</span>
                </div>
              )}
            </div>
          )}

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                habit.completed
                  ? 'bg-green-500'
                  : progressPercentage > 50
                  ? 'bg-yellow-500'
                  : 'bg-blue-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Counter buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => decrementHabit(habit.id)}
              disabled={habit.count === 0}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Minus className="w-5 h-5" />
            </button>
            
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 min-w-[3rem] text-center">
              {habit.count}
            </span>
            
            <button
              onClick={() => incrementHabit(habit.id)}
              className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 animate-scale-in"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Completion status */}
          {habit.completed && (
            <div className="flex items-center justify-center text-green-600 dark:text-green-400">
              <Check className="w-5 h-5 mr-2" />
              <span className="font-medium">Completed!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HabitItem; 