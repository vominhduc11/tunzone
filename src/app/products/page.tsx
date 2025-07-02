'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FiSearch, FiFilter, FiEye, FiPlus, FiCheck, FiStar, FiTrendingUp } from 'react-icons/fi';

import { products } from '@/data/api/products';
import { Transition } from '@headlessui/react';
import { getCompareListTransition } from './_configs/config';
import { useScrollAnimation, useStaggeredAnimation, useCountUp } from '@/hooks/useScrollAnimation';

const ProductsPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [sortOption, setSortOption] = useState<'az' | 'za' | 'priceAsc' | 'priceDesc'>('az');
    const [currentPage, setCurrentPage] = useState(1);
    const [compareList, setCompareList] = useState<number[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const itemsPerPage = 9;

    // Animation hooks
    const headerAnimation = useScrollAnimation({ threshold: 0.2 });
    const statsAnimation = useScrollAnimation({ threshold: 0.3 });
    const { containerRef: gridRef, visibleItems } = useStaggeredAnimation(itemsPerPage, 150);
    const { elementRef: countRef, count: productCount } = useCountUp(products.length, 2000);

    const toggleCompare = (id: number) => {
        setCompareList(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : prev.length < 5 
                    ? [...prev, id]
                    : prev
        );
    };

    // Lọc và sắp xếp sản phẩm
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
        switch (sortOption) {
            case 'az':
                return a.name.localeCompare(b.name);
            case 'za':
                return b.name.localeCompare(a.name);
            case 'priceAsc':
                return (a.price ?? 0) - (b.price ?? 0);
            case 'priceDesc':
                return (b.price ?? 0) - (a.price ?? 0);
        }
    });

    // Phân trang
    const pageCount = Math.ceil(sorted.length / itemsPerPage);
    const displayed = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handlePageClick = ({ selected }: { selected: number }) => setCurrentPage(selected + 1);

    const comparedProducts = compareList
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as typeof products;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header Section with Enhanced Animation */}
            <div 
                ref={headerAnimation.elementRef}
                className={`bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-20 animate-gradientShift relative overflow-hidden transition-all duration-1000 ${
                    headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-float"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-indigo-400 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center">
                        <h1 className={`text-5xl md:text-7xl font-bold mb-6 gradient-text transition-all duration-1000 delay-300 ${
                            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                        }`}>
                            Sản phẩm TuneZone
                        </h1>
                        <p className={`text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            Khám phá bộ sưu tập âm thanh chất lượng cao với công nghệ tiên tiến nhất
                        </p>
                        
                        {/* Stats Section */}
                        <div 
                            ref={statsAnimation.elementRef}
                            className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-700 ${
                                statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full">
                                <div className="flex items-center justify-center gap-2">
                                    <FiTrendingUp className="w-4 h-4 text-green-400" />
                                    <span ref={countRef} className="text-lg font-bold">{productCount}</span>
                                    <span className="text-sm">Sản phẩm</span>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full">
                                <div className="flex items-center justify-center gap-2">
                                    <FiStar className="w-4 h-4 text-yellow-400" />
                                    <span className="text-lg font-bold">4.8</span>
                                    <span className="text-sm">Đánh giá</span>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-sm font-medium">Có sẵn ngay</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 animate-slideInFromLeft hover-bounce"
                    >
                        <FiFilter />
                        Bộ lọc & Tìm kiếm
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`w-full lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg sticky top-4 animate-slideInFromLeft hover-glow">
                            <h3 className="text-lg font-semibold mb-6 text-blue-400 animate-fadeInDown">Tìm kiếm & Lọc</h3>
                            
                            {/* Search */}
                            <div className="mb-6 animate-fadeInUp animate-stagger-1">
                                <label className="block text-sm font-medium mb-2">Tìm kiếm sản phẩm</label>
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Nhập tên sản phẩm..."
                                        className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shimmer-effect"
                                    />
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div className="mb-6 animate-fadeInUp animate-stagger-2">
                                <label className="block text-sm font-medium mb-2">Sắp xếp theo</label>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
                                    className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="az">Tên A-Z</option>
                                    <option value="za">Tên Z-A</option>
                                    <option value="priceAsc">Giá thấp đến cao</option>
                                    <option value="priceDesc">Giá cao đến thấp</option>
                                </select>
                            </div>

                            {/* Results Summary */}
                            <div className="bg-gray-700 p-4 rounded-lg animate-fadeInUp animate-stagger-3 hover-lift">
                                <p className="text-sm text-gray-300">
                                    <span className="font-semibold text-white animate-heartbeat">{sorted.length}</span> sản phẩm được tìm thấy
                                </p>
                                {compareList.length > 0 && (
                                    <p className="text-sm text-blue-400 mt-2 animate-bounceIn">
                                        Đã chọn {compareList.length}/5 sản phẩm để so sánh
                                    </p>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Results Info */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 animate-slideInFromRight">
                            <p className="text-gray-300">
                                Hiển thị <span className="font-semibold text-white">{displayed.length}</span> trên{' '}
                                <span className="font-semibold text-white">{sorted.length}</span> sản phẩm
                            </p>
                            <div className="text-sm text-gray-400">
                                Trang {currentPage} / {pageCount}
                            </div>
                        </div>

                        {/* Products Grid */}
                        {displayed.length > 0 ? (
                            <div 
                                ref={gridRef}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                            >
                                {displayed.map((p, index) => {
                                    const isCompared = compareList.includes(p.id);
                                    const canCompareMore = isCompared || compareList.length < 5;
                                    const isVisible = visibleItems[index];
                                    
                                    return (
                                        <div
                                            key={p.id}
                                            className={`group bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-[1.03] border border-gray-700 hover:border-blue-500/50 relative hover-lift hover-glow transform ${
                                                isVisible 
                                                    ? 'opacity-100 translate-y-0 scale-100' 
                                                    : 'opacity-0 translate-y-10 scale-95'
                                            }`}
                                            style={{ 
                                                transitionDelay: `${index * 150}ms`,
                                                transitionDuration: '700ms'
                                            }}
                                        >
                                            {/* Product Image */}
                                            <div className="relative overflow-hidden">
                                                <Image
                                                    src={p.images?.[0] ?? '/placeholder.png'}
                                                    alt={p.name}
                                                    width={400}
                                                    height={240}
                                                    className="h-60 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                
                                                {/* Category Badge */}
                                                <div className="absolute top-4 left-4 animate-bounceIn">
                                                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium shimmer-effect">
                                                        Audio Premium
                                                    </span>
                                                </div>

                                                {/* Rating Badge */}
                                                <div className="absolute top-4 right-4 animate-bounceIn" style={{animationDelay: '0.2s'}}>
                                                    <div className="flex items-center gap-1 bg-yellow-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                                        <FiStar className="w-3 h-3 fill-current" />
                                                        <span>4.8</span>
                                                    </div>
                                                </div>

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <div className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                            Nhấn để xem chi tiết
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors animate-fadeInUp">
                                                    {p.name}
                                                </h3>
                                                
                                                <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed animate-fadeInUp animate-stagger-1">
                                                    {p.description}
                                                </p>

                                                {p.price && (
                                                    <div className="mb-6 animate-zoomIn animate-stagger-2">
                                                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradientShift">
                                                            {p.price.toLocaleString('vi-VN')}₫
                                                        </span>
                                                        <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                                            <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                                                            Miễn phí vận chuyển
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="space-y-3 animate-fadeInUp animate-stagger-3">
                                                    <Link
                                                        href={`/productDetail/${p.id}`}
                                                        className="group/btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3.5 px-4 rounded-xl text-center font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2 hover-bounce relative overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                                                        <FiEye className="w-4 h-4 group-hover/btn:scale-110 transition-transform relative z-10" />
                                                        <span className="relative z-10">Xem chi tiết</span>
                                                    </Link>
                                                    
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            canCompareMore && toggleCompare(p.id)
                                                        }
                                                        disabled={!canCompareMore}
                                                        className={`group/compare w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border-2 flex items-center justify-center gap-2 hover-bounce relative overflow-hidden ${
                                                            isCompared 
                                                                ? 'bg-green-500/10 border-green-500 text-green-400 hover:bg-green-500/20 animate-heartbeat' 
                                                                : canCompareMore 
                                                                    ? 'bg-transparent border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5' 
                                                                    : 'bg-transparent border-gray-700 text-gray-500 cursor-not-allowed'
                                                        }`}
                                                        title={!canCompareMore ? 'Chỉ có thể so sánh tối đa 5 sản phẩm' : ''}
                                                    >
                                                        {canCompareMore && (
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover/compare:translate-x-full transition-transform duration-700"></div>
                                                        )}
                                                        {isCompared ? (
                                                            <>
                                                                <FiCheck className="w-4 h-4 group-hover/compare:scale-110 transition-transform relative z-10" />
                                                                <span className="relative z-10">Đã thêm vào so sánh</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FiPlus className="w-4 h-4 group-hover/compare:scale-110 transition-transform relative z-10" />
                                                                <span className="relative z-10">Thêm vào so sánh</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16 animate-fadeIn">
                                <div className="text-gray-400 mb-6">
                                    <FiSearch className="w-16 h-16 mx-auto mb-4 opacity-50 animate-float" />
                                    <h3 className="text-xl font-semibold mb-2 animate-slideInFromBottom">Không tìm thấy sản phẩm</h3>
                                    <p className="animate-slideInFromBottom animate-stagger-1">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc khác</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSearch('');
                                        setSortOption('az');
                                        setCurrentPage(1);
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
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName="flex items-center space-x-2"
                                    pageLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm hover-bounce"
                                    activeLinkClassName="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 animate-heartbeat"
                                    previousLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm hover-bounce"
                                    nextLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm hover-bounce"
                                    disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-gray-800 hover:border-gray-600"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Comparison Bottom Bar */}
            <Transition {...getCompareListTransition(compareList)}>
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideInFromBottom">
                    <div className="bg-gray-800 bg-opacity-95 backdrop-blur-lg shadow-2xl rounded-2xl p-4 max-w-4xl w-[calc(100vw-2rem)] border border-gray-600 hover-glow">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="text-sm animate-fadeIn">
                                    <span className="text-gray-300">Đã chọn </span>
                                    <span className="font-semibold text-white animate-heartbeat">{compareList.length}/5</span>
                                    <span className="text-gray-300"> sản phẩm</span>
                                </div>
                                
                                {/* Product Thumbnails */}
                                <div className="flex items-center gap-2">
                                    <Swiper 
                                        slidesPerView="auto"
                                        spaceBetween={8}
                                        className="w-full max-w-md"
                                    >
                                        {comparedProducts.map((product, index) => (
                                            <SwiperSlide key={product.id} className="!w-auto">
                                                <div className={`relative group animate-bounceIn`} style={{animationDelay: `${index * 0.1}s`}}>
                                                    <Image
                                                        src={product.images?.[0] ?? '/placeholder.png'}
                                                        alt={product.name}
                                                        width={48}
                                                        height={48}
                                                        className="w-12 h-12 object-cover rounded-lg border-2 border-blue-500 hover-scale"
                                                    />
                                                    <button
                                                        onClick={() => toggleCompare(product.id)}
                                                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover-bounce"
                                                        title="Xóa khỏi so sánh"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCompareList([])}
                                    className="text-gray-400 hover:text-white text-sm transition hover-bounce"
                                >
                                    Xóa tất cả
                                </button>
                                <Link
                                    href={`/compare?compare=${compareList.join(',')}`}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-6 rounded-full font-medium shadow-lg transition-all duration-200 hover:shadow-xl animate-gradientShift hover-bounce relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                                    <span className="relative z-10">So sánh ngay</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default ProductsPage;
