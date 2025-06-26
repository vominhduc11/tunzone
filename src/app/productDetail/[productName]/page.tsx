import React from 'react';
import ProductGallery from '@/app/productDetail/_components/ProductGallery';
import { FiShoppingCart, FiStar } from 'react-icons/fi';

interface Product {
    slug: string;
    name: string;
    price: number;
    images: string[];
    features: string[];
    description: string;
    rating: number;
    reviewsCount: number;
}

interface PageProps {
    params: Promise<{ productName: string }>;
}

const products: Product[] = [
    {
        slug: 'g7plus',
        name: 'Cardo G7 Plus Bluetooth Headset',
        price: 249.99,
        images: [
            'https://dophuot.store/wp-content/uploads/2022/07/tai-nghe-cardo-BOLD-2.jpg',
            'https://dophuot.store/wp-content/uploads/2022/07/tai-nghe-cardo-BOLD-2.jpg',
            'https://dophuot.store/wp-content/uploads/2022/07/tai-nghe-cardo-BOLD-2.jpg',
            'https://dophuot.store/wp-content/uploads/2022/07/tai-nghe-cardo-BOLD-2.jpg',
            'https://dophuot.store/wp-content/uploads/2022/07/tai-nghe-cardo-BOLD-2.jpg',
            'https://dophuot.store/wp-content/uploads/2022/07/tai-nghe-cardo-BOLD-2.jpg',
            'https://dophuot.store/wp-content/uploads/2022/07/tai-nghe-cardo-BOLD-2.jpg'
        ],
        features: [
            'Bluetooth 5.2 Tiên Tiến',
            'Âm thanh stereo chất lượng cao',
            'Pin lên đến 17 giờ đàm thoại',
            'Chống thấm nước IP67',
            'Kết nối nhóm 15 người'
        ],
        description:
            'Cardo G7 Plus là thế hệ tai nghe Bluetooth cao cấp với công nghệ mạng lưới tiên tiến, khử tiếng ồn chủ động và trải nghiệm âm thanh vượt trội. Thiết kế gọn nhẹ, dễ dàng gắn vào hầu hết các loại mũ bảo hiểm và bền bỉ với mọi điều kiện thời tiết.',
        rating: 4.7,
        reviewsCount: 200
    },
    {
        slug: 't2',
        name: 'Cardo T2 Bluetooth Headset',
        price: 199.99,
        images: [
            'https://example.com/images/t2-1.jpg',
            'https://example.com/images/t2-2.jpg',
            'https://example.com/images/t2-3.jpg',
            'https://example.com/images/t2-4.jpg',
            'https://example.com/images/t2-5.jpg',
            'https://example.com/images/t2-6.jpg',
            'https://example.com/images/t2-7.jpg'
        ],
        features: [
            'Bluetooth 5.2',
            'Chống ồn chủ động',
            'Pin 14 giờ',
            'Kháng nước IP67',
            'Kết nối nhóm 10 người'
        ],
        description: 'Cardo T2 with advanced noise cancellation and long battery life.',
        rating: 4.5,
        reviewsCount: 150
    },
    {
        slug: 's9xm',
        name: 'Cardo S9 XM Bluetooth Headset',
        price: 299.99,
        images: [
            'https://example.com/images/s9xm-1.jpg',
            'https://example.com/images/s9xm-2.jpg',
            'https://example.com/images/s9xm-3.jpg',
            'https://example.com/images/s9xm-4.jpg',
            'https://example.com/images/s9xm-5.jpg',
            'https://example.com/images/s9xm-6.jpg',
            'https://example.com/images/s9xm-7.jpg'
        ],
        features: [
            'Bluetooth 5.3',
            'DSP noise reduction',
            'Pin 15 giờ',
            'Kháng nước IP68',
            'Kết nối nhóm 8 người'
        ],
        description: 'Cardo S9 XM high-performance headset with DSP noise reduction.',
        rating: 4.8,
        reviewsCount: 300
    },
    {
        slug: 's9x',
        name: 'Cardo S9 X Bluetooth Headset',
        price: 279.99,
        images: [
            'https://example.com/images/s9x-1.jpg',
            'https://example.com/images/s9x-2.jpg',
            'https://example.com/images/s9x-3.jpg',
            'https://example.com/images/s9x-4.jpg',
            'https://example.com/images/s9x-5.jpg',
            'https://example.com/images/s9x-6.jpg',
            'https://example.com/images/s9x-7.jpg'
        ],
        features: [
            'Bluetooth 5.3',
            'OpenMic technology',
            'Pin 16 giờ',
            'Kháng nước IP68',
            'Kết nối nhóm 12 người'
        ],
        description: 'Cardo S9 X with open-mic technology and extended battery.',
        rating: 4.6,
        reviewsCount: 250
    },
    {
        slug: 's7evo',
        name: 'Cardo S7 Evo Bluetooth Headset',
        price: 189.99,
        images: [
            'https://example.com/images/s7evo-1.jpg',
            'https://example.com/images/s7evo-2.jpg',
            'https://example.com/images/s7evo-3.jpg',
            'https://example.com/images/s7evo-4.jpg',
            'https://example.com/images/s7evo-5.jpg',
            'https://example.com/images/s7evo-6.jpg',
            'https://example.com/images/s7evo-7.jpg'
        ],
        features: [
            'Bluetooth 5.1',
            'Intercom up to 2 riders',
            'Pin 12 giờ',
            'Kháng nước IP67',
            'Đa kết nối'
        ],
        description: 'Cardo S7 Evo compact headset for up to 2 rider intercom.',
        rating: 4.4,
        reviewsCount: 180
    }
];

export default async function ProductDetailPage({ params }: PageProps) {
    const { productName } = await params;
    const product = products.find((p) => p.slug === productName);

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
                {/* Left: Gallery with images prop passed */}
                <ProductGallery images={product.images} />

                {/* Right: Product Info */}
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
                                <FiStar className="text-green-400 w-6 h-6 flex-shrink-0 mr-3 mt-1" />
                                <span>{feat}</span>
                            </li>
                        ))}
                    </ul>

                    <button className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                        <FiShoppingCart className="w-6 h-6 mr-2" />
                        Thêm vào giỏ hàng
                    </button>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-2">Mô Tả Sản Phẩm</h2>
                        <p className="text-gray-300 leading-relaxed">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
