// pages/blog/page.tsx với phân trang khi số bài viết > 9
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { blogs } from '@/data/api/blogs';

const categories = ['Tất cả', 'Gaming', 'Văn phòng', 'Sửa chữa', 'Hardware', 'Công nghệ'];

const ITEMS_PER_PAGE = 9;

export default function BlogPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [currentPage, setCurrentPage] = useState(0);

    // Lọc bài theo search và category
    const filtered = blogs.filter((p) => {
        const matchCat = activeCategory === 'Tất cả' || p.category === activeCategory;
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
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

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero + Search + Filter */}
            <section className="bg-gray-800 py-16">
                <div className="w-full max-w-[1280px] mx-auto text-center px-4">
                    <h1 className="text-4xl font-bold text-white mb-4">Blog Công Nghệ</h1>
                    <p className="text-gray-300 mb-8">
                        Khám phá những bài viết hữu ích về laptop, công nghệ và mẹo sử dụng thiết bị
                    </p>
                    {/* Search bar */}
                    <div className="relative max-w-lg mx-auto">
                        <FiSearch
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm bài viết..."
                            className="w-full bg-gray-700 text-gray-100 placeholder-gray-400 px-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Category pills */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${activeCategory === cat ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="w-full max-w-[1280px] mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pagedPosts.map((post) => (
                        <Link
                            href={`/blog/${post.id}`}
                            key={post.id}
                            className="group block bg-gray-800 rounded-lg overflow-hidden border border-transparent transition-all hover:border-blue-500 hover:shadow-lg hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover object-center transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <span className="inline-block text-xs font-semibold bg-blue-600 text-white px-2 py-1 rounded mb-2">
                                    {post.category}
                                </span>
                                <h2 className="text-2xl font-semibold text-white mb-2 leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span>{post.author}</span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {filtered.length === 0 && (
                    <p className="text-center text-gray-400 mt-12">Không tìm thấy bài viết nào.</p>
                )}
                {/* Phân trang chỉ hiển thị nếu có trên 9 bài */}
                {filtered.length > ITEMS_PER_PAGE && (
                    <ReactPaginate
                        previousLabel="‹ Prev"
                        nextLabel="Next ›"
                        breakLabel="..."
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName="flex justify-center space-x-2 mt-8"
                        pageLinkClassName="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                        activeLinkClassName="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                        previousLinkClassName="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                        nextLinkClassName="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                        forcePage={currentPage}
                    />
                )}
            </section>
        </div>
    );
}
