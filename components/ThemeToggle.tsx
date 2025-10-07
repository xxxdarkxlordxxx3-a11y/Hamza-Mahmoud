import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from './IconComponents';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm border border-slate-300 dark:border-slate-600 hover:bg-slate-300/70 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold p-2 rounded-lg transition-colors duration-300 flex items-center justify-center w-10 h-10"
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <SunIcon className="w-5 h-5 text-yellow-500" /> : <MoonIcon className="w-5 h-5 text-slate-300" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
