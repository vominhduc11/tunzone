'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface PageIndicatorProps {
    title?: string;
    description?: string;
    showBackButton?: boolean;
}

const pageInfo: Record<string, { title: string; description: string }> = {
    '/': { title: 'Trang chủ', description: 'Khám phá tai nghe SCS chất lượng cao' },
    '/products': { title: 'Sản phẩm', description: 'Danh sách sản phẩm tai nghe SCS' },
    '/blogs': { title: 'Blog', description: 'Tin tức và bài viết về công nghệ âm thanh' },
    '/about': { title: 'Giới thiệu', description: 'Tìm hiểu về SCS Headphones' },
    '/contact': { title: 'Liên hệ', description: 'Kết nối với chúng tôi' },
    '/dealers': { title: 'Hệ thống đại lý', description: 'Mạng lưới đại lý SCS toàn quốc' },
    '/compare': { title: 'So sánh sản phẩm', description: 'So sánh các sản phẩm tai nghe' },
    '/features': { title: 'Tính năng', description: 'Các tính năng nổi bật của SCS' },
    '/journey': { title: 'Hành trình', description: 'Hành trình phát triển SCS' },
    '/policy': { title: 'Chính sách', description: 'Chính sách và điều khoản' },
    '/reviewsPage': { title: 'Đánh giá', description: 'Đánh giá từ khách hàng' },
    '/warrantyChecking': { title: 'Kiểm tra bảo hành', description: 'Tra cứu thông tin bảo hành' }
};

export default function PageIndicator({ 
    title, 
    description, 
    showBackButton = false 
}: PageIndicatorProps) {
    const pathname = usePathname();
    
    // Don't show on home page
    if (pathname === '/') return null;
    
    const currentPageInfo = pageInfo[pathname];
    const displayTitle = title || currentPageInfo?.title || 'Trang';
    const displayDescription = description || currentPageInfo?.description || '';
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700"
        >
            <div className="w-full max-w-[1280px] mx-auto px-4 py-8">
                <div className="flex items-center justify-between">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-white mb-2"
                        >
                            {displayTitle}
                        </motion.h1>
                        {displayDescription && (
                            <motion.p 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-gray-300 text-lg"
                            >
                                {displayDescription}
                            </motion.p>
                        )}
                    </div>
                    
                    {showBackButton && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Quay lại
                        </motion.button>
                    )}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-blue-500/10 rounded-full blur-2xl" />
            </div>
        </motion.div>
    );
}
