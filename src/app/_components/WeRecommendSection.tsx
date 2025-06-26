import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface RecommendedProduct {
    id: string | number;
    title: string;
    imageSrc: StaticImageData;
    link: string;
}

interface WeRecommendSectionProps {
    products: RecommendedProduct[];
}

export default function WeRecommendSection({ products }: WeRecommendSectionProps) {
    return (
        <section className="bg-gray-700 py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-8">We recommend</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 px-4">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={product.link}
                            className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-2"
                        >
                            <h3 className="text-xl font-semibold text-white underline mb-4 transition-colors duration-300 hover:text-blue-400">
                                {product.title}
                            </h3>
                            <div className="relative w-full h-48 mb-4 transform transition-transform duration-300 hover:scale-105">
                                <Image
                                    src={product.imageSrc}
                                    alt={product.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <button className="mt-auto bg-blue-400 text-black font-medium px-4 py-2 rounded-md transform transition-transform duration-300 hover:bg-blue-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300">
                                DISCOVER NOW
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
