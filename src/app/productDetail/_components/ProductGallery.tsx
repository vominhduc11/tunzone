'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { FiMaximize2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface GalleryProps {
    images: string[];
    avatar: string;
}

export default function ProductGallery({ images, avatar }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    
    const allImages = [avatar, ...images];

    return (
        <>
            <div className="space-y-4">
                {/* Main Image Swiper */}
                <div className="relative group">
                    <Swiper
                        modules={[Navigation, Pagination, A11y, Thumbs]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {allImages.map((src, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="relative w-full h-[400px] lg:h-[600px] bg-gray-800">
                                    <Image
                                        src={src}
                                        alt={`Product image ${idx + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                        priority={idx === 0}
                                    />
                                    
                                    {/* Zoom Button */}
                                    <button
                                        onClick={() => setShowLightbox(true)}
                                        className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                        title="Phóng to ảnh"
                                    >
                                        <FiMaximize2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <FiChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {activeIndex + 1} / {allImages.length}
                    </div>
                </div>

                {/* Thumbnail Swiper */}
                <Swiper
                    modules={[Navigation, A11y]}
                    spaceBetween={12}
                    slidesPerView={4}
                    breakpoints={{
                        640: { slidesPerView: 5 },
                        768: { slidesPerView: 6 },
                        1024: { slidesPerView: 5 },
                    }}
                    watchSlidesProgress
                    onSwiper={setThumbsSwiper}
                    className="thumbnail-swiper"
                >
                    {allImages.map((src, idx) => (
                        <SwiperSlide key={idx}>
                            <div 
                                className={`relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                                    idx === activeIndex 
                                        ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900' 
                                        : 'hover:ring-2 hover:ring-gray-400 hover:ring-offset-2 hover:ring-offset-gray-900'
                                }`}
                                onClick={() => setActiveIndex(idx)}
                            >
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                {idx !== activeIndex && (
                                    <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors duration-200" />
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Lightbox Modal */}
            {showLightbox && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative max-w-7xl max-h-full">
                        <button
                            onClick={() => setShowLightbox(false)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl z-10"
                        >
                            ✕
                        </button>
                        
                        <Swiper
                            modules={[Navigation, A11y]}
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation
                            initialSlide={activeIndex}
                            className="lightbox-swiper max-h-[90vh]"
                        >
                            {allImages.map((src, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="flex items-center justify-center h-full">
                                        <Image
                                            src={src}
                                            alt={`Product image ${idx + 1}`}
                                            width={1200}
                                            height={800}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </>
    );
}
