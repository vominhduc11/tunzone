'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ChooseCardoSection from './_components/ChooseCardoSection';
import RevolutionTechSection from './_components/RevolutionTechSection';
import HeroSections from './_components/HeroSections';
import DealerPartnershipSection from './_components/DealerPartnershipSection';
import TestimonialsStatsSection from './_components/TestimonialsStatsSection';
import BlogSection from './_components/BlogSection';
import TeamPartnersSection from './_components/TeamPartnersSection';

interface Product {
    id: string;
    title: string;
    imageSrc: string;
    link: string;
}
const products: Product[] = [
    { id: 't2', title: 'T2', imageSrc: '/images/t2.png', link: '/products/t2' },
    { id: 'g7plus', title: 'G7+', imageSrc: '/images/g7plus.png', link: '/products/g7plus' },
    { id: 's9xm', title: 'S9XM', imageSrc: '/images/s9xm.png', link: '/products/s9xm' },
    { id: 's9x', title: 'S9X', imageSrc: '/images/s9x.png', link: '/products/s9x' },
    { id: 's7evo', title: 'S7EVO', imageSrc: '/images/s7evo.png', link: '/products/s7evo' }
];

function Home() {
    const banners = [
        'https://cardosystems.com/cdn/shop/files/BAN01060_New_banner_for_the_website.webp?v=1746625640&width=2000',
        'https://cardosystems.com/cdn/shop/files/WEB01022_Size_adjustment_-_main_banner_for_the_website.webp?v=1749023428&width=2000'
    ];
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="banner-swiper"
            >
                {banners.map((src, idx) => (
                    <SwiperSlide key={idx}>
                        <div
                            className="h-[650px] w-full bg-center bg-cover"
                            style={{ backgroundImage: `url(${src})` }}
                        >
                            {/* Nếu bạn cần tỷ lệ cố định, có thể dùng aspect-ratio: */}
                            <div className="w-full aspect-[1/1]"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <section className="bg-gray-700 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">We recommend</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 px-4">
                        {products.map((product) => (
                            <a
                                key={product.id}
                                href={product.link}
                                className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-semibold text-white underline mb-4">
                                    {product.title}
                                </h3>
                                <div className="relative w-full h-48 mb-4">
                                    <Image
                                        src={product.imageSrc}
                                        alt={product.title}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                                <button className="mt-auto bg-blue-400 text-black font-medium px-4 py-2 rounded-md hover:bg-blue-500">
                                    DISCOVER NOW
                                </button>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <HeroSections />

            {/* <section
                className="bg-fixed bg-cover bg-center h-screen flex items-center justify-center text-white relative"
                style={{
                    backgroundImage:
                        "url('https://www.scsetc.com/wp-content/uploads/2025/04/oemodm.jpg')"
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
                <div className="text-center px-6 relative z-10">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Section 1</h1>
                    <p className="mb-6 text-lg">
                        This is an introductory text, mô tả nội dung chính.
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
                    >
                        Learn More
                    </a>
                </div>
            </section>

            <section
                className="bg-fixed bg-cover bg-center h-screen flex items-center justify-center text-white relative"
                style={{
                    backgroundImage:
                        "url('https://www.scsetc.com/wp-content/uploads/2025/04/daili.jpg')"
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
                <div className="text-center px-6 relative z-10">
                    <h2 className="text-4xl font-semibold mb-3">Discover Section 2</h2>
                    <p className="mb-5 text-md">
                        Giới thiệu một chủ đề tiếp theo hoặc lợi ích nổi bật.
                    </p>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-5 rounded transition">
                        Get Started
                    </button>
                </div>
            </section> */}

            <ChooseCardoSection />

            {/* <section
                className="bg-fixed bg-cover bg-center h-screen flex items-center justify-center text-white relative"
                style={{
                    backgroundImage:
                        "url('https://www.scsetc.com/wp-content/uploads/2025/04/daili.jpg')"
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
                <div className="text-center px-6 relative z-10">
                    <h2 className="text-4xl font-semibold mb-3">Discover Section 2</h2>
                    <p className="mb-5 text-md">
                        Giới thiệu một chủ đề tiếp theo hoặc lợi ích nổi bật.
                    </p>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-5 rounded transition">
                        Get Started
                    </button>
                </div>
            </section> */}
            <DealerPartnershipSection />

            <RevolutionTechSection />

            <TestimonialsStatsSection />

            <BlogSection />

            <TeamPartnersSection />
        </div>
    );
}

export default Home;
