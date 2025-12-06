"use client";

import { useEffect, useRef, ReactNode, CSSProperties } from "react";
import { animate, AnimationOptions, inView } from "motion";

interface MotionProps {
  children: ReactNode;
  initial?: { opacity?: number; y?: number; scale?: number; x?: number; rotate?: number };
  animate?: { opacity?: number; y?: number; scale?: number; x?: number; rotate?: number | number[]; backgroundPosition?: string[] };
  whileInView?: { opacity?: number; y?: number; scale?: number; x?: number };
  whileHover?: { scale?: number; y?: number; rotate?: number | number[] };
  transition?: {
    duration?: number;
    delay?: number;
    type?: "spring" | "tween" | "linear";
    ease?: string | number[];
    stiffness?: number;
    repeat?: number;
    repeatType?: "loop" | "reverse";
  };
  viewport?: { once?: boolean; margin?: string };
  className?: string;
  style?: CSSProperties;
  onAnimationComplete?: () => void;
}

export function Motion({
  children,
  initial,
  animate: animateProps,
  whileInView,
  whileHover,
  transition,
  viewport,
  className,
  style,
  onAnimationComplete,
}: MotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animateElement = (target: { opacity?: number; y?: number; scale?: number; x?: number; rotate?: number | number[]; backgroundPosition?: string[] }) => {
      if (!element) return;

      const animations: Record<string, number | string | number[] | string[]> = {};
      if (target.opacity !== undefined) animations.opacity = target.opacity;
      if (target.y !== undefined) animations.y = target.y;
      if (target.x !== undefined) animations.x = target.x;
      if (target.scale !== undefined) animations.scale = target.scale;
      if (target.rotate !== undefined) {
        if (Array.isArray(target.rotate)) {
          animations.rotate = target.rotate[target.rotate.length - 1];
        } else {
          animations.rotate = target.rotate;
        }
      }
      if (target.backgroundPosition) {
        // Handle background position animation
        const from = target.backgroundPosition[0];
        const to = target.backgroundPosition[1] || target.backgroundPosition[target.backgroundPosition.length - 1];
        animations.backgroundPosition = [from, to];
      }

      const options: AnimationOptions = {
        duration: transition?.duration || 0.6,
        delay: transition?.delay || 0,
        repeat: transition?.repeat || (transition?.repeat === Infinity ? Infinity : undefined),
      };

      const animation = animate(element, animations, options);
      
      if (onAnimationComplete && !transition?.repeat) {
        animation.then(() => {
          onAnimationComplete?.();
        });
      }

      return animation;
    };

    // Set initial state
    if (initial) {
      if (initial.opacity !== undefined) {
        element.style.opacity = String(initial.opacity);
      }
      if (initial.y !== undefined) {
        element.style.transform = `translateY(${initial.y}px)`;
      }
      if (initial.x !== undefined) {
        element.style.transform = `translateX(${initial.x}px)`;
      }
      if (initial.scale !== undefined) {
        element.style.transform = `scale(${initial.scale})`;
      }
    }

    // Handle whileInView using Motion One's inView
    if (whileInView) {
      const stop = inView(
        element,
        () => {
          if (!hasAnimatedRef.current || !viewport?.once) {
            hasAnimatedRef.current = true;
            animateElement(whileInView);
          }
        }
      );
      return () => {
        stop();
        const currentObserver = observerRef.current;
        if (currentObserver) {
          currentObserver.disconnect();
        }
      };
    } else if (animateProps) {
      // Regular animate
      animateElement(animateProps);
    }

    // Handle hover
    if (whileHover) {
      const handleMouseEnter = () => {
        if (whileHover.scale !== undefined) {
          animate(element, { scale: whileHover.scale }, {
            duration: transition?.duration || 0.3,
          } as AnimationOptions);
        }
        if (whileHover.y !== undefined) {
          animate(element, { y: whileHover.y }, {
            duration: transition?.duration || 0.3,
          } as AnimationOptions);
        }
      };
      const handleMouseLeave = () => {
        animate(element, { scale: 1, y: 0 }, {
          duration: transition?.duration || 0.3,
        } as AnimationOptions);
      };
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
        const currentObserver = observerRef.current;
        if (currentObserver) {
          currentObserver.disconnect();
        }
      };
    }

    return () => {
      const currentObserver = observerRef.current;
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [initial, animateProps, whileInView, whileHover, transition, viewport, onAnimationComplete]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

// Export as motion.div for compatibility
export const motion = {
  div: Motion,
};

