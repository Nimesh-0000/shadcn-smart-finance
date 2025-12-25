import { useEffect, useRef, type ReactNode } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface SmoothScrollProps {
    children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        const scroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            // You can add more Locomotive options here
            multiplier: 1,
            lerp: 0.1,
        });

        // Cleanup on unmount
        return () => {
            if (scroll) {
                scroll.destroy();
            }
        };
    }, []);

    return (
        <div data-scroll-container ref={scrollRef}>
            {children}
        </div>
    );
}
