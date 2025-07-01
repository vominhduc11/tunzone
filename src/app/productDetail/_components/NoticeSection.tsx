'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiStar, FiUploadCloud, FiX } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { reviews as revi } from '@/data/api/reviews';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import SharedModal from '@/components/shared/SharedModal';

interface Review {
    id: number;
    productId: number;
    username: string;
    rating: number;
    title: string;
    text: string;
    time: string;
}

export default function NoticeSection({ id }: { id: string }) {
    const reviews = revi.filter((r) => r.productId === Number(id));
    const [newRating, setNewRating] = useState(0);
    const [newTitle, setNewTitle] = useState('');
    const [newComment, setNewComment] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
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

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const openReviewModal = (review: Review) => {
        setSelectedReview(review);
        setModalOpen(true);
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle review submission logic here
        console.log('Review submitted:', {
            rating: newRating,
            title: newTitle,
            comment: newComment,
            images
        });
        
        // Reset form
        setNewRating(0);
        setNewTitle('');
        setNewComment('');
        setImages([]);
        setShowReviewForm(false);
    };

    // Chỉ hiện Swiper nếu số review > 4
    const showCarousel = reviews.length > 4;
    const visibleReviews = showCarousel ? reviews : reviews.slice(0, 4);

    // Tính toán rating trung bình
    const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 py-16">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
                        Customer Reviews
                    </h2>
                    <p className="text-gray-400 text-lg">
                        See what our customers say about this product
                    </p>
                </div>

                {/* Review cards/carousel */}
                <div className="mb-12">
                    {visibleReviews.length === 0 ? (
                        <div className="text-center text-gray-400 py-20">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
                                <FiStar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <p className="text-xl mb-2">No reviews yet</p>
                                <p className="text-gray-500">Be the first to share your experience with this product</p>
                            </div>
                        </div>
                    ) : showCarousel ? (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            pagination={{ 
                                clickable: true,
                                bulletClass: 'swiper-pagination-bullet !bg-blue-500',
                                bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-400'
                            }}
                            spaceBetween={24}
                            slidesPerView={1}
                            className="w-full mx-auto review-swiper"
                            breakpoints={{
                                640: { slidesPerView: 1, spaceBetween: 20 },
                                768: { slidesPerView: 2, spaceBetween: 24 },
                                1024: { slidesPerView: 3, spaceBetween: 32 }
                            }}
                            style={{ padding: '0 0 50px 0' }}
                        >
                            {reviews.map((review) => (
                                <SwiperSlide key={review.id}>
                                    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-800/90 h-full flex flex-col">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-semibold text-lg text-white">
                                                {review.username}
                                            </span>
                                            <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                                                {review.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center mb-3">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                                                />
                                            ))}
                                            <span className="ml-2 text-sm text-gray-400">
                                                {review.rating}/5
                                            </span>
                                        </div>
                                        <h4 className="font-semibold text-lg mb-3 text-blue-400">
                                            {review.title}
                                        </h4>
                                        <p className="text-gray-300 mb-4 flex-1 line-clamp-4 leading-relaxed">
                                            {review.text}
                                        </p>
                                        <button
                                            type="button"
                                            className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline mt-auto self-start transition-colors"
                                            onClick={() => openReviewModal(review)}
                                        >
                                            Read full review →
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                            
                            {/* Custom Navigation Buttons */}
                            <div className="swiper-button-prev !text-blue-400 !w-10 !h-10 !mt-0 !top-1/2 !left-4 !bg-gray-800/80 !rounded-full !border !border-gray-700 hover:!bg-gray-700 !transition-all"></div>
                            <div className="swiper-button-next !text-blue-400 !w-10 !h-10 !mt-0 !top-1/2 !right-4 !bg-gray-800/80 !rounded-full !border !border-gray-700 hover:!bg-gray-700 !transition-all"></div>
                        </Swiper>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {visibleReviews.map((review) => (
                                <div key={review.id} className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-800/90 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-semibold text-lg text-white">
                                            {review.username}
                                        </span>
                                        <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                                            {review.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-3">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                                            />
                                        ))}
                                        <span className="ml-2 text-sm text-gray-400">
                                            {review.rating}/5
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-lg mb-3 text-blue-400">
                                        {review.title}
                                    </h4>
                                    <p className="text-gray-300 mb-4 flex-1 leading-relaxed">
                                        {review.text}
                                    </p>
                                    <button
                                        type="button"
                                        className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline mt-auto self-start transition-colors"
                                        onClick={() => openReviewModal(review)}
                                    >
                                        Read full review →
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Dynamic Review Modal */}
                <SharedModal
                    isOpen={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedReview(null);
                    }}
                    contentLabel="Review Details"
                >
                    {selectedReview && (
                        <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {selectedReview.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-gray-400">
                                        <div className="flex items-center">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-5 h-5 ${i < selectedReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                                                />
                                            ))}
                                            <span className="ml-2">{selectedReview.rating}/5</span>
                                        </div>
                                        <span>•</span>
                                        <span className="font-medium">{selectedReview.username}</span>
                                        <span>•</span>
                                        <span className="italic">{selectedReview.time}</span>
                                    </div>
                                </div>
                                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                                    Verified Purchase
                                </span>
                            </div>
                            
                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-200 leading-relaxed text-lg mb-6">
                                    {selectedReview.text}
                                </p>
                            </div>

                            {/* Sample review images - you can make this dynamic */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                                    <Image
                                        src="/img/rev1.jpg"
                                        width={300}
                                        height={200}
                                        alt="Review image 1"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                                    <Image
                                        src="/img/rev2.jpg"
                                        width={300}
                                        height={200}
                                        alt="Review image 2"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setModalOpen(false);
                                        setSelectedReview(null);
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </SharedModal>

                {/* Read more reviews */}
                <div className="flex justify-center mb-12">
                    <Link href="/reviews">
                        <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            View All Reviews ({reviews.length})
                        </button>
                    </Link>
                </div>

                {/* Rating summary */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12">
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
                                <span className="text-5xl font-bold text-white">
                                    {averageRating.toFixed(1)}
                                </span>
                                <div className="flex items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-400 text-lg">
                                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                            </p>
                        </div>
                        
                        <div className="flex-1 max-w-md w-full">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = reviews.filter((r) => r.rating === star).length;
                                const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
                                return (
                                    <div key={star} className="flex items-center mb-3 last:mb-0">
                                        <span className="w-8 text-sm text-gray-400 font-medium">
                                            {star}★
                                        </span>
                                        <div className="flex-1 h-2 bg-gray-700 mx-3 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="w-8 text-right text-sm text-gray-400 font-medium">
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
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                                >
                                    Cancel Review
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    Write a Review
                                </button>
                            )}
                        </div>
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
                    <div className="max-w-2xl mx-auto bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12">
                        <form onSubmit={handleSubmitReview} className="space-y-6">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Write a Review</h3>
                                <p className="text-gray-400">Share your experience with this product</p>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Your Rating *
                                </label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewRating(star)}
                                            className="focus:outline-none hover:scale-110 transition-transform"
                                        >
                                            <FiStar
                                                className={`w-8 h-8 ${star <= newRating ? 'text-yellow-400 fill-current' : 'text-gray-600 hover:text-yellow-300'}`}
                                            />
                                        </button>
                                    ))}
                                    {newRating > 0 && (
                                        <span className="ml-3 text-gray-400">
                                            {newRating}/5 stars
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Review Title *
                                </label>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Summarize your experience..."
                                    className="w-full bg-gray-700/50 border border-gray-600 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Your Review *
                                </label>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    rows={5}
                                    placeholder="Tell others about your experience with this product..."
                                    className="w-full bg-gray-700/50 border border-gray-600 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                                    required
                                />
                            </div>

                            {/* Image upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Add Photos (Optional)
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {images.map((src, idx) => (
                                        <div
                                            key={idx}
                                            className="relative h-20 w-20 bg-gray-700 rounded-lg overflow-hidden group"
                                        >
                                            <Image
                                                src={src}
                                                alt={`Upload ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FiX className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {images.length < 5 && (
                                        <label className="h-20 w-20 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-gray-700 transition-colors group">
                                            <FiUploadCloud className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleAddImage}
                                            />
                                        </label>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Upload up to 5 photos (JPG, PNG, max 5MB each)
                                </p>
                            </div>

                            {/* Additional fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Display Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full bg-gray-700/50 border border-gray-600 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full bg-gray-700/50 border border-gray-600 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* YouTube URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    YouTube Video URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full bg-gray-700/50 border border-gray-600 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                />
                            </div>

                            {/* Form actions */}
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowReviewForm(false)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!newRating || !newTitle.trim() || !newComment.trim()}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Custom Styles for Swiper */}
                <style jsx global>{`
                    .review-swiper .swiper-pagination {
                        bottom: 10px !important;
                    }
                    
                    .review-swiper .swiper-pagination-bullet {
                        background: rgb(59 130 246) !important;
                        opacity: 0.5;
                    }
                    
                    .review-swiper .swiper-pagination-bullet-active {
                        background: rgb(96 165 250) !important;
                        opacity: 1;
                    }
                    
                    .line-clamp-4 {
                        display: -webkit-box;
                        -webkit-line-clamp: 4;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                `}</style>
            </div>
        </section>
    );
}
