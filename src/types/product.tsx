import { StaticImageData } from 'next/image';

export interface Product {
    id: number;
    avatar: StaticImageData;
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
}
