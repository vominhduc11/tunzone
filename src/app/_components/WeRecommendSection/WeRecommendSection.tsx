'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { products as pro } from '@/data/api/products';
import { containerVariants, itemVariants, titleVariants } from './WeRecommendSection.config';

export default function WeRecommendSection() {
    const products = pro.slice(0, 5);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section
            ref={sectionRef}
            className="bg-gradient-to-br from-gray-800 to-gray-900 py-16 overflow-hidden"
        >
            <div className="w-full max-w-[1280px] mx-auto text-center">
                <motion.h2
                    className="text-4xl font-bold text-white mb-8"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    Sản phẩm nổi bật
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 px-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {products.map((product, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={`/productDetail/${product.id}`}
                                className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-4 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-600 hover:border-blue-400/50 block h-full"
                            >
                                <motion.h3
                                    className="text-xl font-semibold text-white mb-4 transition-colors duration-300 hover:text-blue-400"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {product.name}
                                </motion.h3>
                                <motion.div
                                    className="relative w-full h-48 mb-4"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateY: 5,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <Image
                                        src={product.avatar}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                                <motion.button
                                    className="mt-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-4 py-2 rounded-md shadow-lg hover:shadow-blue-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Xem ngay
                                </motion.button>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
