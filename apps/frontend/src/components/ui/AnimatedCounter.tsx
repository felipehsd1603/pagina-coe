import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  suffix = '',
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState('0');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericPart) || numericPart === 0) {
      setDisplay(value);
      return;
    }

    const trailingSuffix = value.replace(/[0-9]/g, '');
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericPart);

      setDisplay(`${current}${trailingSuffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}
