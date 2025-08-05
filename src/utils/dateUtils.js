// Get today's date in YYYY-MM-DD format
export const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

// Get date string for a specific date
export const getDateString = (date) => {
  return date.toISOString().split('T')[0];
};

// Get the last N days as date objects
export const getLastNDays = (n) => {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date);
  }
  return days;
};

// Check if a date is today
export const isToday = (dateString) => {
  return dateString === getTodayString();
};

// Check if a date is yesterday
export const isYesterday = (dateString) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === getDateString(yesterday);
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

// Calculate percentage of completed habits
export const calculateCompletionPercentage = (habits, dateString) => {
  if (!habits || habits.length === 0) return 0;
  
  const dayData = habits.find(habit => habit.date === dateString);
  if (!dayData) return 0;
  
  const completedHabits = dayData.habits.filter(habit => habit.completed).length;
  return Math.round((completedHabits / dayData.habits.length) * 100);
}; 