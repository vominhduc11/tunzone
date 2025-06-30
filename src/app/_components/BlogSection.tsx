'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';
import { blogs as bl } from '@/data/api/blogs';

export default function BlogSection() {
    const blogs = bl.slice(0, 3);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.42, 0, 0.58, 1] // cubic-bezier for easeInOut
            }
        }
    };

    return (
        <section ref={sectionRef} className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 overflow-hidden">
            <div className="w-full max-w-[1280px] mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-white text-center mb-8"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    Tin Tức & Cập Nhật
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-600 hover:border-cyan-400/50"
                        >
                            <motion.div
                                className="relative h-60 overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                    <div className="flex items-center gap-1">
                                        <FiCalendar className="w-4 h-4" />
                                        <span>{blog.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FiUser className="w-4 h-4" />
                                        <span>{blog.author}</span>
                                    </div>
                                </div>
                                <motion.h3
                                    className="text-xl font-semibold text-white mb-2 hover:text-cyan-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {blog.title}
                                </motion.h3>
                                <p className="text-gray-400 mb-4 line-clamp-3">{blog.excerpt}</p>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href={`/blog/${blog.id}`}
                                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 group"
                                    >
                                        Đọc Thêm
                                        <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
