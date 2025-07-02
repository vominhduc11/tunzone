'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiCalendar, FiUser, FiEye, FiBookOpen, FiTrendingUp, FiClock, FiHeart, FiShare2 } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { blogs } from '@/data/api/blogs';
import { useScrollAnimation, useStaggeredAnimation, useCountUp } from '@/hooks/useScrollAnimation';

const categories = ['Tất cả', 'Audio', 'Công nghệ', 'Đánh giá', 'Hướng dẫn', 'Tin tức'];

const ITEMS_PER_PAGE = 9;

export default function BlogPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [currentPage, setCurrentPage] = useState(0);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);

    // Animation hooks
    const heroAnimation = useScrollAnimation({ threshold: 0.2 });
    const featuredAnimation = useScrollAnimation({ threshold: 0.3 });
    const statsAnimation = useScrollAnimation({ threshold: 0.3 });
    const { containerRef: gridRef, visibleItems } = useStaggeredAnimation(ITEMS_PER_PAGE, 100);
    const { elementRef: countRef, count: blogCount } = useCountUp(blogs.length, 2000);

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

    const toggleLike = (postId: number) => {
        setLikedPosts(prev => 
            prev.includes(postId) 
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section with Enhanced Animation */}
            <section 
                ref={heroAnimation.elementRef}
                className={`relative bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 py-24 animate-gradientShift overflow-hidden transition-all duration-1000 ${
                    heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full animate-float"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-pink-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-400 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-cyan-400 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
                </div>

                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-1000 delay-300 ${
                            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
                        }`}>
                            <FiBookOpen className="w-10 h-10 text-blue-400 animate-heartbeat" />
                            <span className="text-blue-400 font-semibold text-lg">TuneZone Blog</span>
                        </div>
                        <h1 className={`text-5xl md:text-7xl font-bold mb-6 gradient-text transition-all duration-1000 delay-500 ${
                            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                        }`}>
                            Khám phá thế giới âm thanh
                        </h1>
                        <p className={`text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${
                            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            Cập nhật những xu hướng mới nhất, đánh giá sản phẩm và hướng dẫn sử dụng 
                            từ các chuyên gia âm thanh hàng đầu
                        </p>

                        {/* Stats Section */}
                        <div 
                            ref={statsAnimation.elementRef}
                            className={`mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-900 ${
                                statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-4 rounded-2xl hover-lift">
                                <div className="text-center">
                                    <div ref={countRef} className="text-2xl font-bold text-blue-400">{blogCount}</div>
                                    <div className="text-sm text-gray-300">Bài viết</div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-4 rounded-2xl hover-lift">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">50K+</div>
                                    <div className="text-sm text-gray-300">Lượt đọc</div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-4 rounded-2xl hover-lift">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-400">4.9</div>
                                    <div className="text-sm text-gray-300">Đánh giá</div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-4 rounded-2xl hover-lift">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">24/7</div>
                                    <div className="text-sm text-gray-300">Cập nhật</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter */}
                    <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-1100 ${
                        heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        {/* Search Bar */}
                        <div className="relative mb-8">
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm bài viết, chủ đề..."
                                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 px-12 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shimmer-effect hover-glow"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((cat, index) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover-bounce transform ${
                                        activeCategory === cat
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                                            : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20 hover:scale-105'
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
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
                <section 
                    ref={featuredAnimation.elementRef}
                    className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 ${
                        featuredAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="flex items-center gap-3 mb-8 animate-slideInFromLeft">
                        <FiTrendingUp className="w-8 h-8 text-yellow-400 animate-heartbeat" />
                        <h2 className="text-3xl font-bold gradient-text">Bài viết nổi bật</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
                    </div>
                    
                    <div className="hover-lift animate-scaleIn">
                        <Link href={`/blog/${featuredPost.id}`} className="group block">
                            <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl overflow-hidden border border-gray-600 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 relative">
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    <div className="relative h-80 lg:h-96 overflow-hidden">
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        
                                        {/* Badges */}
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-bounceIn">
                                                <FiTrendingUp className="w-4 h-4" />
                                                Nổi bật
                                            </span>
                                        </div>
                                        
                                        <div className="absolute top-6 right-6">
                                            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full text-white text-sm">
                                                <FiEye className="w-4 h-4" />
                                                {(featuredPost.views || 0).toLocaleString()}
                                            </div>
                                        </div>

                                        {/* Reading time */}
                                        <div className="absolute bottom-6 left-6">
                                            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full text-white text-sm">
                                                <FiClock className="w-4 h-4" />
                                                5 phút đọc
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                                        <span className="inline-block text-sm font-semibold bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full mb-6 w-fit animate-fadeInUp">
                                            {featuredPost.category}
                                        </span>
                                        <h3 className="text-3xl lg:text-4xl font-bold mb-6 group-hover:text-yellow-400 transition-colors leading-tight animate-fadeInUp animate-stagger-1">
                                            {featuredPost.title}
                                        </h3>
                                        <p className="text-gray-300 mb-8 leading-relaxed text-lg animate-fadeInUp animate-stagger-2">
                                            {featuredPost.excerpt}
                                        </p>
                                        
                                        <div className="flex items-center justify-between animate-fadeInUp animate-stagger-3">
                                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <FiUser className="w-4 h-4" />
                                                    {featuredPost.author}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FiCalendar className="w-4 h-4" />
                                                    {featuredPost.date}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3">
                                                <button 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleLike(featuredPost.id);
                                                    }}
                                                    className={`p-2 rounded-full transition-all hover-bounce ${
                                                        likedPosts.includes(featuredPost.id) 
                                                            ? 'bg-red-500 text-white' 
                                                            : 'bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white'
                                                    }`}
                                                >
                                                    <FiHeart className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-full bg-gray-700 text-gray-400 hover:bg-blue-500 hover:text-white transition-all hover-bounce">
                                                    <FiShare2 className="w-4 h-4" />
                                                </button>
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
            <section className="max-w-7xl mx-auto px-4 py-12">
                {/* Results Info */}
                <div className="flex justify-between items-center mb-8 animate-slideInFromLeft">
                    <h2 className="text-3xl font-bold gradient-text">
                        {search || activeCategory !== 'Tất cả' ? 'Kết quả tìm kiếm' : 'Tất cả bài viết'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <p className="text-gray-400">
                            {filtered.length} bài viết
                        </p>
                        <div className="w-px h-6 bg-gray-600"></div>
                        <div className="text-sm text-gray-400">
                            Trang {currentPage + 1} / {pageCount}
                        </div>
                    </div>
                </div>

                {/* Posts Grid */}
                {pagedPosts.length > 0 ? (
                    <div 
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                    >
                        {pagedPosts.map((post, index) => {
                            const isVisible = visibleItems[index];
                            const isLiked = likedPosts.includes(post.id);
                            
                            return (
                                <div
                                    key={post.id}
                                    className={`hover-lift transform transition-all duration-700 ${
                                        isVisible 
                                            ? 'opacity-100 translate-y-0 scale-100' 
                                            : 'opacity-0 translate-y-10 scale-95'
                                    }`}
                                    style={{ 
                                        transitionDelay: `${index * 100}ms`,
                                        transitionDuration: '700ms'
                                    }}
                                >
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="group block bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 relative hover-glow"
                                    >
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
                                        
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Category badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-blue-500/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                                                    {post.category}
                                                </span>
                                            </div>
                                            
                                            {/* Views */}
                                            <div className="absolute top-4 right-4">
                                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                                                    <FiEye className="w-3 h-3" />
                                                    {post.views || 0}
                                                </div>
                                            </div>

                                            {/* Reading time */}
                                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                                                    <FiClock className="w-3 h-3" />
                                                    3 phút
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-6 relative z-20">
                                            <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            
                                            <p className="text-gray-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <FiUser className="w-3 h-3" />
                                                        {post.author}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FiCalendar className="w-3 h-3" />
                                                        {post.date}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            toggleLike(post.id);
                                                        }}
                                                        className={`p-1.5 rounded-full transition-all hover-bounce ${
                                                            isLiked 
                                                                ? 'bg-red-500 text-white animate-heartbeat' 
                                                                : 'bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white'
                                                        }`}
                                                    >
                                                        <FiHeart className="w-3 h-3" />
                                                    </button>
                                                    <button className="p-1.5 rounded-full bg-gray-700 text-gray-400 hover:bg-blue-500 hover:text-white transition-all hover-bounce">
                                                        <FiShare2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16 animate-fadeIn">
                        <div className="text-gray-400 mb-6">
                            <FiSearch className="w-16 h-16 mx-auto mb-4 opacity-50 animate-float" />
                            <h3 className="text-xl font-semibold mb-2 animate-slideInFromBottom">Không tìm thấy bài viết</h3>
                            <p className="animate-slideInFromBottom animate-stagger-1">Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác</p>
                        </div>
                        <button
                            onClick={() => {
                                setSearch('');
                                setActiveCategory('Tất cả');
                                setCurrentPage(0);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 animate-bounceIn hover-bounce"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="flex justify-center animate-slideInFromBottom">
                        <ReactPaginate
                            previousLabel="‹ Trước"
                            nextLabel="Sau ›"
                            breakLabel="..."
                            pageCount={pageCount}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={2}
                            onPageChange={({ selected }) => setCurrentPage(selected)}
                            containerClassName="flex items-center space-x-2"
                            pageLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm hover-bounce"
                            activeLinkClassName="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 animate-heartbeat"
                            previousLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm hover-bounce"
                            nextLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm hover-bounce"
                            disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-gray-800 hover:border-gray-600"
                            forcePage={currentPage}
                        />
                    </div>
                )}
            </section>
        </div>
    );
}
