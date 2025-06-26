'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, Navigation, Pagination } from 'swiper/modules';

interface GalleryProps {
    images: string[];
    mainImageIndex?: number;
}

export default function ProductGallery({ images, mainImageIndex = 0 }: GalleryProps) {
    return (
        <div className="space-y-6">
            {/* Main Image */}
            <div className="relative w-full h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                    src={images[mainImageIndex]}
                    alt={`Product image ${mainImageIndex + 1}`}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Carousel Thumbnails */}
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={10}
                slidesPerView={5}
                navigation
                pagination={{ clickable: true }}
                className="py-4"
                // onSlideChange={(swiper) => {
                //   // Optionally handle slide change
                // }}
            >
                {images.map((src, idx) => (
                    <SwiperSlide key={idx} className="flex justify-center">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <Image
                                src={src}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
