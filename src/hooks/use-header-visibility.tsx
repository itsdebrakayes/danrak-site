import { useEffect } from 'react';

export const useHeaderVisibility = () => {
  useEffect(() => {
    // Simple header visibility monitoring for monitor compatibility
    const ensureHeaderVisibility = () => {
      const header = document.querySelector('header');
      if (header) {
        const computedStyle = window.getComputedStyle(header);
        if (computedStyle.display === 'none' || 
            computedStyle.visibility === 'hidden' || 
            computedStyle.opacity === '0') {
          
          console.warn('Header visibility issue detected, restoring');
          header.style.display = 'block';
          header.style.visibility = 'visible';
          header.style.opacity = '1';
        }
      }
    };

    // Check occasionally - less aggressive for monitor compatibility
    const interval = setInterval(ensureHeaderVisibility, 2000);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, []);
};
