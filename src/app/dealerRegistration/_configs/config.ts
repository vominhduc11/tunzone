import { Variants } from "motion";

// src/config/motionConfig.ts
export const formWrapper : Variants = {
  initial: { opacity: 0, y: 50, transition: { duration: 0.6, ease: 'easeOut' } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const titleMotion : Variants = {
  initial: { scale: 0.8, opacity: 0, transition: { duration: 0.4 } },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
};

export const fieldVariants : Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 }
  }),
};

export const buttonMotion : Variants = {
  whileHover: { scale: 1.05 },
  whileTap:   { scale: 0.95 },
};
