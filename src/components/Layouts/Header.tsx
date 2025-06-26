// src/components/Header.jsx
import Image from 'next/image';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import logo from '@/assets/images/logo.png'; // Adjust the path to your logo image
import Link from 'next/link';

const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Partner with us', href: '#' },
    { name: 'News', href: '#' },
    { name: 'Video', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Contact Us', href: '#' }
];

export default function Header() {
    return (
        <header className="bg-gray-900">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src={logo} // Replace with your logo path
                        alt="SCS ETC Logo"
                        className="h-28 w-auto"
                    />
                </Link>

                {/* Nav */}
                <nav className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-white font-medium hover:opacity-75 transition"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Search */}
                <button
                    type="button"
                    className="text-gray-300 hover:text-white focus:outline-none"
                    aria-label="Search"
                >
                    <FiSearch className="h-6 w-6" />
                </button>

                {/* Mobile menu button (nếu cần) */}
                {/* <button className="md:hidden text-gray-300 hover:text-white">
          <FiMenu className="h-6 w-6" />
        </button> */}
            </div>
        </header>
    );
}
