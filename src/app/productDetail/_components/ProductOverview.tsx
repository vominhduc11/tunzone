import { Product } from '@/types/product';
import { FiStar } from 'react-icons/fi';

export default function ProductOverview({ product }: { product: Product }) {
    return (
        <div className="flex flex-col justify-start">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <FiStar
                        key={i}
                        className={`w-5 h-5 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                    />
                ))}
                <span
                    // onClick={() => setShowReviewsModal(true)}
                    className="ml-2 text-gray-400 cursor-pointer hover:text-white transition"
                >
                    ({product.reviewsCount} đánh giá) • Xem tất cả
                </span>
            </div>
            <ul className="mb-6 space-y-2">
                {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start">
                        <FiStar className="text-green-400 w-6 h-6 mr-3 mt-1" />
                        <span>{feat}</span>
                    </li>
                ))}
            </ul>
            <a
                href={`https://shopee.vn/search?keyword=${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition"
            >
                Mua trên Shopee
            </a>
        </div>
    );
}
