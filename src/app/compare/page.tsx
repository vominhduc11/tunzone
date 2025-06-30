'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import { products } from '@/data/api/products';

export function CompareContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Lấy danh sách ID so sánh từ query param
    const compareParam = searchParams.get('compare') || '';
    const compareIds = compareParam
        .split(',')
        .map((s) => parseInt(s, 10))
        .filter((id) => !isNaN(id));

    // Lọc sản phẩm để so sánh
    const compareProducts = products.filter((p) => compareIds.includes(p.id));

    // Nếu không có sản phẩm để so sánh
    if (compareProducts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <h1 className="text-3xl font-bold mb-4">Chưa có sản phẩm để so sánh</h1>
                <Link href="/products" className="text-cyan-400 hover:underline">
                    Quay lại trang sản phẩm
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
            <div className="w-full max-w-[1280px] mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">So sánh sản phẩm</h1>
                <div className="overflow-auto">
                    <table className="w-full table-auto border-collapse border border-gray-700">
                        <thead>
                            <tr>
                                <th className="border border-gray-700 p-4"></th>
                                {compareProducts.map((p) => (
                                    <th
                                        key={p.id}
                                        className="border border-gray-700 p-4 text-center"
                                    >
                                        <Image
                                            src={p.images?.[0] ?? '/placeholder.png'}
                                            alt={p.name}
                                            width={120}
                                            height={120}
                                            className="mx-auto rounded"
                                        />
                                        <h2 className="mt-2 font-semibold">{p.name}</h2>
                                        <button
                                            onClick={() => {
                                                const newIds = compareIds.filter(
                                                    (id) => id !== p.id
                                                );
                                                router.push(
                                                    newIds.length
                                                        ? `/compare?compare=${newIds.join(',')}`
                                                        : '/compare'
                                                );
                                            }}
                                            className="mt-2 text-red-500 hover:underline"
                                        >
                                            Xóa
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Giá */}
                            <tr>
                                <td className="border border-gray-700 p-4 font-semibold">Giá</td>
                                {compareProducts.map((p) => (
                                    <td
                                        key={p.id}
                                        className="border border-gray-700 p-4 text-center"
                                    >
                                        {p.price ? p.price.toLocaleString('vi-VN') + '₫' : '—'}
                                    </td>
                                ))}
                            </tr>
                            {/* Đánh giá */}
                            <tr>
                                <td className="border border-gray-700 p-4 font-semibold">
                                    Đánh giá
                                </td>
                                {compareProducts.map((p) => (
                                    <td
                                        key={p.id}
                                        className="border border-gray-700 p-4 text-center"
                                    >
                                        <div className="flex justify-center">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-5 h-5 ${
                                                        i < Math.round(p.rating)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-600'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-400">
                                            ({p.reviewsCount})
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            {/* Tính năng */}
                            <tr>
                                <td className="border border-gray-700 p-4 font-semibold align-top">
                                    Tính năng
                                </td>
                                {compareProducts.map((p) => (
                                    <td key={p.id} className="border border-gray-700 p-4">
                                        <ul className="list-disc list-inside space-y-1">
                                            {p.features.map((feat, idx) => (
                                                <li key={idx}>{feat}</li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                            </tr>
                            {/* Nút hành động */}
                            <tr>
                                <td className="border border-gray-700 p-4"></td>
                                {compareProducts.map((p) => (
                                    <td
                                        key={p.id}
                                        className="border border-gray-700 p-4 text-center"
                                    >
                                        <Link
                                            href={`/productDetail/${p.id}`}
                                            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-gray-900 px-4 py-2 rounded-full transition"
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
