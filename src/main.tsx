import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Dismiss the inline HTML loader once React has actually painted. Waiting two
// frames lets the first committed render reach the screen, so the handoff is a
// crossfade rather than a flash of empty background.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const loader = document.getElementById('app-loader');
    if (!loader) return;
    loader.classList.add('is-done');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    // Fallback in case the transition never fires (reduced motion, background tab).
    setTimeout(() => loader.remove(), 800);
  });
});
