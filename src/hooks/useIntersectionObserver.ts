import { useEffect, useRef, useState, useCallback } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: () => void;
}

export function useIntersectionObserver({
  root = null,
  rootMargin = '100px',
  threshold = 0.1,
  onIntersect
}: IntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    const isIntersecting = entry.isIntersecting;
    setIsIntersecting(isIntersecting);
    
    if (isIntersecting && onIntersect) {
      onIntersect();
    }
  }, [onIntersect]);

  useEffect(() => {
    const currentTarget = targetRef.current;
    
    if (!currentTarget) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root,
      rootMargin,
      threshold
    });

    observerRef.current.observe(currentTarget);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, root, rootMargin, threshold]);

  return { targetRef, isIntersecting };
}