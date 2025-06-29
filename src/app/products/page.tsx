'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';

import { products } from '@/data/api/products';

const ProductsPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [sortOption, setSortOption] = useState<'az' | 'za' | 'priceAsc' | 'priceDesc'>('az');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Lọc theo từ khóa tìm kiếm
    const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    // Sắp xếp
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
            default:
                return 0;
        }
    });

    // Phân trang
    const pageCount = Math.ceil(sorted.length / itemsPerPage);
    const offset = (currentPage - 1) * itemsPerPage;
    const displayed = sorted.slice(offset, offset + itemsPerPage);
    const handlePageClick = ({ selected }: { selected: number }) => setCurrentPage(selected + 1);

    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
            <style jsx>{`
                .product-card {
                    transition:
                        transform 0.22s cubic-bezier(0.33, 1.02, 0.42, 0.99),
                        box-shadow 0.22s;
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.14);
                }
                .product-card:hover {
                    transform: translateY(-8px) scale(1.025) rotateZ(-1deg);
                    box-shadow:
                        0 8px 32px 0 rgba(0, 123, 255, 0.2),
                        0 2px 12px 0 rgba(0, 0, 0, 0.16);
                    border-color: #3b82f6;
                    background: linear-gradient(90deg, #1e293b 60%, #1d4ed8 100%);
                }
                .product-card:hover .product-image {
                    filter: brightness(1.13) saturate(1.1) drop-shadow(0 8px 24px #2563eb44);
                }
                .product-card .see-detail {
                    transition: background 0.2s;
                }
                .product-card:hover .see-detail {
                    background: linear-gradient(90deg, #2563eb, #3b82f6);
                }
                .product-card .feature-list {
                    transition: color 0.2s;
                }
                .product-card:hover .feature-list {
                    color: #dbeafe;
                }
            `}</style>

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
                                    <Image
                                        src={p.images?.[0] ?? '/placeholder.png'}
                                        alt={p.name}
                                        width={400}
                                        height={192}
                                        className="product-image h-48 w-full object-cover rounded mb-4"
                                        priority
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
                                    <ul className="feature-list text-sm text-gray-300 mb-4 space-y-1 flex-1">
                                        {p.features.map((f, idx) => (
                                            <li key={idx}>• {f}</li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`/productDetail/${p.id}`}
                                        className="see-detail mt-auto block text-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 py-2 rounded text-white"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {sorted.length >= itemsPerPage + 1 && (
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
