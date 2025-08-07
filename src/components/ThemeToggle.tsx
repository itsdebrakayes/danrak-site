import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="theme-toggle group" aria-label="Toggle theme">
        <div className="w-5 h-5" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    console.log('Theme toggle clicked!', { currentTheme: theme, isDark });
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle group hover:shadow-lg active:scale-95"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <BsSun className="w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <BsMoon className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;