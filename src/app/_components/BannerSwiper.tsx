import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BannerSwiperProps {
    banners: string[];
}

export default function BannerSwiper({ banners }: BannerSwiperProps) {
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
