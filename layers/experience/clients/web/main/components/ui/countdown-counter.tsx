import { useEffect, useState } from 'react';
import { FlipCounter } from './flip-counter';

interface CountdownCounterProps {
  value: number;
  className?: string;
}

export function CountdownCounter({ value, className = '' }: CountdownCounterProps) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    // If the new value is higher, we'll count up to it
    if (value > currentValue) {
      setCurrentValue(value);
      return;
    }

    // If the new value is lower, we'll count down
    const interval = setInterval(() => {
      setCurrentValue(prev => {
        // If we've reached the target value, stop counting
        if (prev <= value) {
          clearInterval(interval);
          return value;
        }
        // Decrease by a random number between 1 and 3
        return prev - Math.floor(Math.random() * 3) - 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [value]);

  return <FlipCounter value={currentValue} />;
} 