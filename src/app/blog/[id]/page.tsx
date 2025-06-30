'use client';
import { use } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    FaShareAlt,
    FaRegCopy,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaWhatsapp,
    FaPaperPlane,
    FaQrcode
} from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react'; // bạn cần cài đặt react QRCode
import SharedModal from '@/components/shared/SharedModal';
import { motion } from 'framer-motion';
import { blogs } from '@/data/api/blogs';
import { fadeSlideConfig } from './_configs/config';

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [isShareOpen, setShareOpen] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);

    const post = blogs.find((b) => b.id === Number(id));
    if (!post) {
        return <p className="p-8 text-center text-blue-300">Bài viết không tồn tại.</p>;
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`;
    const zaloUrl = `https://zalo.me/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.title + ' ' + shareUrl)}`;

    // Copy link to clipboard
    const copyLink = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setShareOpen(false);
        alert('Đã sao chép link!');
    };

    return (
        <>
            <main className="min-h-screen bg-gray-900 text-gray-100 px-4 py-8">
                <div className="w-full max-w-[1280px] mx-auto space-y-6">
                    {/* Top bar: Back + Share */}
                    <div className="flex justify-between items-center mb-4">
                        <Link
                            href="/blog"
                            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                            ← Quay lại
                        </Link>
                        <button
                            onClick={() => setShareOpen(true)}
                            className="flex items-center text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-110 duration-200 focus:outline-none"
                        >
                            <FaShareAlt className="mr-2" /> Chia sẻ
                        </button>
                    </div>

                    {/* Header */}
                    <header className="space-y-2">
                        <span className="inline-block bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-xs font-semibold px-3 py-1 rounded-full">
                            {post.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight hover:text-blue-400 transition-colors duration-200">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <span>✍️ {post.author}</span>
                            <span>📅 {post.date}</span>
                            <span>👁️ {post.views} lượt xem</span>
                            <span>⏱️ {post.date}</span>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg group">
                        <Image
                            src={post.image}
                            alt={`Ảnh minh họa: ${post.title}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* Content */}
                    <section className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <article className="prose prose-invert leading-relaxed max-w-none">
                            {post.content?.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </article>
                    </section>
                </div>
            </main>

            {/* SharedModal dùng chung toàn dự án */}
            <SharedModal
                isOpen={isShareOpen}
                onClose={() => setShareOpen(false)}
                contentLabel="Chia sẻ bài viết"
            >
                <motion.div
                    {...fadeSlideConfig}
                    className="bg-gray-800 p-6 rounded-lg max-w-md w-full space-y-4 text-gray-100"
                >
                    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full space-y-4 text-gray-100">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Chia sẻ bài viết</h2>
                            <button
                                onClick={() => setShareOpen(false)}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>
                        <button
                            onClick={copyLink}
                            className="flex items-center w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                        >
                            <FaRegCopy className="mr-2" /> Sao chép liên kết
                        </button>
                        <span className="block text-gray-400">Chia sẻ lên mạng xã hội</span>
                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href={facebookUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                            >
                                <FaFacebookF className="mr-2" /> Facebook
                            </a>
                            <a
                                href={twitterUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded"
                            >
                                <FaTwitter className="mr-2" /> Twitter
                            </a>
                            <a
                                href={linkedInUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded"
                            >
                                <FaLinkedinIn className="mr-2" /> LinkedIn
                            </a>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
                            >
                                <FaWhatsapp className="mr-2" /> WhatsApp
                            </a>
                            <a
                                href={zaloUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded"
                            >
                                Zalo
                            </a>
                            <a
                                href={mailtoUrl}
                                className="flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded"
                            >
                                <FaPaperPlane className="mr-2" /> Gửi qua Email
                            </a>
                        </div>
                        <button
                            onClick={() => setShowQRCode(!showQRCode)}
                            className="flex items-center w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                        >
                            <FaQrcode className="mr-2" /> Hiển thị QR Code
                        </button>
                        {showQRCode && (
                            <div className="flex justify-center p-4 bg-gray-700 rounded">
                                <QRCodeCanvas
                                    value={shareUrl}
                                    size={120}
                                    bgColor="#374151"
                                    fgColor="#f3f4f6"
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            </SharedModal>
        </>
    );
}
