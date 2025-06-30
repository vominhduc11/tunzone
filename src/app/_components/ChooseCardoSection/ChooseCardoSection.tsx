'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { features } from '@/data/features';
import {
    containerVariants,
    itemVariants,
    subtitleVariants,
    titleVariants
} from './ChooseCardoSection.config';

export default function ChooseCardoSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section
            ref={sectionRef}
            className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 overflow-hidden"
        >
            <div className="w-full max-w-[1280px] mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold"
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        Tại Sao Chọn Cardo?
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-gray-300"
                        variants={subtitleVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        Chúng tôi không chỉ là về giao tiếp - chúng tôi tạo ra những kết nối làm cho
                        mỗi chuyến đi trở nên tốt đẹp hơn.
                    </motion.p>
                </div>

                {/* Feature grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {features.map(({ icon: Icon, title, description }, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            transition={{
                                duration: 0.7,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            whileHover={{
                                y: -10,
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex flex-col items-center text-center p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-600 hover:border-cyan-400/50"
                        >
                            <motion.div
                                whileHover={{
                                    rotate: 360,
                                    scale: 1.2,
                                    transition: { duration: 0.6 }
                                }}
                            >
                                <Icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors duration-300" />
                            </motion.div>
                            <motion.h3
                                className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                {title}
                            </motion.h3>
                            <motion.p
                                className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300"
                                initial={{ opacity: 0.8 }}
                                whileHover={{ opacity: 1 }}
                            >
                                {description}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
