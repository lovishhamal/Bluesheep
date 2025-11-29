"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export function MotionDiv({ children, ...props }: MotionDivProps) {
  const isMobile = useIsMobile();

  // On mobile, render as regular div with no animations
  if (isMobile) {
    return <div className={props.className}>{children}</div>;
  }

  // On desktop, use Framer Motion
  return <motion.div {...props}>{children}</motion.div>;
}

