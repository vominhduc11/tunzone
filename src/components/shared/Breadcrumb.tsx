'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { products } from '@/data/api/products';
import { useEffect, useState } from 'react';

interface BreadcrumbItem {
    label: string;
    href: string;
    isActive?: boolean;
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
    'account': 'Tài khoản'
};

export default function Breadcrumb() {
    const pathname = usePathname();
    const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
    
    useEffect(() => {
        // Don't show breadcrumb on home page
        if (pathname === '/') {
            setBreadcrumbItems([]);
            return;
        }
        
        const pathSegments = pathname.split('/').filter(Boolean);
        const items: BreadcrumbItem[] = [
            { label: 'Trang chủ', href: '/' }
        ];
        
        let currentPath = '';
        
        for (let i = 0; i < pathSegments.length; i++) {
            const segment = pathSegments[i];
            currentPath += `/${segment}`;
            
            let label = pathNameMap[segment] || segment;
            let href = currentPath;
            
            // Handle special cases
            if (segment === 'productDetail' && i + 1 < pathSegments.length) {
                // For product detail pages, get the product name
                const productId = pathSegments[i + 1];
                const product = products.find(p => p.id.toString() === productId);
                
                if (product) {
                    // Add products page first
                    items.push({
                        label: 'Sản phẩm',
                        href: '/products'
                    });
                    
                    // Then add the specific product
                    items.push({
                        label: product.name,
                        href: `/productDetail/${productId}`,
                        isActive: true
                    });
                    
                    // Skip the next iteration since we handled the ID
                    i++;
                    continue;
                } else {
                    label = 'Sản phẩm không tồn tại';
                }
            } else if (segment === 'blog' && i + 1 < pathSegments.length) {
                // Handle blog detail pages
                const blogId = pathSegments[i + 1];
                
                // Add blogs page first
                items.push({
                    label: 'Blog',
                    href: '/blogs'
                });
                
                // Then add the specific blog
                items.push({
                    label: `Bài viết #${blogId}`,
                    href: `/blog/${blogId}`,
                    isActive: true
                });
                
                i++; // Skip the next iteration
                continue;
            } else if (!isNaN(Number(segment)) && i > 0) {
                // Handle other numeric IDs
                const parentSegment = pathSegments[i - 1];
                const parentLabel = pathNameMap[parentSegment] || parentSegment;
                label = `${parentLabel} #${segment}`;
            }
            
            // Capitalize first letter
            label = label.charAt(0).toUpperCase() + label.slice(1);
            
            items.push({
                label,
                href,
                isActive: i === pathSegments.length - 1
            });
        }
        
        setBreadcrumbItems(items);
    }, [pathname]);
    
    // Don't render if no items or only home
    if (breadcrumbItems.length <= 1) return null;
    
    return (
        <nav className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <ol className="flex items-center space-x-1 text-sm overflow-x-auto">
                    {breadcrumbItems.map((item, index) => (
                        <li key={`${item.href}-${index}`} className="flex items-center flex-shrink-0">
                            {index > 0 && (
                                <FiChevronRight className="w-4 h-4 text-gray-500 mx-2" />
                            )}
                            
                            {index === 0 ? (
                                <Link
                                    href={item.href}
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-200 whitespace-nowrap"
                                >
                                    <FiHome className="w-4 h-4 mr-1" />
                                    {item.label}
                                </Link>
                            ) : item.isActive ? (
                                <span className="text-blue-400 font-medium whitespace-nowrap max-w-xs truncate" title={item.label}>
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 whitespace-nowrap max-w-xs truncate"
                                    title={item.label}
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
