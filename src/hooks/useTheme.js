import { useState, useEffect } from 'react';

export const useTheme = () => {
  const getInitialTheme = () => {
    const userTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userTheme === 'dark' || (!userTheme && systemDark);
  };

  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark);
      if (e.detail.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    window.addEventListener('themeToggled', handleThemeChange);
    
    const currentIsDark = getInitialTheme();
    setIsDark(currentIsDark);
    if (currentIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('themeToggled', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newDark = !prev;
      localStorage.setItem('theme', newDark ? 'dark' : 'light');
      
      if (newDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      window.dispatchEvent(new CustomEvent('themeToggled', { detail: { isDark: newDark } }));
      
      return newDark;
    });
  };

  return { isDark, toggleTheme };
};
