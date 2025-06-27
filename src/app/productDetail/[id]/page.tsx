'use client';

import { use, useEffect, useState } from 'react';
import ProductGallery from '@/app/productDetail/_components/ProductGallery';
import ProductTabs from '@/app/productDetail/_components/ProductTabsProps';
import NoticeSection from '@/app/productDetail/_components/NoticeSection';
import { FiStar } from 'react-icons/fi';

import { Product } from '@/types/product';
import { getProductById } from '@/services/productService';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = use(params);

    useEffect(() => {
        (async function fetchData() {
            const data = await getProductById(id);
            setProduct(data);
        })();
    }, []); // nhớ thêm id vào dependency array nếu dùng

    if (!product) {
        return (
            <div className="bg-gray-900 text-white py-20 text-center">
                <h2 className="text-2xl font-semibold">Sản phẩm không tìm thấy</h2>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ProductGallery images={product.images} />
                <div className="flex flex-col justify-start">
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <FiStar
                                key={i}
                                className={`w-5 h-5 ${
                                    i < Math.floor(product.rating)
                                        ? 'text-yellow-400'
                                        : 'text-gray-600'
                                }`}
                            />
                        ))}
                        <span className="ml-2 text-gray-400">
                            ({product.reviewsCount} đánh giá)
                        </span>
                    </div>
                    <p className="text-3xl font-semibold mb-6">${product.price.toFixed(2)}</p>
                    <ul className="mb-6 space-y-2">
                        {product.features.map((feat, i) => (
                            <li key={i} className="flex items-start">
                                <FiStar className="text-green-400 w-6 h-6 mr-3 mt-1" />
                                <span>{feat}</span>
                            </li>
                        ))}
                    </ul>
                    <a
                        href={`https://shopee.vn/search?keyword=${product.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition"
                    >
                        Mua trên Shopee
                    </a>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <ProductTabs
                    description={product.description}
                    specs={product.specs}
                    boxItems={product.boxItems}
                    faqs={product.faqs}
                    videoUrl={product.videoUrl}
                />
            </div>
            <NoticeSection />
        </div>
    );
}

// ... existing code...
