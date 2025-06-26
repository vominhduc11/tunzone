'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiStar } from 'react-icons/fi';
import SharedModal from '@/components/shared/SharedModal';
import Image from 'next/image';
import { BiCheckCircle } from 'react-icons/bi';

interface Review {
    id: number;
    user: string;
    title: string;
    rating: number;
    text: string;
    time: string;
}

// Dữ liệu tạm thời
const mockReviews: Review[] = [
    {
        id: 1,
        user: 'Shelby D.',
        title: 'Practical Pro',
        rating: 5,
        text: 'Works great, love the voice commands.',
        time: '2 days ago'
    },
    {
        id: 2,
        user: 'Anthony P.',
        title: 'Great',
        rating: 4,
        text: 'Amazing performance but initial setup was tricky.',
        time: '7 weeks ago'
    },
    {
        id: 3,
        user: 'Brad',
        title: 'Top-of-the-line',
        rating: 5,
        text: 'The best intercom device I’ve used so far. Solid build and clarity.',
        time: '2 weeks ago'
    },
    {
        id: 4,
        user: 'Alex H.',
        title: 'Works Well',
        rating: 4,
        text: 'Solid for the price, does what it promises.',
        time: '1 month ago'
    },
    {
        id: 5,
        user: 'Emma W.',
        title: 'Game Changer',
        rating: 5,
        text: 'This product changed how we communicate at home.',
        time: '3 weeks ago'
    },
    {
        id: 6,
        user: 'Chris L.',
        title: 'Pretty Good',
        rating: 4,
        text: 'Overall satisfied, would recommend to friends.',
        time: '5 days ago'
    },
    {
        id: 7,
        user: 'Dana S.',
        title: 'Not bad',
        rating: 3,
        text: 'It works but has some bugs that need fixing.',
        time: '2 weeks ago'
    },
    {
        id: 8,
        user: 'Evan T.',
        title: 'Excellent',
        rating: 5,
        text: 'Exceeded my expectations in every way.',
        time: '1 week ago'
    }
];

const review = {
  user: "Shelby D.",
  verified: true,
  rating: 5,
  time: "2 days ago",
  title: "Practical Pro",
  text: "Works great, love the voice commands. The device is incredibly intuitive and the build quality is outstanding. I've been using it for months now and it never disappoints.",
  images: [
    "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg",
    "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    "https://images.pexels.com/photos/163125/pexels-photo-163125.jpeg",
    "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg",
    "https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg"
  ]
};

export default function ReviewsPage() {
    const router = useRouter();
    const [reviews] = useState<Review[]>(mockReviews);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => router.back()}
                        className="mb-6 text-sm text-blue-400 hover:underline"
                    >
                        &larr; Back
                    </button>
                    <h1 className="text-3xl font-bold mb-8 text-center">All Reviews</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((r) => (
                            <div
                                key={r.id}
                                className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-medium text-lg">{r.user}</span>
                                    <span className="text-xs text-gray-400">{r.time}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`w-5 h-5 ${i < r.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>
                                <h4 className="font-semibold text-lg mb-2">{r.title}</h4>
                                <p className="text-base text-gray-300 mb-4 flex-1 line-clamp-8">
                                    {r.text}
                                </p>
                                <button
                                    onClick={() => setOpen(true)}
                                    className="mt-auto self-start px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm transition"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SharedModal
                isOpen={open}
                onClose={() => setOpen(false)}
                contentLabel="Review Details Modal"
            >
                <div className="bg-gray-900 text-white py-8 px-4 md:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xl font-bold mb-4">Chi tiết đánh giá</h2>

                        <div className="mb-2 text-lg font-semibold flex items-center gap-2">
                            {review.user}
                            {review.verified && (
                                <span className="bg-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <BiCheckCircle className="w-3 h-3" />
                                    Đã xác minh
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                    />
                                ))}
                            </div>
                            <span>{review.time}</span>
                        </div>

                        <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
                        <p className="text-base text-gray-300 mb-6 leading-relaxed">{review.text}</p>

                        {review.images.length > 0 && (
                            <div>
                                <h4 className="font-medium mb-3">
                                    Hình ảnh từ khách hàng ({review.images.length})
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {review.images.map((src, idx) => (
                                        <div
                                            key={idx}
                                            className="aspect-square w-full rounded-lg overflow-hidden relative"
                                        >
                                            <Image
                                                src={src}
                                                alt={`Customer photo ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SharedModal>
        </>
    );
}
