import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { HabitProvider } from './context/HabitContext';
import Home from './pages/Home';
import ThemeToggle from './components/ThemeToggle';
import LocalStorageDebug from './components/LocalStorageDebug';

function App() {
  return (
    <ThemeProvider>
      <HabitProvider>
        <div className="App">
          <ThemeToggle />
          <Home />
          <LocalStorageDebug />
        </div>
      </HabitProvider>
    </ThemeProvider>
  );
}

export default App; 