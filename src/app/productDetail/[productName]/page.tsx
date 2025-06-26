import React from 'react';
import ProductGallery from '@/app/productDetail/_components/ProductGallery';
import { FiStar } from 'react-icons/fi';
import ProductTabs from '@/app/productDetail/_components/ProductTabsProps';
import image from '@/assets/images/tai-nghe-cardo-BOLD-2-removebg-preview.png';

interface Review {
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
  date: string;
  media?: string[];
}

interface Product {
  slug: string;
  name: string;
  price: number;
  images: string[];
  features: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  specs: Record<string, string>;
  boxItems: string[];
  faqs: { q: string; a: string }[];
  videoUrl?: string;
  reviews: Review[];
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
            'https://dophuot.store/wp-content/uploads/2022/07/tai-nghe-cardo-BOLD-2.jpg'
        ],
        features: [
            'Bluetooth 5.2 Tiên Tiến',
            'Âm thanh stereo chất lượng cao',
            'Pin lên đến 17 giờ đàm thoại',
            'Chống thấm nước IP67',
            'Kết nối nhóm 15 người'
        ],
        rating: 4.7,
        reviewsCount: 200,
        description: 'Cardo G7 Plus là tai nghe cao cấp…',
        specs: {
            'Bluetooth Version': '5.2',
            'Max Intercom Distance': '1.6 km',
            'Talk Time': '17 giờ',
            'Standby Time': '380 giờ',
            'Water Resistance': 'IP67',
            'Weight': '55g'
        },
        boxItems: [
            'Thiết bị Cardo G7 Plus',
            'Cáp sạc USB-C',
            'Bộ micro chống ồn Windbreaker',
            'Đế gắn trên mũ',
            'Hướng dẫn sử dụng'
        ],
        faqs: [
            {
                q: 'Làm sao để kết nối với điện thoại?',
                a: 'Nhấn giữ nút nguồn 5 giây, chờ đèn nhấp nháy xanh rồi tìm trên Bluetooth điện thoại.'
            },
            {
                q: 'Thiết bị có chống nước không?',
                a: 'Đạt chuẩn IP67, chịu được mưa và rửa nhẹ.'
            }
        ],
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_G7PLUS',
        reviews: [
            {
                name: 'Nguyễn Văn A',
                rating: 5,
                comment: 'Sản phẩm rất chất lượng...',
                date: '2025-06-20T10:30:00Z',
                avatar: '/avatars/a.jpg',
                media: [image.src, image.src]
            },
            {
                name: 'Trần Thị B',
                rating: 4,
                comment: 'Thiết kế đẹp...',
                date: '2025-06-18T14:45:00Z',
                avatar: '/avatars/b.jpg',
                media: [image.src]
            }
        ]
    }
];

export default async function ProductDetailPage({ params }: { params: { productName: string } }) {
    const productName = params.productName;
    const product = products.find((p) => p.slug === productName);

    if (!product) {
        return (
            <div className="bg-gray-900 text-white py-20 text-center">
                <h2 className="text-2xl font-semibold">Sản phẩm không tìm thấy</h2>
            </div>
        );
    }

    const shopeeLink = `https://shopee.vn/search?keyword=${product.slug}`;

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
                        <span className="ml-2 text-gray-400">({product.reviewsCount} đánh giá)</span>
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
                        href={shopeeLink}
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
                    reviews={product.reviews}
                />
            </div>
        </div>
    );
}
