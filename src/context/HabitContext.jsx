import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { getTodayString, getLastNDays } from '../utils/dateUtils';

const HabitContext = createContext();

// Initial state
const initialState = {
  habits: [],
  dailyData: [],
  currentStreak: 0,
  highestStreak: 0,
};

// Action types
const ACTIONS = {
  ADD_HABIT: 'ADD_HABIT',
  UPDATE_HABIT: 'UPDATE_HABIT',
  DELETE_HABIT: 'DELETE_HABIT',
  INCREMENT_HABIT: 'INCREMENT_HABIT',
  DECREMENT_HABIT: 'DECREMENT_HABIT',
  UPDATE_DAILY_DATA: 'UPDATE_DAILY_DATA',
  UPDATE_STREAKS: 'UPDATE_STREAKS',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE',
};

// Reducer function
const habitReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_HABIT:
      const newHabit = {
        id: Date.now().toString(),
        title: action.payload.title,
        target: action.payload.target || 1,
        count: 0,
        completed: false,
        timestamp: action.payload.timestamp || null,
        duration: action.payload.duration || null,
        startTime: action.payload.startTime || null,
        endTime: action.payload.endTime || null,
      };
      console.log('Adding new habit:', newHabit);
      return {
        ...state,
        habits: [...state.habits, newHabit],
      };

    case ACTIONS.UPDATE_HABIT:
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit.id === action.payload.id
            ? { ...habit, ...action.payload }
            : habit
        ),
      };

    case ACTIONS.DELETE_HABIT:
      return {
        ...state,
        habits: state.habits.filter(habit => habit.id !== action.payload),
      };

    case ACTIONS.INCREMENT_HABIT:
      const incrementedHabits = state.habits.map(habit =>
        habit.id === action.payload
          ? {
              ...habit,
              count: habit.count + 1,
              completed: habit.count + 1 >= habit.target,
            }
          : habit
      );
      return {
        ...state,
        habits: incrementedHabits,
      };

    case ACTIONS.DECREMENT_HABIT:
      const decrementedHabits = state.habits.map(habit =>
        habit.id === action.payload
          ? {
              ...habit,
              count: Math.max(0, habit.count - 1),
              completed: Math.max(0, habit.count - 1) >= habit.target,
            }
          : habit
      );
      return {
        ...state,
        habits: decrementedHabits,
      };

    case ACTIONS.UPDATE_DAILY_DATA:
      return {
        ...state,
        dailyData: action.payload,
      };

    case ACTIONS.UPDATE_STREAKS:
      return {
        ...state,
        currentStreak: action.payload.currentStreak,
        highestStreak: action.payload.highestStreak,
      };

    case ACTIONS.LOAD_FROM_STORAGE:
      console.log('Loading from storage:', action.payload);
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

// Helper function to save to localStorage
const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    console.log(`Successfully saved ${key} to localStorage:`, data);
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

// Helper function to load from localStorage
const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      console.log(`No data found for ${key} in localStorage`);
      return defaultValue;
    }
    const data = JSON.parse(serializedData);
    console.log(`Successfully loaded ${key} from localStorage:`, data);
    return data;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const HabitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(habitReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    console.log('=== Loading data from localStorage ===');
    
    const savedHabits = loadFromLocalStorage('habits', []);
    const savedDailyData = loadFromLocalStorage('dailyData', []);
    const savedStreaks = loadFromLocalStorage('streaks', { currentStreak: 0, highestStreak: 0 });

    console.log('Loaded data:', {
      habits: savedHabits,
      dailyData: savedDailyData,
      streaks: savedStreaks
    });

    // Only dispatch if we have valid data
    if (savedHabits && Array.isArray(savedHabits)) {
      dispatch({
        type: ACTIONS.LOAD_FROM_STORAGE,
        payload: {
          habits: savedHabits,
          dailyData: savedDailyData,
          currentStreak: savedStreaks.currentStreak || 0,
          highestStreak: savedStreaks.highestStreak || 0,
        },
      });
    }
    
    setIsInitialized(true);
    console.log('=== Finished loading data ===');
  }, []);

  // Save to localStorage whenever state changes (but only after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    console.log('=== Saving data to localStorage ===');
    console.log('Current state:', {
      habits: state.habits,
      dailyData: state.dailyData,
      streaks: {
        currentStreak: state.currentStreak,
        highestStreak: state.highestStreak,
      }
    });

    const success = 
      saveToLocalStorage('habits', state.habits) &&
      saveToLocalStorage('dailyData', state.dailyData) &&
      saveToLocalStorage('streaks', {
        currentStreak: state.currentStreak,
        highestStreak: state.highestStreak,
      });

    if (success) {
      console.log('=== All data saved successfully ===');
    } else {
      console.error('=== Failed to save some data ===');
    }
  }, [state, isInitialized]);

  // Update daily data and streaks
  useEffect(() => {
    if (!isInitialized) return;

    const today = getTodayString();
    
    // Update daily data for today
    const todayData = {
      date: today,
      habits: state.habits.map(habit => ({
        id: habit.id,
        count: habit.count,
        target: habit.target,
        completed: habit.completed,
        timestamp: habit.timestamp,
        duration: habit.duration,
        startTime: habit.startTime,
        endTime: habit.endTime,
      })),
    };

    const updatedDailyData = [
      ...state.dailyData.filter(data => data.date !== today),
      todayData,
    ];

    dispatch({ type: ACTIONS.UPDATE_DAILY_DATA, payload: updatedDailyData });

    // Calculate streaks
    let currentStreak = 0;
    let highestStreak = state.highestStreak;

    // Check consecutive days from today backwards
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const dateString = checkDate.toISOString().split('T')[0];
      
      const dayData = updatedDailyData.find(data => data.date === dateString);
      
      if (!dayData || dayData.habits.length === 0) {
        break;
      }

      const allCompleted = dayData.habits.every(habit => habit.completed);
      
      if (allCompleted) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Update highest streak if current streak is higher
    if (currentStreak > highestStreak) {
      highestStreak = currentStreak;
    }

    dispatch({
      type: ACTIONS.UPDATE_STREAKS,
      payload: { currentStreak, highestStreak },
    });
  }, [state.habits, isInitialized]);

  const addHabit = (title, target = 1, timestamp = null, duration = null, startTime = null, endTime = null) => {
    console.log('addHabit called with:', { title, target, timestamp, duration, startTime, endTime });
    dispatch({ 
      type: ACTIONS.ADD_HABIT, 
      payload: { title, target, timestamp, duration, startTime, endTime } 
    });
  };

  const updateHabit = (id, updates) => {
    dispatch({ type: ACTIONS.UPDATE_HABIT, payload: { id, ...updates } });
  };

  const deleteHabit = (id) => {
    dispatch({ type: ACTIONS.DELETE_HABIT, payload: id });
  };

  const incrementHabit = (id) => {
    dispatch({ type: ACTIONS.INCREMENT_HABIT, payload: id });
  };

  const decrementHabit = (id) => {
    dispatch({ type: ACTIONS.DECREMENT_HABIT, payload: id });
  };

  const value = {
    habits: state.habits,
    dailyData: state.dailyData,
    currentStreak: state.currentStreak,
    highestStreak: state.highestStreak,
    addHabit,
    updateHabit,
    deleteHabit,
    incrementHabit,
    decrementHabit,
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}; 