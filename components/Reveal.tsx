'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Fades content in once as it scrolls into view.
 *
 * Renders with the `rv` class on both server and client so there is no
 * hydration mismatch; the `in` class is only added after mount. If
 * IntersectionObserver is unavailable (or the user prefers reduced motion,
 * which the stylesheet handles) content is revealed immediately.
 */
export default function Reveal({ children, as, className }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = ['rv', shown ? 'in' : '', className].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
