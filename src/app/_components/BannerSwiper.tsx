'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import '@/styles/banner-swiper.css';

interface BannerData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    productImage: string;
    productId: number;
    price: string;
    originalPrice?: string;
    features: string[];
    buttonText: string;
    badge?: string;
}

const bannerData: BannerData[] = [
    {
        id: 1,
        title: 'Cardo G7 Plus',
        subtitle: 'Bluetooth Headset',
        description: 'Trải nghiệm âm thanh đỉnh cao với công nghệ chống ồn tiên tiến và kết nối Bluetooth 5.0 ổn định.',
        backgroundImage: 'https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2619463_1280.jpg',
        productImage: '/images/products/cardog7plus.png',
        productId: 1,
        price: '2.990.000₫',
        originalPrice: '3.490.000₫',
        features: ['Bluetooth 5.0', 'Chống ồn ANC', 'Pin 20h', 'Chống nước IPX4'],
        buttonText: 'Khám Phá Ngay',
        badge: 'Giảm 15%'
    },
    {
        id: 2,
        title: 'PackTalk Bold',
        subtitle: 'Premium Series',
        description: 'Thiết kế cao cấp với chất lượng âm thanh studio và khả năng kết nối đa thiết bị thông minh.',
        backgroundImage: 'https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg',
        productImage: '/images/products/packtalkbold.png',
        productId: 2,
        price: '4.290.000₫',
        originalPrice: '4.990.000₫',
        features: ['Hi-Fi Audio', 'Mesh Network', 'Voice Command', 'Waterproof'],
        buttonText: 'Xem Chi Tiết',
        badge: 'Bán Chạy'
    },
    {
        id: 3,
        title: 'Spirit HD',
        subtitle: 'Gaming Edition',
        description: 'Được thiết kế đặc biệt cho game thủ với độ trễ thấp và âm thanh 7.1 surround sống động.',
        backgroundImage: 'https://cdn.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.png',
        productImage: '/images/products/packtalkbold.png', // Sử dụng hình có sẵn
        productId: 3,
        price: '1.890.000₫',
        features: ['7.1 Surround', 'RGB Lighting', 'Ultra Low Latency', 'Comfort Fit'],
        buttonText: 'Mua Ngay',
        badge: 'Mới'
    }
];

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, delay: 0.2 }
    }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.8, delay: 0.4 }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.6, delay: 0.8 }
    }
};

export default function BannerSwiper() {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{ 
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet-custom',
                    bulletActiveClass: 'swiper-pagination-bullet-active-custom'
                }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop
                className="banner-swiper h-[700px] md:h-[800px]"
            >
                {bannerData.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative h-full w-full overflow-hidden">
                            {/* Background Image */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${banner.backgroundImage})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50"></div>
                            </div>

                            {/* Content Container */}
                            <div className="relative z-10 h-full flex items-center">
                                <div className="container mx-auto px-4 lg:px-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                        {/* Left Content */}
                                        <motion.div 
                                            className="text-white space-y-6"
                                            initial="hidden"
                                            animate="visible"
                                            variants={{
                                                visible: {
                                                    transition: {
                                                        staggerChildren: 0.2
                                                    }
                                                }
                                            }}
                                        >
                                            {/* Badge */}
                                            {banner.badge && (
                                                <motion.div 
                                                    variants={fadeInUp}
                                                    className="inline-block"
                                                >
                                                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                        {banner.badge}
                                                    </span>
                                                </motion.div>
                                            )}

                                            {/* Title */}
                                            <motion.div variants={fadeInUp}>
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                                    <span className="gradient-text">{banner.title}</span>
                                                    <br />
                                                    <span className="text-white">{banner.subtitle}</span>
                                                </h1>
                                            </motion.div>

                                            {/* Description */}
                                            <motion.p 
                                                variants={fadeInUp}
                                                className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg"
                                            >
                                                {banner.description}
                                            </motion.p>

                                            {/* Features */}
                                            <motion.div 
                                                variants={fadeInLeft}
                                                className="flex flex-wrap gap-3"
                                            >
                                                {banner.features.map((feature, index) => (
                                                    <span 
                                                        key={index}
                                                        className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </motion.div>

                                            {/* Price */}
                                            <motion.div 
                                                variants={fadeInLeft}
                                                className="flex items-center gap-4"
                                            >
                                                <span className="text-3xl md:text-4xl font-bold text-cyan-400">
                                                    {banner.price}
                                                </span>
                                                {banner.originalPrice && (
                                                    <span className="text-xl text-gray-400 line-through">
                                                        {banner.originalPrice}
                                                    </span>
                                                )}
                                            </motion.div>

                                            {/* CTA Button */}
                                            <motion.div variants={fadeInLeft}>
                                                <Link 
                                                    href={`/productDetail/${banner.productId}`}
                                                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-glow"
                                                >
                                                    {banner.buttonText}
                                                    <svg 
                                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </Link>
                                            </motion.div>
                                        </motion.div>

                                        {/* Right Content - Product Image */}
                                        <motion.div 
                                            className="flex justify-center lg:justify-end"
                                            variants={scaleIn}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <div className="relative">
                                                {/* Glow Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl scale-150"></div>
                                                
                                                {/* Product Image */}
                                                <motion.div
                                                    className="relative z-10 animate-float"
                                                    whileHover={{ 
                                                        scale: 1.05,
                                                        rotate: [0, -2, 2, 0],
                                                        transition: { duration: 0.6 }
                                                    }}
                                                >
                                                    <Image
                                                        src={banner.productImage}
                                                        alt={banner.title}
                                                        width={500}
                                                        height={500}
                                                        className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
                                                        priority
                                                    />
                                                </motion.div>

                                                {/* Floating Elements */}
                                                <motion.div
                                                    className="absolute top-10 right-10 w-4 h-4 bg-cyan-400 rounded-full opacity-60"
                                                    animate={{
                                                        y: [0, -20, 0],
                                                        opacity: [0.6, 1, 0.6]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                                <motion.div
                                                    className="absolute bottom-20 left-10 w-6 h-6 bg-blue-500 rounded-full opacity-40"
                                                    animate={{
                                                        y: [0, 15, 0],
                                                        x: [0, -10, 0],
                                                        opacity: [0.4, 0.8, 0.4]
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: 1
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 group">
                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 group">
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
