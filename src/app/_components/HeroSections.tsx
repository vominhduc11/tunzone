'use client';

import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { FiHeadphones, FiBattery, FiCloudRain } from 'react-icons/fi';
import image1 from '@/assets/images/feature2.png';
import image2 from '@/assets/images/feature3.png';

export default function HeroSections() {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    // const section3Ref = useRef(null);

    const section1InView = useInView(section1Ref, { once: true });
    const section2InView = useInView(section2Ref, { once: true });
    // const section3InView = useInView(section3Ref, { once: true });

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const slideInRight: Variants = {
        hidden: { opacity: 0, x: 60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <>
            {/* Section 1: Hero Overview */}
            <section
                ref={section1Ref}
                className="relative bg-fixed bg-center bg-cover h-screen flex items-center justify-center text-white overflow-hidden"
                style={{
                    backgroundImage: `url('${image1.src}')`
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60" />
                <motion.div
                    className="relative z-10 flex flex-col items-center text-center px-6 space-y-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={section1InView ? 'visible' : 'hidden'}
                >
                    <motion.h1 className="text-5xl font-bold" variants={fadeInUp}>
                        Khám Phá Giải Pháp Liên Lạc Thế Hệ Mới
                    </motion.h1>
                    <motion.p className="text-lg w-full max-w-[1280px]" variants={fadeInUp}>
                        Hệ thống mạng lưới độc quyền, đảm bảo kết nối xuyên suốt, an toàn và tiện
                        nghi cho mọi chuyến đi.
                    </motion.p>
                    <motion.div variants={scaleIn}>
                        <Link
                            href="/features"
                            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            Khám Phá Ngay
                        </Link>
                    </motion.div>
                    <motion.p className="text-sm text-gray-300" variants={fadeInUp}>
                        Bảo hành 2 năm | Hỗ trợ 24/7
                    </motion.p>
                </motion.div>
            </section>

            {/* Section 2: Use Cases & Benefits */}
            <section
                ref={section2Ref}
                className="relative bg-fixed bg-center bg-cover h-screen flex items-center justify-center text-white overflow-hidden"
                style={{
                    backgroundImage: `url('${image2.src}')`
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60" />
                <motion.div
                    className="relative z-10 flex flex-col items-center text-center px-6 space-y-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={section2InView ? 'visible' : 'hidden'}
                >
                    <motion.h2 className="text-4xl font-semibold" variants={fadeInUp}>
                        Ứng Dụng Đa Năng Cho Mọi Hành Trình
                    </motion.h2>
                    <motion.p className="text-md w-full max-w-[1280px]" variants={fadeInUp}>
                        Từ thành phố đến địa hình đồi núi, một thiết bị – vô số tính năng: âm thanh
                        chất lượng, pin lâu dài, kháng nước IP67.
                    </motion.p>
                    <motion.div variants={scaleIn}>
                        <Link
                            href="/journey"
                            className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Bắt Đầu Hành Trình
                        </Link>
                    </motion.div>
                    <motion.div
                        className="mt-6 flex flex-wrap justify-center gap-8 text-gray-200"
                        variants={fadeInUp}
                    >
                        <motion.div className="flex items-center space-x-2" variants={slideInLeft}>
                            <FiHeadphones className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
                            <span>Chất lượng âm thanh</span>
                        </motion.div>
                        <motion.div className="flex items-center space-x-2" variants={fadeInUp}>
                            <FiBattery className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
                            <span>Pin 13h</span>
                        </motion.div>
                        <motion.div className="flex items-center space-x-2" variants={slideInRight}>
                            <FiCloudRain className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
                            <span>Kháng nước IP67</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
}
