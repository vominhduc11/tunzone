'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiStar, FiX, FiArrowLeft, FiCheck, FiShoppingCart, FiEye, FiHeart, FiShare2 } from 'react-icons/fi';
import { products } from '@/data/api/products';
import { Suspense, useState } from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

// Type for product from the products array
type Product = typeof products[0];

function CompareContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [likedProducts, setLikedProducts] = useState<number[]>([]);

    // Animation hooks
    const headerAnimation = useScrollAnimation({ threshold: 0.2 });
    const { containerRef: tableRef, visibleItems } = useStaggeredAnimation(5, 200);

    // Lấy danh sách ID so sánh từ query param
    const compareParam = searchParams.get('compare') || '';
    const compareIds = compareParam
        .split(',')
        .map((s) => parseInt(s, 10))
        .filter((id) => !isNaN(id));

    // Lọc sản phẩm để so sánh
    const compareProducts = products.filter((p) => compareIds.includes(p.id));

    const toggleLike = (productId: number) => {
        setLikedProducts(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const removeProduct = (productId: number) => {
        const newIds = compareIds.filter(id => id !== productId);
        router.push(
            newIds.length ? `/compare?compare=${newIds.join(',')}` : '/compare'
        );
    };

    // Nếu không có sản phẩm để so sánh
    if (compareProducts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-pink-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                </div>

                <div className="text-center relative z-10 animate-fadeIn">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounceIn">
                        <FiEye className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-slideInFromBottom">
                        Chưa có sản phẩm để so sánh
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto animate-slideInFromBottom animate-stagger-1">
                        Hãy chọn ít nhất 2 sản phẩm từ trang sản phẩm để bắt đầu so sánh
                    </p>
                    <Link 
                        href="/products" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl animate-bounceIn hover-bounce"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Quay lại trang sản phẩm
                    </Link>
                </div>
            </div>
        );
    }

    // Comparison data structure
    const comparisonRows = [
        {
            label: 'Giá',
            key: 'price',
            render: (product: Product) => product.price ? 
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {product.price.toLocaleString('vi-VN')}₫
                </span> : 
                <span className="text-gray-500">—</span>
        },
        {
            label: 'Đánh giá',
            key: 'rating',
            render: (product: Product) => (
                <div className="flex flex-col items-center gap-2">
                    <div className="flex justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <FiStar
                                key={i}
                                className={`w-5 h-5 ${
                                    i < Math.round(product.rating || 0)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-400">
                        ({product.reviewsCount || 0} đánh giá)
                    </span>
                </div>
            )
        },
        {
            label: 'Mô tả',
            key: 'description',
            render: (product: Product) => (
                <p className="text-sm text-gray-300 leading-relaxed">
                    {product.description || 'Không có mô tả'}
                </p>
            )
        },
        {
            label: 'Tính năng',
            key: 'features',
            render: (product: Product) => (
                <ul className="space-y-2">
                    {(product.features || []).map((feat: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <FiCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{feat}</span>
                        </li>
                    ))}
                </ul>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header Section */}
            <section 
                ref={headerAnimation.elementRef}
                className={`bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-20 animate-gradientShift relative overflow-hidden transition-all duration-1000 ${
                    headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-float"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center">
                        <h1 className={`text-5xl md:text-6xl font-bold mb-6 gradient-text transition-all duration-1000 delay-300 ${
                            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                        }`}>
                            So sánh sản phẩm
                        </h1>
                        <p className={`text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            So sánh chi tiết {compareProducts.length} sản phẩm để đưa ra lựa chọn tốt nhất
                        </p>
                        
                        <div className={`mt-8 transition-all duration-1000 delay-700 ${
                            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <Link 
                                href="/products" 
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white hover:bg-white/20 transition-all hover-bounce"
                            >
                                <FiArrowLeft className="w-4 h-4" />
                                Quay lại trang sản phẩm
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Content */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                {/* Product Cards Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {compareProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={`bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 relative group hover-lift transform ${
                                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Remove button */}
                            <button
                                onClick={() => removeProduct(product.id)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all hover-bounce opacity-0 group-hover:opacity-100"
                                title="Xóa khỏi so sánh"
                            >
                                <FiX className="w-4 h-4" />
                            </button>

                            {/* Product Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={product.images?.[0] ?? '/placeholder.png'}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                    {product.name}
                                </h3>
                                
                                {product.price && (
                                    <div className="mb-4">
                                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            {product.price.toLocaleString('vi-VN')}₫
                                        </span>
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/productDetail/${product.id}`}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-all hover-bounce"
                                    >
                                        Chi tiết
                                    </Link>
                                    <button 
                                        onClick={() => toggleLike(product.id)}
                                        className={`p-2 rounded-lg transition-all hover-bounce ${
                                            likedProducts.includes(product.id) 
                                                ? 'bg-red-500 text-white' 
                                                : 'bg-gray-700 text-gray-400 hover:bg-red-500 hover:text-white'
                                        }`}
                                    >
                                        <FiHeart className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-blue-500 hover:text-white transition-all hover-bounce">
                                        <FiShare2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison Table */}
                <div 
                    ref={tableRef}
                    className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-700 to-gray-600">
                                    <th className="p-6 text-left font-semibold text-white border-r border-gray-600">
                                        Thông số
                                    </th>
                                    {compareProducts.map((product, index) => (
                                        <th 
                                            key={product.id} 
                                            className={`p-6 text-center font-semibold text-white border-r border-gray-600 last:border-r-0 transition-all duration-700 ${
                                                visibleItems[index] ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            {product.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row, rowIndex) => (
                                    <tr 
                                        key={row.key}
                                        className={`border-t border-gray-700 hover:bg-gray-700/50 transition-all duration-300 ${
                                            visibleItems[rowIndex] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                        }`}
                                        style={{ transitionDelay: `${rowIndex * 150}ms` }}
                                    >
                                        <td className="p-6 font-semibold text-blue-400 border-r border-gray-700 bg-gray-800/50">
                                            {row.label}
                                        </td>
                                        {compareProducts.map((product) => (
                                            <td 
                                                key={product.id} 
                                                className="p-6 text-center border-r border-gray-700 last:border-r-0"
                                            >
                                                {row.render(product)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                
                                {/* Action Row */}
                                <tr className="border-t border-gray-700 bg-gray-800/50">
                                    <td className="p-6 font-semibold text-blue-400 border-r border-gray-700">
                                        Hành động
                                    </td>
                                    {compareProducts.map((product) => (
                                        <td key={product.id} className="p-6 text-center border-r border-gray-700 last:border-r-0">
                                            <div className="flex flex-col gap-3">
                                                <Link
                                                    href={`/productDetail/${product.id}`}
                                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                                >
                                                    <FiEye className="w-4 h-4" />
                                                    Xem chi tiết
                                                </Link>
                                                <button className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                    <FiShoppingCart className="w-4 h-4" />
                                                    Mua ngay
                                                </button>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Additional Actions */}
                <div className="mt-12 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all hover-bounce"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            Thêm sản phẩm khác
                        </Link>
                        <button
                            onClick={() => router.push('/compare')}
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all hover-bounce"
                        >
                            <FiX className="w-4 h-4" />
                            Xóa tất cả
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ComparePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg">Đang tải dữ liệu so sánh...</p>
                </div>
            </div>
        }>
            <CompareContent />
        </Suspense>
    );
}

export default ComparePage;
