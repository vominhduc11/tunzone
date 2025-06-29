'use client';

import { use } from 'react';
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
            <div className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4">Sản phẩm không tồn tại</h1>
                    <p className="text-gray-400">Không tìm thấy thông tin sản phẩm.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ProductGallery images={product.images ?? []} avatar={product.avatar} />
                <ProductOverview product={product} />
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
            <NoticeSection id={id} />
        </div>
    );
}
