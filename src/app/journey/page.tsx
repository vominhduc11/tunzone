'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMap, FiMusic, FiBattery } from 'react-icons/fi';
import Image from 'next/image';
import hero1 from '@/assets/images/feature1.png'; // placeholder ảnh 1
import hero2 from '@/assets/images/feature2.png'; // placeholder ảnh 2
import hero3 from '@/assets/images/feature3.png'; // placeholder ảnh 3

const heroImages = [hero1, hero2, hero3];

export default function UseCasesPage() {
    const [current, setCurrent] = useState(0);
    const length = heroImages.length;

    // Chuyển slide tiếp và trước
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
                            alt={`Use Case ${idx + 1}`}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                                Bắt Đầu Hành Trình
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                                Khám phá cách sản phẩm của chúng tôi đồng hành cùng bạn trong mọi
                                hành trình, từ đô thị sầm uất đến những cung đường mạo hiểm.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block bg-cyan-400 hover:bg-cyan-300 text-[#181f2a] font-semibold py-3 px-8 rounded-full transition"
                            >
                                Liên hệ ngay
                            </Link>
                        </div>
                    </div>
                ))}
                {/* Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
                >
                    ‹
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
                >
                    ›
                </button>
            </section>

            {/* Use Cases Grid */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold text-cyan-400 mb-4">
                        Ứng Dụng Đa Dạng
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Thiết bị của chúng tôi phù hợp với nhiều tình huống khác nhau. Dưới đây là
                        một vài ví dụ điển hình.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#232c3b] p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-200 text-center">
                        <FiMap className="text-cyan-400 text-5xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-white">Du Lịch Khám Phá</h3>
                        <p className="text-gray-300">
                            Kết nối liền mạch mọi lúc mọi nơi, dù bạn ở rừng núi hay sa mạc.
                        </p>
                    </div>
                    <div className="bg-[#232c3b] p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-200 text-center">
                        <FiMusic className="text-cyan-400 text-5xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-white">
                            Giải Trí Nghe Nhạc
                        </h3>
                        <p className="text-gray-300">
                            Chất lượng âm thanh cao cấp, chống ồn tốt, mang lại trải nghiệm thưởng
                            thức tuyệt vời.
                        </p>
                    </div>
                    <div className="bg-[#232c3b] p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-200 text-center">
                        <FiBattery className="text-cyan-400 text-5xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-white">Sử Dụng Dài Lâu</h3>
                        <p className="text-gray-300">
                            Pin 13h liên tục, không lo gián đoạn giữa chặng đường.
                        </p>
                    </div>
                </div>
            </section>

            {/* Back to Home */}
            <section className="bg-[#232c3b] py-8 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <Link
                        href="/"
                        className="bg-cyan-400 hover:bg-cyan-300 text-[#181f2a] font-semibold py-2 px-6 rounded-full transition"
                    >
                        Quay về trang chủ
                    </Link>
                </div>
            </section>
        </div>
    );
}
