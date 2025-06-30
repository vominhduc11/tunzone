// components/AboutUsPage.tsx
// Trang About Us - Tai nghe SCS với theme xanh, Story Section động (5 nội dung luân phiên mỗi 5s) kèm hiệu ứng fade slide, core values, team, social proof, stats
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { storyData } from '@/data/storyData';

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
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <section
                className="relative h-[350px] md:h-[420px] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1200&q=80')"
                }}
            >
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-500 drop-shadow">
                        SCS Headphones – Đỉnh Cao Âm Thanh
                    </h1>
                    <p className="text-blue-100 w-full max-w-[1280px] mx-auto text-lg md:text-xl font-medium">
                        Chúng tôi đam mê công nghệ âm thanh, cam kết mang đến những chiếc tai nghe
                        SCS chất lượng cao cho mọi trải nghiệm nghe nhạc, gaming và học tập.
                    </p>
                </div>
            </section>

            {/* Dynamic Story Section với fade + slide của cả text và image */}
            <section className="w-full max-w-[1280px] mx-auto px-4 py-16">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 text-center">
                    Hành Trình SCS Headphones
                </h2>
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div
                        className={`rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out ${anim}`}
                    >
                        <Image
                            src={storyData[index].img}
                            alt="Câu chuyện SCS"
                            width={600}
                            height={400}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className={`transition-all duration-500 ease-in-out ${anim}`}>
                        <p className="text-blue-100 text-lg leading-relaxed mb-4">
                            {storyData[index].p1}
                        </p>
                        <p className="text-blue-200 text-base">{storyData[index].p2}</p>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="bg-gray-800 py-16">
                <div className="w-full max-w-[1280px] mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-8">
                        Giá Trị Cốt Lõi
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: 'https://cdn-icons-png.flaticon.com/512/727/727245.png',
                                title: 'Âm Thanh Chuẩn',
                                desc: 'Âm thanh trung thực, chuẩn phòng thu, cân bằng mọi dải tần.'
                            },
                            {
                                icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
                                title: 'Thoải Mái',
                                desc: 'Thiết kế ôm tai, đệm mút êm, sử dụng nhiều giờ không đau.'
                            },
                            {
                                icon: 'https://cdn-icons-png.flaticon.com/512/3039/3039434.png',
                                title: 'Công Nghệ Mới',
                                desc: 'Liên tục cập nhật xu hướng âm thanh, kết nối đa thiết bị.'
                            },
                            {
                                icon: 'https://cdn-icons-png.flaticon.com/512/2038/2038854.png',
                                title: 'Hỗ Trợ Nhanh',
                                desc: 'Bảo hành chính hãng 12 tháng, hỗ trợ khách hàng 24/7.'
                            }
                        ].map((v) => (
                            <div
                                key={v.title}
                                className="p-7 bg-gray-700 rounded-xl border border-gray-600 transition hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 group"
                            >
                                <div className="flex justify-center mb-4">
                                    <Image
                                        src={v.icon}
                                        alt={v.title}
                                        width={48}
                                        height={48}
                                        className="group-hover:scale-110 transition"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                                <p className="text-blue-200 text-base">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="w-full max-w-[1280px] mx-auto px-4 py-16">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-8 text-center">
                    Đội Ngũ Sáng Lập
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        {
                            img: 'https://images.unsplash.com/photo-1519340333755-c2f6cf4c11b6?auto=format&fit=crop&w=300&q=80',
                            name: 'Nguyễn Audio',
                            role: 'Founder & Sound Engineer'
                        },
                        {
                            img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80',
                            name: 'Lê Music',
                            role: 'Product Designer'
                        },
                        {
                            img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80',
                            name: 'Phạm Stream',
                            role: 'CSO - Customer Support Officer'
                        }
                    ].map((m) => (
                        <div
                            key={m.name}
                            className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition hover:shadow-2xl"
                        >
                            <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-700">
                                <Image
                                    src={m.img}
                                    alt={m.name}
                                    width={112}
                                    height={112}
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-1 text-white">{m.name}</h3>
                            <p className="text-blue-400 font-medium">{m.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Partners & Testimonials */}
            <section className="bg-gray-800 py-16">
                <div className="w-full max-w-[1280px] mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-8">
                        Đối Tác & Khách Hàng Nổi Bật
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center mb-10">
                        {[
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo-sony.svg/2560px-Logo-sony.svg.png',
                            'https://upload.wikimedia.org/wikipedia/commons/2/2d/Bose_logo.svg',
                            'https://upload.wikimedia.org/wikipedia/commons/3/3c/Sennheiser_Logo.png',
                            'https://upload.wikimedia.org/wikipedia/commons/6/67/Beats_Electronics_logo.svg'
                        ].map((logo, i) => (
                            <div key={i} className="flex justify-center">
                                <Image
                                    src={logo}
                                    alt={`Logo ${i + 1}`}
                                    width={110}
                                    height={60}
                                    className="filter grayscale opacity-70 hover:filter-none hover:opacity-100 transition"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
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
                            <blockquote
                                key={i}
                                className="p-6 bg-gray-700 rounded-xl border-l-4 border-blue-500"
                            >
                                <p className="italic text-blue-100 mb-4">“{t.text}”</p>
                                <cite className="block text-right text-blue-200">– {t.author}</cite>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-900 py-16">
                <div className="w-full max-w-[1280px] mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-8">
                        Thành Tựu & Số Liệu
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {[
                            { num: '10,000+', label: 'Khách hàng hài lòng' },
                            { num: '50+', label: 'Đối tác phòng thu' },
                            { num: '5', label: 'Năm phát triển' },
                            { num: '24/7', label: 'Hỗ trợ kỹ thuật' }
                        ].map((s) => (
                            <div key={s.label} className="p-7 bg-gray-800 rounded-xl">
                                <span className="text-4xl font-bold text-blue-500">{s.num}</span>
                                <p className="text-blue-100 mt-2 font-medium">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
