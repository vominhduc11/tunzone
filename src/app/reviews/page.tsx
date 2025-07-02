'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { FiStar, FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi';

import SharedModal from '@/components/shared/SharedModal';
import { reviews } from '@/data/api/reviews';
import { Review } from '@/types/review';

export default function ReviewsPage() {
    const [open, setOpen] = useState<boolean>(false);
    const [review, setReview] = useState<Review | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
    const [filterRating, setFilterRating] = useState<number | null>(null);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    // Calculate review statistics
    const reviewStats = useMemo(() => {
        const totalReviews = reviews.length;
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
        const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
            rating,
            count: reviews.filter(r => r.rating === rating).length,
            percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
        }));
        
        return { totalReviews, averageRating, ratingDistribution };
    }, []);

    // Filter and sort reviews
    const filteredAndSortedReviews = useMemo(() => {
        const filtered = reviews.filter(review => {
            const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                review.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                review.username.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRating = filterRating === null || review.rating === filterRating;
            return matchesSearch && matchesRating;
        });

        const sorted = filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return b.id - a.id; // Sort by ID instead of date parsing
                case 'oldest':
                    return a.id - b.id;
                case 'highest':
                    return b.rating - a.rating;
                case 'lowest':
                    return a.rating - b.rating;
                default:
                    return 0;
            }
        });

        return sorted;
    }, [searchTerm, sortBy, filterRating]);

    function handleViewDetailReview(id: number) {
        const data = reviews.find((r) => r.id === id);
        setReview(data ?? null);
        setOpen(true);
    }

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
                <div className="w-full max-w-[1280px] mx-auto px-4">
                    {/* Header */}
                    <div className="flex items-center justify-center mb-8">
                        <h1 className="text-3xl font-bold">Tất cả đánh giá</h1>
                    </div>

                    {/* Review Statistics */}
                    <div className="bg-gray-800 rounded-xl p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Overall Rating */}
                            <div className="text-center">
                                <div className="text-4xl font-bold text-yellow-400 mb-2">
                                    {reviewStats.averageRating.toFixed(1)}
                                </div>
                                <div className="flex justify-center mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`w-6 h-6 ${i < Math.floor(reviewStats.averageRating) ? 'text-yellow-400' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-400">
                                    Dựa trên {reviewStats.totalReviews} đánh giá
                                </p>
                            </div>

                            {/* Rating Distribution */}
                            <div className="space-y-2">
                                {reviewStats.ratingDistribution.map(({ rating, count, percentage }) => (
                                    <div key={rating} className="flex items-center gap-3">
                                        <span className="text-sm w-8">{rating}★</span>
                                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-gray-400 w-8">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Controls */}
                    <div className="bg-gray-800 rounded-xl p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm đánh giá..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Sort */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'highest' | 'lowest')}
                                    className="appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                    <option value="highest">Điểm cao nhất</option>
                                    <option value="lowest">Điểm thấp nhất</option>
                                </select>
                                <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition"
                            >
                                <FiFilter />
                                Lọc
                            </button>
                        </div>

                        {/* Filter Options */}
                        {showFilters && (
                            <div className="mt-4 pt-4 border-t border-gray-700">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setFilterRating(null)}
                                        className={`px-3 py-1 rounded-full text-sm transition ${
                                            filterRating === null
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    >
                                        Tất cả
                                    </button>
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setFilterRating(rating)}
                                            className={`px-3 py-1 rounded-full text-sm transition flex items-center gap-1 ${
                                                filterRating === rating
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                        >
                                            {rating}★
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-gray-400">
                            Hiển thị {filteredAndSortedReviews.length} trên {reviews.length} đánh giá
                        </p>
                    </div>

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedReviews.map((r) => (
                            <div
                                key={r.id}
                                className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col hover:bg-gray-750 transition-colors duration-200"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-lg">{r.username}</span>
                                        {r.verified && (
                                            <BiCheckCircle className="w-4 h-4 text-green-400" />
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-400">{r.time}</span>
                                </div>
                                <div className="flex items-center mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`w-4 h-4 ${i < r.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-400">({r.rating}/5)</span>
                                </div>
                                <h4 className="font-semibold text-lg mb-3 text-white">{r.title}</h4>
                                <p className="text-sm text-gray-300 mb-4 flex-1 line-clamp-4 leading-relaxed">
                                    {r.text}
                                </p>
                                {r.images && r.images.length > 0 && (
                                    <div className="flex gap-2 mb-4">
                                        {r.images.slice(0, 3).map((img, idx) => (
                                            <div key={idx} className="w-12 h-12 rounded-lg overflow-hidden relative">
                                                <Image
                                                    src={img}
                                                    alt={`Review image ${idx + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                        {r.images.length > 3 && (
                                            <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center text-xs text-gray-400">
                                                +{r.images.length - 3}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <button
                                    onClick={() => handleViewDetailReview(r.id)}
                                    className="mt-auto self-start px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors duration-200"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredAndSortedReviews.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <FiSearch className="w-12 h-12 mx-auto mb-4" />
                                <p className="text-lg">Không tìm thấy đánh giá nào</p>
                                <p className="text-sm">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
                            </div>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterRating(null);
                                    setSortBy('newest');
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition"
                            >
                                Xóa bộ lọc
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <SharedModal
                isOpen={open}
                onClose={() => setOpen(false)}
                contentLabel="Review Details Modal"
            >
                {review ? (
                    <div className="bg-gray-900 text-white py-8 px-6 md:px-8 rounded-xl max-w-4xl mx-auto">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Chi tiết đánh giá</h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-400 hover:text-white text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* User Info */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {review.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold">{review.username}</span>
                                        {review.verified && (
                                            <span className="bg-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                <BiCheckCircle className="w-3 h-3" />
                                                Đã xác minh
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                                />
                                            ))}
                                            <span className="ml-1">({review.rating}/5)</span>
                                        </div>
                                        <span>•</span>
                                        <span>{review.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-4 text-white">{review.title}</h3>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                    {review.text}
                                </p>
                            </div>

                            {/* Images */}
                            {review.images && review.images.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-4 text-lg">
                                        Hình ảnh từ khách hàng ({review.images.length})
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {review.images.map((src, idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-square w-full rounded-lg overflow-hidden relative hover:scale-105 transition-transform duration-200 cursor-pointer"
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`Customer photo ${idx + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-gray-700">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors duration-200"
                                >
                                    Đóng
                                </button>
                                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-200">
                                    Báo cáo đánh giá
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-900 text-white py-8 px-4 md:px-8 rounded-xl">
                        <div className="text-center text-gray-400">
                            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                            Đang tải...
                        </div>
                    </div>
                )}
            </SharedModal>
        </>
    );
}
