'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiCalendar, FiUser, FiEye, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { blogs } from '@/data/api/blogs';

const categories = ['Tất cả', 'Audio', 'Công nghệ', 'Đánh giá', 'Hướng dẫn', 'Tin tức'];

const ITEMS_PER_PAGE = 9;

export default function BlogPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [currentPage, setCurrentPage] = useState(0);

    // Lọc bài theo search và category
    const filtered = blogs.filter((p) => {
        const matchCat = activeCategory === 'Tất cả' || p.category === activeCategory;
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                           p.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    // Tính toán cho phân trang
    const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const pagedPosts = filtered.slice(
        currentPage * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    // Reset về trang 1 nếu lọc thay đổi
    React.useEffect(() => {
        setCurrentPage(0);
    }, [activeCategory, search]);

    // Get featured post (most views)
    const featuredPost = blogs.reduce((prev, current) => 
        ((prev.views || 0) > (current.views || 0)) ? prev : current
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white animate-fadeIn">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 py-20 animate-slideDown">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12 animate-fadeInUp">
                        <div className="flex items-center justify-center gap-2 mb-4 animate-bounceIn">
                            <FiBookOpen className="w-8 h-8 text-blue-400" />
                            <span className="text-blue-400 font-semibold">TuneZone Blog</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-slideInLeft">
                            Khám phá thế giới âm thanh
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slideInRight">
                            Cập nhật những xu hướng mới nhất, đánh giá sản phẩm và hướng dẫn sử dụng 
                            từ các chuyên gia âm thanh hàng đầu
                        </p>
                    </div>

                    {/* Search & Filter */}
                    <div className="max-w-4xl mx-auto animate-scaleIn">
                        {/* Search Bar */}
                        <div className="relative mb-8 animate-fadeInUp animate-stagger-1">
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm bài viết, chủ đề..."
                                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 px-12 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-3 animate-fadeInUp animate-stagger-2">
                            {categories.map((cat, index) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-smooth hover-scale animate-fadeInUp animate-stagger-${Math.min(index + 1, 5)} ${
                                        activeCategory === cat
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {activeCategory === 'Tất cả' && !search && (
                <section className="max-w-7xl mx-auto px-4 py-12 animate-fadeInUp animate-stagger-3">
                    <div className="flex items-center gap-2 mb-8 animate-slideInLeft">
                        <FiTrendingUp className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-2xl font-bold">Bài viết nổi bật</h2>
                    </div>
                    
                    <div className="hover-lift animate-scaleIn">
                        <Link href={`/blog/${featuredPost.id}`} className="group block">
                            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl overflow-hidden border border-gray-600 hover:border-blue-500 transition-smooth hover:shadow-2xl hover:shadow-blue-500/10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    <div className="relative h-64 lg:h-80">
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <FiTrendingUp className="w-3 h-3" />
                                            Nổi bật
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <span className="inline-block text-sm font-semibold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full mb-4 w-fit">
                                        {featuredPost.category}
                                    </span>
                                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-6 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <FiUser className="w-4 h-4" />
                                            {featuredPost.author}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiCalendar className="w-4 h-4" />
                                            {featuredPost.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiEye className="w-4 h-4" />
                                            {(featuredPost.views || 0).toLocaleString()} lượt xem
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    </div>
                </section>
            )}

            {/* Posts Grid */}
            <section className="max-w-7xl mx-auto px-4 py-12 animate-fadeInUp animate-stagger-4">
                {/* Results Info */}
                <div className="flex justify-between items-center mb-8 animate-slideInLeft">
                    <h2 className="text-2xl font-bold">
                        {search || activeCategory !== 'Tất cả' ? 'Kết quả tìm kiếm' : 'Tất cả bài viết'}
                    </h2>
                    <p className="text-gray-400">
                        {filtered.length} bài viết
                    </p>
                </div>

                {/* Posts Grid */}
                {pagedPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {pagedPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className={`hover-lift animate-fadeInUp animate-stagger-${Math.min(index + 1, 5)}`}
                            >
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="group block bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-smooth hover:shadow-xl hover:shadow-blue-500/10"
                                >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="inline-block text-xs font-semibold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <FiEye className="w-3 h-3" />
                                            {post.views || 0}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    
                                    <p className="text-gray-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    
                                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-700">
                                        <div className="flex items-center gap-1">
                                            <FiUser className="w-3 h-3" />
                                            {post.author}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiCalendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-6">
                            <FiSearch className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-semibold mb-2">Không tìm thấy bài viết</h3>
                            <p>Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác</p>
                        </div>
                        <button
                            onClick={() => {
                                setSearch('');
                                setActiveCategory('Tất cả');
                                setCurrentPage(0);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="flex justify-center animate-fadeInUp animate-stagger-5">
                        <ReactPaginate
                            previousLabel="‹ Trước"
                            nextLabel="Sau ›"
                            breakLabel="..."
                            pageCount={pageCount}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={2}
                            onPageChange={({ selected }) => setCurrentPage(selected)}
                            containerClassName="flex items-center space-x-2"
                            pageLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm"
                            activeLinkClassName="bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                            previousLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm"
                            nextLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm"
                            disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-gray-800 hover:border-gray-600"
                            forcePage={currentPage}
                        />
                    </div>
                )}
            </section>
        </div>
    );
}
