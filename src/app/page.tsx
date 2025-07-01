'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeadphones, FiStar, FiShield, FiTrendingUp, FiUsers, FiArrowRight, FiPlay } from 'react-icons/fi';
import { products } from '@/data/api/products';
import { blogs } from '@/data/api/blogs';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export default function HomePage() {
    const featuredProducts = products.slice(0, 3);
    const latestBlogs = blogs.slice(0, 3);

    return (
        <div className="bg-gray-900 text-white">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ 
                            y: [0, -20, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ 
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
                    />
                    <motion.div
                        animate={{ 
                            y: [0, 30, 0],
                            rotate: [0, -5, 0]
                        }}
                        transition={{ 
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                        className="absolute bottom-32 right-16 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
                    />
                </div>

                {/* Content */}
                <div className="relative w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.div variants={fadeInUp} className="mb-8">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FiHeadphones className="w-4 h-4" />
                            Chào mừng đến với TuneZone
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
                    >
                        Đỉnh Cao<br />Âm Thanh
                    </motion.h1>
                    
                    <motion.p 
                        variants={fadeInUp}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        Khám phá bộ sưu tập tai nghe cao cấp với công nghệ âm thanh tiên tiến, 
                        mang đến trải nghiệm nghe nhạc hoàn hảo cho mọi audiophile
                    </motion.p>
                    
                    <motion.div 
                        variants={staggerContainer}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                    >
                        <motion.div variants={fadeInUp}>
                            <Link
                                href="/products"
                                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
                            >
                                Khám phá sản phẩm
                                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                        
                        <motion.div variants={fadeInUp}>
                            <button className="group bg-transparent border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 flex items-center gap-3">
                                <FiPlay className="w-5 h-5" />
                                Xem video giới thiệu
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                    >
                        {[
                            { number: '15K+', label: 'Khách hàng hài lòng' },
                            { number: '50+', label: 'Sản phẩm chất lượng' },
                            { number: '5+', label: 'Năm kinh nghiệm' },
                            { number: '24/7', label: 'Hỗ trợ khách hàng' }
                        ].map((stat, index) => (
                            <motion.div key={index} variants={fadeInUp} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-300 text-sm">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Featured Products */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="py-20 bg-gray-800/50"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Sản phẩm nổi bật
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Khám phá những sản phẩm âm thanh được yêu thích nhất từ TuneZone
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={product.avatar}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop';
                                        }}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            Nổi bật
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-400 mb-4 line-clamp-2">
                                        {product.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar 
                                                    key={i} 
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-400">
                                            ({product.reviewsCount} đánh giá)
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-blue-400">
                                            {product.price?.toLocaleString()}₫
                                        </div>
                                        <Link
                                            href={`/productDetail/${product.id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            Xem chi tiết
                                            <FiArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div variants={fadeInUp} className="text-center mt-12">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
                        >
                            Xem tất cả sản phẩm
                            <FiArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Why Choose TuneZone */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="py-20"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Tại sao chọn TuneZone?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Chúng tôi cam kết mang đến trải nghiệm âm thanh tuyệt vời nhất
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: FiHeadphones,
                                title: 'Chất lượng âm thanh',
                                description: 'Driver cao cấp và công nghệ âm thanh tiên tiến cho trải nghiệm nghe hoàn hảo'
                            },
                            {
                                icon: FiShield,
                                title: 'Bảo hành toàn diện',
                                description: 'Chính sách bảo hành lên đến 36 tháng và hỗ trợ kỹ thuật 24/7'
                            },
                            {
                                icon: FiTrendingUp,
                                title: 'Công nghệ tiên tiến',
                                description: 'Luôn cập nhật những công nghệ âm thanh mới nhất trên thế giới'
                            },
                            {
                                icon: FiUsers,
                                title: 'Cộng đồng lớn',
                                description: 'Hơn 15,000 khách hàng tin tưởng và lựa chọn TuneZone'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                className="group text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
                                    <feature.icon className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Latest Blog Posts */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="py-20 bg-gray-800/50"
            >
                <div className="w-full max-w-[1280px] mx-auto px-4">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Tin tức & Blog
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Cập nhật những thông tin mới nhất về công nghệ âm thanh và sản phẩm
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestBlogs.map((blog, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02 }}
                                className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                                            {blog.category}
                                        </span>
                                        <span className="text-gray-400 text-xs">
                                            {blog.date}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                        {blog.excerpt}
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">
                                            {blog.author}
                                        </span>
                                        <Link
                                            href={`/blog/${blog.id}`}
                                            className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                                        >
                                            Đọc thêm
                                            <FiArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div variants={fadeInUp} className="text-center mt-12">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
                        >
                            Xem tất cả bài viết
                            <FiArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative w-full max-w-[1280px] mx-auto px-4 text-center">
                    <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Sẵn sàng trải nghiệm âm thanh đỉnh cao?
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Tham gia cộng đồng những người yêu âm nhạc và khám phá thế giới âm thanh cùng TuneZone
                    </motion.p>
                    
                    <motion.div variants={staggerContainer} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <motion.div variants={fadeInUp}>
                            <Link
                                href="/products"
                                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-3"
                            >
                                Mua sắm ngay
                                <FiArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                        
                        <motion.div variants={fadeInUp}>
                            <Link
                                href="/contact"
                                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 flex items-center gap-3"
                            >
                                Liên hệ tư vấn
                                <FiUsers className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
