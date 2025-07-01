'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiHeart, FiTrendingUp, FiShield, FiHeadphones, FiStar, FiTarget } from 'react-icons/fi';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

// Story data updated for TuneZone
const storyData = [
    {
        img: '/images/about/story1.jpg',
        title: 'Khởi Nguồn Đam Mê',
        p1: 'TuneZone ra đời từ niềm tin rằng âm thanh chất lượng cao không chỉ dành cho giới chuyên nghiệp. Chúng tôi muốn mang trải nghiệm âm thanh đỉnh cao đến với mọi người.',
        p2: 'Với đội ngũ kỹ sư âm thanh giàu kinh nghiệm, chúng tôi bắt đầu hành trình tạo ra những sản phẩm âm thanh vượt trội.'
    },
    {
        img: '/images/about/story2.jpg',
        title: 'Phát Triển Sản Phẩm',
        p1: 'Năm 2021, chúng tôi ra mắt dòng sản phẩm đầu tiên với công nghệ driver tiên tiến và thiết kế ergonomic tối ưu.',
        p2: 'Sản phẩm nhanh chóng được cộng đồng audiophile và game thủ đón nhận, tạo nền tảng vững chắc cho sự phát triển.'
    },
    {
        img: '/images/about/story3.jpg',
        title: 'Mở Rộng Thị Trường',
        p1: 'Đến năm 2022, TuneZone hợp tác với các nghệ sĩ, streamer và content creator để tối ưu hóa sản phẩm cho từng nhu cầu sử dụng.',
        p2: 'Chúng tôi không ngừng lắng nghe phản hồi từ khách hàng để cải tiến và phát triển sản phẩm.'
    },
    {
        img: '/images/about/story4.jpg',
        title: 'Công Nghệ Tiên Tiến',
        p1: 'Năm 2023, chúng tôi đầu tư mạnh vào R&D, ra mắt dòng sản phẩm với công nghệ chống ồn chủ động và kết nối không dây tiên tiến.',
        p2: 'Mỗi sản phẩm TuneZone đều trải qua quy trình kiểm tra chất lượng nghiêm ngặt để đảm bảo trải nghiệm tối ưu.'
    },
    {
        img: '/images/about/story5.jpg',
        title: 'Tương Lai Âm Thanh',
        p1: 'Hiện tại, TuneZone đã có mặt tại hơn 50 cửa hàng trên toàn quốc và phục vụ hàng nghìn khách hàng.',
        p2: 'Chúng tôi tiếp tục nghiên cứu và phát triển để mang đến những trải nghiệm âm thanh đột phá trong tương lai.'
    }
];

export default function AboutUsPage() {
    const [currentStory, setCurrentStory] = useState(0);

    // Auto rotate story every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStory((prev) => (prev + 1) % storyData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 py-20"
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.div variants={fadeInUp} className="mb-6">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <FiHeadphones className="w-4 h-4" />
                            Về chúng tôi
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    >
                        TuneZone – Đỉnh Cao Âm Thanh
                    </motion.h1>
                    
                    <motion.p 
                        variants={fadeInUp}
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Chúng tôi đam mê công nghệ âm thanh, cam kết mang đến những sản phẩm 
                        chất lượng cao cho mọi trải nghiệm nghe nhạc, gaming và sáng tạo nội dung.
                    </motion.p>
                </div>
            </motion.section>

            {/* Story Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="w-full max-w-[1280px] mx-auto px-4 py-16"
            >
                <motion.div variants={fadeInUp} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Hành Trình TuneZone
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Từ những ý tưởng đầu tiên đến việc trở thành thương hiệu âm thanh uy tín
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Story Image */}
                    <motion.div
                        key={currentStory}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={storyData[currentStory].img}
                                alt={storyData[currentStory].title}
                                width={600}
                                height={400}
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop';
                                }}
                            />
                        </div>
                        
                        {/* Story Navigation Dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {storyData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentStory(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentStory 
                                            ? 'bg-blue-500 w-8' 
                                            : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Story Content */}
                    <motion.div
                        key={`content-${currentStory}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-blue-400">
                            {storyData[currentStory].title}
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {storyData[currentStory].p1}
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            {storyData[currentStory].p2}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Core Values Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="bg-gray-800/50 backdrop-blur-sm py-16"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Giá Trị Cốt Lõi
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Những nguyên tắc định hướng mọi hoạt động của TuneZone
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {[
                            {
                                icon: FiHeadphones,
                                title: 'Âm Thanh Chuẩn',
                                desc: 'Âm thanh trung thực, chuẩn studio với độ chi tiết cao và cân bằng tần số tối ưu.'
                            },
                            {
                                icon: FiHeart,
                                title: 'Thoải Mái Tối Đa',
                                desc: 'Thiết kế ergonomic, chất liệu cao cấp đảm bảo sự thoải mái trong thời gian dài.'
                            },
                            {
                                icon: FiTrendingUp,
                                title: 'Công Nghệ Tiên Tiến',
                                desc: 'Ứng dụng công nghệ mới nhất trong driver, kết nối và xử lý tín hiệu âm thanh.'
                            },
                            {
                                icon: FiShield,
                                title: 'Hỗ Trợ Toàn Diện',
                                desc: 'Bảo hành chính hãng, hỗ trợ kỹ thuật 24/7 và dịch vụ khách hàng tận tâm.'
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={value.title}
                                variants={fadeInUp}
                                whileHover={{ 
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                className="group p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                                    <value.icon className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {value.desc}
                                </p>
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
                <motion.div variants={fadeInUp} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Đội Ngũ Lãnh Đạo
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Những con người đam mê âm thanh, dẫn dắt TuneZone tiến về phía trước
                    </p>
                </motion.div>
                
                <motion.div 
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
                            name: 'Nguyễn Minh Tuấn',
                            role: 'Founder & CEO',
                            desc: 'Kỹ sư âm thanh với 10+ năm kinh nghiệm'
                        },
                        {
                            img: 'https://images.unsplash.com/photo-1494790108755-2616c6d4e6e8?w=300&h=300&fit=crop&crop=face',
                            name: 'Lê Thị Hương',
                            role: 'Head of Design',
                            desc: 'Chuyên gia thiết kế sản phẩm và UX'
                        },
                        {
                            img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
                            name: 'Trần Văn Nam',
                            role: 'CTO',
                            desc: 'Chuyên gia công nghệ và R&D'
                        }
                    ].map((member, index) => (
                        <motion.div
                            key={member.name}
                            variants={fadeInUp}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            className="group text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover rounded-full border-4 border-gray-600 group-hover:border-blue-500 transition-colors"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-blue-400 font-medium mb-3">
                                {member.role}
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {member.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Stats Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="bg-gray-800/50 backdrop-blur-sm py-16"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Thành Tựu & Số Liệu
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Những con số minh chứng cho sự tin tưởng của khách hàng
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {[
                            { 
                                icon: FiUsers,
                                num: '15,000+', 
                                label: 'Khách hàng hài lòng',
                                color: 'text-blue-400'
                            },
                            { 
                                icon: FiAward,
                                num: '50+', 
                                label: 'Đối tác phân phối',
                                color: 'text-green-400'
                            },
                            { 
                                icon: FiTrendingUp,
                                num: '5+', 
                                label: 'Năm phát triển',
                                color: 'text-purple-400'
                            },
                            { 
                                icon: FiTarget,
                                num: '24/7', 
                                label: 'Hỗ trợ kỹ thuật',
                                color: 'text-yellow-400'
                            }
                        ].map((stat, index) => (
                            <motion.div 
                                key={stat.label} 
                                variants={fadeInUp}
                                whileHover={{ 
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                className="group text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                <div className={`${stat.color.replace('text-', 'bg-').replace('400', '500/20')} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                                <motion.span 
                                    className={`text-4xl font-bold ${stat.color} block mb-2`}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                                    viewport={{ once: true }}
                                >
                                    {stat.num}
                                </motion.span>
                                <p className="text-gray-300 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Testimonials Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="w-full max-w-[1280px] mx-auto px-4 py-16"
            >
                <motion.div variants={fadeInUp} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Khách Hàng Nói Gì
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Những phản hồi chân thực từ cộng đồng người dùng TuneZone
                    </p>
                </motion.div>
                
                <motion.div 
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {[
                        {
                            text: 'Chất lượng âm thanh TuneZone thực sự ấn tượng. Bass sâu, treble trong, rất phù hợp cho việc mix nhạc.',
                            author: 'Minh Tuấn',
                            role: 'Producer',
                            rating: 5
                        },
                        {
                            text: 'Thiết kế thoải mái, đeo cả ngày không mỏi. Chất lượng build rất tốt, xứng đáng với giá tiền.',
                            author: 'Thu Hương',
                            role: 'Content Creator',
                            rating: 5
                        },
                        {
                            text: 'Dùng để gaming rất tuyệt, định vị âm thanh chuẩn xác. Micro thu âm rõ ràng.',
                            author: 'Văn Nam',
                            role: 'Gamer',
                            rating: 5
                        }
                    ].map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className="group p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                        >
                            {/* Rating Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            
                            <blockquote className="text-gray-300 leading-relaxed mb-6">
                                "{testimonial.text}"
                            </blockquote>
                            
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{testimonial.author}</p>
                                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-16"
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Sẵn sàng trải nghiệm TuneZone?
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Khám phá bộ sưu tập sản phẩm âm thanh chất lượng cao và tìm hiểu thêm về TuneZone
                    </motion.p>
                    
                    <motion.div variants={staggerContainer} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.div variants={fadeInUp}>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                            >
                                Xem sản phẩm
                                <FiHeadphones className="w-5 h-5" />
                            </Link>
                        </motion.div>
                        
                        <motion.div variants={fadeInUp}>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600"
                            >
                                Liên hệ chúng tôi
                                <FiUsers className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
