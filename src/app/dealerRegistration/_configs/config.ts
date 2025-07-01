import { Variants } from "framer-motion";

// Animation configurations for dealer registration page
export const formWrapper: Variants = {
  initial: { 
    opacity: 0, 
    y: 50, 
    transition: { 
      duration: 0.6, 
      ease: [0.4, 0, 0.2, 1] 
    } 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.4, 0, 0.2, 1] 
    } 
  },
};

export const titleMotion: Variants = {
  initial: { 
    scale: 0.8, 
    opacity: 0, 
    transition: { 
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
};

export const fieldVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }),
};

export const buttonMotion: Variants = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};
