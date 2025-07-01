'use client';

import { use } from 'react';
import Link from 'next/link';
import ProductGallery from '@/app/productDetail/_components/ProductGallery';
import ProductTabs from '@/app/productDetail/_components/ProductTabsProps';
import NoticeSection from '@/app/productDetail/_components/NoticeSection';
import { products } from '@/data/api/products';
import ProductOverview from '../_components/ProductOverview';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find((p) => p.id == Number(id));

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-3xl font-bold mb-4">Sản phẩm không tồn tại</h1>
                    <p className="text-gray-400 mb-6">Không tìm thấy thông tin sản phẩm bạn đang tìm kiếm.</p>
                    <Link 
                        href="/products"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                    >
                        Quay lại danh sách sản phẩm
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Main Product Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <ProductGallery images={product.images ?? []} avatar={product.avatar} />
                    <ProductOverview product={product} />
                </div>

                {/* Product Details Tabs */}
                <ProductTabs
                    description={product.description}
                    specs={product.specs}
                    boxItems={product.boxItems}
                    faqs={product.faqs}
                    videoUrl={product.videoUrl}
                />
            </div>

            {/* Reviews Section */}
            <NoticeSection id={id} />
        </div>
    );
}
