'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const banners: string[] = [
    'https://cardosystems.com/cdn/shop/files/BAN01060_New_banner_for_the_website.webp?v=1746625640&width=2000',
    'https://cardosystems.com/cdn/shop/files/WEB01022_Size_adjustment_-_main_banner_for_the_website.webp?v=1749023428&width=2000'
];

export default function BannerSwiper() {
    return (
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
                        <div className="w-full aspect-[1/1]" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
