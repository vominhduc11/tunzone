'use client';

import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import feature1 from '@/assets/images/feature1.png';
import feature2 from '@/assets/images/feature2.png';
import feature3 from '@/assets/images/feature3.png';
import { FaMapMarkedAlt, FaLock, FaBolt } from 'react-icons/fa';
import Link from 'next/link';

const features = [
    {
        icon: FaMapMarkedAlt,
        title: 'Phủ sóng toàn cầu',
        desc: 'Kết nối không giới hạn trên mọi địa hình và lãnh thổ.'
    },
    {
        icon: FaLock,
        title: 'Bảo mật đầu cuối',
        desc: 'Mã hóa 256-bit, bảo vệ tuyệt đối dữ liệu cuộc gọi.'
    },
    {
        icon: FaBolt,
        title: 'Thông báo tức thì',
        desc: 'Cập nhật nhanh chóng, không bỏ lỡ bất kỳ liên lạc quan trọng nào.'
    }
];

const heroImages = [feature1, feature2, feature3];

const ExplorePage: FC = () => {
    const [current, setCurrent] = useState(0);
    const length = heroImages.length;

    // Scroll smoothly to Features section
    const scrollToFeatures = () => {
        const section = document.getElementById('features');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Next and previous handlers (if you still need carousel behavior)
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
    const nextSlide = () => setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));

    // Auto-play every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [length]);

    return (
        <div className="min-h-screen bg-[#181f2a] text-[#b0d0f9] font-sans">
            {/* Hero Carousel Section */}
            <section className="relative h-screen overflow-hidden">
                {heroImages.map((src, idx) => (
                    <div
                        key={idx}
                        className={`${idx === current ? 'opacity-100' : 'opacity-0'} absolute inset-0 transition-opacity duration-1000`}
                    >
                        <Image
                            src={src}
                            alt={`Hero ${idx + 1}`}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-black/60" />

                        {/* Content always rendered, fades with wrapper */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                                Khám Phá Giải Pháp Liên Lạc Thế Hệ Mới
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 mb-8">
                                Mạng lưới độc quyền, kết nối xuyên suốt, an toàn và tiện nghi cho
                                mọi chuyến đi.
                            </p>
                            <button
                                onClick={scrollToFeatures}
                                className="bg-cyan-400 hover:bg-cyan-300 text-[#181f2a] py-3 px-8 rounded-full transition"
                            >
                                Tìm hiểu thêm
                            </button>
                        </div>
                    </div>
                ))}
                {/* Carousel Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
                >
                    <FaChevronRight />
                </button>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 px-4">
                <div className="w-full max-w-[1280px] mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold text-cyan-400 mb-4">
                        Tính Năng Nổi Bật
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Được thiết kế để đáp ứng tối đa nhu cầu liên lạc trong mọi điều kiện.
                    </p>
                </div>
                <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="bg-[#232c3b] p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
                        >
                            <Icon className="text-cyan-400 text-4xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                            <p className="text-gray-300 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#232c3b] py-12 px-4">
                <div className="w-full max-w-[1280px] mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-cyan-400 mb-4">
                        Sẵn Sàng Trải Nghiệm?
                    </h2>
                    <Link
                        href="/contact"
                        className="bg-cyan-400 hover:bg-cyan-300 text-[#181f2a] py-3 px-8 rounded-full transition-colors"
                    >
                        Liên Hệ Ngay
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ExplorePage;
