import { StaticImageData } from 'next/image';

export interface Product {
    id: number;
    avatar: StaticImageData | string;
    images?: string[];
    name: string;
    rating: number;
    reviewsCount: number;
    price?: number;
    features: string[];
    specs: Record<string, string>;
    videoUrl?: string;
    description: string;
    boxItems: string[];
    faqs: { q: string; a: string }[];
}
