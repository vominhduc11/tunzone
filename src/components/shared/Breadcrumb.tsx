'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiChevronRight } from 'react-icons/fi';

interface BreadcrumbItem {
    label: string;
    href: string;
}

const pathNameMap: Record<string, string> = {
    '': 'Trang chủ',
    'products': 'Sản phẩm',
    'productDetail': 'Chi tiết sản phẩm',
    'blogs': 'Blog',
    'blog': 'Bài viết',
    'about': 'Giới thiệu',
    'contact': 'Liên hệ',
    'dealers': 'Hệ thống đại lý',
    'dealerRegistration': 'Đăng ký đại lý',
    'compare': 'So sánh sản phẩm',
    'features': 'Tính năng',
    'journey': 'Hành trình',
    'policy': 'Chính sách',
    'reviewsPage': 'Đánh giá',
    'warrantyChecking': 'Kiểm tra bảo hành',
    'account': 'Tài khoản',
    'warranty': 'Bảo hành'
};

export default function Breadcrumb() {
    const pathname = usePathname();
    
    // Don't show breadcrumb on home page
    if (pathname === '/') return null;
    
    const pathSegments = pathname.split('/').filter(Boolean);
    
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: 'Trang chủ', href: '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        
        // Handle dynamic routes like /productDetail/[id] or /blog/[id]
        let label = pathNameMap[segment] || segment;
        
        // If it's a number (likely an ID), use the parent's name + ID
        if (!isNaN(Number(segment)) && index > 0) {
            const parentSegment = pathSegments[index - 1];
            const parentLabel = pathNameMap[parentSegment] || parentSegment;
            label = `${parentLabel} #${segment}`;
        }
        
        breadcrumbItems.push({
            label: label.charAt(0).toUpperCase() + label.slice(1),
            href: currentPath
        });
    });
    
    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="w-full max-w-[1280px] mx-auto px-4 py-3">
                <ol className="flex items-center space-x-2 text-sm">
                    {breadcrumbItems.map((item, index) => (
                        <li key={item.href} className="flex items-center">
                            {index > 0 && (
                                <FiChevronRight className="w-4 h-4 text-gray-500 mx-2" />
                            )}
                            
                            {index === 0 ? (
                                <Link
                                    href={item.href}
                                    className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                                >
                                    <FiHome className="w-4 h-4 mr-1" />
                                    {item.label}
                                </Link>
                            ) : index === breadcrumbItems.length - 1 ? (
                                <span className="text-cyan-400 font-medium">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
}
