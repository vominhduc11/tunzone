'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { products } from '@/data/api/products';
import { Transition } from '@headlessui/react';

const ProductsPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [sortOption, setSortOption] = useState<'az' | 'za' | 'priceAsc' | 'priceDesc'>('az');
    const [currentPage, setCurrentPage] = useState(1);
    const [compareList, setCompareList] = useState<number[]>([]);
    const itemsPerPage = 6;

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
        <div className="min-h-screen pb-32 bg-gray-900 text-white py-12 px-4">
            {/* Product Filters and List */}
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-8 items-start">
                    <aside className="w-72 bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-6">Bộ lọc sản phẩm</h2>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Tìm kiếm</label>
                            <input
                                type="text"
                                className="w-full bg-gray-700 p-2 rounded"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Sắp xếp theo</label>
                            <select
                                className="w-full bg-gray-700 p-2 rounded"
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
                    </aside>
                    <div className="flex-1">
                        <p className="text-sm mb-4">
                            Hiển thị <span className="font-semibold">{displayed.length}</span> trên{' '}
                            <span className="font-semibold">{sorted.length}</span> sản phẩm
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayed.map((p) => {
                                const isCompared = compareList.includes(p.id);
                                const canCompareMore = isCompared || compareList.length < 5;
                                return (
                                    <div
                                        key={p.id}
                                        className="product-card flex flex-col h-full bg-gray-800 p-4 rounded-lg border border-gray-800 transition-transform hover:scale-[1.02]"
                                    >
                                        <Image
                                            src={p.images?.[0] ?? '/placeholder.png'}
                                            alt={p.name}
                                            width={400}
                                            height={192}
                                            className="h-48 w-full object-cover rounded mb-4"
                                        />
                                        <h3 className="font-semibold text-lg mb-2">{p.name}</h3>
                                        <ul className="flex-1 text-sm text-gray-300 mb-4 space-y-1">
                                            {p.features.map((f, i) => (
                                                <li key={i}>• {f}</li>
                                            ))}
                                        </ul>
                                        <div className="flex space-x-3 mt-auto">
                                            <Link
                                                href={`/productDetail/${p.id}`}
                                                className="flex-1 bg-blue-600 py-2 rounded text-center hover:bg-blue-700 transition"
                                            >
                                                Xem chi tiết
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    canCompareMore && toggleCompare(p.id)
                                                }
                                                disabled={!canCompareMore}
                                                className={`flex-1 text-center py-2 rounded transition ${isCompared ? 'bg-green-600 hover:bg-green-500' : canCompareMore ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-700 cursor-not-allowed'}`}
                                            >
                                                {isCompared ? 'Bỏ so sánh' : 'So sánh'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {pageCount > 1 && (
                            <ReactPaginate
                                previousLabel="‹"
                                nextLabel="›"
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName="flex justify-center space-x-2 mt-8"
                                pageLinkClassName="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
                                activeLinkClassName="bg-blue-600 text-white"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR for Comparison */}
            <Transition
                as={Fragment}
                show={compareList.length > 0}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-2xl rounded-xl p-3 max-w-3xl w-[calc(100%-2rem)]">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-300">
                            Đã chọn {compareList.length}/5
                        </span>
                        <Swiper spaceBetween={12} slidesPerView={'auto'} className="flex-1">
                            {comparedProducts.map((p) => (
                                <SwiperSlide key={p.id} style={{ width: '72px' }}>
                                    <div className="relative w-16 h-16">
                                        <Image
                                            src={p.images?.[0] ?? '/placeholder.png'}
                                            alt={p.name}
                                            fill
                                            className="object-cover rounded-lg border-2 border-gray-600"
                                        />
                                        <button
                                            onClick={() => toggleCompare(p.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-400 text-white w-5 h-5 flex items-center justify-center rounded-full"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Link
                            href={`/compare?compare=${compareList.join(',')}`}
                            className="ml-2 bg-cyan-500 hover:bg-cyan-400 text-gray-900 py-2 px-5 rounded-full font-medium shadow-lg transition"
                        >
                            Xem so sánh
                        </Link>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default ProductsPage;
