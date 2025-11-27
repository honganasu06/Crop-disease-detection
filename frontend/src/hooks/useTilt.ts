import { useRef, useState, MouseEvent, useCallback } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export function useTilt(maxTilt = 15, scale = 1.05) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<TiltValues>({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;

    const { left, top, width, height } = elementRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateX = (maxTilt / 2 - y * maxTilt).toFixed(2);
    const rotateY = (x * maxTilt - maxTilt / 2).toFixed(2);

    setValues({
      rotateX: Number(rotateX),
      rotateY: Number(rotateY),
      scale,
    });
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
    setValues({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${values.rotateX}deg) rotateY(${values.rotateY}deg) scale(${values.scale})`,
    transition: 'transform 0.1s ease-out',
  };

  return { elementRef, style, handleMouseMove, handleMouseLeave };
}
