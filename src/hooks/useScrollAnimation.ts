import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const currentRef = ref.current; // Store ref value to avoid stale closure
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce && currentRef) {
                        observer.unobserve(currentRef);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible] as const;
}

export function useStaggeredAnimation(itemCount: number, delay: number = 100) {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [isTriggered, setIsTriggered] = useState(false);

    const triggerAnimation = () => {
        if (isTriggered) return;
        setIsTriggered(true);
        
        for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
                setVisibleItems(prev => [...prev, i]);
            }, i * delay);
        }
    };

    const resetAnimation = () => {
        setVisibleItems([]);
        setIsTriggered(false);
    };

    return {
        visibleItems,
        triggerAnimation,
        resetAnimation,
        isItemVisible: (index: number) => visibleItems.includes(index)
    };
}

export function useCountUp(
    end: number,
    duration: number = 2000,
    start: number = 0
) {
    const [count, setCount] = useState(start);
    const [isAnimating, setIsAnimating] = useState(false);

    const startAnimation = () => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        const startTime = Date.now();
        const range = end - start;

        const updateCount = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(start + range * easeOutQuart);
            
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                setIsAnimating(false);
            }
        };

        requestAnimationFrame(updateCount);
    };

    const resetCount = () => {
        setCount(start);
        setIsAnimating(false);
    };

    return {
        count,
        startAnimation,
        resetCount,
        isAnimating
    };
}
