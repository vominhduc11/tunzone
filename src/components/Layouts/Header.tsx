'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { FiSearch, FiMenu, FiX, FiHeadphones } from 'react-icons/fi';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { products } from '@/data/api/products';
import Logo from '@/components/shared/Logo';

const navItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/products' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Hệ thống đại lý', href: '/dealers' },
    { name: 'Đại lý', href: 'https://tunzone-dealer.vercel.app/' },
    { name: 'Về chúng tôi', href: '/about' },
    { name: 'Liên hệ', href: '/contact' }
];

export default function Header() {
    const [query, setQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push(`/products?search=${encodeURIComponent(query)}`);
        setVisible(false);
        setQuery('');
    };

    const handleProductClick = (productId: number) => {
        setVisible(false);
        setQuery('');
        router.push(`/productDetail/${productId}`);
    };

    // Function to check if a nav item is active
    const isActiveLink = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="bg-gray-900 border-b border-gray-700 relative z-50 sticky top-0 backdrop-blur-sm bg-gray-900/95">
            <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <Logo size="md" showText={true} href="/" />
                {/* <Image src="/logo.png" alt="Logo" width={100} height={40} /> */}

                {/* Desktop Nav */}
                <nav className="hidden lg:flex space-x-1">
                    {navItems.map((item) => {
                        const isActive = isActiveLink(item.href);
                        
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    relative font-medium transition-all duration-300 group px-4 py-2 rounded-xl
                                    ${isActive 
                                        ? 'text-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }
                                `}
                            >
                                {item.name}
                                
                                {/* Active indicator */}
                                <span 
                                    className={`
                                        absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 
                                        transition-all duration-300 rounded-full
                                        ${isActive 
                                            ? 'w-8 opacity-100' 
                                            : 'w-0 opacity-0 group-hover:w-8 group-hover:opacity-100'
                                        }
                                    `}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side - Search & Mobile Menu */}
                <div className="flex items-center space-x-4">
                    {/* Search Button & Tooltip */}
                    <Tooltip
                        placement="bottom"
                        visible={visible}
                        overlayClassName="bg-gray-800 text-white rounded-2xl shadow-2xl w-96 p-0 ring-1 ring-gray-700 overflow-hidden"
                        overlay={
                            <div className="p-6">
                                <div className="flex mb-4">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Tìm kiếm sản phẩm TuneZone..."
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="flex-1 bg-gray-700 px-4 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-xl transition-colors"
                                    >
                                        <FiSearch className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                                
                                {query && (
                                    <div>
                                        <h3 className="text-sm font-semibold mb-3 text-gray-300">
                                            Kết quả tìm kiếm ({filteredProducts.length})
                                        </h3>
                                        {filteredProducts.length > 0 ? (
                                            <ul className="space-y-2 max-h-64 overflow-y-auto">
                                                {filteredProducts.map((product) => (
                                                    <li key={product.id}>
                                                        <button
                                                            onClick={() => handleProductClick(product.id)}
                                                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition-colors text-left"
                                                        >
                                                            <Image
                                                                src={product.avatar}
                                                                alt={product.name}
                                                                width={48}
                                                                height={48}
                                                                className="rounded-lg object-cover"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=48&h=48&fit=crop';
                                                                }}
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-white truncate">{product.name}</p>
                                                                <p className="text-sm text-gray-400 truncate">{product.description}</p>
                                                                <p className="text-sm text-blue-400 font-medium">
                                                                    {product.price?.toLocaleString()}₫
                                                                </p>
                                                            </div>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="text-center py-8 text-gray-400">
                                                <FiSearch className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                <p>Không tìm thấy sản phẩm nào</p>
                                                <p className="text-sm">Thử từ khóa khác</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                                {!query && (
                                    <div className="text-center py-8 text-gray-400">
                                        <FiHeadphones className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>Nhập từ khóa để tìm kiếm</p>
                                        <p className="text-sm">VD: tai nghe, bluetooth, gaming...</p>
                                    </div>
                                )}
                            </div>
                        }
                        trigger="click"
                        align={{ offset: [0, 8] }}
                        onVisibleChange={(vis) => {
                            setVisible(vis);
                            if (vis) setTimeout(() => inputRef.current?.focus(), 0);
                        }}
                    >
                        <button
                            className="text-gray-300 hover:text-white focus:outline-none transition-all duration-300 p-2 rounded-xl hover:bg-gray-800/50 hover:scale-105"
                            aria-label="Tìm kiếm"
                        >
                            <FiSearch className="h-5 w-5" />
                        </button>
                    </Tooltip>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-gray-300 hover:text-white focus:outline-none transition-all duration-300 p-2 rounded-xl hover:bg-gray-800/50"
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? (
                            <FiX className="h-6 w-6" />
                        ) : (
                            <FiMenu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`
                lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 shadow-2xl
                transition-all duration-300 ease-in-out
                ${mobileMenuOpen 
                    ? 'opacity-100 visible transform translate-y-0' 
                    : 'opacity-0 invisible transform -translate-y-2'
                }
            `}>
                <nav className="px-4 py-6">
                    <div className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = isActiveLink(item.href);
                            
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className={`
                                        block px-4 py-3 rounded-xl font-medium transition-all duration-300
                                        ${isActive 
                                            ? 'text-blue-400 bg-blue-500/10 border-l-4 border-blue-400 shadow-lg shadow-blue-500/20' 
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                        }
                                    `}
                                >
                                    <div className="flex items-center justify-between">
                                        {item.name}
                                        {isActive && (
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    
                    {/* Mobile Search */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="flex">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Tìm kiếm sản phẩm..."
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="flex-1 bg-gray-800 px-4 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-xl transition-colors"
                            >
                                <FiSearch className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={closeMobileMenu}
                />
            )}
        </header>
    );
}
