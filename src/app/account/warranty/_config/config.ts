import { Variants } from 'framer-motion';

export const panelVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.98
    }
};
