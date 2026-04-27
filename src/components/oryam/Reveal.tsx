import { ReactNode, useEffect, useRef, useState, ElementType, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  delay?: number;          // seconds
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export function Reveal({ children, delay = 0, as: Tag = 'div', className, style, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={cn('reveal', shown && 'is-visible', className)}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </Tag>
  );
}
