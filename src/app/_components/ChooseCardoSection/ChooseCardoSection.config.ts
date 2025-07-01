import { Variants } from 'framer-motion';

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1
    }
};

export const titleVariants: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

export const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};
