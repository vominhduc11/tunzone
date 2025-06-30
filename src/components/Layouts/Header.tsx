'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useRouter, usePathname } from 'next/navigation';
import logo from '@/assets/images/logo.png';
import Link from 'next/link';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Dealer system', href: '/dealers' },
    { name: 'Dealer', href: 'https://localhost:3001' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' }
];

const demoProducts = [
    { id: 1, name: 'SCS Studio Pro', img: '/images/products/cardog7plus.png' },
    { id: 2, name: 'SCS Gaming Elite', img: '/images/products/cardog7plus.png' },
    { id: 3, name: 'SCS Wireless ANC', img: '/images/products/cardog7plus.png' }
];

export default function Header() {
    const [query, setQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push(`/products?search=${encodeURIComponent(query)}`);
        setVisible(false);
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
        <header className="bg-gray-900 border-b border-gray-700 relative z-50">
            <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image src={logo} alt="SCS Logo" className="h-8 w-auto" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex space-x-8">
                    {navItems.map((item) => {
                        const isActive = isActiveLink(item.href);
                        const isExternal = item.href.startsWith('http');
                        
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                target={isExternal ? '_blank' : undefined}
                                rel={isExternal ? 'noopener noreferrer' : undefined}
                                className={`
                                    relative font-medium transition-all duration-300 group px-3 py-2 rounded-lg
                                    ${isActive 
                                        ? 'text-cyan-400 bg-cyan-400/10' 
                                        : 'text-white hover:text-cyan-300 hover:bg-white/5'
                                    }
                                `}
                            >
                                {item.name}
                                
                                {/* Active indicator */}
                                <span 
                                    className={`
                                        absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 
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
                        overlayClassName="bg-gray-800 text-white rounded-xl shadow-xl w-80 p-4 ring-1 ring-white/10"
                        overlay={
                            <div>
                                <div className="flex mb-4">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Tìm sản phẩm..."
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="flex-1 bg-gray-700 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="bg-cyan-500 px-4 rounded-r-lg hover:bg-cyan-400 transition-shadow shadow-md"
                                    >
                                        <FiSearch className="w-5 h-5 text-gray-900" />
                                    </button>
                                </div>
                                <h3 className="text-sm font-semibold mb-2">Kết quả tìm kiếm</h3>
                                <ul className="grid grid-cols-1 gap-2">
                                    {demoProducts.map((p) => (
                                        <li key={p.id}>
                                            <Link
                                                href={`/productDetail/${p.id}`}
                                                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition"
                                            >
                                                <Image
                                                    src={p.img}
                                                    alt={p.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded"
                                                />
                                                <p className="font-medium text-sm truncate">{p.name}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
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
                            className="text-gray-300 hover:text-white focus:outline-none transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                            aria-label="Search"
                        >
                            <FiSearch className="h-5 w-5" />
                        </button>
                    </Tooltip>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-gray-300 hover:text-white focus:outline-none transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                        aria-label="Toggle mobile menu"
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
                lg:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-700 shadow-xl
                transition-all duration-300 ease-in-out
                ${mobileMenuOpen 
                    ? 'opacity-100 visible transform translate-y-0' 
                    : 'opacity-0 invisible transform -translate-y-2'
                }
            `}>
                <nav className="px-4 py-4">
                    <div className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = isActiveLink(item.href);
                            const isExternal = item.href.startsWith('http');
                            
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    target={isExternal ? '_blank' : undefined}
                                    rel={isExternal ? 'noopener noreferrer' : undefined}
                                    onClick={closeMobileMenu}
                                    className={`
                                        block px-4 py-3 rounded-lg font-medium transition-all duration-300
                                        ${isActive 
                                            ? 'text-cyan-400 bg-cyan-400/10 border-l-4 border-cyan-400' 
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }
                                    `}
                                >
                                    <div className="flex items-center justify-between">
                                        {item.name}
                                        {isActive && (
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
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
