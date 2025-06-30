'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiStar } from 'react-icons/fi';
import { stats } from '@/data/stats';
import { testimonials } from '@/data/testimonials';
import { containerVariants, itemVariants } from './TestimonialsStatsSection.config';

export default function TestimonialsStatsSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} className="bg-gradient-to-br from-gray-900 to-gray-800 py-16">
            <div className="w-full max-w-[1280px] mx-auto px-4">
                {/* Stats */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {stats.map(({ icon: Icon, value, label }) => (
                        <motion.div
                            key={label}
                            className="flex flex-col items-center group"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Icon className="w-12 h-12 text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300" />
                            </motion.div>
                            <span className="text-3xl font-bold text-white">{value}</span>
                            <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                {label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Testimonials */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {testimonials.map(({ name, role, avatar, feedback, rating }) => (
                        <motion.div
                            key={name}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-600 hover:border-cyan-400/50"
                        >
                            <div className="flex items-center mb-4">
                                <motion.div
                                    className="w-12 h-12 rounded-full overflow-hidden mr-4"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Image
                                        src={avatar}
                                        alt={name}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                </motion.div>
                                <div>
                                    <motion.h4
                                        className="font-semibold text-white hover:text-cyan-400 transition-colors duration-300"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {name}
                                    </motion.h4>
                                    <p className="text-sm text-gray-400">{role}</p>
                                </div>
                            </div>
                            <p className="text-gray-200 mb-4">“{feedback}”</p>
                            <motion.div
                                className="flex"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                                    >
                                        <FiStar
                                            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
