import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

import { getLatestBlogs } from '@/services/postService';

export default async function BlogSection() {
    const blogs = await getLatestBlogs();

    return (
        <section className="bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                    Tin Tức & Cập Nhật
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="relative h-60">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="hover:scale-105 transform transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-400 mb-4">{blog.excerpt}</p>
                                <a
                                    // href={`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blog.id}`}
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
