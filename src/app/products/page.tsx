'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FiSearch, FiFilter, FiEye, FiPlus, FiCheck } from 'react-icons/fi';

import { products } from '@/data/api/products';
import { Transition } from '@headlessui/react';
import { getCompareListTransition } from './_configs/config';

const ProductsPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [sortOption, setSortOption] = useState<'az' | 'za' | 'priceAsc' | 'priceDesc'>('az');
    const [currentPage, setCurrentPage] = useState(1);
    const [compareList, setCompareList] = useState<number[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 9;

    // Toggle so sánh, chỉ cho phép tối đa 5 sản phẩm
    const toggleCompare = (id: number) => {
        setCompareList((prev) => {
            const included = prev.includes(id);
            if (included) {
                // Bỏ so sánh
                return prev.filter((item) => item !== id);
            }
            // Nếu chưa bao gồm và đã đủ 5, không thêm
            if (prev.length >= 5) {
                return prev;
            }
            // Thêm vào danh sách
            return [...prev, id];
        });
    };

    const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    const sorted = [...filtered].sort((a, b) => {
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

    const pageCount = Math.ceil(sorted.length / itemsPerPage);
    const displayed = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handlePageClick = ({ selected }: { selected: number }) => setCurrentPage(selected + 1);

    const comparedProducts = compareList
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as typeof products;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Sản phẩm TuneZone
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Khám phá bộ sưu tập âm thanh chất lượng cao với công nghệ tiên tiến nhất
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        <FiFilter />
                        Bộ lọc & Tìm kiếm
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`w-full lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg sticky top-4">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <FiFilter className="text-blue-400" />
                                Bộ lọc sản phẩm
                            </h2>
                            
                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-3 text-gray-300">
                                    Tìm kiếm sản phẩm
                                </label>
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        className="w-full bg-gray-700 border border-gray-600 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
                                        placeholder="Nhập tên sản phẩm..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-3 text-gray-300">
                                    Sắp xếp theo
                                </label>
                                <select
                                    className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
                                    value={sortOption}
                                    onChange={(e) =>
                                        setSortOption(
                                            e.target.value as 'az' | 'za' | 'priceAsc' | 'priceDesc'
                                        )
                                    }
                                >
                                    <option value="az">Tên A-Z</option>
                                    <option value="za">Tên Z-A</option>
                                    <option value="priceAsc">Giá thấp đến cao</option>
                                    <option value="priceDesc">Giá cao đến thấp</option>
                                </select>
                            </div>

                            {/* Results Summary */}
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-sm text-gray-300">
                                    <span className="font-semibold text-white">{sorted.length}</span> sản phẩm được tìm thấy
                                </p>
                                {compareList.length > 0 && (
                                    <p className="text-sm text-blue-400 mt-2">
                                        Đã chọn {compareList.length}/5 sản phẩm để so sánh
                                    </p>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Results Info */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {displayed.map((p) => {
                                    const isCompared = compareList.includes(p.id);
                                    const canCompareMore = isCompared || compareList.length < 5;
                                    return (
                                        <div
                                            key={p.id}
                                            className="group bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border border-gray-700 hover:border-blue-500/50 relative"
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
                                                
                                                {/* Overlay with quick actions */}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <Link
                                                        href={`/productDetail/${p.id}`}
                                                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                                                        title="Xem chi tiết sản phẩm"
                                                    >
                                                        <FiEye className="w-6 h-6" />
                                                    </Link>
                                                </div>

                                                {/* Status badges */}
                                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                                    {isCompared && (
                                                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                                                            <FiCheck className="w-3 h-3" />
                                                            Đã chọn
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-6">
                                                <h3 className="font-bold text-xl mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                                    {p.name}
                                                </h3>
                                                
                                                {/* Features */}
                                                <ul className="text-sm text-gray-300 mb-4 space-y-2">
                                                    {p.features.slice(0, 3).map((f, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-blue-400 mt-1 text-xs">●</span>
                                                            <span className="leading-relaxed">{f}</span>
                                                        </li>
                                                    ))}
                                                    {p.features.length > 3 && (
                                                        <li className="text-gray-400 text-xs italic">
                                                            và {p.features.length - 3} tính năng khác...
                                                        </li>
                                                    )}
                                                </ul>

                                                {/* Price */}
                                                {p.price && (
                                                    <div className="mb-6">
                                                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                            {p.price.toLocaleString('vi-VN')}₫
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="space-y-3">
                                                    <Link
                                                        href={`/productDetail/${p.id}`}
                                                        className="group/btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3.5 px-4 rounded-xl text-center font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
                                                    >
                                                        <FiEye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                        Xem chi tiết
                                                    </Link>
                                                    
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            canCompareMore && toggleCompare(p.id)
                                                        }
                                                        disabled={!canCompareMore}
                                                        className={`group/compare w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border-2 flex items-center justify-center gap-2 ${
                                                            isCompared 
                                                                ? 'bg-green-500/10 border-green-500 text-green-400 hover:bg-green-500/20' 
                                                                : canCompareMore 
                                                                    ? 'bg-transparent border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5' 
                                                                    : 'bg-transparent border-gray-700 text-gray-500 cursor-not-allowed'
                                                        }`}
                                                        title={!canCompareMore ? 'Chỉ có thể so sánh tối đa 5 sản phẩm' : ''}
                                                    >
                                                        {isCompared ? (
                                                            <>
                                                                <FiCheck className="w-4 h-4 group-hover/compare:scale-110 transition-transform" />
                                                                Đã thêm vào so sánh
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FiPlus className="w-4 h-4 group-hover/compare:scale-110 transition-transform" />
                                                                Thêm vào so sánh
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
                            <div className="text-center py-16">
                                <div className="text-gray-400 mb-6">
                                    <FiSearch className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <h3 className="text-xl font-semibold mb-2">Không tìm thấy sản phẩm</h3>
                                    <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc khác</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSearch('');
                                        setSortOption('az');
                                        setCurrentPage(1);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {pageCount > 1 && (
                            <div className="flex justify-center">
                                <ReactPaginate
                                    previousLabel="‹ Trước"
                                    nextLabel="Sau ›"
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName="flex items-center space-x-2"
                                    pageLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm"
                                    activeLinkClassName="bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                                    previousLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm"
                                    nextLinkClassName="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition text-sm"
                                    disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-gray-800 hover:border-gray-600"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Comparison Bottom Bar */}
            <Transition {...getCompareListTransition(compareList)}>
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-gray-800 bg-opacity-95 backdrop-blur-lg shadow-2xl rounded-2xl p-4 max-w-4xl w-[calc(100vw-2rem)] border border-gray-600">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="text-sm">
                                    <span className="text-gray-300">Đã chọn </span>
                                    <span className="font-semibold text-white">{compareList.length}/5</span>
                                    <span className="text-gray-300"> sản phẩm</span>
                                </div>
                                
                                {/* Product Thumbnails */}
                                <div className="flex items-center gap-2">
                                    <Swiper 
                                        spaceBetween={8} 
                                        slidesPerView={'auto'} 
                                        className="max-w-xs"
                                    >
                                        {comparedProducts.map((p) => (
                                            <SwiperSlide key={p.id} style={{ width: '60px' }}>
                                                <div className="relative group">
                                                    <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-gray-600 group-hover:border-gray-400 transition">
                                                        <Image
                                                            src={p.images?.[0] ?? '/placeholder.png'}
                                                            alt={p.name}
                                                            width={56}
                                                            height={56}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => toggleCompare(p.id)}
                                                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-400 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold transition shadow-lg"
                                                        title={`Bỏ ${p.name} khỏi danh sách so sánh`}
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
                                    className="text-gray-400 hover:text-white text-sm transition"
                                >
                                    Xóa tất cả
                                </button>
                                <Link
                                    href={`/compare?compare=${compareList.join(',')}`}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-6 rounded-full font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
                                >
                                    So sánh ngay
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
