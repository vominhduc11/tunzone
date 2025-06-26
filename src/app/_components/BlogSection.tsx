import React from 'react';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

const posts = [
    {
        id: 1,
        title: '5 Xu Hướng Mới Trong Kết Nối Biker Năm 2025',
        excerpt:
            'Khám phá các công nghệ và giải pháp mới nhất giúp việc liên lạc giữa các biker ngày càng an toàn và hiệu quả hơn.',
        image: '/blog/blog1.jpg',
        link: '/blog/xu-huong-ket-noi-2025'
    },
    {
        id: 2,
        title: 'Hướng Dẫn Chọn Thiết Bị Giải Pháp Thông Minh',
        excerpt:
            'Tìm hiểu cách lựa chọn thiết bị phù hợp với phong cách lái và nhu cầu cá nhân của bạn.',
        image: '/blog/blog2.jpg',
        link: '/blog/huong-dan-chon-thiet-bi'
    },
    {
        id: 3,
        title: 'Câu Chuyện Thành Công Của Đại Lý Tiêu Biểu',
        excerpt:
            'Lắng nghe chia sẻ từ các đại lý hàng đầu về cách họ phát triển doanh thu cùng chương trình hợp tác.',
        image: '/blog/blog3.jpg',
        link: '/blog/cau-chuyen-dai-ly'
    }
];

export default function BlogSection() {
    return (
        <section className="bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                    Tin Tức & Cập Nhật
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="hover:scale-105 transform transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                                <a
                                    href={post.link}
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                                >
                                    Đọc Thêm
                                    <FiArrowRight className="ml-2 w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
