import { Variants } from "motion";

// src/config/motionConfig.ts
export const headerMotion : Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const formContainerMotion : Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export const feedbackMotion : Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};

export const fieldMotion = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { delay } }
});

export const submitButtonMotion : Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.6 } },
  whileHover: { scale: 1.02 },
  whileTap:   { scale: 0.98 },
};

export const infoColumnMotion : Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};

export const faqToggleMotion : Variants = {
  animate: (isOpen: boolean) => ({ rotate: isOpen ? 180 : 0, transition: { duration: 0.2 } }),
};

export const faqContentMotion : Variants = {
  initial: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  animate: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
  exit:    { height: 0, opacity: 0, transition: { duration: 0.3 } },
};
