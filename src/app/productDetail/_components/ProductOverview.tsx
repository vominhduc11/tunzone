import { Product } from '@/types/product';
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiCheck, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import Link from 'next/link';

export default function ProductOverview({ product }: { product: Product }) {
    return (
        <div className="space-y-6">
            {/* Product Title */}
            <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{product.name}</h1>
                
                {/* Rating & Reviews */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-yellow-400 font-semibold">{product.rating}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-600"></div>
                    <Link
                        href="/reviewsPage"
                        className="text-blue-400 hover:text-blue-300 transition text-sm"
                    >
                        {product.reviewsCount} đánh giá
                    </Link>
                </div>
            </div>

            {/* Price */}
            {product.price && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {product.price.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="text-gray-400 line-through text-lg">
                            {Math.round(product.price * 1.2).toLocaleString('vi-VN')}₫
                        </span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            -17%
                        </span>
                    </div>
                    <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                        <FiCheck className="w-4 h-4" />
                        Giá tốt nhất thị trường
                    </p>
                </div>
            )}

            {/* Key Features */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Tính năng nổi bật</h3>
                <ul className="space-y-3">
                    {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                            <div className="bg-blue-500/20 p-1 rounded-full mt-0.5 group-hover:bg-blue-500/30 transition">
                                <FiCheck className="text-blue-400 w-4 h-4" />
                            </div>
                            <span className="text-gray-300 group-hover:text-white transition leading-relaxed">{feat}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <FiTruck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Miễn phí vận chuyển</p>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <FiShield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Bảo hành chính hãng</p>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <FiHeadphones className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Hỗ trợ 24/7</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
                <div className="flex gap-3">
                    <a
                        href={`https://shopee.vn/search?keyword=${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        <FiShoppingCart className="w-5 h-5" />
                        Mua trên Shopee
                    </a>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-xl transition border border-gray-600 hover:border-gray-500">
                        <FiHeart className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex gap-3">
                    <Link
                        href="/contact"
                        className="flex-1 bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white py-3 px-6 rounded-xl font-medium text-center transition-all duration-300"
                    >
                        Liên hệ tư vấn
                    </Link>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl transition border border-gray-600 hover:border-gray-500">
                        <FiShare2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                        <FiCheck className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-1">Cam kết chất lượng</h4>
                        <p className="text-sm text-gray-300">
                            Sản phẩm chính hãng 100%, bảo hành toàn diện, đổi trả trong 30 ngày
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
