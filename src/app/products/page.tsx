// Bản cập nhật UI có chú thích giải thích hiệu ứng hover cho từng thành phần sản phẩm
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import { getAllProducts } from '@/services/productService';
import { Range } from 'react-range';
import type { Product } from '@/types/product';
import Link from 'next/link';

const STEP = 1;
const MIN = 0;
const MAX = 300;

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([MIN, MAX]);
    const [sortOption, setSortOption] = useState<'az' | 'za' | 'priceAsc' | 'priceDesc'>('az');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        }
        fetchProducts();
    }, []);

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            p.price >= priceRange[0] &&
            p.price <= priceRange[1]
    );
    const sorted = [...filtered].sort((a, b) => {
        switch (sortOption) {
            case 'az':
                return a.name.localeCompare(b.name);
            case 'za':
                return b.name.localeCompare(a.name);
            case 'priceAsc':
                return a.price - b.price;
            case 'priceDesc':
                return b.price - a.price;
        }
    });

    const pageCount = Math.ceil(sorted.length / itemsPerPage);
    const offset = (currentPage - 1) * itemsPerPage;
    const displayed = sorted.slice(offset, offset + itemsPerPage);
    const handlePageClick = ({ selected }: { selected: number }) => setCurrentPage(selected + 1);

    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
            {/* Hiệu ứng hover và style cho từng phần sản phẩm */}
            <style jsx>{`
                /* 1. Thẻ sản phẩm - hiệu ứng nổi và bóng đổ khi hover */
                .product-card {
                    transition:
                        transform 0.22s cubic-bezier(0.33, 1.02, 0.42, 0.99),
                        box-shadow 0.22s;
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.14);
                }
                .product-card:hover {
                    transform: translateY(-8px) scale(1.025) rotateZ(-1deg); /* Dịch lên, phóng to nhẹ, xoay nhẹ */
                    box-shadow:
                        0 8px 32px 0 rgba(0, 123, 255, 0.2),
                        0 2px 12px 0 rgba(0, 0, 0, 0.16); /* Đổ bóng mạnh hơn */
                    border-color: #3b82f6;
                    background: linear-gradient(
                        90deg,
                        #1e293b 60%,
                        #1d4ed8 100%
                    ); /* Chuyển nền khi hover */
                }
                /* 2. Ảnh sản phẩm - làm sáng và nổi bật khi hover */
                .product-card:hover .product-image {
                    filter: brightness(1.13) saturate(1.1) drop-shadow(0 8px 24px #2563eb44);
                }
                /* 3. Nút xem chi tiết - chuyển gradient khi hover */
                .product-card .see-detail {
                    transition: background 0.2s;
                }
                .product-card:hover .see-detail {
                    background: linear-gradient(90deg, #2563eb, #3b82f6);
                }
                /* 4. Danh sách tính năng - chuyển màu khi hover */
                .product-card .feature-list {
                    transition: color 0.2s;
                }
                .product-card:hover .feature-list {
                    color: #dbeafe;
                }
            `}</style>
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-8 items-start">
                    {/* Sidebar Lọc */}
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
                            <label className="block text-sm font-medium mb-2">
                                Khoảng giá: ${priceRange[0].toFixed(2)} - $
                                {priceRange[1].toFixed(2)}
                            </label>
                            <div className="px-2 pt-4 pb-2">
                                <Range
                                    values={priceRange}
                                    step={STEP}
                                    min={MIN}
                                    max={MAX}
                                    onChange={(vals) => setPriceRange([vals[0], vals[1]])}
                                    renderTrack={({ props, children }) => {
                                        return (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '8px',
                                                    width: '100%',
                                                    background: `linear-gradient(to right, #4b5563 0%, #3b82f6 ${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%, #2563eb ${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%, #2563eb ${((priceRange[1] - MIN) / (MAX - MIN)) * 100}%, #4b5563 100%)`,
                                                    borderRadius: '6px',
                                                    marginTop: '12px'
                                                }}
                                            >
                                                {children}
                                            </div>
                                        );
                                    }}
                                    renderThumb={({ props, index }) => {
                                        const { key, ...restProps } = props; // destructure key out
                                        return (
                                            <div
                                                key={key}
                                                {...restProps}
                                                style={{
                                                    ...restProps.style,
                                                    height: '24px',
                                                    width: '24px',
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        index === 0 ? '#3b82f6' : '#2563eb',
                                                    border: '3px solid white',
                                                    boxShadow: '0 2px 6px #00000033',
                                                    marginTop: '-8px',
                                                    cursor: 'pointer',
                                                    zIndex: 2
                                                }}
                                            />
                                        );
                                    }}
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>${priceRange[0].toFixed(2)}</span>
                                    <span>${priceRange[1].toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Sắp xếp theo</label>
                            <select
                                value={sortOption}
                                onChange={(e) =>
                                    setSortOption(
                                        e.target.value as 'az' | 'za' | 'priceAsc' | 'priceDesc'
                                    )
                                }
                                className="w-full bg-gray-700 p-2 rounded"
                            >
                                <option value="az">Tên A-Z</option>
                                <option value="za">Tên Z-A</option>
                                <option value="priceAsc">Giá thấp đến cao</option>
                                <option value="priceDesc">Giá cao đến thấp</option>
                            </select>
                        </div>
                    </aside>
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm">
                                Hiển thị <span className="font-semibold">{displayed.length}</span>{' '}
                                trên <span className="font-semibold">{sorted.length}</span> sản phẩm
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayed.map((p) => (
                                <div
                                    key={p.id}
                                    className="product-card flex flex-col h-full bg-gray-800 p-4 rounded-lg border border-gray-800"
                                >
                                    {/* 2. Ảnh sản phẩm với hiệu ứng sáng hơn khi hover */}
                                    <Image
                                        src={p.images[0]}
                                        alt={p.name}
                                        width={400}
                                        height={192}
                                        className="product-image h-48 w-full object-cover rounded mb-4"
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '0.5rem',
                                            marginBottom: '1rem'
                                        }}
                                        priority={true}
                                    />
                                    <h3 className="font-semibold text-lg mb-2">{p.name}</h3>
                                    <div className="flex items-center mb-2">
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <svg
                                                    key={i}
                                                    viewBox="0 0 20 20"
                                                    className={`w-4 h-4 fill-current ${i < Math.round(p.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                                                >
                                                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.954L10 0l2.95 5.956 6.562.954-4.756 4.635L15.878 18z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-400 ml-2">
                                            ({p.reviewsCount})
                                        </span>
                                    </div>
                                    <div className="font-bold text-xl mb-4">
                                        ${p.price.toFixed(2)}
                                    </div>
                                    {/* 4. Danh sách tính năng với hiệu ứng đổi màu khi hover thẻ cha */}
                                    <ul className="feature-list text-sm text-gray-300 mb-4 space-y-1 flex-1">
                                        {p.features.map((f, idx) => (
                                            <li key={idx}>• {f}</li>
                                        ))}
                                    </ul>
                                    {/* 3. Nút xem chi tiết với hiệu ứng gradient mạnh hơn khi hover thẻ cha */}
                                    <Link
                                        href={`/productDetail/${p.id}`}
                                        className="see-detail mt-auto block text-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 py-2 rounded text-white"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {/* Hiện phân trang chỉ nếu sản phẩm >= 7 */}
                        {sorted.length >= 7 && (
                            <ReactPaginate
                                previousLabel="‹ Prev"
                                nextLabel="Next ›"
                                breakLabel="..."
                                pageCount={pageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageClick}
                                containerClassName="flex justify-center space-x-2 mt-8"
                                pageLinkClassName="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                                activeLinkClassName="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                                previousLinkClassName="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                                nextLinkClassName="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                                forcePage={currentPage - 1}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
