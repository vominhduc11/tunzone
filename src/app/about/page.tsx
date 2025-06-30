// components/AboutUsPage.tsx
// Trang About Us - Tai nghe SCS với theme xanh, Story Section động (5 nội dung luân phiên mỗi 5s) kèm hiệu ứng fade slide, core values, team, social proof, stats
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { storyData } from '@/data/storyData';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
    }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6 }
    }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5 }
    }
};

export default function AboutUsPage() {
    // 5 nội dung cho Story Section, thêm image cho mỗi bước
    const [index, setIndex] = useState(0);
    const [anim, setAnim] = useState('');

    // Auto update index mỗi 5s với animation
    useEffect(() => {
        const timer = setInterval(() => {
            setAnim('opacity-0 -translate-x-8');
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % storyData.length);
                setAnim('opacity-0 translate-x-8');
                setTimeout(() => setAnim('opacity-100 translate-x-0'), 50);
            }, 300);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Thiết lập animation ban đầu
        setAnim('opacity-100 translate-x-0');
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen overflow-hidden">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative h-[350px] md:h-[420px] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2619463_1280.jpg')"
                }}
            >
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>
                <motion.div 
                    className="relative z-10 text-center px-4"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-500 drop-shadow animate-pulse-glow"
                    >
                        SCS Headphones – Đỉnh Cao Âm Thanh
                    </motion.h1>
                    <motion.p 
                        variants={fadeInUp}
                        className="text-blue-100 w-full max-w-[1280px] mx-auto text-lg md:text-xl font-medium"
                    >
                        Chúng tôi đam mê công nghệ âm thanh, cam kết mang đến những chiếc tai nghe
                        SCS chất lượng cao cho mọi trải nghiệm nghe nhạc, gaming và học tập.
                    </motion.p>
                </motion.div>
            </motion.section>

            {/* Dynamic Story Section với fade + slide của cả text và image */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                className="w-full max-w-[1280px] mx-auto px-4 py-16"
            >
                <motion.h2 
                    variants={fadeInUp}
                    className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 text-center animate-shimmer"
                >
                    Hành Trình SCS Headphones
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        variants={fadeInLeft}
                        className={`rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out ${anim} hover-lift`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={storyData[index].img}
                            alt="Câu chuyện SCS"
                            width={600}
                            height={400}
                            className="object-cover w-full h-full"
                        />
                    </motion.div>
                    <motion.div 
                        variants={fadeInRight}
                        className={`transition-all duration-500 ease-in-out ${anim}`}
                    >
                        <p className="text-blue-100 text-lg leading-relaxed mb-4">
                            {storyData[index].p1}
                        </p>
                        <p className="text-blue-200 text-base">{storyData[index].p2}</p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Core Values Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="bg-gray-800 py-16"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.h2 
                        variants={fadeInUp}
                        className="text-2xl md:text-3xl font-bold text-blue-400 mb-8"
                    >
                        Giá Trị Cốt Lõi
                    </motion.h2>
                    <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {[
                            {
                                icon: 'https://cdn.pixabay.com/photo/2017/01/13/01/22/rocket-1976107_1280.png',
                                title: 'Âm Thanh Chuẩn',
                                desc: 'Âm thanh trung thực, chuẩn phòng thu, cân bằng mọi dải tần.'
                            },
                            {
                                icon: 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png',
                                title: 'Thoải Mái',
                                desc: 'Thiết kế ôm tai, đệm mút êm, sử dụng nhiều giờ không đau.'
                            },
                            {
                                icon: 'https://cdn.pixabay.com/photo/2017/06/10/07/18/list-2389219_1280.png',
                                title: 'Công Nghệ Mới',
                                desc: 'Liên tục cập nhật xu hướng âm thanh, kết nối đa thiết bị.'
                            },
                            {
                                icon: 'https://cdn.pixabay.com/photo/2017/01/31/13/05/call-2023867_1280.png',
                                title: 'Hỗ Trợ Nhanh',
                                desc: 'Bảo hành chính hãng 12 tháng, hỗ trợ khách hàng 24/7.'
                            }
                        ].map((v) => (
                            <motion.div
                                key={v.title}
                                variants={scaleIn}
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                className="p-7 bg-gray-700 rounded-xl border border-gray-600 transition hover:shadow-2xl hover:border-blue-500 group cursor-pointer hover-glow animate-bounce-in"
                            >
                                <motion.div 
                                    className="flex justify-center mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Image
                                        src={v.icon}
                                        alt={v.title}
                                        width={48}
                                        height={48}
                                        className="group-hover:scale-110 transition animate-float"
                                    />
                                </motion.div>
                                <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                                <p className="text-blue-200 text-base">{v.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="w-full max-w-[1280px] mx-auto px-4 py-16"
            >
                <motion.h2 
                    variants={fadeInUp}
                    className="text-2xl md:text-3xl font-bold text-blue-400 mb-8 text-center"
                >
                    Đội Ngũ Sáng Lập
                </motion.h2>
                <motion.div 
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-8"
                >
                    {[
                        {
                            img: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
                            name: 'Nguyễn Audio',
                            role: 'Founder & Sound Engineer'
                        },
                        {
                            img: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_1280.jpg',
                            name: 'Lê Music',
                            role: 'Product Designer'
                        },
                        {
                            img: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg',
                            name: 'Phạm Stream',
                            role: 'CSO - Customer Support Officer'
                        }
                    ].map((m) => (
                        <motion.div
                            key={m.name}
                            variants={scaleIn}
                            whileHover={{ 
                                scale: 1.05,
                                rotateY: 5,
                                transition: { duration: 0.3 }
                            }}
                            className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition hover:shadow-2xl cursor-pointer hover-lift animate-slide-in-left"
                        >
                            <motion.div 
                                className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-700"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={m.img}
                                    alt={m.name}
                                    width={112}
                                    height={112}
                                    className="object-cover"
                                />
                            </motion.div>
                            <h3 className="text-lg font-semibold mb-1 text-white">{m.name}</h3>
                            <p className="text-blue-400 font-medium">{m.role}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Partners & Testimonials */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="bg-gray-800 py-16"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.h2 
                        variants={fadeInUp}
                        className="text-2xl md:text-3xl font-bold text-blue-400 mb-8"
                    >
                        Đối Tác & Khách Hàng Nổi Bật
                    </motion.h2>
                    <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center mb-10"
                    >
                        {[
                            'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80660_1280.png',
                            'https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png',
                            'https://cdn.pixabay.com/photo/2017/06/22/19/12/logo-2430041_1280.png',
                            'https://cdn.pixabay.com/photo/2016/12/18/13/45/download-1915753_1280.png'
                        ].map((logo, i) => (
                            <motion.div 
                                key={i} 
                                variants={scaleIn}
                                whileHover={{ scale: 1.1 }}
                                className="flex justify-center animate-rotate-in"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            >
                                <Image
                                    src={logo}
                                    alt={`Logo ${i + 1}`}
                                    width={110}
                                    height={60}
                                    className="filter grayscale opacity-70 hover:filter-none hover:opacity-100 transition cursor-pointer"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
                    >
                        {[
                            {
                                text: 'Tai nghe SCS cho chất âm cực hay, chơi game bắn súng xác định vị trí địch rất chuẩn.',
                                author: 'Vũ Lâm - Game thủ'
                            },
                            {
                                text: 'Dùng để thu âm podcast, lọc nhiễu tốt, pin trâu.',
                                author: 'Quang Huy - Streamer'
                            }
                        ].map((t, i) => (
                            <motion.blockquote
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02 }}
                                className="p-6 bg-gray-700 rounded-xl border-l-4 border-blue-500 cursor-pointer hover-lift animate-slide-in-right"
                                style={{ animationDelay: `${i * 0.3}s` }}
                            >
                                <p className="italic text-blue-100 mb-4">&ldquo;{t.text}&rdquo;</p>
                                <cite className="block text-right text-blue-200">– {t.author}</cite>
                            </motion.blockquote>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="bg-gray-900 py-16"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.h2 
                        variants={fadeInUp}
                        className="text-2xl md:text-3xl font-bold text-blue-400 mb-8 animate-gradient-shift"
                    >
                        Thành Tựu & Số Liệu
                    </motion.h2>
                    <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-8"
                    >
                        {[
                            { num: '10,000+', label: 'Khách hàng hài lòng' },
                            { num: '50+', label: 'Đối tác phòng thu' },
                            { num: '5', label: 'Năm phát triển' },
                            { num: '24/7', label: 'Hỗ trợ kỹ thuật' }
                        ].map((s, index) => (
                            <motion.div 
                                key={s.label} 
                                variants={scaleIn}
                                whileHover={{ 
                                    scale: 1.1,
                                    rotate: [0, -5, 5, 0],
                                    transition: { duration: 0.5 }
                                }}
                                className={`p-7 bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-700 transition-colors hover-glow animate-bounce-in stagger-${index + 1}`}
                            >
                                <motion.span 
                                    className="text-4xl font-bold text-blue-500 block"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
                                >
                                    {s.num}
                                </motion.span>
                                <p className="text-blue-100 mt-2 font-medium">{s.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Floating Animation Elements */}
            <motion.div
                className="fixed top-20 left-10 w-4 h-4 bg-blue-500 rounded-full opacity-20 pointer-events-none"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="fixed top-40 right-20 w-6 h-6 bg-cyan-400 rounded-full opacity-20 pointer-events-none"
                animate={{
                    y: [0, 30, 0],
                    x: [0, -10, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            <motion.div
                className="fixed bottom-20 left-1/4 w-3 h-3 bg-blue-300 rounded-full opacity-30 pointer-events-none"
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />
        </div>
    );
}
