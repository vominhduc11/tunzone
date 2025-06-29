'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/products?search=${encodeURIComponent(query)}`);
    setVisible(false);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 relative">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src={logo} alt="SCS Logo" className="h-8 w-auto" />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white font-medium hover:opacity-75 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

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
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Tìm sản phẩm..."
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
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
                {demoProducts.map(p => (
                  <li key={p.id}>
                    <Link
                      href={`/productDetail/${p.id}`}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition"
                    >
                      <Image src={p.img} alt={p.name} width={40} height={40} className="rounded" />
                      <p className="font-medium text-sm truncate">{p.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          }
          trigger="click"
          align={{ offset: [0, 8] }}
          onVisibleChange={vis => {
            setVisible(vis);
            if (vis) setTimeout(() => inputRef.current?.focus(), 0);
          }}
        >
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Search"
          >
            <FiSearch className="h-6 w-6" />
          </button>
        </Tooltip>
      </div>
    </header>
  );
}
