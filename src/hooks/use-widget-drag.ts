import { useState, useEffect } from 'react';
import { WIDGET_BREAKPOINT } from '../constants/breakpoints';

export function useWidgetDrag() {
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < WIDGET_BREAKPOINT);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < WIDGET_BREAKPOINT);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return { isDragging, setIsDragging, isMobile };
}
