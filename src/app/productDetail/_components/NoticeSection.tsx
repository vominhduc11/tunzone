'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiStar, FiUploadCloud } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { reviews as revi } from '@/data/api/reviews';

import 'swiper/css';
import 'swiper/css/navigation';

import SharedModal from '@/components/shared/SharedModal';

export default function NoticeSection({ id }: { id: string }) {
    const reviews = revi.filter((r) => r.productId == Number(id));
    const [newRating, setNewRating] = useState(0);
    const [newTitle, setNewTitle] = useState('');
    const [newComment, setNewComment] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const reviewFormRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [modalOpen, setModalOpen] = useState(false);

    // Hiệu ứng mở/đóng form mượt mà
    useLayoutEffect(() => {
        const ref = reviewFormRef.current;
        if (!ref) return;
        if (showReviewForm) {
            setMaxHeight(ref.scrollHeight + 'px');
            const t = setTimeout(() => setMaxHeight('9999px'), 500);
            return () => clearTimeout(t);
        } else {
            setMaxHeight(ref.scrollHeight + 'px');
            requestAnimationFrame(() => setMaxHeight('0px'));
        }
    }, [showReviewForm]);

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0] && images.length < 10) {
            setImages((prev) => [...prev, URL.createObjectURL(files[0])]);
        }
    };

    // Chỉ hiện Swiper nếu số review > 4
    const showCarousel = reviews.length > 4;
    const visibleReviews = showCarousel ? reviews : reviews.slice(0, 4);

    return (
        <section className="min-h-screen bg-gray-900 text-gray-100 py-12">
            <div className="w-full max-w-[1280px] mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">NOTICE</h2>

                {/* Review cards/carousel */}
                <div className="mb-8">
                    {/* BỔ SUNG: Hiển thị UI khi không có review */}
                    {visibleReviews.length === 0 ? (
                        <div className="text-center text-gray-400 py-16">
                            <p>Chưa có bài đánh giá nào. Hãy cho tôi biết đánh giá của bạn</p>
                        </div>
                    ) : showCarousel ? (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            spaceBetween={32}
                            slidesPerView={3}
                            className="w-full mx-auto"
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                1024: { slidesPerView: 2 },
                                1280: { slidesPerView: 3 }
                            }}
                            style={{ padding: '0 0 40px 0' }}
                        >
                            {reviews.map((r) => (
                                <SwiperSlide key={r.id} className="!w-1/4">
                                    <div className="bg-gray-800 w-full max-w-lg mx-auto min-h-[340px] p-8 rounded-2xl shadow hover:shadow-2xl transition-all duration-200 border border-transparent hover:border-blue-500 flex flex-col">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-medium text-lg">
                                                {r.username}
                                            </span>
                                            <span className="text-xs text-gray-400">{r.time}</span>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-5 h-5 ${i < r.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                                />
                                            ))}
                                        </div>
                                        <h4 className="font-semibold text-lg mb-2">{r.title}</h4>
                                        <p className="text-base text-gray-300 mb-4 flex-1 line-clamp-6">
                                            {r.text}
                                        </p>
                                        <button
                                            type="button"
                                            className="text-blue-400 text-xs hover:underline mt-auto"
                                            onClick={() => setModalOpen(true)}
                                        >
                                            Full review
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div
                            className={`w-full flex gap-6 justify-center${visibleReviews.length === 4 ? '' : ' flex-wrap'}`}
                        >
                            {reviews.map((r) => (
                                <div key={r.id} className="w-1/4 mb-8">
                                    {' '}
                                    <div
                                        key={r.id}
                                        className="bg-gray-800 flex-1 min-h-[340px] p-8 rounded-2xl shadow hover:shadow-2xl transition-all duration-200 border border-transparent hover:border-blue-500 flex flex-col"
                                        style={{ minWidth: 0 }}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-medium text-lg">
                                                {r.username}
                                            </span>
                                            <span className="text-xs text-gray-400">{r.time}</span>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-5 h-5 ${i < r.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                                />
                                            ))}
                                        </div>
                                        <h4 className="font-semibold text-lg mb-2">{r.title}</h4>
                                        <p className="text-base text-gray-300 mb-4 flex-1">
                                            {r.text}
                                        </p>
                                        <button
                                            type="button"
                                            className="text-blue-400 text-xs hover:underline mt-auto"
                                            onClick={() => setModalOpen(true)}
                                        >
                                            Full review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Static SharedModal: tĩnh, không lấy dữ liệu động */}
                <SharedModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    contentLabel="Chi tiết đánh giá"
                >
                    <div className="bg-gray-800 rounded-xl p-6 max-w-md mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">
                                Tiêu đề đánh giá tĩnh
                            </h3>
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                Xác thực
                            </span>
                        </div>
                        <div className="flex items-center mb-3 text-gray-400">
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`}
                                />
                            ))}
                            <span className="ml-2">UserName</span>
                            <span className="ml-4 italic">2 ngày trước</span>
                        </div>
                        <p className="text-gray-200 mb-4">
                            Đây là nội dung review tĩnh mô phỏng chi tiết đánh giá, hiển thị khi
                            nhấn Full review.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <Image
                                src="/img/rev1.jpg"
                                width={240}
                                height={160}
                                alt="review image"
                                className="rounded-lg object-cover"
                            />
                            <Image
                                src="/img/rev2.jpg"
                                width={240}
                                height={160}
                                alt="review image"
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="mt-4 bg-cyan-400 hover:bg-cyan-300 text-gray-900 px-4 py-2 rounded-full transition"
                        >
                            Đóng
                        </button>
                    </div>
                </SharedModal>

                {/* Read more reviews */}
                <div className="flex justify-center mb-8">
                    <Link href="/reviewsPage">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow transition">
                            Read more reviews
                        </button>
                    </Link>
                </div>

                {/* Rating summary */}
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-10 border-t border-b border-gray-700 py-6">
                    <div className="text-center md:text-left">
                        <span className="text-3xl font-bold block">4.8</span>
                        <span className="text-sm text-gray-400">
                            Based on {reviews.length} reviews
                        </span>
                    </div>
                    <div className="flex-1 max-w-lg px-4">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = reviews.filter((r) => r.rating === star).length;
                            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                            return (
                                <div key={star} className="flex items-center mb-2">
                                    <span className="w-6 text-sm text-gray-400">{star}★</span>
                                    <div className="flex-1 h-1.5 bg-gray-700 mx-2 rounded overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <span className="w-6 text-right text-sm text-gray-400">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex-shrink-0">
                        {showReviewForm ? (
                            <button
                                onClick={() => setShowReviewForm(false)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
                            >
                                Cancel review
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
                            >
                                Write a review
                            </button>
                        )}
                    </div>
                </div>

                {/* Review form (smooth open/close animation) */}
                <div
                    ref={reviewFormRef}
                    style={{
                        maxHeight,
                        transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s',
                        opacity: showReviewForm ? 1 : 0,
                        overflow: 'hidden'
                    }}
                    aria-hidden={!showReviewForm}
                >
                    <form className="max-w-lg mx-auto bg-gray-800 rounded-lg p-6 flex flex-col gap-4 mb-12">
                        <h3 className="text-lg font-semibold text-white">Write a review</h3>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Rating</label>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewRating(star)}
                                        className="focus:outline-none"
                                    >
                                        <FiStar
                                            className={`w-6 h-6 ${star <= newRating ? 'text-yellow-400' : 'text-gray-600'}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Review title"
                            className="w-full bg-gray-700 text-white text-sm px-3 py-2 rounded focus:outline-none"
                        />
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={4}
                            placeholder="Write your experience..."
                            className="w-full bg-gray-700 text-white text-sm px-3 py-2 rounded focus:outline-none"
                        />

                        {/* Image upload grid */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {images.map((src, idx) => (
                                <div
                                    key={idx}
                                    className="h-16 w-16 bg-gray-700 rounded overflow-hidden relative"
                                >
                                    <Image
                                        src={src}
                                        alt={`img ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                            {images.length < 10 && (
                                <label className="h-16 w-16 bg-gray-700 border-2 border-dashed border-gray-600 rounded flex items-center justify-center cursor-pointer hover:border-blue-500 transition">
                                    <FiUploadCloud className="w-6 h-6 text-gray-400 hover:text-blue-500" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAddImage}
                                    />
                                </label>
                            )}
                        </div>

                        <input
                            type="url"
                            placeholder="YouTube URL"
                            className="w-full bg-gray-700 text-white text-sm px-3 py-2 rounded focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Display name"
                            className="w-full bg-gray-700 text-white text-sm px-3 py-2 rounded focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full bg-gray-700 text-white text-sm px-3 py-2 rounded focus:outline-none"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowReviewForm(false)}
                                className="bg-gray-700 text-gray-300 px-4 py-1 rounded transition hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition"
                            >
                                Submit Review
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
