import { useEffect, useState } from 'react';

/** Returns page scroll progress (0-1) and whether the page has scrolled past a threshold. */
export const useScrollProgress = (condenseAt = 24) => {
  const [progress, setProgress] = useState(0);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, scrolled / max) : 0);
      setCondensed(scrolled > condenseAt);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [condenseAt]);

  return { progress, condensed };
};
