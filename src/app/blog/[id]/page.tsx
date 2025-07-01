'use client';
import { use } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    FiShare2,
    FiCopy,
    FiCalendar,
    FiUser,
    FiEye,
    FiClock,
    FiArrowLeft,
    FiBookmark,
    FiHeart,
    FiMessageCircle,
    FiChevronRight
} from 'react-icons/fi';
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaWhatsapp,
    FaPaperPlane,
    FaQrcode
} from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';
import SharedModal from '@/components/shared/SharedModal';
import { motion } from 'framer-motion';
import { blogs } from '@/data/api/blogs';
import { fadeSlideConfig } from './_configs/config';

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [isShareOpen, setShareOpen] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const post = blogs.find((b) => b.id === Number(id));
    
    if (!post) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h1 className="text-3xl font-bold mb-4">Bài viết không tồn tại</h1>
                    <p className="text-gray-400 mb-6">Không tìm thấy bài viết bạn đang tìm kiếm.</p>
                    <Link 
                        href="/blogs"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                    >
                        Quay lại danh sách blog
                    </Link>
                </div>
            </div>
        );
    }

    // Get related posts (same category, exclude current)
    const relatedPosts = blogs
        .filter(blog => blog.category === post.category && blog.id !== post.id)
        .slice(0, 3);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.title + ' ' + shareUrl)}`;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setShareOpen(false);
            // You might want to show a toast notification here
            alert('Đã sao chép link!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const estimatedReadTime = Math.ceil((post.content?.join(' ').length || 0) / 200);

    return (
        <>
            <main className="min-h-screen bg-gray-900 text-white">
                {/* Navigation Bar */}
                <div className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-700">
                    <div className="w-full max-w-[1280px] mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/blogs"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                            >
                                <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Quay lại blog
                            </Link>
                            
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={`p-2 rounded-full transition-colors ${
                                        isBookmarked ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
                                    }`}
                                    title={isBookmarked ? 'Bỏ lưu' : 'Lưu bài viết'}
                                >
                                    <FiBookmark className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setShareOpen(true)}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <FiShare2 className="w-4 h-4" />
                                    <span className="hidden sm:inline">Chia sẻ</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Header */}
                <header className="bg-gradient-to-b from-gray-800 to-gray-900 py-12">
                    <div className="w-full max-w-[1280px] mx-auto px-4">
                        <div className="space-y-6">
                            {/* Category & Reading Time */}
                            <div className="flex items-center gap-3">
                                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                                    {post.category}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400 text-sm">{estimatedReadTime} phút đọc</span>
                            </div>
                            
                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                {post.title}
                            </h1>
                            
                            {/* Excerpt */}
                            <p className="text-xl text-gray-300 leading-relaxed">
                                {post.excerpt}
                            </p>
                            
                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pt-6 border-t border-gray-700">
                                <div className="flex items-center gap-2">
                                    <FiUser className="w-4 h-4" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCalendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiEye className="w-4 h-4" />
                                    <span>{post.views.toLocaleString()} lượt xem</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="w-full max-w-[1280px] mx-auto px-4 py-8">
                    <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full max-w-[1280px] mx-auto px-4 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Article Content */}
                        <article className="lg:col-span-8">
                            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                                {/* Article Body */}
                                <div className="prose prose-lg prose-invert max-w-none">
                                    {post.content?.map((paragraph, idx) => (
                                        <p key={idx} className="mb-6 leading-relaxed text-gray-300 text-lg">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                                
                                {/* Article Footer Actions */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 mt-8 border-t border-gray-700">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setIsLiked(!isLiked)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                                isLiked 
                                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                                    : 'bg-gray-700/50 text-gray-400 hover:text-white border border-gray-600'
                                            }`}
                                        >
                                            <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                            <span className="hidden sm:inline">Thích</span>
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-400 hover:text-white rounded-lg transition-colors border border-gray-600">
                                            <FiMessageCircle className="w-4 h-4" />
                                            <span className="hidden sm:inline">Bình luận</span>
                                        </button>
                                    </div>
                                    
                                    <button
                                        onClick={() => setShareOpen(true)}
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        <FiShare2 className="w-4 h-4" />
                                        Chia sẻ bài viết
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-6">
                            {/* Author Card */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 sticky top-24">
                                <h3 className="font-semibold mb-4 text-white">Về tác giả</h3>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{post.author}</p>
                                        <p className="text-sm text-gray-400 mb-3">Chuyên gia âm thanh TuneZone</p>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            Với hơn 5 năm kinh nghiệm trong lĩnh vực âm thanh, chuyên về đánh giá và tư vấn các sản phẩm audio chất lượng cao.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                <h3 className="font-semibold mb-4 text-white">Thống kê bài viết</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Lượt xem</span>
                                        <span className="text-white font-medium">{post.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Thời gian đọc</span>
                                        <span className="text-white font-medium">{estimatedReadTime} phút</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Ngày đăng</span>
                                        <span className="text-white font-medium">{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="w-full max-w-[1280px] mx-auto px-4 py-12 border-t border-gray-700">
                        <div className="flex items-center gap-2 mb-8">
                            <h2 className="text-2xl font-bold">Bài viết liên quan</h2>
                            <FiChevronRight className="w-5 h-5 text-blue-400" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.id}`}
                                    className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <span className="inline-block text-xs font-semibold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full mb-3">
                                            {relatedPost.category}
                                        </span>
                                        <h3 className="font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                                            {relatedPost.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{relatedPost.author}</span>
                                            <span>{relatedPost.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        {/* View All Posts Link */}
                        <div className="text-center mt-8">
                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Xem tất cả bài viết
                                <FiChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </section>
                )}
            </main>

            {/* Share Modal */}
            <SharedModal
                isOpen={isShareOpen}
                onClose={() => setShareOpen(false)}
                contentLabel="Chia sẻ bài viết"
            >
                <motion.div
                    {...fadeSlideConfig}
                    className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Chia sẻ bài viết</h2>
                        <button
                            onClick={() => setShareOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    
                    {/* Copy Link */}
                    <button
                        onClick={copyLink}
                        className="flex items-center gap-3 w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors mb-4"
                    >
                        <FiCopy className="w-4 h-4" />
                        <span>Sao chép liên kết</span>
                    </button>
                    
                    {/* Social Share */}
                    <div className="space-y-3">
                        <p className="text-sm text-gray-400 mb-3">Chia sẻ lên mạng xã hội</p>
                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href={facebookUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                            >
                                <FaFacebookF className="w-4 h-4" />
                                <span className="text-sm">Facebook</span>
                            </a>
                            <a
                                href={twitterUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-3 bg-sky-500 hover:bg-sky-600 rounded-xl transition-colors"
                            >
                                <FaTwitter className="w-4 h-4" />
                                <span className="text-sm">Twitter</span>
                            </a>
                            <a
                                href={linkedInUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors"
                            >
                                <FaLinkedinIn className="w-4 h-4" />
                                <span className="text-sm">LinkedIn</span>
                            </a>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 rounded-xl transition-colors"
                            >
                                <FaWhatsapp className="w-4 h-4" />
                                <span className="text-sm">WhatsApp</span>
                            </a>
                        </div>
                        
                        <a
                            href={mailtoUrl}
                            className="flex items-center gap-2 w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors"
                        >
                            <FaPaperPlane className="w-4 h-4" />
                            <span className="text-sm">Gửi qua Email</span>
                        </a>
                    </div>
                    
                    {/* QR Code */}
                    <button
                        onClick={() => setShowQRCode(!showQRCode)}
                        className="flex items-center gap-2 w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors mt-4"
                    >
                        <FaQrcode className="w-4 h-4" />
                        <span className="text-sm">
                            {showQRCode ? 'Ẩn QR Code' : 'Hiển thị QR Code'}
                        </span>
                    </button>
                    
                    {showQRCode && (
                        <div className="flex justify-center p-6 bg-white rounded-xl mt-4">
                            <QRCodeCanvas
                                value={shareUrl}
                                size={150}
                                bgColor="#ffffff"
                                fgColor="#000000"
                            />
                        </div>
                    )}
                </motion.div>
            </SharedModal>
        </>
    );
}
